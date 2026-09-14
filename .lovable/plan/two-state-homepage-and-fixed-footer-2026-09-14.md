# Two-state homepage and fixed footer

## What will change
- Make the footer fixed to the viewport bottom, full width, and transparent in both homepage states.
- Remove the page-wide grid pattern while preserving the photo slideshow and dark readability overlay.
- Add a minimal default landing state with the ARCSultans title, supplied tagline, and one “Enter Whitelist” button.
- Show the existing full arcade whitelist design only after that button is clicked.
- Keep the existing full-design button opening the whitelist form, and return to the minimal landing state after successful submission.

## Technical details
- Manage the landing/full-design switch in the homepage component.
- Pass the whitelist form completion callback through the modal to close it and restore the landing state.
- Preserve all five animated GIF previews, slideshow timing, links, and form behavior.
- Verify both states, modal opening, fixed footer positioning, and absence of grid lines in the live preview.
