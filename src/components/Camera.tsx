import React, { useEffect, useRef, useState } from 'react';
import { Camera as CameraIcon, FlipHorizontal } from 'lucide-react';

interface CameraProps {
  onCapture: (element: HTMLCanvasElement) => void;
  isProcessing: boolean;
}

export default function Camera({ onCapture, isProcessing }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    initializeCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  const initializeCamera = async () => {
    if (!videoRef.current) return;
    
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      setStream(newStream);
      videoRef.current.srcObject = newStream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current || isProcessing) return;

    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);

    onCapture(canvasRef.current);
  };

  return (
    <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />
      <canvas ref={canvasRef} className="hidden" />
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button
          onClick={switchCamera}
          className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          title="Switch Camera"
        >
          <FlipHorizontal className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={captureImage}
          disabled={isProcessing}
          className={`p-4 bg-white rounded-full hover:bg-gray-100 transition-colors ${
            isProcessing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <CameraIcon className="w-8 h-8 text-gray-900" />
        </button>
      </div>
    </div>
  );
}