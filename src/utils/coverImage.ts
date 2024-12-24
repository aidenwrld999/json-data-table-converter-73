export const getCoverUrl = (titleId: string): string => {
  if (!titleId) return "/placeholder.svg";
  return `https://www.itsjokerzz.site/a.php?titleid=${titleId}`;
};

export const fetchCoverImage = async (titleId: string): Promise<string> => {
  if (!titleId) return "/placeholder.svg";
  
  try {
    const url = getCoverUrl(titleId);
    const response = await fetch(url);
    
    if (response.ok) {
      const text = await response.text();
      return text;
    }
  } catch (error) {
    console.log('Failed to fetch image:', error);
  }
  
  return getCoverUrl(titleId); // Return the base URL as fallback
};