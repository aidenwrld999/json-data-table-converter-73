// Function to fetch the HTML content of a URL
const getHtmlContent = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "text/html",
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch URL: ${url}, Status: ${response.status}`);
      return null;
    }

    return await response.text();
  } catch (error) {
    console.error(`Error fetching HTML content from ${url}:`, error);
    return null;
  }
};

// Function to extract the image URL using DOMParser
const getImageUrl = (htmlContent: string): string | null => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const element = doc.querySelector(".game-icon.secondary");

    if (element) {
      const style = element.getAttribute("style");
      if (style) {
        const match = style.match(/url\((['"]?)(.*?)\1\)/);
        if (match && match[2]) {
          return match[2];
        }
      }
    }

    console.warn("No matching element or style attribute found.");
    return null;
  } catch (error) {
    console.error("Error parsing HTML content:", error);
    return null;
  }
};

// Function to get the base URL for a title ID
export const getCoverUrl = (titleId: string): string => {
  if (!titleId) return "/placeholder.svg";
  return `https://orbispatches.com/${titleId}`;
};

// Main function to fetch the cover image
export const fetchCoverImage = async (titleId: string): Promise<string> => {
  if (!titleId) return "/placeholder.svg";
  
  try {
    // First try to get the image directly from the CDN
    const directUrl = `https://cdn.orbispatches.com/titles/${titleId}/icon0.webp`;
    const response = await fetch(directUrl, { method: 'HEAD' });
    if (response.ok) {
      return directUrl;
    }

    // If CDN fails, try scraping the page
    const url = getCoverUrl(titleId);
    const htmlContent = await getHtmlContent(url);
    
    if (htmlContent) {
      const imageUrl = getImageUrl(htmlContent);
      if (imageUrl) {
        return imageUrl;
      }
    }
  } catch (error) {
    console.error('Failed to fetch image:', error);
  }
  
  // If all attempts fail, return the orbispatches URL
  return getCoverUrl(titleId);
};