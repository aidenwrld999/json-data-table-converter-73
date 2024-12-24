export const getCoverUrl = (titleId: string): string => {
  if (!titleId) return "/placeholder.svg";
  return `https://www.itsjokerzz.site/a.php?titleid=${titleId}`;
};

export const fetchCoverImage = async (titleId: string): Promise<string> => {
  if (!titleId) return "/placeholder.svg";
  
  try {
    const baseUrl = `https://cdn.orbispatches.com/titles/${titleId}_`;
    const response = await fetch(`https://www.itsjokerzz.site/a.php?titleid=${titleId}`);
    
    if (response.ok) {
      const hash = await response.text();
      const formattedUrl = `${baseUrl}${hash}/icon0.webp`;
      return formattedUrl;
    }
  } catch (error) {
    console.log('Failed to fetch image:', error);
  }
  
  return getCoverUrl(titleId); // Return the base URL as fallback
};