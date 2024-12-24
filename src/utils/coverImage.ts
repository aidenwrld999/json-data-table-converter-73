import axios from 'axios';

export const getCoverUrl = (titleId: string): string => {
  if (!titleId) return "/placeholder.svg";
  const normalizedId = titleId.toUpperCase();
  return `https://gs2.ww.prod.dl.playstation.net/gs2/ppkgo/prod/${normalizedId}/1/icon0.png`;
};

export const fetchCoverImage = async (titleId: string): Promise<string> => {
  try {
    const response = await axios.get(getCoverUrl(titleId), {
      headers: {
        "User-Agent": "PlayStation/5.0",
        "Referer": "https://www.playstation.com/"
      }
    });
    
    // If we get here, the image exists
    return getCoverUrl(titleId);
  } catch (error) {
    console.error('Error fetching cover:', error);
    return "/placeholder.svg";
  }
};