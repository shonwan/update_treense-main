import { supabase } from './supabase';

export interface AnalysisHistory {
  id: string;
  image_url: string;
  predictions: Array<{
    className: string;
    probability: number;
  }>;
  created_at: string;
}

export const saveAnalysis = async (imageUrl: string, predictions: any[]) => {
  const { data, error } = await supabase
    .from('analysis_history')
    .insert({
      image_url: imageUrl,
      predictions,
      user_id: (await supabase.auth.getUser()).data.user?.id
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getAnalysisHistory = async (): Promise<AnalysisHistory[]> => {
  const { data, error } = await supabase
    .from('analysis_history')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};