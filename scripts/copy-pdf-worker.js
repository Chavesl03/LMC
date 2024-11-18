import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function copyPdfWorker() {
  try {
    const source = path.resolve(__dirname, '../node_modules/pdfjs-dist/build/pdf.worker.min.js');
    const dest = path.resolve(__dirname, '../public/pdf.worker.min.js');
    
    await fs.copy(source, dest);
    console.log('PDF.js worker file copied successfully');
  } catch (err) {
    console.error('Error copying PDF.js worker file:', err);
    process.exit(1);
  }
}

copyPdfWorker();