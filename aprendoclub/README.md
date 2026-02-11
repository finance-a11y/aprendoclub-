# aprendoclub

Landing page para el club de aprendizaje de SEO.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
  layout.tsx      # Root layout with fonts and analytics
  page.tsx        # Main landing page
  globals.css     # Global styles and CSS variables
components/
  navbar.tsx
  hero-section.tsx
  problema-section.tsx
  beneficios-section.tsx
  pricing-section.tsx
  testimonios-section.tsx
  instructor-section.tsx
  faq-section.tsx
  cta-section.tsx
  footer.tsx
  sticky-cta-mobile.tsx
  google-analytics.tsx
  meta-pixel.tsx
public/
  # Images and static assets
```
