export const colors = {
  nearBlack: "#1A1A24",
  nearBlack90: "#32323B",
  nearBlack10: "#DADAE7",
  teal: "#006D77",
  gold: "#E2B44F",
  white: "#FFFFFF",
  lightGrey: "#F0F0F0",
  mediumGrey: "#A0A0A0",
  darkGrey: "#505050",
} as const;

export const WHATSAPP_NUMBER = "8801941646278";

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_DEFAULT = whatsappLink("I want to learn about BLA compliance for my factory.");
export const WHATSAPP_BOOK = whatsappLink("I want to discuss BLA compliance for my factory.");
