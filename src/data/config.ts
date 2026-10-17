export const STORE_NAME = "DemoOptics";
export const TAGLINE = "Haute Eyewear & Bespoke Optometry";
export const PHONE = "+91 98765 43210";
export const PHONE_RAW = "+919876543210";
export const WHATSAPP_NUMBER = "919876543210";
export const ADDRESS = "Shop 12-14, Heritage Boulevard, Indiranagar 100ft Road, Bengaluru, Karnataka 560038";
export const EMAIL = "concierge@demooptics.com";
export const TIMINGS = "Mon - Sun: 10:00 AM – 9:00 PM";
export const GOOGLE_MAPS_URL = "https://maps.google.com/?q=Indiranagar+100ft+Road+Bengaluru";

export const getWhatsAppLink = (message: string = `Hello ${STORE_NAME}, I would like to connect with your optical concierge.`) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const getProductEnquiryLink = (productName: string, brand: string, price: number) => {
  const message = `Hello ${STORE_NAME}, I am interested in inquiring about the "${brand} ${productName}" (₹${price.toLocaleString("en-IN")}) I saw on your showroom catalogue. Is this model available for trial at your Indiranagar store?`;
  return getWhatsAppLink(message);
};

export const getEyeTestWhatsAppLink = (details?: { name?: string; date?: string; slot?: string; phone?: string }) => {
  if (!details || !details.name) {
    return getWhatsAppLink(`Hello ${STORE_NAME}, I would like to book a complimentary 14-step precision eye examination at your showroom.`);
  }
  const message = `Hello ${STORE_NAME}, I would like to confirm my Free Eye Test appointment:\n• Name: ${details.name}\n• Phone: ${details.phone || "Provided on booking"}\n• Preferred Date: ${details.date || "Next available"}\n• Time Slot: ${details.slot || "Anytime"}\n\nPlease let me know your confirmation.`;
  return getWhatsAppLink(message);
};
