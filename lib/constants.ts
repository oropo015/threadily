export const PLATFORMS = {
  twitter: {
    name: "X (Twitter)",
    maxChars: 280,
    icon: "twitter",
  },
  threads: {
    name: "Threads",
    maxChars: 500,
    icon: "at-sign",
  },
  reddit: {
    name: "Reddit",
    maxChars: 10000,
    icon: "message-square",
  },
  mastodon: {
    name: "Mastodon",
    maxChars: 500,
    icon: "hash",
  },
  linkedin: {
    name: "LinkedIn",
    maxChars: 3000,
    icon: "linkedin",
  },
  facebook: {
    name: "Facebook",
    maxChars: 63206, // Facebook's actual limit is much higher, but we're setting a reasonable limit
    icon: "facebook",
  },
}

export type PlatformKey = keyof typeof PLATFORMS
