import re
import pdfplumber
import docx
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from transformers import pipeline
from flask_cors import CORS
import os
from datetime import datetime
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
from rank_bm25 import BM25Okapi

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["OPTIONS", "GET", "POST"],
        "allow_headers": ["Content-Type"]
    }
})
app.config['UPLOAD_FOLDER'] = './uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
model = SentenceTransformer("nlpaueb/legal-bert-base-uncased")

legal_cases = [
    "Section 15 of the Contract Act states that coercion renders a contract void.",
    "Article 21 of the Indian Constitution guarantees the right to life and liberty.",
    "As per Rent Control Act, a tenant cannot be evicted without legal notice."
]

legal_embeddings = model.encode(legal_cases)

dimension = legal_embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(np.array(legal_embeddings))

tokenized_cases = [case.split() for case in legal_cases]
bm25 = BM25Okapi(tokenized_cases)

def search_indian_kanoon(query):
    api_url = f"https://api.indiankanoon.org/search/?formInput={query}"
    headers = {"Authorization": "fbc3465b6aadf45fad6a0c13b835894d16c47709"}  # Replace with your API key
    response = requests.get(api_url, headers=headers)
    if response.status_code == 200:
        return response.json().get("results", [])
    return []

def retrieve_legal_references(query):
    query_embedding = model.encode([query])
    _, faiss_results = index.search(query_embedding, k=2)
    faiss_matched_cases = [legal_cases[i] for i in faiss_results[0]]
    
    bm25_scores = bm25.get_scores(query.split())
    top_bm25_idx = np.argsort(bm25_scores)[::-1][:2]
    bm25_matched_cases = [legal_cases[i] for i in top_bm25_idx]
    
    return list(set(faiss_matched_cases + bm25_matched_cases))

def extract_text_from_pdf(file_path):
    text = ''
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + '\n'
    return text.strip()

def extract_text_from_docx(file_path):
    doc = docx.Document(file_path)
    return '\n'.join([para.text for para in doc.paragraphs]).strip()

def summarize_large_text(text, chunk_size=512, max_chunks=3):
    text = text[:chunk_size * max_chunks]
    chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
    summaries = []
    for chunk in chunks[:max_chunks]:
        max_len = min(len(chunk), 128)
        min_len = max(25, int(len(chunk) * 0.25))
        result = summarizer(chunk, max_length=max_len, min_length=min_len, do_sample=False)
        summaries.append(result[0]['summary_text'])
    return " ".join(summaries)

def find_potential_loopholes(text):
    loophole_patterns = [
        r"\bmay\b",
        r"\bshould\b",
        r"\bif applicable\b",
        r"\bat the discretion\b",
        r"\bsubject to\b",
        r"\breasonable\b",
        r"\bas needed\b",
        r"\bpossible\b",
        r"\bto the extent\b",
        r"\bunless\b"
    ]
    loopholes = []
    for pattern in loophole_patterns:
        found = re.findall(r'([^.]' + pattern + r'[^.]\.)', text, re.IGNORECASE)
        loopholes.extend(found)
    return loopholes

@app.route('/analyze', methods=['POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in the request'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected for uploading'}), 400
        
        file_ext = os.path.splitext(file.filename)[1].lower()
        allowed_ext = {'.pdf', '.docx'}
        if file_ext not in allowed_ext:
            return jsonify({'error': 'Unsupported file type. Only PDF and DOCX are allowed.'}), 400

        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        try:
            file.save(file_path)
            
            if file_ext == ".pdf":
                text = extract_text_from_pdf(file_path)
            elif file_ext == ".docx":
                text = extract_text_from_docx(file_path)
            
            summary = summarize_large_text(text)
            loopholes = find_potential_loopholes(text)
            
            return jsonify({
                'status': 'success',
                'summary': summary,
                'loopholes': loopholes,
                'metadata': {
                    'filename': filename,
                    'fileType': file_ext[1:].upper(),
                    'dateAnalyzed': datetime.now().isoformat()
                }
            })
            
        finally:
            # Clean up the file whether the analysis succeeded or failed
            if os.path.exists(file_path):
                os.remove(file_path)
                
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/auth/providers', methods=['GET'])
def auth_providers():
    return jsonify({
        'providers': []  # Add your auth providers here if needed
    })

@app.route('/auth/error', methods=['GET'])
def auth_error():
    return jsonify({
        'error': 'Authentication error'
    })

@app.route('/auth/_log', methods=['POST'])
def auth_log():
    return jsonify({
        'status': 'logged'
    })

@app.route('/auth/signin', methods=['GET'])
def auth_signin():
    return jsonify({
        'providers': [],
        'callbackUrl': request.args.get('callbackUrl', '')
    })

@app.route('/analyze-dispute', methods=['POST'])
def analyze_dispute_endpoint():
    try:
        data = request.get_json()
        
        if not data or 'claimantArguments' not in data or 'respondentArguments' not in data:
            return jsonify({
                'error': 'Missing required arguments'
            }), 400

        claimant_args = data['claimantArguments']
        respondent_args = data['respondentArguments']

        # Combine arguments if they're arrays
        full_claimant_arg = ' '.join(claimant_args) if isinstance(claimant_args, list) else claimant_args
        full_respondent_arg = ' '.join(respondent_args) if isinstance(respondent_args, list) else respondent_args

        claimant_legal_refs = retrieve_legal_references(full_claimant_arg)
        respondent_legal_refs = retrieve_legal_references(full_respondent_arg)
        
        resolution = ""
        
        if "coercion" in full_claimant_arg.lower() and any("contract" in ref.lower() for ref in claimant_legal_refs):
            resolution += "\n- If coercion is proven, the contract is void. The claimant has a strong case."
        
        if "eviction" in full_respondent_arg.lower() and any("Rent Control Act" in ref for ref in respondent_legal_refs):
            resolution += "\n- If a legal notice was served, the eviction is valid. Otherwise, the claimant can challenge it."
        
        ethical_suggestions = [
            "- Mediation is recommended to facilitate a fair discussion.",
            "- Both parties should consider negotiation and compromise to avoid legal battles.",
            "- Transparency and open communication can prevent misunderstandings and lead to a fair outcome."
        ]
        
        if resolution == "":
            resolution = "No strong legal justification found. Ethical dispute resolution is recommended."

        return jsonify({
            'status': 'success',
            'analysis': {
                'claimantLegalReferences': claimant_legal_refs,
                'respondentLegalReferences': respondent_legal_refs,
                'suggestedResolution': resolution,
                'ethicalRecommendations': ethical_suggestions
            }
        })

    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

if __name__ == '__main__':
    app.run(debug=True) 