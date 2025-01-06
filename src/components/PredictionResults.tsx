import React from 'react';

interface Prediction {
  className: string;
  probability: number;
}

interface PredictionResultsProps {
  predictions: Prediction[];
}

export default function PredictionResults({ predictions }: PredictionResultsProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
      {predictions.length > 0 ? (
        <div className="space-y-4">
          {predictions.map((prediction, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">
                  {prediction.className}
                </span>
                <span className="text-indigo-600 font-semibold">
                  {(prediction.probability * 100).toFixed(1)}%
                </span>
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{
                    width: `${prediction.probability * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No analysis results yet. Upload an image or take a photo to begin.
        </p>
      )}
    </div>
  );
}