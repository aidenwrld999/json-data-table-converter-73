export const getCoverUrl = (titleId: string): string => {
  if (!titleId) return "/placeholder.svg";
  return `https://orbispatches.com/${titleId}`;
};

export const fetchCoverImage = async (titleId: string): Promise<string> => {
  if (!titleId) return "/placeholder.svg";
  
  try {
    // First try to get the image directly from the CDN
    const directUrl = `https://cdn.orbispatches.com/titles/${titleId}/icon0.webp`;
    const response = await fetch(directUrl, { method: 'HEAD' });
    if (response.ok) {
      return directUrl;
    }

    // If direct CDN fails, try using our PHP scraper
    const scraperUrl = `https://www.itsjokerzz.site/scraper.php?titleid=${titleId}`;
    const scraperResponse = await fetch(scraperUrl);
    
    if (scraperResponse.ok) {
      // The PHP script will either redirect to the image or return a URL
      return scraperResponse.url;
    }
  } catch (error) {
    console.error('Failed to fetch image:', error);
  }
  
  // If all attempts fail, return the orbispatches URL which will at least show the game page
  return getCoverUrl(titleId);
};