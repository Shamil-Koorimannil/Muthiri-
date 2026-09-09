"use client";

import { useEffect, useRef, useState } from "react";

interface PdfProjectPresentationProps {
  pdfUrl: string;
  title: string;
}

export function PdfProjectPresentation({
  pdfUrl,
  title,
}: PdfProjectPresentationProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isCancelled = false;

    async function loadPdf() {
      try {
        setIsLoading(true);
        setError(false);

        // Dynamically import pdfjs-dist on client side
        const pdfjsLib = await import("pdfjs-dist");
        
        // Set worker source
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

        const loadingTask = pdfjsLib.getDocument({ url: pdfUrl });
        const loadedDoc = await loadingTask.promise;

        if (!isCancelled) {
          setPdfDoc(loadedDoc);
          setNumPages(loadedDoc.numPages);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to load PDF presentation:", err);
        if (!isCancelled) {
          setError(true);
          setIsLoading(false);
        }
      }
    }

    if (pdfUrl) {
      loadPdf();
    }

    return () => {
      isCancelled = true;
    };
  }, [pdfUrl]);

  if (error) {
    return (
      <div className="w-full max-w-[1000px] mx-auto my-16 p-8 border border-white/10 rounded-2xl bg-black/40 text-center">
        <p className="font-serif text-[1.4rem] font-light text-fg-secondary mb-4">
          The PDF presentation for <span className="italic text-white">{title}</span> could not be loaded inline.
        </p>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-sans text-[0.8rem] uppercase tracking-[0.15em] text-white border-b border-white pb-1 hover:opacity-80 transition-opacity"
        >
          <span>View Original PDF Presentation &rarr;</span>
        </a>
      </div>
    );
  }

  if (isLoading || !numPages || !pdfDoc) {
    return (
      <div className="w-full max-w-[1200px] mx-auto my-12 space-y-8">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="w-full aspect-[16/10] bg-[#141414] border border-white/5 rounded-sm animate-pulse flex items-center justify-center"
          >
            <span className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-fg-muted">
              Loading Case Study Page 0{i}...
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="w-full max-w-[1200px] mx-auto my-12 md:my-20 flex flex-col gap-6 md:gap-10">
      {Array.from({ length: numPages }, (_, index) => (
        <PdfPageItem
          key={index + 1}
          pageNumber={index + 1}
          pdfDoc={pdfDoc}
          title={title}
          isPriority={index < 2}
        />
      ))}
    </section>
  );
}

interface PdfPageItemProps {
  pageNumber: number;
  pdfDoc: any;
  title: string;
  isPriority: boolean;
}

function PdfPageItem({ pageNumber, pdfDoc, title, isPriority }: PdfPageItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldRender, setShouldRender] = useState<boolean>(isPriority);
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [aspectRatio, setAspectRatio] = useState<number>(16 / 10);

  // Intersection observer for lazy rendering
  useEffect(() => {
    if (isPriority || shouldRender) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isPriority, shouldRender]);

  // Render canvas once visible
  useEffect(() => {
    if (!shouldRender || !pdfDoc || isRendered) return;

    let isCancelled = false;

    async function renderPage() {
      try {
        const page = await pdfDoc.getPage(pageNumber);
        if (isCancelled) return;

        // Get unscaled viewport to calculate aspect ratio
        const unscaledViewport = page.getViewport({ scale: 1.0 });
        const ratio = unscaledViewport.width / unscaledViewport.height;
        setAspectRatio(ratio);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        // Determine render scale for crisp high-dpi display
        const containerWidth = containerRef.current?.clientWidth || 1200;
        const dpr = window.devicePixelRatio || 1;
        const targetScale = (containerWidth / unscaledViewport.width) * Math.min(dpr, 2);

        const viewport = page.getViewport({ scale: targetScale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;

        if (!isCancelled) {
          setIsRendered(true);
        }
      } catch (err) {
        console.error(`Error rendering page ${pageNumber}:`, err);
      }
    }

    renderPage();

    return () => {
      isCancelled = true;
    };
  }, [shouldRender, pdfDoc, pageNumber, isRendered]);

  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-hidden flex flex-col items-center justify-center transition-opacity duration-700"
      style={{
        aspectRatio: isRendered ? undefined : `${aspectRatio}`,
      }}
      aria-label={`${title} - Page ${pageNumber}`}
    >
      {!isRendered && (
        <div className="absolute inset-0 bg-[#141414] border border-white/5 rounded-sm animate-pulse flex items-center justify-center">
          <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-fg-muted">
            Rendering Page {String(pageNumber).padStart(2, "0")}
          </span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className={`w-full h-auto block select-none object-contain pointer-events-none transition-opacity duration-500 ${
          isRendered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          maxWidth: "100%",
        }}
      />
    </div>
  );
}
