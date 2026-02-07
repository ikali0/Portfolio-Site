# 🖥️ Ingakalii

A retro Windows–inspired portfolio built with modern frontend architecture.

> Nostalgia in aesthetic.  
> Precision in engineering.

🌐 **Live Site:** https://ingakalii.loveable.app/

---

## ✨ Overview

Ingakalii is a desktop-style portfolio experience designed to feel like a lightweight operating system.

It blends:

- Windows 98–inspired UI patterns  
- A token-driven design system  
- GPU-accelerated visual effects  
- Modern React architecture  

This isn’t a template.  
It’s a crafted interface.

---

## 🎯 Features

- 🖥️ Desktop-style layout with taskbar & Start menu  
- 🗂️ Window-based section navigation  
- 🎨 Light / Dark / Retro themes  
- ⚡ GPU-optimized CRT effect (WebGL overlay)  
- 📧 EmailJS-powered contact form  
- ♿ Keyboard-accessible navigation  
- 📱 Fully responsive design  

---

## 🧱 Tech Stack

- React 18  
- TypeScript  
- Vite  
- Tailwind CSS  
- shadcn/ui  
- Framer Motion  
- React Hook Form + Zod  
- EmailJS  
- WebGL (custom CRT shader)  

---

## 🏗 Architecture

The project follows a modular and scalable structure:

```
src/
├── assets/                # Static assets
│
├── components/
│   ├── ui/                # Reusable UI primitives
│   ├── layout/            # Taskbar, windows, layout shell
│   ├── sections/          # About, Projects, Contact
│   └── effects/           # CRT shader canvas
│
├── hooks/                 # Custom React hooks
├── integrations/          # External services (EmailJS, Supabase)
├── lib/                   # Utilities & theme logic
├── providers/             # Context providers
├── config/                # App configuration
│
├── styles/
│   ├── tokens.css         # Design tokens
│   ├── base.css           # Global resets & typography
│   ├── components.css     # Component abstractions
│   ├── utilities.css      # Utility helpers
│   └── themes/
│       ├── light.css
│       ├── dark.css
│       └── retro.css
│
├── types/                 # TypeScript types
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## 🎨 Design System

This project uses a **token-driven design system**.

All visual values are defined as CSS variables.

Example:

```css
--color-bg: 321 34% 96%;
--color-primary: 321 49% 11%;
--radius: 0.75rem;
--shadow-md: 0 6px 20px hsl(0 0% 0% / 0.08);
```

Tailwind consumes these tokens:

```ts
colors: {
  background: "hsl(var(--color-bg) / <alpha-value>)",
  primary: "hsl(var(--color-primary) / <alpha-value>)",
}
```

### Why this matters

- No hardcoded hex values  
- Easy theme expansion  
- Visual consistency  
- Scalable architecture  
- Zero unnecessary re-renders  

---

## 🌗 Theme System

Themes are:

- Controlled via `class="dark"` strategy  
- Stored in `localStorage`  
- Synced with `prefers-color-scheme`  
- Swapped instantly via CSS variables  

Theme switching does **not** trigger full React re-renders.

---

## ⚡ Performance Strategy

- Animations use `transform` and `opacity` only  
- CRT effect runs via WebGL (GPU only)  
- No layout thrashing  
- Reduced-motion compliant  
- Optimized for Lighthouse performance  

---

## 📧 Environment Variables

Create a `.env` file in the project root:

```
VITE_EMAILJS_PUBLIC_KEY=
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
```

Your EmailJS template should include:

```
{{from_name}}
{{from_email}}
{{subject}}
{{message}}
```

---

## 🚀 Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## 🌍 Deployment

The project can be deployed to:

- Vercel  
- Netlify  
- Lovable  
- Any static hosting provider  

Production build output is generated in the `dist/` folder.

---

## 🧠 Philosophy

This portfolio is both a creative interface experiment and a structured frontend system.

It demonstrates:

- Design system thinking  
- Performance awareness  
- Accessibility considerations  
- Modular architecture  
- UI craftsmanship  

Retro aesthetic.  
Modern engineering.
