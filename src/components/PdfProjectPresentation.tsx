"use client";

import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Ensure PDF.js worker uses local same-origin file
if (typeof window !== "undefined" && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
}

interface PdfProjectPresentationProps {
  pdfUrl: string;
  title: string;
}

export function PdfProjectPresentation({
  pdfUrl,
  title,
}: PdfProjectPresentationProps) {
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // References for reliable cleanup during route changes / unmounts
  const loadingTaskRef = useRef<ReturnType<typeof pdfjsLib.getDocument> | null>(null);
  const pdfDocRef = useRef<pdfjsLib.PDFDocumentProxy | null>(null);

  // Measure and observe container width for responsive canvas rendering
  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;

    const initialWidth = element.getBoundingClientRect().width;
    if (initialWidth > 0) {
      setContainerWidth(initialWidth);
    }

    let resizeTimeout: NodeJS.Timeout;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const width = entry.contentRect.width;
      if (width <= 0) return;

      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setContainerWidth((prev) => {
          if (Math.abs(prev - width) > 5) {
            return width;
          }
          return prev;
        });
      }, 100);
    });

    observer.observe(element);

    return () => {
      clearTimeout(resizeTimeout);
      observer.disconnect();
    };
  }, []);

  // PDF Document Loading & Lifecycle Management
  useEffect(() => {
    let isCancelled = false;

    async function loadPdfDocument() {
      if (!pdfUrl) {
        setStatus("error");
        return;
      }

      // Safely destroy existing PDF instance
      if (pdfDocRef.current) {
        try {
          (pdfDocRef.current as any).destroy();
        } catch (_) {}
        pdfDocRef.current = null;
      }
      if (loadingTaskRef.current) {
        try {
          loadingTaskRef.current.destroy();
        } catch (_) {}
        loadingTaskRef.current = null;
      }

      setStatus("loading");
      setPdfDoc(null);
      setNumPages(null);

      try {
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          withCredentials: false,
        });
        loadingTaskRef.current = loadingTask;

        const doc = await loadingTask.promise;

        if (isCancelled) {
          try {
            (doc as any).destroy();
          } catch (_) {}
          return;
        }

        pdfDocRef.current = doc;
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setStatus("loaded");
      } catch (err: any) {
        if (isCancelled) return;

        // Ignore intentional cancellation/destruction
        if (
          err?.name === "AbortException" ||
          err?.message?.includes("destroyed") ||
          err?.message?.includes("Worker")
        ) {
          return;
        }

        console.error("Error loading PDF document from Sanity:", err);
        setStatus("error");
      }
    }

    loadPdfDocument();

    return () => {
      isCancelled = true;
      if (loadingTaskRef.current) {
        try {
          loadingTaskRef.current.destroy();
        } catch (_) {}
        loadingTaskRef.current = null;
      }
      if (pdfDocRef.current) {
        try {
          (pdfDocRef.current as any).destroy();
        } catch (_) {}
        pdfDocRef.current = null;
      }
    };
  }, [pdfUrl]);

  if (status === "error") {
    return (
      <div className="w-full max-w-[1000px] mx-auto my-8 md:my-12 p-6 md:p-10 border border-white/10 rounded-xl bg-black/40 text-center">
        <p className="font-sans text-[1rem] md:text-[1.15rem] font-light text-fg-secondary mb-4 leading-relaxed">
          The presentation monograph for <span className="text-white font-medium">{title}</span> could not be rendered inline.
        </p>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-sans text-[0.75rem] md:text-[0.8rem] uppercase tracking-[0.15em] text-white border-b border-white/60 pb-1 hover:border-white hover:opacity-80 transition-all"
        >
          <span>View / Download Original PDF &rarr;</span>
        </a>
      </div>
    );
  }

  if (status === "loading" || !numPages || !pdfDoc) {
    return (
      <div className="w-full max-w-[1200px] mx-auto my-8 space-y-6">
        <div className="w-full aspect-[16/10] bg-[#121212] border border-white/5 rounded-sm animate-pulse flex flex-col items-center justify-center gap-3 p-6">
          <div className="w-7 h-7 rounded-full border-2 border-white/20 border-t-white animate-spin" />
          <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-fg-muted">
            Preparing Presentation & Monograph...
          </span>
        </div>
      </div>
    );
  }

  return (
    <section ref={containerRef} className="w-full max-w-[1200px] mx-auto my-8 md:my-14 flex flex-col gap-6 md:gap-10">
      {/* Top utility bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 text-fg-muted font-sans text-[0.7rem] uppercase tracking-[0.15em]">
        <span>{title} — {numPages} {numPages === 1 ? "Page" : "Pages"}</span>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors border-b border-white/20 pb-0.5 hover:border-white"
        >
          <span>Open Original PDF &rarr;</span>
        </a>
      </div>

      {/* Pages Container */}
      {Array.from({ length: numPages }, (_, index) => (
        <PdfPageItem
          key={index + 1}
          pageNumber={index + 1}
          pdfDoc={pdfDoc}
          containerWidth={containerWidth}
          title={title}
          isPriority={index < 2}
        />
      ))}
    </section>
  );
}

interface PdfPageItemProps {
  pageNumber: number;
  pdfDoc: pdfjsLib.PDFDocumentProxy;
  containerWidth: number;
  title: string;
  isPriority: boolean;
}

function PdfPageItem({
  pageNumber,
  pdfDoc,
  containerWidth,
  title,
  isPriority,
}: PdfPageItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldRender, setShouldRender] = useState<boolean>(isPriority);
  const [renderStatus, setRenderStatus] = useState<"idle" | "rendering" | "done" | "error">("idle");
  const [aspectRatio, setAspectRatio] = useState<number>(1.414);

  const renderTaskRef = useRef<any>(null);

  // IntersectionObserver for lazy rendering non-priority pages
  useEffect(() => {
    if (isPriority || shouldRender) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isPriority, shouldRender]);

  // Render individual page canvas
  useEffect(() => {
    if (!shouldRender || !pdfDoc) return;

    let isCancelled = false;

    async function renderPageCanvas() {
      // Cancel active render task on this page if container re-sized or state changed
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch (_) {}
        renderTaskRef.current = null;
      }

      try {
        setRenderStatus("rendering");

        const page = await pdfDoc.getPage(pageNumber);
        if (isCancelled) return;

        const unscaledViewport = page.getViewport({ scale: 1.0 });
        const ratio = unscaledViewport.width / unscaledViewport.height;
        setAspectRatio(ratio);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const effectiveWidth =
          containerWidth > 0
            ? containerWidth
            : containerRef.current?.clientWidth || 1200;

        const dpr =
          typeof window !== "undefined"
            ? Math.min(window.devicePixelRatio || 1, 2.5)
            : 1;

        const scale = (effectiveWidth / unscaledViewport.width) * dpr;
        const viewport = page.getViewport({ scale });

        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);

        canvas.style.width = "100%";
        canvas.style.height = "auto";

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          canvas: canvas,
        };

        const renderTask = page.render(renderContext as any);
        renderTaskRef.current = renderTask;

        await renderTask.promise;
        renderTaskRef.current = null;

        // Clean up internal PDF.js page data
        page.cleanup();

        if (!isCancelled) {
          setRenderStatus("done");
        }
      } catch (err: any) {
        if (isCancelled) return;

        if (
          err?.name === "RenderingCancelledException" ||
          err?.message?.includes("cancelled")
        ) {
          return;
        }

        console.error(`Error rendering PDF page ${pageNumber}:`, err);
        setRenderStatus("error");
      }
    }

    renderPageCanvas();

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch (_) {}
        renderTaskRef.current = null;
      }
    };
  }, [shouldRender, pdfDoc, pageNumber, containerWidth]);

  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-hidden flex flex-col items-center justify-center bg-[#0d0d0d] border border-white/5 rounded-sm transition-opacity duration-500"
      style={{
        aspectRatio: `${aspectRatio}`,
      }}
      aria-label={`${title} - Page ${pageNumber}`}
    >
      {renderStatus !== "done" && (
        <div className="absolute inset-0 bg-[#121212] border border-white/5 rounded-sm animate-pulse flex items-center justify-center">
          <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-fg-muted">
            {renderStatus === "error"
              ? `Page ${pageNumber} Render Failed`
              : `Loading Page ${String(pageNumber).padStart(2, "0")}`}
          </span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className={`w-full h-auto block select-none object-contain pointer-events-none transition-opacity duration-500 ${
          renderStatus === "done" ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
