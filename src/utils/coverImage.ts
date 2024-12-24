export const getCoverUrl = async (titleId: string): Promise<string> => {
  if (!titleId) return "/placeholder.svg";
  
  try {
    // Directly construct the CDN URL instead of fetching from orbispatches.com
    return `https://cdn.orbispatches.com/titles/${titleId}/icon0.webp`;
  } catch (error) {
    console.error('Error with cover URL:', error);
    return `/placeholder.svg`;
  }
};

export const fetchCoverImage = async (titleId: string): Promise<string> => {
  if (!titleId) return "/placeholder.svg";
  
  try {
    const imageUrl = await getCoverUrl(titleId);
    return imageUrl;
  } catch (error) {
    console.error('Error fetching cover:', error);
    return `/placeholder.svg`;
  }
};