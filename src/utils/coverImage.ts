import axios from 'axios';

const IMAGE_FORMATS = ['png', 'bmp', 'jpg', 'jpeg'];

export const getCoverUrl = (titleId: string): string => {
  if (!titleId) return "/placeholder.svg";
  
  // Extract region (e.g., CUSA) and numbers (e.g., 00918)
  const region = titleId.slice(0, 4);
  const numbers = titleId.slice(4);
  
  return `https://serialstation.com/titles/${region}/${numbers}`;
};

export const fetchCoverImage = async (titleId: string): Promise<string> => {
  if (!titleId) return "/placeholder.svg";
  
  try {
    const url = getCoverUrl(titleId);
    const response = await axios.get(url);
    
    if (response.status === 200) {
      return url;
    }
  } catch (error) {
    console.log('Failed to fetch image:', error);
  }
  
  return getCoverUrl(titleId); // Return the URL even if fetch fails
};