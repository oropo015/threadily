export const IMAGE_SOURCES = [
  {
    name: "Unsplash",
    url: "https://unsplash.com",
    searchUrl: "https://unsplash.com/s/photos/",
    apiUrl: "https://api.unsplash.com/",
    license: "Free to use under the Unsplash License",
    attribution: "Required - 'Photo by [name] on Unsplash'",
  },
  {
    name: "Pexels",
    url: "https://www.pexels.com",
    searchUrl: "https://www.pexels.com/search/",
    apiUrl: "https://api.pexels.com/v1/",
    license: "Free to use",
    attribution: "Not required but appreciated - 'Photo by [name] from Pexels'",
  },
  {
    name: "Pixabay",
    url: "https://pixabay.com",
    searchUrl: "https://pixabay.com/images/search/",
    apiUrl: "https://pixabay.com/api/",
    license: "Free to use under Pixabay License",
    attribution: "Not required but appreciated",
  },
  {
    name: "Reshot",
    url: "https://www.reshot.com",
    searchUrl: "https://www.reshot.com/free-stock-photos/search/",
    apiUrl: "",
    license: "Free to use under Reshot License",
    attribution: "Not required",
  },
  {
    name: "Burst",
    url: "https://burst.shopify.com",
    searchUrl: "https://burst.shopify.com/photos/search?q=",
    apiUrl: "",
    license: "Free to use under Creative Commons Zero (CC0)",
    attribution: "Not required but appreciated",
  },
]

export function getImageSourceByName(name: string) {
  return IMAGE_SOURCES.find((source) => source.name.toLowerCase() === name.toLowerCase())
}
