
# Plan: Refactor Entropy Component for Fully Responsive Behavior

## Overview

This plan refactors the `Entropy` particle background component to automatically fill and measure its parent container, eliminating the need for fixed pixel sizing. This will fix mobile rotation issues, prevent cropping, and make the component truly responsive.

## Current Issues

1. **Entropy** accepts `width` and `height` props that are passed from Hero
2. **Hero** maintains complex state (`entropySize`) with resize listeners just to calculate pixel dimensions
3. The current approach causes layout issues on mobile rotation and edge cases
4. Duplicate resize logic exists in both components

## Changes

### 1. Refactor Entropy Component (`src/components/ui/entropy.tsx`)

**Remove fixed sizing props:**
- Remove `width` and `height` from the interface
- Keep only `className` as an optional prop

**Self-measuring behavior:**
- The component already has `containerRef` and `updateSize()` logic
- Simply remove the dependency on `[width, height]` in the useEffect
- Ensure particles are regenerated on significant resize (optional enhancement)

**Updated interface:**
```text
interface EntropyProps {
  className?: string;
}
```

### 2. Simplify Hero Component (`src/components/Hero.tsx`)

**Remove size calculation logic:**
- Delete the `entropySize` state and `updateSize()` function
- Remove the `bgRef` ref (no longer needed for measurement)
- Remove the resize/orientationchange event listeners

**Simplified usage:**
```text
<Entropy className="w-full h-full opacity-80" />
```

### 3. Add Aggressive Mobile Font Clamping (`src/global.css`)

Add ultra-tight typography control for tiny screens (320-380px):

```text
@media (max-width: 380px) {
  h1 {
    font-size: clamp(1.75rem, 6vw, 2.5rem);
  }
  p {
    font-size: 0.875rem;
    line-height: 1.5;
  }
}
```

---

## Technical Details

### Entropy Component Changes

The Entropy component will:
1. Use `absolute inset-0` positioning to fill its parent
2. Auto-measure container dimensions via `getBoundingClientRect()`
3. Handle resize events internally with proper DPR scaling
4. Re-initialize particles only when necessary (to avoid animation reset on minor resizes)

### Hero Component Simplification

The Hero will:
1. Simply render the Entropy component with class styling
2. No longer track or pass pixel dimensions
3. Have cleaner, more maintainable code

### Benefits

- No more fixed pixel bugs
- Fully responsive on mobile rotation
- Single source of truth for sizing (Entropy itself)
- Reduced code complexity in Hero
- Better separation of concerns
