# 📚 Multilingual RAG System (Bangla + English)

This project implements a **Multilingual Retrieval-Augmented Generation (RAG) System** that can understand queries in both **Bangla** and **English**, retrieve relevant context from a Bengali textbook (PDF), and generate grounded answers.

---

## ✅ Objective

To build a lightweight and accurate RAG system that:
- Accepts user queries in Bangla and English
- Extracts relevant information from a PDF-based Bangla book (`HSC26 Bangla 1st Paper`)
- Generates accurate answers grounded in retrieved knowledge

---

## 🚀 Setup Instructions

### 🔧 Step 1: **Install Python:** Download and install Python from [python.org](https://www.python.org/).

### 🔧 Step 2: **Clone the Repository:**

    ```bash
    git clone https://github.com/epiprokash/Bangla-RAG-Pipeline
    ```

### 🔧 Step 3: **Install Required Libraries:**

    ```bash
    pip install -r requirements.txt
    ```

## 🚀 Running the Pipeline

1. **Prepare Your Bangla pdf Corpus:** Create a pdf file (e.g., `bangla.pdf`) with the Bengali text you want to use.
2. **Extract the PDF text using OCR :**
    ```bash
    python OCR.py
    ```
3. **Run the RAG Pipeline using Extracted text**
     ```bash
    python main.py
    ```
4. **Interact with the System:** Type your question and press Enter to get a response based on the retrieved information.
## Example

```bash
আপনার প্রশ্ন: কাকে অনুপমের ভাগ্য দেবতা বলে উল্লেখ করা হয়েছে?
উত্তর: মামাকে
```
## 🧠 RAG Architecture
### Components:
 * OCR Extraction: ``pytesseract``, ``pdf2image``, ``poppler-utils``

* Chunking: Sentence-based, ~100 words per chunk

* Embeddings: ``sagorsarker/bangla-bert-base``

* Similarity Search: ``FAISS (IndexFlatL2)``

* QA Model: ``deepset/xlm-roberta-base-squad2`` (supports multilingual input)


### 📄 Workflow Overview
1. Convert PDF to images

2. Extract Bengali text using ``OCR (tesseract-ocr-ben)``

3. Clean and chunk the text (~100 words per chunk)

4. Embed each chunk using ``Bangla-BERT``

5. Store vectors in ``FAISS``

6. For user queries:

    * Embed query

    * Retrieve ``top-K`` relevant chunks

    * Answer using ``XLM-RoBERTa QA model``


## ❓ Assessment Q&A

### 1. 🧾 What method or library did you use to extract the text, and why? Did you face any formatting challenges with the PDF content?

I used **Tesseract OCR** (`pytesseract`) in combination with `pdf2image` to extract text from the **Bangla PDF**. The PDF was scanned and used custom or embedded Bengali fonts, so traditional text parsers failed to extract readable text. OCR provided better results, and installing `tesseract-ocr-ben` enabled accurate extraction for Bengali script.

📌 **Challenge**: OCR sometimes produced noise or merged characters, which required light text cleaning.

---

### 2. ✂️ What chunking strategy did you choose and why?

I used **sentence-based chunking** where each chunk contains approximately **100 words**. Bengali sentences were split using punctuation like `।`, `?`, and `!`. This approach:
- Maintains contextual coherence
- Keeps chunks short enough for transformer models
- Balances semantic accuracy and computational efficiency

This method works well for semantic search using vector similarity.

---

### 3. 🧠 What embedding model did you use? Why did you choose it? How does it capture the meaning of the text?

I used `sagorsarker/bangla-bert-base` as the embedding model. It’s a **BERT-based model pretrained specifically on Bengali corpora**, making it highly suitable for capturing linguistic and contextual patterns in Bangla text. It outperforms general multilingual models in native Bangla comprehension.

To generate embeddings, I used the `[CLS]` token’s hidden state (`outputs.last_hidden_state[:, 0, :]`) which encodes sentence-level meaning.

---

### 4. 📍 How are you comparing the query with your stored chunks? Why did you choose this similarity method and storage setup?

I used **FAISS (IndexFlatL2)** to store and compare the vector embeddings of the chunks and queries.

- **Why FAISS?** It's optimized for fast similarity search on dense vectors and works well even for large-scale document retrieval tasks.
- **Why L2 distance?** It effectively measures vector closeness in high-dimensional spaces like BERT embeddings.

This setup ensures fast and accurate retrieval of the most semantically similar chunks.

---

### 5. 🤝 How do you ensure that the question and the document chunks are compared meaningfully? What would happen if the query is vague or missing context?

To ensure meaningful comparison:
- The **same tokenizer and embedding model** is used for both document chunks and the query.
- The query is cleaned and normalized similarly to the document text.

If the query is vague or ambiguous:
- The top-k FAISS matches might not be directly relevant.
- To improve this, the system maintains a **short-term memory** (last 2 query-context pairs) which is appended to context during generation for added coherence.

Further enhancement could involve re-ranking or query expansion techniques.

---

### 6. 📈 Do the results seem relevant? If not, what might improve them?

Yes, the system returns **accurate and grounded answers** for the test cases.

**Potential Improvements**:
- More advanced chunking (e.g., paragraph or topic segmentation)
- Using multilingual instruction-tuned models like `mT5`, `Gemma`, or `Mixtral`
- Reducing OCR noise further
- Better context aggregation using LangChain's document loaders and memory architecture
