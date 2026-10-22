# Illinois Junior Academy of Science

Vite + React recreation of the IJAS website with React Router, plus a 2025/2026 State Exposition Awards archive.

## Run

```bash
npm install
npm run dev
```

Open the URL Vite prints, usually `http://127.0.0.1:5176/`.

```bash
npm run build
npm run preview
```

Primary routes include `/`, `/about`, `/students`, `/teachers`, `/judges`, `/awards`, `/membership`, `/rules`, `/regionals`, and `/contact`.

## Awards archive

`/awards` defaults to 2026. Year tabs load 2025 or 2026. The page lists EPIC awards, special/sponsored awards, and Gold winners. Silver, bronze, participation, and no-show entries appear only when they also received a special or EPIC honor. Award records stay in `src/data/` and are not copied into this README.
