# IJAS Homepage Mock

Unofficial visual clone of the [Illinois Junior Academy of Science](https://www.ijas.org/) homepage only. Not affiliated with IJAS. No login, zFairs, or extra pages.

## Run

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://127.0.0.1:5175/`).

```bash
npm run build     # production build
npm run preview   # preview the production build
```

## Stack

- Vite + React + TypeScript + Tailwind CSS v4
- [Aceternity UI](https://ui.aceternity.com/) **3D Card** (audience tiles) and **Infinite Moving Cards** (sponsor strip, `direction="left"`, `speed="slow"`)
- [React Bits](https://reactbits.dev) **Counter** (JS + CSS, `motion/react`) for 600+ / 1200 / 2300+
- `motion` for nav underlines, dropdowns, and card tilt

## Notes

Nav links are placeholders (`#`). This folder is a clean copy without `node_modules` or `dist`, ready for `git init` / push.
