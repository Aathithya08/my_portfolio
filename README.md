# Aathithya Kanapathy — Portfolio

A React, TypeScript, and Vite portfolio with a dark cyan/violet visual system inspired by [Thamilnilavan's portfolio](https://github.com/Thamilnilavan/my_portfolio).

## Run

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Pages

- `/`: profile, skills, services, featured project, education, and contact.
- `/myworks`: dedicated project view.
- `/play`: interactive chess room with the existing chat integration.

Quick access supports Ctrl/Cmd+K and searches sections, pages, and the CV. Skills and gallery items can be filtered. Gallery photos open in a keyboard-accessible dialog, and the showcase offers desktop/mobile layout previews. The contact form prepares an email draft for the visitor to review and send in their email app.

## Customize

- `src/config.ts`: profile, skills, education, project information, and contact links.
- `src/components/Portfolio.tsx`: page structure, hero copy, services, and project illustration.
- `src/App.css` and `src/index.css`: visual system and responsive layouts.
- `public/cv/Aathithya.pdf`: downloadable CV.
- `public/images/`: existing profile and workspace illustrations.

The Mini CNC card uses a labelled concept illustration because the original project's configured photo is missing. Replace it with a real project image when available.

Email and telephone links work without a backend. The existing chess chat requires `GROQ_API_KEY` on the hosting server and the `/api/chat` serverless function; Vite alone does not run that API. Never put the key in client-side code.

See [REDESIGN_PLAN.md](REDESIGN_PLAN.md) for the implementation plan and scope. The old 3D components remain in the source but are no longer loaded by the redesigned routes.

## Validation

Production TypeScript/build and lint on the redesigned entry/components pass. Home and project render checks cover content, local assets, and section links. Local HTTP checks cover all three routes, the CV, and portrait. Browser visual and interaction QA is still pending because this session has no connected browser.
