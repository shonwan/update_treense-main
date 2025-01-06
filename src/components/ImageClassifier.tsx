import React, { useEffect, useState } from 'react';
import { Upload, Camera as CameraIcon, RefreshCw } from 'lucide-react';
import { predict, loadModel } from '../utils/modelUtils';
import { saveAnalysis } from '../utils/historyService';
import Camera from './Camera';
import PredictionResults from './PredictionResults';
import { uploadImage } from '../utils/imageUtils';
import LoadingScreen from './LoadingScreen';
import { ActionButtons } from './ActionButtons';
import ImagePreview from './ImagePreview';

interface Prediction {
  className: string;
  probability: number;
}

export default function ImageClassifier() {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isCameraMode, setIsCameraMode] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    initModel();
  }, []);

  const initModel = async () => {
    try {
      await loadModel();
      setIsModelLoaded(true);
    } catch (error) {
      console.error('Error loading model:', error);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const imageUrl = await uploadImage(file);
      setSelectedImage(imageUrl);
      
      const img = new Image();
      img.src = imageUrl;
      await new Promise((resolve) => (img.onload = resolve));
      
      const predictions = await predict(img);
      setPredictions(predictions);
      await saveAnalysis(imageUrl, predictions);
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCapture = async (canvas: HTMLCanvasElement) => {
    setIsProcessing(true);
    try {
      const imageUrl = await uploadImage(canvas.toDataURL());
      setSelectedImage(imageUrl);
      
      const predictions = await predict(canvas);
      setPredictions(predictions);
      await saveAnalysis(imageUrl, predictions);
    } catch (error) {
      console.error('Error processing capture:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isModelLoaded) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Health Image Classifier
          </h1>

          <ActionButtons 
            onFileChange={handleFileChange} 
            setIsCameraMode={setIsCameraMode} 
          />

          <ImagePreview 
            selectedImage={selectedImage}
            isCameraMode={isCameraMode}
            isProcessing={isProcessing}
            handleCapture={handleCapture}
          />

          <PredictionResults predictions={predictions} />
        </div>
      </div>
    </div>
  );
}