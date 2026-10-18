# Reference UI comparison

Compared the reference repository's public page, navigation, skills, gallery, showcase, and contact components against the redesigned app.

| Missing UI | Implemented adaptation |
| --- | --- |
| Quick access button and command palette | Searchable section/page navigation with Ctrl/Cmd+K, CV access, and native dialog focus/Escape behavior |
| Reference-style skills UI | 30 individual icon pills with animated gradient fills and hover effects; All, hardware/networking, software/web, and people/leadership filters; expandable descriptions; no invented proficiency percentages |
| Complete footer | Brand description, section navigation, social icons, round back-to-top control, CV download, and location/copyright row |
| Gallery and image viewer | Existing personal portraits and the portfolio illustration, category filters, enlarged preview, previous/next controls, arrow-key support |
| Responsive showcase | This portfolio's illustrative desktop/mobile preview and three process steps; uses Aathithya's identity and existing images |
| Contact form | Labelled name, email, subject, and message fields with native validation; prepares an encoded email draft and clearly describes the send step |
| Section entrance motion | IntersectionObserver reveals for section headings, cards, projects, journey items, and gallery; reduced-motion fallback |
| Additional mobile navigation entries | Services and Gallery links |
| Pointer behavior over dialogs | Native cursor restored inside dialogs because modal top-layer content sits above the decorative cursor |

## Validation

- TypeScript and Vite production build pass.
- Lint passes for the modified portfolio and new UI components.
- Server-render checks pass for home/projects, section links, UI controls, and local image/CV assets.
- Component handler checks pass for shortcut opening, search/navigation, gallery filtering/preview, desktop/mobile switching, and email-draft encoding/feedback.
- Visual browser review is pending: no browser is connected in this session.

The reference's other-owner business branding and content are adapted to this portfolio. No client testimonials, projects, or qualifications were fabricated.
