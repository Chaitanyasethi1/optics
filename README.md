# DemoOptics — Luxury Optical Showroom Website

> **DemoOptics** is an ultra-clean, boutique optical showroom website built with **Next.js (App Router)** and **Tailwind CSS**.
> 
> **Important**: This is **NOT an ecommerce site**. There is no cart, checkout, payment, login, or currency switcher. Instead, every product features an **"Enquire on WhatsApp"** button (pre-filled with the product details) and a **"Book Free Eye Test"** button to drive showroom visits and lead generation.

---

## ✦ Key Features

- **Design System**: Maison Luxury Palette: Ivory (`#F7F3EC`), Sand (`#EDE5D8`), Ink (`#14110F`), Graphite (`#2A2623`), Champagne Accent (`#B89B6A`), and Muted (`#7A7168`).
- **Typography**: Cormorant Garamond / Playfair Display serif headings paired with Inter sans-serif body typography.
- **Virtual Try-On Studio (`/try-on`)**: Real-time browser-based webcam face tracking powered by MediaPipe Face Landmarker (WASM). Computes eye centers, interpupillary distance, head roll angle, yaw/pitch, and nose bridge position with Lerp smoothing. Includes live lens tint switcher, manual fit sliders, snapshot capture with watermark, and still photo upload fallback.
- **Local Catalogue File**: Over 40 curated optical products stored in `src/data/products.ts` across Sunglasses, Eyeglasses, Precision Lenses, and Contact Lenses.
- **Top Announcement Bar**: Highlights complimentary 14-step precision eye tests and showroom hours.
- **Header**: Transparent over hero, backdrop-blur ivory on scroll, centered maison logo, Virtual Try-On link with "NEW" tag, and mobile drawer.
- **Home Page Sections (in strict order, 1440px desktop frames with scroll snap & progress indicator)**:
  1. **Hero**: 4-slide full-width banner slider with Ken Burns zoom, clamp typography, and Virtual Try-On CTA.
  2. **Brand Strip**: Official maison partner strip (Ray-Ban, Gucci, Tommy Hilfiger, Calvin Klein, Carrera, Oakley, Burberry, Police, Scott, Mont Blanc).
  3. **Shop by Category**: Tall visual cards (4:5 portrait) with gold corner brackets for Sunglasses, Eyeglasses, Lenses, and Contact Lenses.
  4. **Premium Collection: Titanium Frames**: Row of 4 Japanese and Austrian featherweight titanium frames + "View All" + "Try On".
  5. **Polarized Sunglasses**: Curated trio for *Gentlemen*, *Ladies*, and *Juniors*.
  6. **Special Offers: Up to 40% Off**: Privilege savings cards with dark ink & champagne discount badges.
  7. **Luxury Maisons Showcase**: Dark contrast maison frame for Gucci, Maui Jim, Silhouette, and Mont Blanc.
  8. **Precision Lenses**: Zeiss, Essilor, and Hoya single-vision and progressive multifocal breakdowns with "starting from" prices.
  9. **Contact Lenses**: Brand feature cards for Alcon, Bausch & Lomb, CooperVision, and Johnson & Johnson.
  10. **Why DemoOptics**: 5 foundational trust pillars on warm ivory/sand background.
  11. **Customer Reviews**: Testimonial slider with 5-star ratings, verified patron badges, and review previews.
  12. **Instagram Feed**: 6 curated aesthetic images with hover captions and "Follow Us" link.
  13. **Visit Our Store**: Flagship showroom address, timings, amenities, interactive map embed, and "Get Directions".
  14. **Footer**: Dark ink background, hairline borders, quick links, category sitemap, policies, and contact details.
- **Collection Pages**: Real-time left filter sidebar (Brand, Gender, Shape, Material, Price, Polarized, Titanium) + Sort dropdown.
- **Product Detail Page**: Interactive image gallery with zoom, full technical specifications, craftsmanship notes, "Experience Virtual Try-On" button, and WhatsApp enquiry button.
- **Sticky Actions**:
  - Floating WhatsApp concierge button on every page.
  - Sticky mobile bottom bar: **Call Store | WhatsApp | Book Eye Test**.

---

## ✦ Getting Started Locally

### Prerequisites
- Node.js 18.17+ or Node.js 20+ installed.

### Installation & Run

1. Clone or navigate into the project directory:
   ```bash
   cd demooptics
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

5. Build for production:
   ```bash
   npm run build
   npm run start
   ```

---

## ✦ Deploying to Vercel

### Method 1: Deploy with Vercel CLI (Fastest)

1. Install the Vercel CLI globally if you haven't already:
   ```bash
   npm install -g vercel
   ```

2. Run the deployment command from the project root:
   ```bash
   vercel
   ```

3. Follow the CLI prompts:
   - *Set up and deploy?* **`y`**
   - *Which scope?* Select your personal account or team.
   - *Link to existing project?* **`n`**
   - *What's your project's name?* **`demooptics`**
   - *In which directory is your code located?* **`./`**
   - *Want to modify settings?* **`n`** (Next.js is automatically detected)

4. Deploy directly to production:
   ```bash
   vercel --prod
   ```

---

### Method 2: Deploy via GitHub & Vercel Dashboard

1. Push your local repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/demooptics.git
   git branch -M main
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** → **"Project"**.
4. Import your **`demooptics`** GitHub repository.
5. In the configuration screen:
   - **Framework Preset**: Next.js (automatically detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. Click **Deploy**. Vercel will build and assign you a production URL (e.g. `https://demooptics.vercel.app`).

---

## ✦ Store Configuration

All store contact details and WhatsApp numbers are centrally managed in `src/data/config.ts`:

```typescript
export const STORE_NAME = "DemoOptics";
export const PHONE = "+91 98765 43210";
export const WHATSAPP_NUMBER = "919876543210";
export const ADDRESS = "Shop 12-14, Heritage Boulevard, Indiranagar 100ft Road, Bengaluru, Karnataka 560038";
export const EMAIL = "concierge@demooptics.com";
export const TIMINGS = "Mon - Sun: 10:00 AM – 9:00 PM";
```

Edit this file to update the showroom address, telephone, or WhatsApp recipient across the entire website instantly.

---

## ✦ How to Add New Try-On Frames

Frames for the Virtual Try-On Studio are registered in `src/data/tryon.ts`.

To add a new frame:
1. Open `src/data/tryon.ts`.
2. Add a new object to the `TRYON_FRAMES` array:
   ```typescript
   {
     id: "tryon-my-new-frame",
     slug: "my-frame-slug", // Matches the product slug in src/data/products.ts
     name: "Gold Aviator Luxe",
     brand: "Ray-Ban",
     price: 14500,
     category: "sunglasses", // "sunglasses" | "eyeglasses"
     gender: "Unisex",
     shape: "Aviator",
     frameWidthMm: 138,
     bridgeMm: 14,
     lensWidthMm: 58,
     lensHeightMm: 50,
     image: "/images/your-product-image.jpg",
     frameColor: "#B89B6A", // Hex color of the frame rims
     accentColor: "#EADFD2",
     defaultTint: "g15", // "g15" | "black" | "brown" | "blue" | "gradient" | "clear"
     svgTemplate: "aviator", // "aviator" | "wayfarer" | "round" | "cateye" | "geometric" | "rimless" | "rectangle"
     suitableFaceShapes: ["Oval", "Square", "Heart"],
   }
   ```
3. The new frame automatically appears in the `/try-on` carousel and can be deep-linked using `/try-on?product=my-frame-slug`.
