declare const tmImage: any;

const URL = "https://teachablemachine.withgoogle.com/models/nnIutkP_g/";
let model: any;

export const loadModel = async () => {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  model = await tmImage.load(modelURL, metadataURL);
  return model;
};

export const predict = async (element: HTMLImageElement | HTMLCanvasElement) => {
  if (!model) throw new Error('Model not loaded');
  const predictions = await model.predict(element);
  return predictions.map((pred: any) => ({
    className: pred.className,
    probability: pred.probability
  }));
};