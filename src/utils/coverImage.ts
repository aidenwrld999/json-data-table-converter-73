export const getCoverUrl = (titleId: string): string => {
  if (!titleId) return "/placeholder.svg";
  return `https://www.itsjokerzz.site/a.php?titleid=${titleId}`;
};

export const fetchCoverImage = async (titleId: string): Promise<string> => {
  if (!titleId) return "/placeholder.svg";
  
  try {
    const response = await fetch(`https://www.itsjokerzz.site/a.php?titleid=${titleId}`);
    
    if (response.ok) {
      const hash = await response.text();
      return `https://cdn.orbispatches.com/titles/${titleId}_${hash}/icon0.webp`;
    }
  } catch (error) {
    console.log('Failed to fetch image:', error);
  }
  
  return `https://cdn.orbispatches.com/titles/${titleId}/icon0.webp`;
};