import React, { useEffect, useState } from 'react';
import { getAnalysisHistory, AnalysisHistory } from '../../utils/historyService';
import { format } from 'date-fns';

export default function AdminHistory() {
  const [history, setHistory] = useState<AnalysisHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getAnalysisHistory();
      setHistory(data);
    } catch (err) {
      setError('Failed to load history');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Analysis History</h1>
      <div className="grid gap-6">
        {history.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <img 
                  src={item.image_url} 
                  alt="Analyzed" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-sm text-gray-500 mt-2">
                  {format(new Date(item.created_at), 'PPpp')}
                </p>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-lg font-semibold mb-4">Predictions</h3>
                <div className="space-y-3">
                  {item.predictions.map((pred, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{pred.className}</span>
                        <span className="text-indigo-600">
                          {(pred.probability * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${pred.probability * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}