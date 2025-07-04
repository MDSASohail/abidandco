// src/components/PdfViewer.jsx
import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// IMPORTANT: Ensure this path is correct based on your previous step (copying pdf.worker.min.mjs to public/)
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const PdfViewer = ({ pdfUrl }) => {
    const canvasRef = useRef(null);
    const [pdfLoading, setPdfLoading] = useState(true);
    const [pdfError, setPdfError] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Helper functions for page navigation (defined outside useEffect)
    const goToNextPage = () => {
        if (currentPage < numPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;

        // Exit early if canvas is not yet available.
        // This makes the effect wait for the DOM element to be mounted.
        if (!canvas) {
            return;
        }

        const loadPdf = async () => {
            setPdfLoading(true); // Indicate loading has started
            setPdfError(null);

            if (!pdfUrl) {
                setPdfError('No PDF URL provided.');
                setPdfLoading(false);
                return;
            }

            try {
                // 1. Fetch the PDF as an ArrayBuffer
                const response = await fetch(pdfUrl);
                if (!response.ok) {
                    throw new Error(`Failed to fetch PDF: ${response.statusText} (${response.status})`);
                }
                const arrayBuffer = await response.arrayBuffer();

                // 2. Load the PDF document using PDF.js
                const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
                const pdf = await loadingTask.promise;
                setNumPages(pdf.numPages);

                // 3. Get the specific page to render
                const page = await pdf.getPage(currentPage);

                // 4. Prepare the canvas for rendering
                const context = canvas.getContext('2d'); // This line will now work because canvas is not null

                const scale = 1.5; // Adjust rendering scale as needed
                const viewport = page.getViewport({ scale });

                // Set canvas dimensions to match the PDF page's viewport
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Ensure canvas scales correctly on smaller screens
                canvas.style.maxWidth = '100%';
                canvas.style.height = 'auto'; // Important for responsiveness

                // 5. Render the page on the canvas
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };
                await page.render(renderContext).promise;
                console.log(`Page ${currentPage} rendered successfully!`);

            } catch (error) {
                console.error('Error loading or rendering PDF:', error);
                setPdfError(`Failed to load or render PDF: ${error.message}`);
            } finally {
                setPdfLoading(false); // Indicate loading has finished
            }
        };

        loadPdf();
    }, [pdfUrl, currentPage]); // Dependencies ensure re-render on URL/page change

    return (
        <div style={{ maxWidth: '800px', margin: '20px auto', border: '1px solid #ddd', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
            {/* Navigation controls */}
            <div style={{ padding: '10px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={goToPreviousPage} disabled={currentPage <= 1 || pdfLoading} style={{ padding: '8px 12px', cursor: 'pointer' }}>Previous</button>
                <span>Page {currentPage} of {numPages || '...'}</span>
                <button onClick={goToNextPage} disabled={currentPage >= numPages || pdfLoading} style={{ padding: '8px 12px', cursor: 'pointer' }}>Next</button>
            </div>

            {/* PDF Canvas Container with Loading/Error Overlays */}
            <div style={{ position: 'relative', overflowX: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '10px' }}>
                {/* Loading Overlay */}
                {pdfLoading && (
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        fontSize: '1.2em', color: '#555', zIndex: 10, // Higher z-index to be on top
                    }}>
                        Loading PDF...
                    </div>
                )}
                {/* Error Overlay (shown only when not loading) */}
                {pdfError && !pdfLoading && (
                     <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        fontSize: '1.2em', color: 'red', zIndex: 10,
                    }}>
                        Error: {pdfError}
                    </div>
                )}

                {/* The canvas is ALWAYS rendered now */}
                <canvas ref={canvasRef} style={{ display: 'block', border: '1px solid #eee', background: 'white' }} />
            </div>
        </div>
    );
};

export default PdfViewer;