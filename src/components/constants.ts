// Chat UI constants for consistent sizing and styling
export const CHAT_WIDTH = 393; // from Figma iPhone width
export const CHAT_HEIGHT = 700; // can be adjusted for desktop/mobile

export const langCodes = ['en', 'es', 'fr', 'de', 'it'] as const;

export type LangCode = (typeof langCodes)[number];
