# Interaction recipes

## Reveal

Render content visible by default. Only add the hidden starting state after an observer is ready. Observe meaningful blocks; reveal once on intersection and disconnect. Under reduced motion, reveal immediately. A mount-time CSS animation is not a scroll reveal.

## Continuous ticker

Keep an accessible original list and an aria-hidden duplicate. Wait for fonts/images before measuring; recalculate on size changes. Move by one complete sequence including its gap. Provide pause for continuous motion and stop for reduced motion. If the list is too short, use a static row rather than an obvious empty loop.

## Service tabs

Use buttons with tablist/tab/tabpanel semantics, aria-selected and matching IDs. Support arrow keys and Home/End with roving tabindex. Show a usable first panel without JS. Update image, text and alt together. Do not replace content with raw HTML from untrusted data.

## Sticky cards

Use CSS sticky first and derive progress from the actual section geometry if transforms are needed. Inspect ancestors for overflow that breaks sticky. Do not hijack scrolling. Prevent overlapping cards from concealing keyboard focus or clickable targets. Disable transforms for reduced motion and when screen height makes the composition impractical.

## Timed process and quote selectors

Use one clock for progress and selection. Reset on manual navigation. Offer pause; pause while focused or hovered and when the document is hidden. Disable autoplay for reduced motion. Hidden slides must not retain focusable controls. Do not announce every automatic change through a live region. Clean up timers on lifecycle changes.

## Button and image hover

Use transforms instead of changing layout dimensions. Keep one accessible label when duplicating text for a rolling effect; hide the decorative copy. Provide a comparable focus-visible treatment. Cap image scale around 1.05 and respect reduced motion.
