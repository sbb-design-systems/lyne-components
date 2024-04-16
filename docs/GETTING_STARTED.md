# Getting Started

Basic steps to integrate the lyne components into your own project.

Choose your technology to receive the first steps to take.

<details>
  <summary>Plain Javascript</summary>

1. Install the `@sbb-esta/lyne-components` package:

   ```sh
   npm install --save @sbb-esta/lyne-components
   ```

   or, if using yarn:

   ```sh
   yarn add @sbb-esta/lyne-components
   ```

2. Including typography is required to apply all SBB styles to your application.

   ```css
   @import 'node_modules/@sbb-esta/lyne-components/typography.css';
   ```

3. Import the desired element and add it to globalThis:

   ```ts
   import { SbbButtonElement } from '@sbb-esta/lyne-components/button.js';

   globalThis.SbbButtonElement = SbbButtonElement;
   ```

</details>

<details>
  <summary>Angular</summary>

> ⓘ We will soonish provide a Lyne Angular Wrapper which helps to use lyne components in Angular.
> However, it's already possible to use Lyne Components in Angular.

1. Install Angular CLI, see [Angular CLI documentation](https://cli.angular.io/)
2. Install the `@sbb-esta/lyne-components` package:

   ```sh
   npm install --save @sbb-esta/lyne-components
   ```

   or, if using yarn:

   ```sh
   yarn add @sbb-esta/lyne-components
   ```

3. Including typography is required to apply all SBB styles to your application. That is doable by editing the `styles.(s)css`:

   ```css
   @import 'node_modules/@sbb-esta/lyne-components/typography.css';
   ```

   or editing your `angular.json`:

   ```json
     ...
     "styles": [
       "src/styles.scss",
       "node_modules/@sbb-esta/lyne-components/typography.css"
     ],
     ...
   ```

4. In order to use web components with Angular, you have to import `CUSTOM_ELEMENT_SCHEMA` from `@angular/core` package.

### Example app

```ts
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import '@sbb-esta/lyne-components/button.js';

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

1. Prepare a React and Next.js setup.
2. Install the `@sbb-esta/lyne-components-react` package:

   ```sh
   npm install --save @sbb-esta/lyne-components-react
   ```

   or, if using yarn:

   ```sh
   yarn add @sbb-esta/lyne-components-react
   ```

3. Including typography globally is required to apply all SBB styles to your application.

   ```css
   @import '~@sbb-esta/lyne-components/typography.css';
   ```

4. Enhance `transpilePackages` array in Next.Js config.

   ```js
   module.exports = {
     ...,
     transpilePackages: [
       '@sbb-esta/lyne-components-react',
       '@sbb-esta/lyne-components',
       '@sbb-esta/lyne-design-tokens',
       '@lit/react',
       '@lit/reactive-element',
       'lit',
       'lit-html',
       'lit-element',
     ],
   }
   ```

5. (Optional) To activate Server Side Rendering with Declarative Shadow DOM, you have to install `@lit-labs/nextjs` package and use the method `withLitSSR()`:

   ```js
   const withLitSSR = require('@lit-labs/nextjs')({
     addDeclarativeShadowDomPolyfill: true,
   });

   module.exports = withLitSSR({
       ...,
       transpilePackages: [
         '@sbb-esta/lyne-components',
         '@sbb-esta/lyne-components-react',
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

6. Import and use lyne component:

   ```tsx
   import { SbbButton } from '@sbb-esta/lyne-components-react/button';

   export default function MyComponent() {
     return <SbbButton onClick={() => {}}></SbbButton>;
   }
   ```

   Whenever e.g. types are needed, they can be imported directly from `@sbb-esta/lyne-components` package:

   ```tsx
   import type { SbbButtonSize } from '@sbb-esta/lyne-components/button.js';
   import { SbbButton } from '@sbb-esta/lyne-components-react/button';

   export default function MyComponent() {
     const size: SbbButtonSize = 'm';
     return <SbbButton onClick={() => {}} size={size}></SbbButton>;
   }
   ```

</details>

## Components

Components documentation is available on [digital.sbb.ch](https://digital.sbb.ch)
and on [storybook](https://lyne-storybook.app.sbb.ch).

## Styles

### Full Font

The `typography.css` file only contains a subset of the `SBBWeb` fonts that does not contain all characters (e.g. the French "œ").
For including the full fontset, we provide the `fullfont.css` file which can be added after the `typography.css` file.

```css
@import '@sbb-esta/lyne-components/typography.css';
@import '@sbb-esta/lyne-components/fullfont.css';
```

### Design Tokens

The `@sbb-esta/lyne-components` package provides the CSS variable design tokens
from `@sbb-esta/lyne-design-tokens` in the `typography.css`.

> If you have to use design tokens within javascript context,
> please also add `@sbb-esta/lyne-design-tokens` package to your project.

Please check `node_modules/@sbb-esta/lyne-components/typography.css` for available design tokens.

#### How to work with design tokens

Designers are using design tokens in Figma from where developers can get the name to be used.
Some design tokens are responsive: they change their value depending on the current breakpoint.

> Whenever a design token ends with `-{breakpoint}`, e.g. `--sbb-spacing-responsive-s-zero`,
> there is a corresponding responsive CSS variable without the `-breakpoint` suffix,
> e.g. `sbb-spacing-responsive-s` which should be used.

### SASS Mixins

Lyne components provides various SASS mixins which can be consumed by consumers.
For available SASS mixins, check [SASS Mixins](https://github.com/lyne-design-system/lyne-components/tree/main/src/components/core/styles/mixins).

```scss
@use '@sbb-esta/lyne-components' as sbb;

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

Basically, styles of components should not be changed.
Although, some specific cases may require to overwrite some styles of a component.
For these cases you can use CSS variables of a component. Please check a specific component for available CSS variables.

> IMPORTANT: CSS variable names which are not documented in component docs section, can be changed at any time.

Please reach out to the Lyne team if you think a component needs a new variant.

### Animations

Generally animations are part of the design and should not be suppressed.
However, e.g. for testing purposes it makes sense to deactivate animations.

Add the `sbb-disable-animation` CSS class to disable animations and transition effects for the element and all its children.

Sometimes, you might need to disable animations only for a specific element.
To achieve that, you can add `sbb-disable-animation-specific` class or re-enable animations using the `sbb-enable-animation` CSS class.

```html
<sbb-component class="sbb-disable-animation-specific">
  <!-- animations will play -->
</sbb-component>

<!-- Or  alternatively-->

<sbb-component class="sbb-disable-animation">
  <sbb-component class="sbb-enable-animation">
    <!-- animations will play -->
  </sbb-component>
</sbb-component>
```

### Units

All our tokens and components are using `rem` as size unit.
We strongly recommend to use the `rem` unit all over the project to guarantee a consistent scaling
when font-size are changed in browsers.

### Stacking

As we can't use popover API so far, stacking of overlay context is done manually.
However, this can interfere with z-index of your components.
Every overlay component therefore provides a CSS variable to override the z-index of the component.
Additionally, there is the global CSS variable `--sbb-overlay-default-z-index` which has a default z-index of 1000.
So developers have the chance to either globally or component specifically change the z-index.
