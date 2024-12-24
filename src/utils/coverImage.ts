import axios from 'axios';

export const getCoverUrl = (titleId: string): string => {
  if (!titleId) return "/placeholder.svg";
  return `https://orbispatches.com/title/${titleId}`;
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
        let imageUrl = imgMatch[1];
        // Make relative URLs absolute
        if (!imageUrl.startsWith("http")) {
          imageUrl = `https://orbispatches.com${imageUrl}`;
        }
        return imageUrl;
      }
    }
  } catch (error) {
    console.log('Failed to fetch image:', error);
  }
  
  return getCoverUrl(titleId); // Return the base URL as fallback
};