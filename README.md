# Numbeast launch website

A responsive, hero-only launch page for the Numbeast maths adventure, aimed at ages 7–12. The parent signup uses the existing Numbeast Google Form through a validated server route.

Run `npm run dev`, `npm test`, or `npm run build`.

The approved layout keeps parent signup inside the hero on desktop and mobile. Bangers supplies the adventure headline and character names; Barlow keeps the supporting text and form readable. Both fonts are self-hosted with their OFL licences in `public/adventure`.

Splashle and Flamfox form a static two-character team. Character cards lift, straighten and highlight on pointer hover or keyboard focus; touch selection highlights without movement. Reduced-motion preferences keep the highlight and skip the lift. The only automatic animation is a subtle shine through the join button; reduced-motion preferences disable it. The full narrated prototype remains in the portfolio case study, while this product page focuses on the hero and signup.

Editable desktop and mobile design:
https://www.figma.com/design/ZgXHw44vghMOppxotuw02d/Numbeast?node-id=4544-108

The artwork and voice licence files are in `public/game/assets`. The graphite device frame comes from Hoverify: https://tryhoverify.com/tools/device-frames/license/

The automated tests replace the external signup provider; they do not add fake email addresses to the production list.
