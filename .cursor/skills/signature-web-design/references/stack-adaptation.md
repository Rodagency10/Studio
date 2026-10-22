# Adapt to the host

## Laravel and Blade

Inspect composer.json, routes/web.php, the route's controller/view, Blade layouts/components, resources/css, resources/js and the Vite inputs. Determine whether the page is plain Blade, Livewire or Inertia before editing. Follow the host's actual structure instead of assuming welcome.blade.php is the landing.

Retain route()/asset()/Vite helpers, Blade escaping, loops, translations, @csrf, @method, old(), validation messages and server conditions. Preserve wire:* and Alpine x-* bindings. Never use a new client handler that blocks an existing server submission. For Livewire navigation, initialize and clean up effects using the project's lifecycle conventions; do not accumulate observers on every visit. For Inertia, change the actual Vue/React page while preserving props, navigation and form helpers.

Use existing Tailwind, Bootstrap or scoped CSS. Read the installed version before choosing utility syntax. Keep global application navigation unchanged unless the request includes it. Useful checks may include PHP syntax, view compilation, frontend build and route/form tests already present; select commands based on composer.json/package.json and available runtime.

## React, Next and Vue

Trace the route and component boundary. Keep server-rendered content on the server when possible; isolate client interaction code. Preserve router links, props, metadata and form actions. Reuse installed animation tools. Dispose observers, listeners and timers on unmount; account for development remounts. Do not copy a separate project's package manifest into the host.

## HTML and other stacks

Use semantic markup, scoped CSS and small progressively enhanced modules. Retain URL structures, server templating, build entries and content ownership. Read the actual project conventions for unlisted stacks rather than imposing React.
