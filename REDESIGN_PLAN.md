# Portfolio redesign

## Direction

Reference: https://github.com/Thamilnilavan/my_portfolio and https://thamilnilavan.vercel.app/.
The reference source establishes a near-black background, cyan/violet/gold gradients, translucent cards, a split hero with concentric animated portrait rings and skill icons, compact navigation, and modular sections. Adapt those patterns to Aathithya's existing profile rather than importing the reference owner's personal content.

## Implementation

1. Replace the home page's loading/3D flow with an immediately rendered responsive portfolio.
2. Build a fixed navigation, gradient name, portrait rings, social links, project/contact actions, and the existing downloadable CV.
3. Present the existing biography, technical skills, services, project, education, and contact details in a consistent visual system.
4. Keep `/myworks` as a dedicated project view and `/play` as the existing interactive chess room, styled to match.
5. Support mobile navigation, visible keyboard focus, reduced motion, project disclosure, email copy feedback, and direct email/telephone contact.
6. Verify TypeScript, production bundling, changed-file lint, and local HTTP responses. Browser visual and interaction QA remains required if no connected browser is available.

## Content and assets

- Profile, skills, education, and contact information remain in `src/config.ts`.
- Preserve `/cv/Aathithya.pdf`, the existing portrait, and the existing illustrated workspace image.
- The configured `/images/minicnc.png` does not exist. Use a labelled SVG concept illustration until a real project photo is supplied.
- Contact uses email and phone links; there is no new contact submission backend.
- The existing chess chat still depends on its server-side API configuration.

## Scope

Local implementation only. Publishing and pushing are separate actions.
