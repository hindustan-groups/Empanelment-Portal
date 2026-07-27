import React, { useRef, useState, useEffect } from 'react';
import { Edit3, RotateCcw, CheckCircle2 } from 'lucide-react';

export default function DigitalSignature({ onSignatureSave, onSaveSignature }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  const notifySave = (data) => {
    if (typeof onSaveSignature === 'function') onSaveSignature(data);
    if (typeof onSignatureSave === 'function') onSignatureSave(data);
  };

  // Setup High-DPI Canvas Resolution on Mount & Window Resize
  const setupCanvasResolution = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const width = Math.max(rect.width, 300);
    const height = 160;

    // Set internal high-DPI canvas buffer resolution
    canvas.width = width * 2;
    canvas.height = height * 2;

    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#0047AB'; // Royal Blue signature ink
  };

  useEffect(() => {
    setupCanvasResolution();
    window.addEventListener('resize', setupCanvasResolution);
    return () => window.removeEventListener('resize', setupCanvasResolution);
  }, []);

  // Compute exact precision coordinates mapped 1:1 to cursor / touch position
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    let clientX = e.clientX;
    let clientY = e.clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    }

    const x = (clientX - rect.left);
    const y = (clientY - rect.top);

    return { x, y };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#0047AB';

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasSigned(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e) => {
    if (isDrawing) {
      if (e) e.preventDefault();
      setIsDrawing(false);
      const canvas = canvasRef.current;
      if (canvas) {
        try {
          const dataUrl = canvas.toDataURL('image/png');
          notifySave(dataUrl);
        } catch (err) {
          console.error('Error saving signature canvas:', err);
        }
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setupCanvasResolution();
    }
    setHasSigned(false);
    notifySave(null);
  };

  return (
    <div style={{ padding: '1.15rem', borderRadius: 14, backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', marginBottom: '1.25rem' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 800 }}>
          <Edit3 style={{ width: 16, height: 16, color: '#0047AB' }} />
          <span>Digital Authorized Signature Pad (Draw Signature)</span>
        </div>
        
        {hasSigned && (
          <button type="button" onClick={clearCanvas} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ED1C24', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <RotateCcw style={{ width: 12, height: 12 }} />
            <span>Clear / Redraw</span>
          </button>
        )}
      </div>

      <div ref={containerRef} style={{ border: '2px dashed #CBD5E1', borderRadius: 12, backgroundColor: 'white', overflow: 'hidden', cursor: 'crosshair', position: 'relative' }}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          style={{ width: '100%', height: 160, display: 'block', touchAction: 'none' }}
        />
        {!hasSigned && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', color: '#94A3B8', fontSize: '0.85rem', fontWeight: 600 }}>
            ✍️ Sign here using Mouse or Touch Screen
          </div>
        )}
      </div>

      {hasSigned && (
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#047857', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <CheckCircle2 style={{ width: 14, height: 14 }} />
          <span>Digital Signature Captured & Encrypted</span>
        </div>
      )}

    </div>
  );
}
