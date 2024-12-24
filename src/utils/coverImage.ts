export const getCoverUrl = async (titleId: string): Promise<string> => {
  if (!titleId) return "/placeholder.svg";
  
  try {
    const response = await fetch(`https://orbispatches.com/${titleId}`, {
      mode: 'no-cors',
      headers: {
        'Accept': 'text/html',
      }
    });
    
    // Since no-cors mode returns an opaque response, we'll use the CDN URL directly
    return `https://cdn.orbispatches.com/titles/${titleId}/icon0.webp`;
  } catch (error) {
    console.error('Error with cover URL:', error);
    return `/placeholder.svg`;
  }
};

export const fetchCoverImage = async (titleId: string): Promise<string> => {
  if (!titleId) return "/placeholder.svg";
  
  try {
    // Try fetching from CDN first
    const cdnUrl = `https://cdn.orbispatches.com/titles/${titleId}/icon0.webp`;
    const response = await fetch(cdnUrl, { mode: 'no-cors' });
    
    if (response.type === 'opaque') {
      return cdnUrl;
    }
    
    return `/placeholder.svg`;
  } catch (error) {
    console.error('Error fetching cover:', error);
    return `/placeholder.svg`;
  }
};