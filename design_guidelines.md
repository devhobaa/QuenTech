# QuenTech Website Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern software company websites like Linear, Notion, and Vercel, emphasizing clean aesthetics with creative flair suitable for a tech company targeting Arabic and English markets.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Primary Blue: 220 85% 55% (modern tech blue)
- Primary Purple: 260 75% 65% (creative accent)
- Dark Mode Background: 220 15% 8%
- Light Mode Background: 0 0% 98%

**Supporting Colors:**
- Success Green: 142 76% 47%
- Warning Orange: 25 95% 60%
- Neutral Gray: 220 10% 50%

### Typography
- **Primary Font**: Inter (Google Fonts) - clean, modern sans-serif
- **Arabic Font**: Cairo (Google Fonts) - excellent Arabic readability
- **Headings**: Font weights 600-700, sizes from text-lg to text-4xl
- **Body Text**: Font weight 400-500, text-base to text-lg
- **RTL Support**: Proper text alignment and spacing for Arabic

### Layout System
**Tailwind Spacing Units**: Consistent use of 4, 8, 12, 16, 24 units
- Padding: p-4, p-8, p-12
- Margins: m-4, m-8, m-16
- Gaps: gap-4, gap-8, gap-12
- Heights: h-16, h-24, h-32 for components

### Component Library

**Navigation:**
- Fixed header with language toggle
- Clean logo placement (left for LTR, right for RTL)
- Hamburger menu for mobile with slide-out drawer

**Hero Section:**
- Full viewport height with gradient background (blue to purple)
- Large typography with animated text reveal
- Dual CTAs: "اطلب خدمتك الآن" / "Get Started Now"
- Subtle geometric background patterns

**Service Cards:**
- Clean card design with FontAwesome icons
- Hover effects with gentle lift and shadow
- AOS fade-up animations on scroll
- Consistent 3-column grid on desktop, stacked on mobile

**Forms:**
- Modern input styling with floating labels
- Supabase integration for data submission
- File upload with drag-and-drop styling
- Success/error toast notifications

**Testimonials:**
- Card-based layout with client photos
- Star ratings using FontAwesome
- Slide animation entrance effects

### Gradients and Visual Treatments
**Primary Gradients:**
- Hero background: Blue (220 85% 55%) to Purple (260 75% 65%)
- Button gradients: Subtle blue variations
- Card hover states: Light purple overlay

**Background Treatments:**
- Subtle dot patterns for hero sections
- Clean white/dark cards with soft shadows
- Gradient overlays on testimonial backgrounds

### Animations
**AOS Library Usage:**
- fade-up for service cards
- fade-right for feature descriptions
- zoom-in for testimonials
- slide-left/right for alternating content sections

**Minimal Hover Effects:**
- Button scale (1.02) with shadow increase
- Card lift (translateY(-4px)) with shadow enhancement
- Icon color transitions on service hover

### Images
**Hero Section**: Large background image or video of modern office/technology workspace with gradient overlay
**Services Section**: Clean icon-based approach using FontAwesome, no images needed
**About Us**: Professional team photos in circular frames
**Testimonials**: Client headshots (small circular images)
**General**: Avoid stock photos, focus on clean illustrations or real company imagery

### Bilingual Considerations
- RTL layout support for Arabic with proper text alignment
- Language toggle button in header (flag icons)
- Font switching between Inter (English) and Cairo (Arabic)
- Content length adjustments for Arabic text expansion
- Mirrored layouts for RTL reading patterns

### Responsive Behavior
- Mobile-first approach with progressive enhancement
- Collapsible navigation for mobile
- Stacked service cards on small screens
- Touch-friendly button sizing (minimum 44px)
- Optimized typography scaling across devices

This design system creates a professional, modern software company website that respects both Arabic and English design patterns while maintaining contemporary web aesthetics.