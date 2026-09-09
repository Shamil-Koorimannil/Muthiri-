"use client";

import { useEffect, useRef, useState, useCallback } from "react";

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
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    let isCancelled = false;
    let timeoutId: NodeJS.Timeout;

    async function initAndLoadPdf() {
      try {
        setStatus("loading");

        // 10-second safety timeout to prevent infinite loading state
        timeoutId = setTimeout(() => {
          if (!isCancelled && status === "loading") {
            console.warn("PDF loading timed out, falling back to direct link");
            setStatus("error");
          }
        }, 10000);

        // Dynamically import pdfjs-dist
        const pdfjsLib = await import("pdfjs-dist");

        // Set worker source cleanly
        if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
          pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
        }

        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          withCredentials: false,
        });

        const loadedDoc = await loadingTask.promise;

        if (!isCancelled) {
          clearTimeout(timeoutId);
          setPdfDoc(loadedDoc);
          setNumPages(loadedDoc.numPages);
          setStatus("loaded");
        }
      } catch (err) {
        console.error("Error initializing PDF document:", err);
        if (!isCancelled) {
          clearTimeout(timeoutId);
          setStatus("error");
        }
      }
    }

    if (pdfUrl) {
      initAndLoadPdf();
    } else {
      setStatus("error");
    }

    return () => {
      isCancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [pdfUrl]);

  if (status === "error") {
    return (
      <div className="w-full max-w-[1000px] mx-auto my-12 p-8 border border-white/15 rounded-2xl bg-black/40 text-center">
        <p className="font-sans text-[1.2rem] font-light text-fg-secondary mb-4">
          The PDF case study for <span className="text-white font-medium">{title}</span> could not be loaded inline.
        </p>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-sans text-[0.8rem] uppercase tracking-[0.15em] text-white border-b border-white pb-1 hover:opacity-80 transition-opacity"
        >
          <span>View / Download Original PDF &rarr;</span>
        </a>
      </div>
    );
  }

  if (status === "loading" || !numPages || !pdfDoc) {
    return (
      <div className="w-full max-w-[1200px] mx-auto my-8 space-y-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="w-full aspect-[16/10] bg-[#121212] border border-white/5 rounded-sm animate-pulse flex flex-col items-center justify-center gap-3 p-6"
          >
            <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-fg-muted">
              Loading Case Study Page 0{i}...
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="w-full max-w-[1200px] mx-auto my-8 md:my-16 flex flex-col gap-6 md:gap-10">
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

function PdfPageItem({
  pageNumber,
  pdfDoc,
  title,
  isPriority,
}: PdfPageItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldRender, setShouldRender] = useState<boolean>(isPriority);
  const [renderStatus, setRenderStatus] = useState<"idle" | "rendering" | "done" | "error">("idle");
  const [aspectRatio, setAspectRatio] = useState<number>(16 / 10);

  // Viewport IntersectionObserver for lazy loading
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
    if (!shouldRender || !pdfDoc || renderStatus === "done" || renderStatus === "rendering") return;

    let isCancelled = false;

    async function renderPageCanvas() {
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

        // Calculate appropriate scale based on container width and device pixel ratio (capped at 2)
        const containerWidth = containerRef.current?.clientWidth || 1200;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const targetScale = (containerWidth / unscaledViewport.width) * dpr;

        const viewport = page.getViewport({ scale: targetScale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;

        if (!isCancelled) {
          setRenderStatus("done");
        }
      } catch (err) {
        console.error(`Error rendering page ${pageNumber}:`, err);
        if (!isCancelled) {
          setRenderStatus("error");
        }
      }
    }

    renderPageCanvas();

    return () => {
      isCancelled = true;
    };
  }, [shouldRender, pdfDoc, pageNumber, renderStatus]);

  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-hidden flex flex-col items-center justify-center transition-opacity duration-500"
      style={{
        aspectRatio: renderStatus === "done" ? undefined : `${aspectRatio}`,
      }}
      aria-label={`${title} - Page ${pageNumber}`}
    >
      {renderStatus !== "done" && (
        <div className="absolute inset-0 bg-[#121212] border border-white/5 rounded-sm animate-pulse flex items-center justify-center">
          <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-fg-muted">
            {renderStatus === "error" ? "Page Render Failed" : `Page ${String(pageNumber).padStart(2, "0")}`}
          </span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className={`w-full h-auto block select-none object-contain pointer-events-none transition-opacity duration-500 ${
          renderStatus === "done" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          maxWidth: "100%",
        }}
      />
    </div>
  );
}
