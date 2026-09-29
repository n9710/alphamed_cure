---
name: Alphamed Cure
description: Sales · Service · Support · Healthcare Solutions
colors:
  primary: "#0052CC"
  primary-hover: "#0043A8"
  navy: "#041E42"
  navy-subtle: "#0A2540"
  accent-sky: "#0284C7"
  verified-green: "#16A34A"
  verified-green-dark: "#15803D"
  verified-green-bg: "#ECFDF5"
  neutral-bg: "#FAFCFE"
  surface: "#FAFCFF"
  surface-card: "#FFFFFF"
  border: "#E2E8F0"
  text-primary: "#091E3A"
  text-muted: "#64748B"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface-card}"
    rounded: "{rounded.lg}"
    padding: "10px 16px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.navy}"
    rounded: "{rounded.lg}"
    padding: "10px 12px"
  card-product:
    backgroundColor: "{colors.surface-card}"
    rounded: "{rounded.xl}"
    padding: "20px 24px"
  input-field:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "10px 14px"
---

# Design System: Alphamed Cure

## Overview

**Creative North Star: "The Regulated Terminal"**

Alphamed Cure’s design system embodies institutional authority, clinical precision, and transactional confidence. Built specifically for wholesale pharmaceutical distributors and hospital procurement executives operating in highly regulated supply chains, every screen communicates reliability, structural integrity, and verified data integrity.

The visual atmosphere balances modern corporate healthcare clarity with disciplined restraint. Soft off-white canvas tones (`#FAFCFE`) eliminate clinical eye fatigue, deep regulatory navy anchors (`#041E42`) establish institutional permanence in headers and footers, and clinical cobalt (`#0052CC`) provides sharp, purposeful focus for verified interactive actions. Superficial consumer decorations, ambient AI blur-orbs, glowing halos, and raw emoji icons are deliberately prohibited in favor of crisp 1px borders, clear typography, and unambiguous data structures.

**Key Characteristics:**
- **Institutional Authority:** Anchored by deep regulatory navy and structured 1px slate framing.
- **Refined Restraint:** Zero-glow policy; surfaces are flat at rest, with elevation occurring only during deliberate user interaction.
- **Transactional Precision:** Monospaced formatting for SKUs and pricing units, high-contrast compliance badges, and clear procurement pathways.
- **Accessible & Sober:** Built to WCAG 2.1 AA standards with robust focus rings and distinct state micro-interactions.

## Colors

The palette pairs high-contrast regulatory navy structural framing with sharp clinical cobalt action accents and pharmacopeia emerald verification states over a clean, glare-free canvas.

### Primary
- **Clinical Cobalt** (#0052CC): Reserved strictly for primary call-to-action buttons (Submit Inquiry, Request Consultation, Sign In) and active navigation highlights.
- **Clinical Cobalt Hover** (#0043A8): Immediate 150ms darkening state on interactive hover.

### Secondary
- **Regulatory Deep Navy** (#041E42): Structural anchors including top brand strips, navigation framing, and footer containers.
- **Deep Navy Subtle** (#0A2540): Secondary dark backgrounds, borders, and footer sub-dividers.

### Tertiary
- **Precision Sky Blue** (#0284C7): Interactive focus rings, secondary iconography, and subtle contextual highlights.
- **Pharmacopeia Emerald** (#16A34A): Verified facility indicators, GMP compliance badges, and successful submission alerts.
- **Emerald Dark** (#15803D): Text color for high-contrast verified badges against light green backgrounds.
- **Emerald Light Tint** (#ECFDF5): Background fill for compliance and verification chips.

### Neutral
- **Sterile Slate Canvas** (#FAFCFE): Global background body tone, providing a calm, non-glare reading environment.
- **Clinical White** (#FFFFFF): Foreground card surfaces, input backgrounds, modal sheets, and active tabs.
- **Structural Border Slate** (#E2E8F0): 1px boundary lines for cards, inputs, table cells, and navigation dividers.
- **Deep Slate Text** (#091E3A): Primary typography, headings, labels, and high-legibility tabular specifications.
- **Muted Steel** (#64748B): Subtitles, helper text, inactive navigation links, and micro-metadata.

### Named Rules
**The Action Rarity Rule.** Clinical Cobalt (#0052CC) is reserved strictly for primary interactive CTAs and active navigation cues. It is never used as large decorative floods or background wallpaper.
**The Zero-Glow Rule.** Surfaces derive depth from crisp 1px borders (#E2E8F0) and background tonal contrast (#FAFCFE vs #FFFFFF). AI blur-orbs, glowing box-shadow halos, and neon gradients are strictly forbidden.

## Typography

**Display Font:** Plus Jakarta Sans (with system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)
**Body Font:** Plus Jakarta Sans (with system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)
**Label/Mono Font:** ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace

**Character:** Technical, clean, highly legible grotesque sans-serif with geometric precision. Delivers clinical authority and modern B2B transactional confidence without sterile severity.

### Hierarchy
- **Display** (800 / Extrabold, clamp(2rem, 5vw, 3.25rem), 1.15 line-height, -0.02em tracking): Hero section primary headline; anchors initial brand value proposition.
- **Headline** (700 / Bold, clamp(1.5rem, 3.5vw, 2.25rem), 1.25 line-height, -0.015em tracking): Major section titles, category headings, and primary portal banners.
- **Title** (700 / Bold, 1.125rem (18px), 1.35 line-height, -0.01em tracking): Product names, card titles, drawer headings, and table headers.
- **Body** (400 / Regular & 500 / Medium, 0.875rem (14px), 1.6 line-height): Product descriptions, service details, legal and compliance documentation. Max line length: 65–75ch.
- **Label** (700 / Bold, 0.6875rem (11px), 1.4 line-height, 0.05em tracking, uppercase): Category badges, SKU numbers (in monospace), verification tags, and micro-metadata.

### Named Rules
**The Legibility-First Rule.** In medical distribution, legibility is safety. Body and tabular specifications must never drop below 13px, with high contrast (#091E3A on #FFFFFF or #FAFCFE) exceeding WCAG 2.1 AA standards.

## Layout

Alphamed Cure uses a 12-column responsive grid centered within a maximum width of 1280px (max-w-7xl). The horizontal rhythm uses 16px (px-4) gutters on mobile, stepping up to 24px (px-6) on tablet and 32px (px-8) on desktop.
Spacing follows an 8pt baseline rhythm (8px, 16px, 24px, 32px, 48px, 64px, 96px). Section containers maintain 64px to 96px vertical padding (py-16 to py-24) to ensure generous breathing room that projects institutional stability.
Catalog views transition from a single column on mobile (<640px) to a 2-column grid on tablet (≥640px) and a dense 3-to-4 column grid on desktop (≥1024px) for rapid SKU scanning.

## Elevation & Depth

Alphamed Cure is an institutional, border-defined system. Surfaces are flat at rest, relying on 1px slate borders (#E2E8F0) and background tonal transitions (#FAFCFE canvas to #FFFFFF cards) rather than heavy drop shadows. Shadows are reserved strictly as an active response to user hover or modal layering.

### Shadow Vocabulary
- **Resting Surface** (`none` or `box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03)`): Default state for product cards, tables, and form containers. Hairline 1px border (#E2E8F0) provides structural containment.
- **Interactive Card Hover** (`box-shadow: 0 20px 35px -8px rgba(4, 30, 66, 0.08), 0 10px 18px -4px rgba(4, 30, 66, 0.04)`): Elevates cards 4px on hover (`translateY(-4px)`), signaling interactivity while border transitions to subtle sky (#BAE6FD).
- **Navigation & Sticky Headers** (`box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05)`): Subtle anchoring shadow separating sticky navigation from scrolling content.
- **Dialog & Modal Elevation** (`box-shadow: 0 25px 50px -12px rgba(4, 30, 66, 0.25)`): Grounded backdrop blur (16px) with deep structural navy shadow for portals, inquiry modals, and dropdown overlays.

### Named Rules
**The Rest-Is-Flat Rule.** All cards, containers, and data tables are flat at rest. Depth is an event—it occurs only in direct response to user cursor elevation or modal invocation.

## Shapes

The form language is structured, disciplined, and slightly softened to balance clinical rigor with modern software usability:
- **Card Containers & Modals:** 16px radius (`rounded-2xl`). Provides approachable containment without feeling playful.
- **Buttons & Form Inputs:** 12px radius (`rounded-xl`). Precise, modern touch targets that match input borders.
- **Pills & Status Badges:** Fully rounded (`rounded-full`). Used exclusively for micro-metadata: verification chips, category tags, and SKU copy triggers.
- **Borders:** Consistent 1px solid stroke in slate (`#E2E8F0` or `rgba(226, 232, 240, 0.85)`). High contrast against both `#FFFFFF` card surfaces and `#FAFCFE` canvas.

## Components

Buttons, inputs, cards, and navigation feel refined, restrained, and responsive, with crisp click response and micro-transitions.

### Buttons
- **Shape:** Rounded rectangle with 12px corner radius (`rounded-xl`).
- **Primary:** Background in Clinical Cobalt (`#0052CC`), white text, bold font (weight 700), internal padding `10px 16px` (py-2.5 px-4). Transition duration 150ms.
- **Hover / Focus:** Hover darkens to `#0043A8` with subtle lift; active press scales gently to `0.97`. Focus ring displays 2px solid `#0052CC` with 2px offset.
- **Secondary / Specs:** White background with 1px slate border (`#E2E8F0`), deep navy text (`#041E42`). Hover transitions to `#F8FAFC` and border `#CBD5E1`.
- **Tertiary / Portal:** Subtle slate tint (`#F1F5F9`), dark text, no border.

### Chips
- **Style:** Compact pill badge (`rounded-full`), padding `4px 12px` (py-1 px-3), 11px uppercase bold typography.
- **Verified / GMP:** Pale emerald tint (`#ECFDF5`), dark emerald text (`#15803D`), 1px emerald border (`#A7F3D0`).
- **Category Filter:** White/translucent background, slate text (`#334155`), 1px slate border (`#E2E8F0`). Selected state adopts `#0052CC` with white text.

### Cards / Containers
- **Corner Style:** 16px radius (`rounded-2xl`).
- **Background:** Crisp pure white (`#FFFFFF`).
- **Shadow Strategy:** Flat at rest (`shadow-2xs`), lifting on hover (`translateY(-4px)` with deep navy diffuse shadow).
- **Border:** 1px solid slate (`#E2E8F0` / `rgba(226, 232, 240, 0.9)`), brightening to sky (`#BAE6FD`) on card hover.
- **Internal Padding:** 20px to 24px (p-5 to p-6).

### Inputs / Fields
- **Style:** 12px radius (`rounded-xl`), 1px solid slate border (`#E2E8F0`), light background (`#F8FAFC`), 14px typography.
- **Focus:** Sharp border shift to `#0284C7` (Sky Blue) with soft glow ring (`rgba(2, 132, 199, 0.15)`), background shifts to `#FFFFFF`.
- **Error / Disabled:** Error introduces 1px crimson border (`#EF4444`) with pale red alert container (`#FEF2F2`). Disabled states use `#F1F5F9` background and 50% opacity.

### Navigation
- **Top Brand Strip:** 28px height, deep navy background (`#041E42`), slate-300 typography (11px), contact touchpoints.
- **Main Bar:** Sticky 72px height (`h-18`), white semi-transparent background with 16px backdrop blur (`rgba(255, 255, 255, 0.95)`), 1px bottom border (`#E2E8F0`).
- **Navigation Links:** 14px semi-bold slate (`#334155`), 8px/12px padding. Active state uses `#0052CC` with pale blue tint (`#EFF6FF`).

### Product Visual Showcase (Signature Component)
- **Clinical Vector Emblem:** Upper card showcase area with 192px height (`h-48`), subtle vertical gradient (`#F8FAFC` to `#EFF6FF`), containing a central 80x80px white emblem container with category-specific Lucide icon in Clinical Cobalt (`#0052CC`). Floats SKU copy badge and category pill.

## Do's and Don'ts

### Do:
- **Do** anchor all structural boundaries (headers, top strips, footers) with Regulatory Deep Navy (`#041E42`).
- **Do** reserve Clinical Cobalt (`#0052CC`) strictly for primary interactive actions and active navigation items.
- **Do** use 1px solid slate borders (`#E2E8F0`) for all card containment and surface delimitation.
- **Do** display SKUs and pricing in clean monospaced font for instant, unambiguous tabular scanning.
- **Do** verify contrast ratios meet WCAG 2.1 AA (4.5:1 for body copy, 3:1 for large headlines and badges).

### Don't:
- **Don't** add ambient blur-orbs, blur-3xl glow patches, pulsing ping animations, or neon gradients.
- **Don't** use raw emoji characters (e.g. 📦, 📋, 🔒) for user interface iconography; always use Lucide SVG icons.
- **Don't** use Clinical Cobalt (`#0052CC`) as a background fill for cards, page sections, or decorative banners.
- **Don't** invent fake claims, unverified pricing, fictional certifications, or decorative testimonial avatars.
- **Don't** use full-width solid black backgrounds; use deep navy (`#041E42` or `#0A2540`) for dark surfaces.
