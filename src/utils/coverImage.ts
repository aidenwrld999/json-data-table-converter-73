import axios from 'axios';

export const getCoverUrl = (titleId: string): string => {
  if (!titleId) return "/placeholder.svg";
  return `https://www.itsjokerzz.site/a.php?titleid=${titleId}`;
};

export const fetchCoverImage = async (titleId: string): Promise<string> => {
  if (!titleId) return "/placeholder.svg";
  
  try {
    const url = getCoverUrl(titleId);
    const response = await axios.get(url, {
      responseType: 'text'  // Explicitly request text response
    });
    
    if (response.status === 200 && response.data) {
      // The response.data is already the plain text URL
      return response.data;
    }
  } catch (error) {
    console.log('Failed to fetch image:', error);
  }
  
  return getCoverUrl(titleId); // Return the base URL as fallback
};