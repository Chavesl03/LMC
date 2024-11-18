import * as pdfjsLib from 'pdfjs-dist';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export async function analyzePDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ')
        .replace(/\s+/g, ' '); // Normalize whitespace
      fullText += pageText + '\n';
    }

    if (!fullText.trim()) {
      throw new Error('No text content found in the PDF. Please ensure the PDF contains searchable text.');
    }

    return fullText;
  } catch (error) {
    console.error('PDF analysis error:', error);
    if (error instanceof Error) {
      throw new Error(`PDF analysis failed: ${error.message}`);
    }
    throw new Error('Failed to analyze PDF file. Please make sure it contains valid text content.');
  }
}