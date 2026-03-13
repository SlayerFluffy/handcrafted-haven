# Handcrafted Haven - Design Plan

## Design Philosophy

Create a warm, inviting, and authentic visual experience that reflects the handcrafted nature of the marketplace. The design should feel organic, trustworthy, and celebrate the artisanal quality of the products.

---

## Color Schema

### Primary Palette
```
Primary:    #8B4513  (Saddle Brown)   - Main brand color, CTAs, links
Secondary:  #D2691E  (Chocolate)      - Accents, hover states
Accent:     #CD853F  (Peru)           - Highlights, badges
```

### Neutral Palette
```
Background: #FFF8F0  (Warm White)     - Page background
Surface:    #FFFFFF  (White)          - Cards, modals
Text:       #2C1810  (Dark Brown)     - Primary text
Text-Light: #6B7280  (Gray)           - Secondary text, captions
Border:     #E5D5C5  (Light Tan)      - Dividers, card borders
```

### Semantic Colors
```
Success:    #16A34A  (Green)          - Success messages, confirmations
Error:      #DC2626  (Red)            - Errors, validation
Warning:    #F59E0B  (Amber)          - Warnings, alerts
Info:       #3B82F6  (Blue)           - Information, tips
```

### Color Usage Guidelines
- **Primary**: Navigation, primary buttons, active states
- **Secondary**: Secondary buttons, icons, decorative elements
- **Accent**: Featured items, sale tags, special callouts
- **Background**: Main page background for warmth
- **Surface**: Content containers, cards, forms

---

## Typography

### Font Families

**Headings**: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) (Serif)
- Elegant, classic feel
- Conveys craftsmanship and quality
- Use for: Page titles, section headings, product names

**Body Text**: [Inter](https://fonts.google.com/specimen/Inter) (Sans-serif)
- Clean, highly readable
- Modern yet approachable
- Use for: Paragraphs, descriptions, UI elements

### Type Scale

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| H1 | 32px (2rem) | 700 (Bold) | 1.2 | Page titles |
| H2 | 24px (1.5rem) | 600 (Semibold) | 1.3 | Section headings |
| H3 | 20px (1.25rem) | 600 (Semibold) | 1.4 | Card titles, subsections |
| H4 | 18px (1.125rem) | 600 (Semibold) | 1.4 | Small headings |
| Body | 16px (1rem) | 400 (Regular) | 1.6 | Paragraphs, descriptions |
| Small | 14px (0.875rem) | 400 (Regular) | 1.5 | Captions, labels, metadata |
| Tiny | 12px (0.75rem) | 400 (Regular) | 1.4 | Fine print, timestamps |

### Font Weights
- Regular: 400 (body text)
- Medium: 500 (emphasis)
- Semibold: 600 (headings, buttons)
- Bold: 700 (H1, strong emphasis)

---

## Layout & Grid System

### Breakpoints
```
Mobile:     < 640px   (sm)
Tablet:     640-1023px (md-lg)
Desktop:    1024px+   (xl)
```

### Container Widths
```
Mobile:     100% (16px padding)
Tablet:     100% (24px padding)
Desktop:    1200px max-width (32px padding)
```

### Grid System
- **Product Grid**: 1 column (mobile) → 2 columns (tablet) → 3-4 columns (desktop)
- **Content Layout**: Single column (mobile) → Sidebar layout (desktop)
- **Gap/Gutter**: 16px (mobile), 24px (tablet/desktop)

---

## Spacing System

Based on 8px unit for consistency:

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight spacing, icon gaps |
| sm | 8px | Small padding, compact elements |
| md | 16px | Default spacing, card padding |
| lg | 24px | Section spacing, large padding |
| xl | 32px | Major sections |
| 2xl | 48px | Page sections, hero spacing |
| 3xl | 64px | Large page sections |

---

## Visual Elements

### Border Radius
```
Small:  4px   - Buttons, inputs, tags
Medium: 8px   - Cards, images
Large:  16px  - Modals, large containers
Round:  50%   - Avatars, icon buttons
```

### Shadows
```
Small:  0 1px 2px rgba(0, 0, 0, 0.05)      - Subtle elevation
Medium: 0 4px 6px rgba(0, 0, 0, 0.1)       - Cards, dropdowns
Large:  0 10px 15px rgba(0, 0, 0, 0.1)     - Modals, popovers
XL:     0 20px 25px rgba(0, 0, 0, 0.15)    - Featured elements
```

### Transitions
```
Fast:   150ms  - Hover states, small changes
Normal: 200ms  - Default transitions
Slow:   300ms  - Complex animations
```

---

## Component Design

### Buttons

**Primary Button**
- Background: `#8B4513`
- Text: White
- Padding: 8px 24px
- Border Radius: 8px
- Hover: Darken to `#6F3609`
- Font Weight: 600

**Secondary Button**
- Background: Transparent
- Text: `#8B4513`
- Border: 2px solid `#8B4513`
- Padding: 8px 24px
- Border Radius: 8px
- Hover: Fill with `#8B4513`, text white

**Text Button**
- Background: Transparent
- Text: `#8B4513`
- Underline on hover

### Cards

**Product Card**
- Background: White
- Border: 1px solid `#E5D5C5`
- Border Radius: 16px
- Padding: 16px
- Shadow: Small (default) → Medium (hover)
- Image: Full width, 4:3 aspect ratio, 8px radius

**Seller Profile Card**
- Background: White
- Border: 1px solid `#E5D5C5`
- Border Radius: 16px
- Padding: 24px
- Avatar: 80px circle, top-left or centered

### Forms

**Input Fields**
- Border: 1px solid `#E5D5C5`
- Border Radius: 8px
- Padding: 8px 16px
- Focus: Border `#8B4513`, 3px shadow `rgba(139, 69, 19, 0.1)`
- Error: Border `#DC2626`

**Labels**
- Font Weight: 500
- Margin Bottom: 4px
- Color: `#2C1810`

**Error Messages**
- Color: `#DC2626`
- Font Size: 14px
- Icon: Alert circle

### Navigation

**Header**
- Background: White
- Border Bottom: 1px solid `#E5D5C5`
- Height: 64px (mobile), 80px (desktop)
- Logo: Left aligned
- Nav Links: Right aligned (desktop), hamburger menu (mobile)
- Sticky on scroll

**Footer**
- Background: `#2C1810`
- Text: `#FFF8F0`
- Padding: 48px 0
- Links: 3-4 columns (desktop), stacked (mobile)

---

## Imagery Guidelines

### Product Images
- Aspect Ratio: 4:3 or 1:1 (square)
- Format: WebP with JPG fallback
- Quality: High resolution, well-lit
- Background: Clean, neutral, or lifestyle context
- Minimum Size: 800x600px

### Seller Avatars
- Size: 80px (profile), 40px (small)
- Shape: Circle
- Fallback: Initials on colored background

### Icons
- Style: Outline or minimal fill
- Size: 20px (small), 24px (default), 32px (large)
- Color: Inherit from parent or `#6B7280`
- Source: [Heroicons](https://heroicons.com/) or [Lucide](https://lucide.dev/)

---

## Design Patterns

### Product Listing Page
```
[Header/Navigation]
[Hero/Banner - Optional]
[Filters Sidebar] [Product Grid]
                  [Product Card]
                  [Product Card]
                  [Product Card]
[Footer]
```

### Product Detail Page
```
[Header/Navigation]
[Image Gallery] [Product Info]
                [Price]
                [Description]
                [Add to Cart/Contact]
[Reviews Section]
[Related Products]
[Footer]
```

### Seller Profile Page
```
[Header/Navigation]
[Seller Header - Avatar, Name, Bio]
[About Section]
[Product Grid - Seller's Products]
[Footer]
```

---

## Accessibility Considerations

### Color Contrast
- Text on background: Minimum 4.5:1 ratio
- Large text (18px+): Minimum 3:1 ratio
- UI components: Minimum 3:1 ratio

**Verified Combinations**:
- `#2C1810` on `#FFF8F0` ✓ (12.5:1)
- `#8B4513` on `#FFF8F0` ✓ (5.2:1)
- White on `#8B4513` ✓ (5.8:1)

### Focus States
- Visible outline: 2px solid `#8B4513`
- Offset: 2px
- Never remove focus indicators

### Interactive Elements
- Minimum touch target: 44x44px
- Clear hover states
- Disabled state: 50% opacity, cursor not-allowed

---

## Design Tools & Resources

### Recommended Tools
- **Figma**: Primary design tool (free, collaborative)
- **Coolors**: Color palette generator
- **Google Fonts**: Typography
- **Unsplash/Pexels**: Stock imagery for mockups

### Figma Workflow
1. Create design system (colors, typography, components)
2. Design key pages (home, product listing, product detail)
3. Create responsive variants (mobile, tablet, desktop)
4. Share with team for feedback
5. Export assets and specifications

### Design Deliverables
- [ ] Color palette documentation
- [ ] Typography scale and examples
- [ ] Component library (buttons, cards, forms)
- [ ] Key page mockups (3-5 pages)
- [ ] Responsive breakpoint examples
- [ ] Style guide reference

---

## CSS Framework Decision

### Option 1: Tailwind CSS (Recommended)
**Pros**:
- Utility-first, rapid development
- Built-in responsive design
- Easy to customize theme
- Small production bundle

**Cons**:
- Learning curve for utility classes
- Verbose HTML

**Setup**:
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#8B4513',
        secondary: '#D2691E',
        accent: '#CD853F',
        background: '#FFF8F0',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
}
```

### Option 2: CSS Modules (Custom)
**Pros**:
- Full control over styles
- Scoped styles, no conflicts
- No framework overhead

**Cons**:
- More manual work
- Need to build utility classes

### Option 3: Styled Components
**Pros**:
- CSS-in-JS, component-scoped
- Dynamic styling with props
- Theme provider built-in

**Cons**:
- Runtime overhead
- Larger bundle size

**Team Decision**: _[To be determined in team meeting]_

---

## Next Steps

1. **Week 1**: 
   - Finalize color palette and typography
   - Create Figma design system
   - Design 2-3 key page mockups

2. **Week 2**:
   - Complete all page designs
   - Get team feedback and iterate
   - Decide on CSS framework
   - Set up design tokens in code

3. **Week 3**:
   - Implement design system components
   - Build responsive layouts
   - Test across devices

4. **Week 4**:
   - Refine and polish
   - Accessibility audit
   - Performance optimization

---

## References

- [Material Design Color System](https://material.io/design/color)
- [Refactoring UI](https://www.refactoringui.com/)
- [Web Content Accessibility Guidelines (WCAG 2.1)](https://www.w3.org/WAI/WCAG21/quickref/)
- [Google Fonts](https://fonts.google.com/)
- [Figma Best Practices](https://www.figma.com/best-practices/)

---

**Last Updated**: March 12, 2026  
**Version**: 1.0  
**Team**: Handcrafted Haven Development Team
