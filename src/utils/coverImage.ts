export const getCoverUrl = async (titleId: string): Promise<string> => {
  if (!titleId) return "/placeholder.svg";
  
  try {
    const response = await fetch(`https://orbispatches.com/${titleId}`);
    if (!response.ok) {
      console.error('Failed to fetch page:', response.status);
      return `/placeholder.svg`;
    }
    
    const html = await response.text();
    
    // Extract image URL using regex
    const styleRegex = /game-icon secondary.*?url\((.*?)\)/s;
    const match = html.match(styleRegex);
    
    if (match && match[1]) {
      return match[1];
    }
    
    return `https://cdn.orbispatches.com/titles/${titleId}/icon0.webp`;
  } catch (error) {
    console.error('Failed to fetch image:', error);
    return `/placeholder.svg`;
  }
};

export const fetchCoverImage = async (titleId: string): Promise<string> => {
  if (!titleId) return "/placeholder.svg";
  
  try {
    const imageUrl = await getCoverUrl(titleId);
    return imageUrl;
  } catch (error) {
    console.error('Failed to fetch image:', error);
    return `/placeholder.svg`;
  }
};