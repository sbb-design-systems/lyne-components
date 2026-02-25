# Getting Started

Basic steps to integrate the Lyne components into your project.

Select your technology to get started.

<details>
  <summary>Plain Javascript</summary>

> ⓘ For simple testing and reproductions, see [Stackblitz starter for @sbb-esta/lyne-elements](https://stackblitz.com/edit/lyne-elements-starter?file=src%2Fmain.ts).

1. Install the `@sbb-esta/lyne-elements` and `@sbb-esta/lyne-elements-experimental` packages:

   ```sh
   npm install --save @sbb-esta/lyne-elements @sbb-esta/lyne-elements-experimental
   ```

   or, if using yarn:

   ```sh
   yarn add @sbb-esta/lyne-elements @sbb-esta/lyne-elements-experimental
   ```

2. Including global styles is strongly recommended to apply all SBB styles to your application.
   See the [styles](#styles) section if you prefer more granularity on what to import.

   ```css
   @import 'node_modules/@sbb-esta/lyne-elements/standard-theme.css';
   ```

3. Import the desired element and add it to globalThis:

   ```ts
   import { SbbButtonElement } from '@sbb-esta/lyne-elements/button.js';

   globalThis.SbbButtonElement = SbbButtonElement;
   ```

</details>

<details>
  <summary>Angular</summary>

> ⓘ We provide a Lyne Angular wrapper which helps to use Lyne components in Angular.
> See https://github.com/sbb-design-systems/lyne-angular for more information.
> However, it's possible to use Lyne Components in Angular without the wrapper.

> ⓘ For simple testing and reproductions, see [Stackblitz starter for @sbb-esta/lyne-angular](https://stackblitz.com/edit/lyne-angular-starter?file=src%2Fmain.ts).

1. Install Angular CLI, see [Angular CLI documentation](https://cli.angular.io/)
2. Install the `@sbb-esta/lyne-elements` package:

   ```sh
   npm install --save @sbb-esta/lyne-elements
   ```

   or, if using yarn:

   ```sh
   yarn add @sbb-esta/lyne-elements
   ```

3. Including global styles is strongly recommended to apply all SBB styles to your application.
   See the [styles](#styles) section if you prefer more granularity on what to import.
   Importing stylesheets is done by editing the `styles.(s)css`:

   ```css
   @import 'node_modules/@sbb-esta/lyne-elements/standard-theme.css';
   ```

   or editing your `angular.json`:

   ```json
     ...
     "styles": [
       "src/styles.scss",
       "node_modules/@sbb-esta/lyne-elements/standard-theme.css"
     ],
     ...
   ```

4. In order to use web components with Angular, you have to import `CUSTOM_ELEMENTS_SCHEMA` from the `@angular/core` package.

5. In each component, import the Lyne components you want to use in the TypeScript file: e.g. `import '@sbb-esta/lyne-elements/button.js';`

### Example app

```ts
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import '@sbb-esta/lyne-elements/button.js';

@Component({
  selector: 'my-app',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: ` <sbb-button>Lorem ipsum</sbb-button> `,
})
export class App {}

bootstrapApplication(App).catch((err) => console.error(err));
```

</details>

<details>
  <summary>React/Next.js</summary>

> ⓘ For simple testing and reproductions, see [Stackblitz starter for @sbb-esta/lyne-react](https://stackblitz.com/edit/lyne-react-starter?file=src%2FApp.tsx).

1. Prepare a React and Next.js setup.
2. Install the `@sbb-esta/lyne-react` package:

   ```sh
   npm install --save @sbb-esta/lyne-react
   ```

   or, if using yarn:

   ```sh
   yarn add @sbb-esta/lyne-react
   ```

3. Including global styles is strongly recommended to apply all SBB styles to your application.
   See the [styles](#styles) section if you prefer more granularity on what to import.

   ```css
   @import '~@sbb-esta/lyne-elements/standard-theme.css';
   ```

4. Enhance the `transpilePackages` array in Next.js config.

   ```js
   module.exports = {
     ...,
     transpilePackages: [
       '@sbb-esta/lyne-react',
       '@sbb-esta/lyne-elements',
       '@lit/react',
       '@lit/reactive-element',
       'lit',
       'lit-html',
       'lit-element',
     ],
   }
   ```

5. (Optional) To activate Server Side Rendering with Declarative Shadow DOM, you have to install the `@lit-labs/nextjs` package and use the method `withLitSSR()`:

   ```js
   const withLitSSR = require('@lit-labs/nextjs')({
     addDeclarativeShadowDomPolyfill: true,
   });

   module.exports = withLitSSR({
       ...,
       transpilePackages: [
         '@sbb-esta/lyne-elements',
         '@sbb-esta/lyne-react',
         '@sbb-esta/lyne-design-tokens',
         '@lit-labs/nextjs',
         '@lit-labs/ssr',
         '@lit-labs/ssr-react',
         '@lit/react',
         '@lit/reactive-element',
         'lit',
         'lit-element',
         'lit-html',
       ],
     });
   ```

6. Import and use Lyne component:

   ```tsx
   import { SbbButton } from '@sbb-esta/lyne-react/button';

   export default function MyComponent() {
     return <SbbButton onClick={() => {}}></SbbButton>;
   }
   ```

   Whenever types are needed, they can be imported directly from the `@sbb-esta/lyne-elements` package:

   ```tsx
   import type { SbbButtonSize } from '@sbb-esta/lyne-elements/button.js';
   import { SbbButton } from '@sbb-esta/lyne-react/button';

   export default function MyComponent() {
     const size: SbbButtonSize = 'm';
     return <SbbButton onClick={() => {}} size={size}></SbbButton>;
   }
   ```

</details>

## Components

Component documentation is available on [digital.sbb.ch](https://digital.sbb.ch)
and on [storybook](https://lyne-storybook.app.sbb.ch).

## Styles

### Lean variant

Lean uses a more compact design by defaulting the `size` property to the smallest available value.
Components that do not have a `size` property remain unchanged.
To enable lean mode, add the CSS class `sbb-lean` to the `html` tag.

```html
<html lang="en" class="sbb-lean">
  <head>
    <title>Lyne Design System - Lean example</title>
  </head>
  <body>
    ...
  </body>
</html>
```

### Dark Mode

We use the browser native functionality
[color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme)
to provide support for light and dark modes.

Per default, lyne components adapt to the user's system color scheme preference (light or dark mode).
Alternatively, you can opt out and force one mode or the other by applying either the `sbb-light` or `sbb-dark` CSS class,
which overrides the automatic `color-scheme` setting, thus forcing either a light or a dark mode.

Please note, that every color on the consumer's side also needs to be set in light and dark modes using the CSS `light-dark()` function.
See the `Context specific colors` section below for details of the predefined CSS variables we provide.

```css
.class {
  color: light-dark(var(--sbb-color-cloud), var(--sbb-color-anthracite));
}
```

Some colors change their value between light and dark modes for contrast reasons.
For example, the red used for errors or all colors in the additional color set.
Note that JavaScript tokens are only available for primitive values. Please use CSS variables whenever possible.
They automatically adapt their colors. Using JavaScript variables requires you to handle light and dark modes manually.

#### Compatibility

As a browser compatibility fallback, we ship our styles with the light color value defined before `light-dark()`.
So, whenever you define our own `light-dark()` color pair, consider using this fallback as well for compatibility.

```css
.class {
  color: var(--sbb-color-cloud);
  color: light-dark(var(--sbb-color-cloud), var(--sbb-color-anthracite));
}
```

We provide CSS variables for the most commonly used color combinations, which can be used directly.

### Context specific colors

We provide a few context-specific colors that can be used for errors, states,
or simply to make things look right in light and dark modes.

#### General colors

| CSS variable name        | Description                                 |
| ------------------------ | ------------------------------------------- |
| `--sbb-color-primary`    | The primary color (red as standard).        |
| `--sbb-color-primary85`  | Brighter variation of the primary color.    |
| `--sbb-color-primary125` | Darker variation of the primary color.      |
| `--sbb-color-primary150` | Even darker variation of the primary color. |
| `--sbb-color-error`      | Color to be used for error states.          |
| `--sbb-color-warning`    | Color to be used for warning states.        |
| `--sbb-color-success`    | Color to be used for success states.        |
| `--sbb-color-brand`      | Color to be used for brand, like the logo.  |

#### Background colors

| CSS variable name          | Description                                                            |
| -------------------------- | ---------------------------------------------------------------------- |
| `--sbb-background-color-1` | Level 1 background color, currently `white / midnight` (light / dark). |
| `--sbb-background-color-2` | Level 2 background color, currently `white / charcoal` (light / dark). |
| `--sbb-background-color-3` | Level 3 background color, currently `milk / charcoal` (light / dark).  |
| `--sbb-background-color-4` | Level 4 background color, currently `cloud / iron` (light / dark).     |

All background color CSS variables are also available with suffixes
`-negative` (taking the dark color of the color pair),
`-inverted` (swapped dark and light color of the color pair) and
`-negative-inverted` (taking the light color of the color pair).

#### Text colors

| CSS variable name | Description                                                      |
| ----------------- | ---------------------------------------------------------------- |
| `--sbb-color-1`   | Level 1 text color, currently `midnight / white` (light / dark). |
| `--sbb-color-2`   | Level 2 text color, currently `charcoal / white` (light / dark). |
| `--sbb-color-3`   | Level 3 text color, currently `charcoal / milk` (light / dark).  |
| `--sbb-color-4`   | Level 4 text color, currently `iron / cloud` (light / dark).     |
| `--sbb-color-5`   | Level 5 text color, currently `smoke / smoke` (light / dark).    |

All text color CSS variables (except level 5) are also available with suffixes
`-negative` (taking the dark color of the color pair),
`-inverted` (swapped dark and light color of the color pair) and
`-negative-inverted` (taking the light color of the color pair).

#### Border colors

| CSS variable name      | Description                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| `--sbb-border-color-1` | Level 1 border color, currently `midnight / white` (light / dark). |
| `--sbb-border-color-2` | Level 2 border color, currently `charcoal / white` (light / dark). |
| `--sbb-border-color-3` | Level 3 border color, currently `charcoal / milk` (light / dark).  |
| `--sbb-border-color-4` | Level 4 border color, currently `iron / cloud` (light / dark).     |
| `--sbb-border-color-5` | Level 5 border color, currently `smoke / smoke` (light / dark).    |

All border color CSS variables (except level 5) are also available with suffixes
`-negative` (taking the dark color of the color pair),
`-inverted` (swapped dark and light color of the color pair) and
`-negative-inverted` (taking the light color of the color pair).

#### Shadow colors

Note: All shadow color CSS variables are also available with the suffix `-negative`.
Please also consider our shadow SASS mixins when including a shadow.

| CSS variable name           | Description                   |
| --------------------------- | ----------------------------- |
| `--sbb-shadow-color-soft-1` | Shadow color for soft level 1 |
| `--sbb-shadow-color-soft-2` | Shadow color for soft level 2 |
| `--sbb-shadow-color-hard-1` | Shadow color for hard level 1 |
| `--sbb-shadow-color-hard-2` | Shadow color for hard level 2 |

### Themes

We provide the following themes.

- `standard`: for SBB applications.
- `off-brand`: for non SBB applications, where the primary color is set to an alternative color (blue).
- `safety`: for safety relevant applications, where the primary and brand colors are set to an alternative color (grey).

#### Safety relevant theme

To align with safety relevant themes, there is more than just changing the primary color.
We provide further utilities to improve the safety relevant theme:

##### Font Customization

Note that the font family should support changing the font-weight.

| CSS variable                        | Description                                                      |
| ----------------------------------- | ---------------------------------------------------------------- |
| `--sbb-typo-font-family`            | Can be used to override the font family for all texts and titles |
| `--sbb-typo-letter-spacing-text`    | Can be used to override letter spacing for texts                 |
| `--sbb-typo-letter-spacing-heading` | Can be used to override letter spacing for titles                |

##### Cursor customization

In certain safety relevant applications, it might be necessary to change the cursor style.

| CSS variable           | Description                                      |
| ---------------------- | ------------------------------------------------ |
| `--sbb-cursor-default` | Can be used to override the default cursor style |
| `--sbb-cursor-pointer` | Can be used to override the pointer cursor style |

### CSS files

Basically, all our styles are included in the theme files (e.g. `standard-theme.css`) which should be included in your application.
However, if you would like to more specifically pick what you need, consider the following CSS files available.

| File name                       | Description                                                                                   |
| ------------------------------- | --------------------------------------------------------------------------------------------- |
| `standard-theme.css`            | Contains normalizing, core styles and available CSS classes.                                  |
| `off-brand-theme.css`           | Contains the standard theme with primary color set to an alternative color (blue).            |
| `safety-theme.css`              | Contains the standard theme with primary and brand colors set to an alternative color (gray). |
|                                 |                                                                                               |
| `font-characters-extension.css` | Provides full character set of SBB fonts, needs larger files to load.                         |
|                                 |                                                                                               |
| `normalize.css`                 | Contains general browser resetting styles which can be useful for your application.           |
|                                 |                                                                                               |
| `core.css`                      | Contains mandatory basics to use lyne-components (including design tokens).                   |
|                                 |                                                                                               |
| `a11y.css`                      | Provides accessibility related CSS classes.                                                   |
| `animation.css`                 | Provides CSS classes to disable animation (e.g. for testing) on any level.                    |
| `badge.css`                     | Provides badge styling.                                                                       |
| `disable-animation.css`         | Disables animations on root level, ideally for a global test setup.                           |
| `layout.css`                    | Provides layout related CSS classes (e.g. page spacing, grid).                                |
| `lists.css`                     | Provides CSS classes to style lists.                                                          |
| `scrollbar.css`                 | Provides CSS classes to style a scrollbar.                                                    |
| `table.css`                     | Provides CSS classes to style a table.                                                        |
| `timetable-form.css`            | Provides CSS classes to style a timetable form.                                               |
| `typography.css`                | Provides typography related CSS classes.                                                      |

### Full Font

The `standard-theme.css` (or `core.css`) file only contains a subset of the SBB fonts and does not contain all characters (e.g. the French "œ").
To include the full font set, we provide the `font-characters-extension.css` file which can be added after the `standard-theme.css` (or `core.css`) file.

```css
@import '@sbb-esta/lyne-elements/standard-theme.css';
@import '@sbb-esta/lyne-elements/font-characters-extension.css';
```

### Design Tokens

The `@sbb-esta/lyne-elements` package provides CSS variable design tokens
from `@sbb-esta/lyne-design-tokens` in `standard-theme.css` (or `core.css`).

> If you need to use design tokens within a JavaScript context,
> please also add the `@sbb-esta/lyne-design-tokens` package to your project.

Please check `node_modules/@sbb-esta/lyne-elements/standard-theme.css` for available design tokens.

#### How to work with design tokens

Designers use design tokens in Figma, from which developers can get the name to be used.
Some design tokens are responsive: they change their value depending on the current breakpoint.

> Whenever a design token ends with `-{breakpoint}`, e.g. `--sbb-spacing-responsive-s-zero`,
> There is a corresponding responsive CSS variable without the `-breakpoint` suffix,
> e.g. `sbb-spacing-responsive-s` which should be used.

#### Alpha values

For alpha values, we recommend to use the CSS color-mix() function.

```css
.a {
  /* 40% opacity of primary color */
  color: color-mix(in srgb, var(--sbb-color-primary) 40%, transparent);
}
```

### Sass Mixins

Lyne Components provides various Sass mixins which can be used by consumers.
For available Sass mixins, check [Sass Mixins](https://github.com/sbb-design-systems/lyne-components/tree/main/src/elements/core/styles/mixins).

```scss
@use '@sbb-esta/lyne-elements' as sbb;

.my-class {
  @include sbb.grid-base;
}
```

### CSS Classes

As a base rule, styles are included in components. However, there are a few exceptions
where we provide CSS classes to consumers:

- [Layout styles](https://lyne-storybook.app.sbb.ch/?path=/docs/styles-layout--docs)
- [List styles](https://lyne-storybook.app.sbb.ch/?path=/docs/styles-list--docs)
- [Scrollbar styles](https://lyne-storybook.app.sbb.ch/?path=/docs/styles-scrollbar--docs)
- [Text styles](https://lyne-storybook.app.sbb.ch/?path=/docs/styles-typography--docs)

### Manipulating styles of components

In general, the styles of components should not be changed.
However, some specific cases may require overriding some styles of a component.
For these cases, you can use the CSS variables of a component. Please check a specific component for available CSS variables.

> IMPORTANT: CSS variable names which are not documented in the component docs section can be changed at any time.

Please reach out to the Lyne team if you think a component needs a new variant.

### Animations

Generally, animations are part of the design and should not be suppressed.
However, e.g. for testing purposes, it makes sense to deactivate them.

Add the `sbb-disable-animation` CSS class to disable animations and transition effects for the element and all its children.

Sometimes, you might need to disable animations only for a specific element.
To achieve that, you can add the `sbb-disable-animation-locally` class or re-enable animations using the `sbb-enable-animation` CSS class.

```html
<sbb-component class="sbb-disable-animation-locally">
  <!-- animations will play -->
</sbb-component>

<!-- Or alternatively-->

<sbb-component class="sbb-disable-animation">
  <sbb-component class="sbb-enable-animation">
    <!-- animations will play -->
  </sbb-component>
</sbb-component>
```

### Units

All our tokens and components use `rem` as the size unit.
We strongly recommend using the `rem` unit to guarantee consistent scaling
when font size changes in browsers.

### Focus outline

Focus outlines should only be displayed when users are navigating by keyboard.
Lyne components use the CSS selector `:focus-visible` to achieve that. Whenever you have custom interactive elements,
you should use the `:focus-visible` selector as well and include our Sass mixin `focus-outline`.

```scss
@use '../../core/styles' as sbb;

button:focus-visible {
  @include sbb.focus-outline;
}
```

#### Dark background

If a container element has a dark background color, all contained interactive elements should get a white outline.
By setting `--sbb-focus-outline-color: var(--sbb-focus-outline-color-dark);` all descendant elements using the
Lyne focus outline mixin (Lyne components included) receive the white outline because the variable gets inherited.
Note: If a Lyne component has a `negative` property, the correct focus outline color gets automatically applied  
to all contained interactive elements.

### Stacking

Our overlay components internally use the Popover API to take advantage of positioning elements on the top layer.
As of January 2025, browser support for the Popover API is at
[90%](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover#browser_compatibility)
and available for all [supported browsers](https://github.com/sbb-design-systems/lyne-components?tab=readme-ov-file#-browser-and-screen-reader-support).
If you need to support older browsers, you can either attempt to use a polyfill or
manually configure the stacking order of the overlays.
Doing it manually may interfere with the z-index of your components.
Therefore, each overlay component provides a CSS variable to override its z-index.
Additionally, there is a global CSS variable `--sbb-overlay-default-z-index` which has a default z-index of 1000.
This allows developers to change the z-index either globally or at component level.
In some cases, it's not possible to break out of a particular stacking context. In this case, keep the trigger within
your component, but moving the overlay component out of the stacking context can help.

### Fonts

SBB provides different fonts depending on the font-weight: `Roman`, `Bold` and `Light`.
Lyne maps these fonts to the CSS `font-weight` property so that consumers
can just set e.g. `font-weight: bold` and the correct font gets automatically selected.
Please note, although SBB provides more fonts than `Roman`, `Bold` and `Light`,
Lyne only intends to use these three fonts.
To apply the SBB font family you can use the CSS var `var(--sbb-typo-font-family)`. However,
this only includes the family but no letter spacing, so we recommend always
using our Sass mixins or CSS classes which contain all necessary properties.
See [Text styles](https://lyne-storybook.app.sbb.ch/?path=/docs/styles-typography--docs) for what's available.

```html
<p class="sbb-text-s sbb-text--bold"></p>
```

```scss
@use '@sbb-esta/lyne-elements' as sbb;

p {
  @include sbb.text-s--bold;
}
```

## Form Support

Our form elements implement native form support:
https://web.dev/articles/more-capable-form-controls
This means our form elements can be used with `<form>` elements, emit `input`
events and integrate with native form validation.

### Validation API

All of our form elements provide properties and methods for validation and
some implement specific validation functionality
(e.g. `<sbb-checkbox required>`, `<sbb-radio-button required>`).

#### `readonly form: HTMLFormElement | null`

The `form` readonly property returns the current reference to the associated
`<form>` instance, if available.

#### `readonly validity: ValidityState`

https://developer.mozilla.org/en-US/docs/Web/API/ValidityState

The `validity` property returns the current validity state of an element.

#### `readonly validationMessage: string`

The `validationMessage` property returns the currently applicable validation
message. Please note that only one message is returned at a time (e.g. if
multiple validity states are invalid, only the chronologically first one is
returned until it is fixed, at which point the next message might be returned,
if it is still applicable). Also, a custom validity message (see below) has
precedence over native validation messages.

#### `readonly willValidate: boolean`

The `willValidate` property returns true if the element will be validated
when the form is submitted; false otherwise.

#### `checkValidity(): boolean`

The `checkValidity()` method returns true if the element has no validity
problems; false otherwise. Fires an invalid event at the element in the
latter case.

#### `setCustomValidity(message: string): void`

By using `setCustomValidity(message: string)` it's possible to define a custom validation
message which is set on the element. Use the empty string to indicate that the element
does not have a custom validity error.
With this method, the validation state of the element can be controlled from outside.
