
# Debug & Fix Plan: JavaScript, HTML, CSS, and TypeScript Errors

## Issues Identified

### 1. Broken CSS Class in Portfolio.tsx (Line 278)
**Problem**: Malformed class string with missing space and newline character
```tsx
className="w-2h-2 text-fuchsia-500\n"
```
**Impact**: Icon sizing broken, causes CSS parsing issues

### 2. Missing `--neural` CSS Variables in index.css
**Problem**: The Hero and other components use `text-neural`, `bg-neural/10`, etc., but the `--neural` CSS variable is only defined in `global.css`, not in the main `index.css` file that is actually loaded.

**Affected components**:
- Hero.tsx (email icon styling)
- hero-category-carousel.tsx (research category)
- hero-floating-icons.tsx (icon colors)

### 3. Duplicate/Conflicting CSS Base Layers
**Problem**: Both `global.css` and `index.css` define `:root` and `.dark` CSS variables with different values, causing unpredictable styling. The `index.css` values override `global.css`.

---

## Technical Implementation

### File 1: `src/components/Portfolio.tsx`
**Fix**: Correct the broken class string on line 278

Change:
```tsx
className="w-2h-2 text-fuchsia-500\n"
```
To:
```tsx
className="w-2 h-2 text-fuchsia-500"
```

### File 2: `src/index.css`
**Fix**: Add missing `--neural` CSS variables to both light and dark mode definitions

Add to `:root` section (around line 61-62):
```css
--neural: 263 70% 58%;
--neural-foreground: 0 0% 100%;
```

Add to `.dark` section (around line 148):
```css
--neural: 258 90% 76%;
--neural-foreground: 222 54% 8%;
```

---

## Summary of Changes

| File | Issue | Fix |
|------|-------|-----|
| `src/components/Portfolio.tsx` | Broken CSS class string | Fix spacing and remove newline |
| `src/index.css` | Missing `--neural` variable | Add variable to light/dark themes |

---

## Expected Outcome

After these fixes:
- The chevron icon in Portfolio cards will render correctly with proper sizing
- Neural-themed colors will display properly throughout the Hero section and category carousel
- No CSS variable fallback warnings or silent failures
- Consistent color theming across all components using the `neural` color
