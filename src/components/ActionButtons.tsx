import React from 'react';
import { Upload, Camera as CameraIcon } from 'lucide-react';

interface ActionButtonsProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsCameraMode: (mode: boolean) => void;
}

export function ActionButtons({ onFileChange, setIsCameraMode }: ActionButtonsProps) {
  return (
    <div className="flex justify-center gap-4 mb-6">
      <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600">
        <Upload size={20} />
        <span>Upload Image</span>
        <input type="file" className="hidden" onChange={onFileChange} accept="image/*" />
      </label>
      <button
        onClick={() => setIsCameraMode(true)}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        <CameraIcon size={20} />
        <span>Use Camera</span>
      </button>
    </div>
  );
}