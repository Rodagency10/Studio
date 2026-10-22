# Growth Editorial

## Evidence and fit

Derived from the technical analysis supplied by the user. This is a design recipe, not redistributed source code. The original screenshots mentioned in the analysis are not bundled. Desktop observations were reported in that analysis; tablet and phone behavior was derived from code and was not visually verified. All implementations still require their own browser review.

Suitable for service businesses with a strong point of view, process and real work to show. It needs substantive content and images; do not fill gaps with invented commercial proof.

## Composition grammar

Use a white outer canvas and a pale gray opening panel with generous margins and large rounded corners. Center the opening statement and two actions. Below it, offset a wide photograph with a narrower deep-toned information panel. Follow with a quiet proof strip, a large dark editorial section, image-led work, a process explanation and a decisive dark footer.

The signature is the alternation of open whitespace and enclosed dark panels, not a repeated grid of generic cards. Use bright color selectively for emphasis and wayfinding. Keep photographic crops, corner geometry and button silhouettes consistent across sections.

## Starting measurements

Source-analysis values, to adapt to the host brand rather than treat as fixed requirements:

| Element | Wide | Medium | Narrow |
| --- | --- | --- | --- |
| H1 | 82px | 70px | 52px |
| Main section title | 52px | 42px | 30px |
| Body | 18px | 16px | 16px |
| Outer horizontal inset | 30px | 30px | 16px |
| Major dark panel vertical padding | 200px | 140px | 80px |
| Card radius | 30px | 30px | 20–30px |

Working content width is about 1200px, with wider outer panels. Original layout transitions occurred near 1200px and 810px; use the project's breakpoints when they support the same wrapping behavior. Use fluid typography and text-length tests to prevent overflow.

Base tones: white, pale gray, near-black and deep green-black. The supplied analysis records lime and pink as primary/secondary accents. Choose brand-specific equivalents; do not copy the entire identity by default. Choose a licensed sans with substantial medium-weight headings and a clear text companion. Keep heading tracking near -0.02em and line height roughly 1.1–1.2; avoid arbitrary extreme compression.

## Section recipes

### Statement and visual pair

Badge → one semantic H1 → short explanation with optional highlighted phrases → primary/secondary actions → wide image plus narrow information card. Use spans for inline ornaments, not a heading element per word. On phones, stack image and card, and let buttons wrap without changing their destination.

The information card may contain user-provided outcomes. If no metrics are supplied, use factual capabilities or a process preview. Keep decorative charts clearly illustrative.

### Editorial services panel

Place a large left-aligned statement on a dark rounded surface, with a quieter paragraph below. Pair a service selector with an image and description. Switching service changes both image and copy; preserve a stable container to avoid layout jumps. On narrow screens put selectors before their associated content. See interactions for accessible tabs.

### Sticky work sequence

Use image-led case-study cards with a readable bottom gradient, title, service labels and a real destination. The next card overlaps the previous one. Observed motion in the supplied analysis shrinks outgoing cards toward 0.7 scale and rotates toward -6 degrees. Treat these as a reference, not mandatory values: reduce the effect when readability or viewport height suffers. Reset to a normal document flow on short/narrow screens or reduced motion.

### Process pair

A light editorial information panel sits beside a rounded dark process stage. Three stages alternate clear accents; each contains a number, heading and short explanation. Source analysis reports 10 seconds per stage with synchronized progress controls. Provide manual selection and pause. Do not infer the shorter timing estimated from partial observation.

### Comparison and testimonials

Use parallel, factual differentiators in a dark panel with a highlighted preferred column. Maintain understandable reading order on phones. Testimonials require supplied quotes and permission-appropriate portraits; otherwise omit this section. Source analysis describes an avatar selector with 5-second desktop autoplay and no phone autoplay; keep playback optional and user-controllable.

### Editorial articles and closing panel

Mix one large image-led story with two quieter articles only when real content exists. Conclude with an oversized invitation, primary action, purposeful links and the host's existing form. Preserve its backend integration.

## Motion and mobile

Source baseline: reveal of opacity and 40px vertical offset over 450ms, easing cubic-bezier(.44,0,.56,1), stagger 0/50/100/150ms, played once on viewport entry. A subtle image hover uses scale 1.05. Source ticker speed is about 15px/s with 60px item gaps.

Do not animate every nested element independently. One entrance per meaningful block preserves rhythm. Disable autoplay and continuous movement for reduced motion; keep content visible without animation JavaScript. On narrow layouts stack paired sections, remove overlapping comparisons, and simplify sticky effects. Verify these adaptations in the actual implementation.
