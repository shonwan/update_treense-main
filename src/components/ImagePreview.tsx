import React from 'react';
import { Upload, RefreshCw } from 'lucide-react';
import Camera from './Camera';

interface ImagePreviewProps {
  selectedImage: string | null;
  isCameraMode: boolean;
  isProcessing: boolean;
  handleCapture: (canvas: HTMLCanvasElement) => void;
}

export default function ImagePreview({ 
  selectedImage, 
  isCameraMode, 
  isProcessing, 
  handleCapture 
}: ImagePreviewProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <div className="relative rounded-lg overflow-hidden bg-gray-100">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-full object-contain"
            />
          ) : isCameraMode ? (
            <Camera onCapture={handleCapture} isProcessing={isProcessing} />
          ) : (
            <div className="aspect-video flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <Upload size={48} className="mx-auto mb-2" />
                <p>Upload an image or use camera</p>
              </div>
            </div>
          )}
          {isProcessing && !isCameraMode && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <RefreshCw size={40} className="text-white animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}