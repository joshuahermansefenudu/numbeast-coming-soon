# Numbeast launch website

A responsive, hero-only launch page for the Numbeast maths adventure, aimed at ages 7–12. The parent signup uses the existing Numbeast Google Form through a validated server route.

Run `npm run dev`, `npm test`, or `npm run build`.

The hero sequence pauses when requested or when reduced motion is enabled. The full prototype loads when a visitor opens the adventure and starts its narrated sequence after an explicit sound action. Its voice clips, font and artwork are served locally.

Editable desktop and mobile design:
https://www.figma.com/design/ZgXHw44vghMOppxotuw02d/Numbeast?node-id=4544-108

The artwork and voice licence files are in `public/game/assets`. The graphite device frame comes from Hoverify: https://tryhoverify.com/tools/device-frames/license/

The automated tests replace the external signup provider; they do not add fake email addresses to the production list.
