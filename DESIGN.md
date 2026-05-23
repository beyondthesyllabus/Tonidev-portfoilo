---
name: Precision Engineering Portfolio
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434655'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#595e70'
  on-secondary: '#ffffff'
  secondary-container: '#dbdff4'
  on-secondary-container: '#5d6274'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dee1f7'
  secondary-fixed-dim: '#c2c6db'
  on-secondary-fixed: '#161b2b'
  on-secondary-fixed-variant: '#414658'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: -0.02em
  display-xl-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
  body-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  section-padding: 120px
  section-padding-mobile: 64px
  gutter: 24px
  container-max: 1280px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

The design system is rooted in **Minimalism** and **Modern Corporate** aesthetics, specifically tailored for a high-end developer portfolio. The brand personality is authoritative, precise, and devoid of visual noise, signaling a focus on code quality and architectural integrity.

The UI should evoke a sense of clarity and reliability. By utilizing a "content-first" approach, we eliminate distracting trends like particles or heavy gradients in favor of structural perfection, intentional whitespace, and high-contrast legibility. The emotional response is one of professional trust and technical sophistication.

## Colors

This design system utilizes a high-contrast, professional palette designed for maximum readability and visual focus.

- **Primary (Electric Blue):** Reserved for primary actions, active states, and critical links. It provides the "spark" within an otherwise sober environment.
- **Secondary (Deep Navy):** Used for all primary headings and body text to ensure a grounded, authoritative feel.
- **Backgrounds:** Pure white is the standard canvas. Light gray (#F8FAFC) is used exclusively to define large content sections, creating a clear visual rhythm without the need for heavy dividers.
- **Borders:** Two tiers of gray are used to define structural boundaries and component enclosures, maintaining a clean, technical appearance.

## Typography

The system relies exclusively on **Inter** to maintain a systematic, utilitarian aesthetic. 

- **Weight Strategy:** Headings utilize a Bold (700) weight with tight letter-spacing to create a strong visual "anchor" for sections. Body text uses Regular (400) for optimal long-form legibility.
- **Scaling:** For mobile devices, large display and headline sizes scale down significantly to prevent awkward line breaks while maintaining the same bold weight.
- **Hierarchy:** Labels and captions use semi-bold or bold weights at smaller sizes to ensure metadata remains clear and organized.

## Layout & Spacing

This design system uses a **Fixed Grid** model for desktop and a fluid model for mobile devices.

- **Vertical Rhythm:** Large-scale sections are separated by a strict 120px padding to create a "breathable" and premium experience. This scales down to 64px on mobile devices.
- **Grid:** A 12-column grid is used for desktop layouts, with 24px gutters. Content is centered within a 1280px max-width container.
- **Internal Spacing:** Components use an 8px base grid for internal padding and margins to maintain consistent alignment across the interface.

## Elevation & Depth

To maintain the professional and clean aesthetic, depth is handled with extreme restraint.

- **Low-Contrast Outlines:** Most components (cards, inputs) use the `#E2E8F0` border as their primary means of definition.
- **Ambient Shadows:** Only used on active states or cards to provide a subtle "lift." Shadows should be highly diffused: `0 4px 20px rgba(10, 15, 30, 0.05)`.
- **Tonal Layering:** Depth is primarily achieved through color switching between `#FFFFFF` (Surface) and `#F8FAFC` (Container).

## Shapes

The design system uses a **Pill-shaped** (3) approach for interactive elements and metadata tags to soften the professional tone and make the UI feel approachable.

- **Buttons & Tags:** Use `rounded-full` (9999px) for a complete pill shape.
- **Cards & Containers:** Use `rounded-xl` (1.5rem) to provide a soft frame for technical content.
- **Inputs:** Follow the `rounded-lg` (1rem) standard for a modern, refined feel.

## Components

### Buttons
- **Primary:** `rounded-full`, Background: `#2563EB`, Text: `#FFFFFF`. Hover: `scale: 1.02`, `transition: 200ms ease`.
- **Secondary:** `rounded-full`, Border: `#CBD5E1`, Text: `#0A0F1E`. Hover: Background: `#F8FAFC`.

### Pill Tags
- Used for technology stacks and categories.
- **Style:** Background: `rgba(37, 99, 235, 0.1)`, Text: `#0A0F1E`, `font-weight: 600`.

### Cards
- **Style:** Background: `#FFFFFF`, Border: `1px solid #E2E8F0`, Radius: `1.5rem`.
- **Interaction:** On hover, apply a subtle shadow and scale to `1.02`.

### Links
- **Style:** Deep navy text. 
- **Interaction:** Hover effect triggers a `2px` electric blue underline with a `200ms` ease-in-out transition.

### Input Fields
- **Style:** Border: `1px solid #E2E8F0`, Background: `#FFFFFF`, Radius: `1rem`, Padding: `12px 16px`. Focus state: Border: `#2563EB`.