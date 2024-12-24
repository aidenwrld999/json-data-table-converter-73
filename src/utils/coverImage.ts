import axios from 'axios';

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
      // Parse the HTML content to find the img-fluid class
      const htmlContent = response.data;
      const imgMatch = htmlContent.match(/<img[^>]*class="img-fluid"[^>]*src="([^"]*)"[^>]*>/);
      
      if (imgMatch && imgMatch[1]) {
        return imgMatch[1]; // Return the actual image URL
      }
    }
  } catch (error) {
    console.log('Failed to fetch image:', error);
  }
  
  return getCoverUrl(titleId); // Return the base URL as fallback
};