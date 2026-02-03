
# Implementation Plan

## Overview

This plan addresses four areas: database security verification, EmailJS environment configuration, portfolio content updates, and enhanced hover animations.

---

## 1. Database Security (RLS Verification)

**Current Status**: No action needed

The database currently has no tables in the public schema. Since this is a static portfolio site, there is no user data to protect. The database linter confirms no security issues.

**Recommendation**: When you add database tables in the future (e.g., for storing contact form submissions), RLS policies will need to be created at that time.

---

## 2. EmailJS Environment Configuration

**Current Status**: Working with fallbacks

The EmailJS secrets are already configured in Lovable Cloud:
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_EMAILJS_SERVICE_ID`  
- `VITE_EMAILJS_TEMPLATE_ID`

The ContactForm currently uses hardcoded fallback values which work, but this is not ideal for maintainability.

**What I Will Do**:
- Remove hardcoded fallback values from `ContactForm.tsx`
- Add the EmailJS variables to the `.env` file (these are safe for client-side since EmailJS public keys are designed to be exposed)
- Security note: The existing `VITE_EMAILJS_PRIVATE_KEY` secret should be deleted as it's unused and improperly prefixed

---

## 3. Portfolio Projects Update

**Current Status**: Placeholder content

The portfolio section uses generic placeholder links. I need your actual project information.

**What I Need From You**:
Please provide the following for each project you want to showcase:

| Project | GitHub URL | Live Demo URL | Updated Description |
|---------|-----------|---------------|---------------------|
| AI Ethics Dashboard | ? | ? | ? |
| Governance Framework | ? | ? | ? |
| Stakeholder Mapping | ? | ? | ? |
| Bias Detection API | ? | ? | ? |
| Decision Framework | ? | ? | ? |
| Tutoring Platform | ? | https://studii.lovable.app | ? |

**What I Will Do**:
- Update all project URLs with your real links
- Refine descriptions if you provide updated text
- Add/remove projects as needed

---

## 4. Portfolio Card Hover Animations

**Current Status**: Basic hover effects exist

The cards have:
- `hover:shadow-elevated` (shadow grows)
- `hover:-translate-y-1` (lift effect)
- `group-hover:scale-105` (image zoom)

**What I Will Add**:

```text
+------------------------------------------+
|  ENHANCED HOVER EFFECTS                  |
|                                          |
|  1. Card Border Glow                     |
|     - Subtle color shift on hover        |
|                                          |
|  2. Tag Badge Animation                  |
|     - Scale slightly on card hover       |
|                                          |
|  3. Gradient Overlay                     |
|     - Smoother fade-in on image          |
|                                          |
|  4. Button Transform                     |
|     - Subtle lift effect on hover        |
+------------------------------------------+
```

**Implementation Details**:
- Add `hover:border-primary/70` for subtle border color change
- Add `group-hover:scale-105` to tech tag badges
- Enhance the gradient overlay transition timing
- Add button hover effects: `hover:-translate-y-0.5`
- Add focus ring styles for accessibility

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/ContactForm.tsx` | Remove hardcoded fallbacks |
| `.env` | Add EmailJS environment variables |
| `src/components/Portfolio.tsx` | Update project data + enhanced animations |

---

## Technical Section

### ContactForm.tsx Changes

```typescript
// Before (with fallbacks):
export const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "altruisticxai_1994";

// After (environment-only):
export const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
```

### Portfolio.tsx Animation Enhancements

```typescript
// Enhanced card wrapper classes
className="group relative flex flex-col h-full overflow-hidden rounded-lg bg-card 
  border-2 border-border shadow-card 
  transition-all duration-300 ease-out
  hover:shadow-elevated hover:-translate-y-1.5 hover:border-primary/60"

// Enhanced tag badges
className="text-xs text-secondary bg-secondary/10 px-2 py-0.5 rounded-full 
  border border-secondary/30 font-medium
  transition-transform duration-300 group-hover:scale-[1.03]"

// Enhanced button
className="... transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
```

---

## Next Steps

1. Approve this plan to proceed with implementation
2. Provide your actual project URLs and descriptions for the portfolio
3. Consider deleting the unused `VITE_EMAILJS_PRIVATE_KEY` secret from Lovable Cloud
