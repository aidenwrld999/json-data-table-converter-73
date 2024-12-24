export const getCoverUrl = (titleId: string): string => {
  if (!titleId) return "/placeholder.svg";
  return `https://www.itsjokerzz.site/a.php?titleid=${titleId}`;
};

export const fetchCoverImage = async (titleId: string): Promise<string> => {
  if (!titleId) return "/placeholder.svg";
  
  try {
    const response = await fetch(`https://www.itsjokerzz.site/a.php?titleid=${titleId}`, {
      method: 'GET',
      redirect: 'follow',
    });
    
    if (response.ok) {
      return response.url;
    }
  } catch (error) {
    console.error('Error fetching image URL:', error);
  }
  
  return getCoverUrl(titleId);
};