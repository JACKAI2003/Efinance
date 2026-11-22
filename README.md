# Nexo AI App (PWA Completa)

Proyecto React + Vite + Tailwind CSS exportado desde **Nexo AI** con configuración Progressive Web App (PWA) lista para instalación y uso offline:

- `public/manifest.json` con `id`, `start_url`, `scope`, `display: "standalone"` e iconos separados (`any` y `maskable`).
- Iconos PNG reales (`192x192`, `512x512`, `maskable 512x512`, `apple-touch-icon 180x180`) y `icon.svg`.
- Service Worker (`public/sw.js`) con precarga de recursos y soporte sin conexión registrado automáticamente en `src/main.jsx`.

## Instalación y ejecución

```bash
npm install
npm run dev
```

## Compilación para producción

```bash
npm run build
npm run preview
```
