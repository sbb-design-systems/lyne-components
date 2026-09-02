# Lyne Components — Agent Guide

Web component library for the SBB Design System, built on [Lit](https://lit.dev/). Components ship as custom elements in `@sbb-esta/lyne-elements` with React wrappers in `@sbb-esta/lyne-react`.

## Repository Layout

```
src/elements/           # @sbb-esta/lyne-elements (stable)
src/elements-experimental/  # @sbb-esta/lyne-elements-experimental
src/react/              # @sbb-esta/lyne-react wrappers (built on @lit/react)
src/react-experimental/ # @sbb-esta/lyne-react-experimental wrappers
src/docs/               # Storybook config (src/docs/config), stories, guides & docs pages
tools/                  # Build/codegen tooling
scripts/                # CI & release scripts
```

Each component family follows this structure:

```
src/elements/button/
  button/button.component.ts      # element class
  button/button.spec.ts           # unit tests (CSR)
  button/button.ssr.spec.ts       # SSR hydration test
  button/button.snapshot.spec.ts  # DOM + a11y tree snapshots
  button/button.visual.spec.ts    # visual regression test
  common/button-common.ts         # shared mixin/styles
button.pure.ts                    # re-exports only (no side effects)
button.ts                         # calls .define() — consumer entry point
```

## Essential Commands

```bash
yarn start                                           # Storybook dev server (port 6006)
yarn test:csr                                        # CSR tests only — use during development
yarn test:csr --files=src/elements/button/**          # Run tests for a single component
yarn test:csr --files=src/elements/button/** --watch  # Watch mode
yarn test                                            # Full suite (CSR + SSR + hydration + coverage)
yarn lint                                            # All linters (ESLint, Stylelint, TSC, lit-analyzer)
yarn build                                           # Build dist/ outputs
yarn docs                                            # Regenerate custom-elements-manifest + markdown docs
yarn format                                          # Prettier on everything
```

## Architecture Patterns

### `.pure.ts` vs `.ts` entry points

- **`.pure.ts`** — exports classes only; no side effects (safe for tree-shaking and SSR).
- **`.ts`** — imports from `.pure.ts` then calls `Element.define()` on each class; this is what consumers include in their app.
- Always import from `.pure.ts` inside library code to avoid double-registration.

### Base class hierarchy

All elements extend `SbbElement` (→ `LitElement`). Use specialised base classes for action elements:

- `SbbButtonBaseElement` — emulates `<button>` (role, keyboard, form)
- `SbbLinkBaseElement` — emulates `<a>` (href, target, etc.)
- Subclasses set `public static override readonly elementName` and implement `renderTemplate(): TemplateResult` for their inner content only; the base class renders the wrapper tag (`span`/`a`) with the emulated native attributes/interaction logic.

### Styles — never spread `super.styles`

`SbbElement.finalizeStyles` auto-merges `styles` declarations across the entire prototype chain. Each class/mixin declares **only its own styles**:

```ts
// ✅ correct
export class SbbFooElement extends SbbElement {
  public static override styles: CSSResultGroup = unsafeCSS(style);
}
// ❌ wrong — do NOT use [super.styles, ...]
```

### Element dependencies

Declare sub-elements used in a component's template via `elementDependencies`; they are auto-registered when `define()` is called:

```ts
public static override elementDependencies: SbbElementType[] = [SbbIconElement];
```

### Mixins

Shared behaviour lives in `src/elements/core/mixins/` (e.g. `disabled-mixin.ts`, `negative-mixin.ts`, `readonly-mixin.ts`, `form-associated-mixin.ts` and variants). Apply mixins in calls:

```ts
class SbbButtonElement extends SbbButtonCommonElementMixin(
  SbbDisabledTabIndexActionMixin(SbbButtonBaseElement),
) { ... }
```

### I18n

Always use `SbbLanguageController` for UI strings; provide translations for EN/FR/DE/IT in `src/elements/core/i18n/`:

```ts
private _language = new SbbLanguageController(this);
// in render:
i18nExample[this._language.current]
```

### States (CSS `:state()`)

Use `this.internals.states` / `this.toggleState(name, force)`. A polyfill is active — do not manipulate `state--*` attributes directly.

### Boolean properties

Boolean props must **default to `false`**. Lit cannot parse `attribute="false"` as `false`. Invert the semantics if needed:

```ts
// ✅
@property({ attribute: 'no-sanitize', type: Boolean }) public noSanitize = false;
// ❌
@property({ type: Boolean }) public sanitize = true;
```

### Context detection / property propagation

Use `SbbPropertyWatcherController` to react to ancestor property changes (e.g., propagating `negative`) — do **not** use `:host-context`.

### CSS naming

- BEM class names prefixed with `sbb-` (e.g., `.sbb-button__label`)
- Component-scoped CSS custom properties defined on `:host`: `--sbb-component-*`
- Avoid SCSS `&` concatenation — write full selectors for searchability

## Testing Conventions

| File pattern         | Purpose                                          |
| -------------------- | ------------------------------------------------ |
| `*.spec.ts`          | Unit / interaction tests (client-side rendering) |
| `*.ssr.spec.ts`      | Hydration smoke test via `ssrHydratedFixture`    |
| `*.snapshot.spec.ts` | DOM structure + a11y tree snapshots              |
| `*.visual.spec.ts`   | Playwright visual regression                     |

When developing locally, do not run visual spec tests. They are executed in CI only.

Import the side-effectful entry in test files to register elements:

```ts
import '../../button.ts';
```

Use `waitForLitRender(element)` after property changes before asserting DOM state.

## Commit Conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/) (`<type>(<scope>): <subject>`) to drive the changelog via Release Please. No commit line may exceed 100 characters; breaking changes use a `BREAKING CHANGE:` footer with text directly following the colon (no blank line after it). See `docs/CONTRIBUTING.md` for full details.

## Key Files

| Path                                         | Purpose                                                                                         |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `src/elements/core/base-elements/element.ts` | `SbbElement` — root base class, hydration, states, style merging                                |
| `src/elements/core/mixins/`                  | Reusable mixins (disabled, negative, readonly, form-associated, …)                              |
| `src/elements/core/controllers/`             | Reactive controllers (language, property-watcher, overlay/escapable-overlay, media-matchers, …) |
| `src/elements/core/decorators/`              | Lit decorators (`@forceType`, `@handleDistinctChange`, …)                                       |
| `src/elements/core/styles/`                  | Global SCSS design tokens and mixins                                                            |
| `docs/CODING_STANDARDS.md`                   | Full coding conventions reference                                                               |
| `docs/CONTRIBUTING.md`                       | Commit message format, PR/coding rules, package overview                                        |
