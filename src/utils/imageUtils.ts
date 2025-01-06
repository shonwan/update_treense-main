export const uploadImage = async (input: string | File): Promise<string> => {
  // For now, we'll just return a data URL or object URL
  // In a production environment, this would upload to a storage service
  if (typeof input === 'string') {
    return input;
  }
  return URL.createObjectURL(input);
};