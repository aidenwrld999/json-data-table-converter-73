import axios from 'axios';

const IMAGE_FORMATS = ['png', 'bmp', 'jpg', 'jpeg'];

export const getCoverUrl = (titleId: string, format: string = 'png'): string => {
  if (!titleId) return "/placeholder.svg";
  const normalizedId = titleId.toUpperCase();
  return `https://gs2.ww.prod.dl.playstation.net/gs2/ppkgo/prod/${normalizedId}/1/icon0.${format}`;
};

export const fetchCoverImage = async (titleId: string): Promise<string> => {
  if (!titleId) return "/placeholder.svg";
  
  // Try each image format until one works
  for (const format of IMAGE_FORMATS) {
    try {
      const url = getCoverUrl(titleId, format);
      const response = await axios.get(url, {
        headers: {
          "User-Agent": "PlayStation/5.0",
          "Referer": "https://www.playstation.com/"
        }
      });
      
      if (response.status === 200) {
        return url;
      }
    } catch (error) {
      console.log(`Failed to fetch ${format} format, trying next...`);
    }
  }
  
  return "/placeholder.svg";
};