🖥️ Ingakalii — Retro Windows Portfolio

A retro Windows–inspired portfolio built with React, TypeScript, Vite, and Tailwind CSS, featuring a custom design system, theme engine, and GPU-powered CRT effects.

Live Site → https://ingakalii.loveable.app/

✨ Features

🖥️ Windows 98–inspired desktop UI

🗂️ Draggable window-style sections

🧭 Taskbar with Start menu navigation

🎨 Token-driven design system (light / dark / retro)

🌗 Theme switcher with persistent state

📧 Contact form powered by EmailJS

⚡ GPU-optimized CRT screen effect (WebGL)

♿ Keyboard accessible & reduced-motion friendly

📱 Fully responsive layout

🏗 Architecture

This project follows a modular design system architecture.

src/
├── assets/                # Static images & icons
│
├── components/
│   ├── ui/                # Reusable UI primitives
│   ├── layout/            # Taskbar, Start menu, window layout
│   ├── sections/          # About, Projects, Contact, etc.
│   └── effects/           # CRT shader canvas
│
├── hooks/                 # Custom React hooks
├── integrations/          # External services (EmailJS)
├── lib/                   # Utilities & theme logic
├── providers/             # Context providers
├── config/                # App configuration
│
├── styles/
│   ├── tokens.css         # Design tokens
│   ├── base.css           # Global base styles
│   ├── components.css     # Component layer
│   ├── utilities.css      # Utility layer
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

🎨 Design System

This project uses a token-driven system:

Colors defined as CSS variables

Tailwind reads tokens via hsl(var(--token))

Themes switch by swapping root variables

No hardcoded colors in components

Example token:

--color-bg: 321 34% 96%;
--color-primary: 321 49% 11%;


Dark mode works by applying the .dark class to <html>.

🌗 Theme System

Themes are controlled via a lightweight theme engine:

Stored in localStorage

Respects prefers-color-scheme

No re-render required (CSS variables only)

Supported themes:

Light

Dark

Retro (Windows-styled palette)

🖥 CRT Effect

The CRT overlay is implemented using WebGL, not CSS animations.

Why?

No layout thrashing

GPU accelerated

Zero impact on Lighthouse performance

Fully scoped overlay

Implemented in:

src/components/effects/CRTCanvas.tsx

📧 Contact Form

The contact form uses EmailJS.

Required Environment Variables

Create a .env file:

VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=template_p8p58qv

EmailJS Template Variables

Your EmailJS template must include:

{{from_name}}
{{from_email}}
{{subject}}
{{message}}

🚀 Development
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm run test

# Build production
npm run build

🛠 Tech Stack

React 18

TypeScript

Vite

Tailwind CSS

shadcn/ui (component base)

Framer Motion

React Hook Form + Zod

EmailJS

WebGL (custom CRT shader)

🧪 Performance

This project is optimized for:

Lighthouse 100 (Performance + Accessibility)

Minimal layout shifts

GPU-only visual effects

Reduced-motion compliance

Token-based theme switching

📦 Deployment

The site is deployed via Lovable hosting.

To deploy updates:

Push to main branch

Publish from Lovable dashboard

🧠 Philosophy

This isn’t just a portfolio.

It’s a nostalgic operating system experience built with modern frontend architecture.

Retro aesthetic.
Modern performance.
Scalable design system.
