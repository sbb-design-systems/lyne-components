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
   import { SbbButtonElement } from '@sbb-esta/lyne-components/button';

   globalThis.SbbButtonElement = SbbButtonElement;
   ```

</details>

<details>
  <summary>Angular</summary>

ⓘ We will soonish provide a Lyne Angular Wrapper which helps to use lyne components in Angular.
However, it's already possible to use Lyne Components in Angular.

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

import '@sbb-esta/lyne-components/button';

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
   import type { SbbButtonSize } from '@sbb-esta/lyne-components/button';
   import { SbbButton } from '@sbb-esta/lyne-components-react/button';

   export default function MyComponent() {
     const size: SbbButtonSize = 'm';
     return <SbbButton onClick={() => {}} size={size}></SbbButton>;
   }
   ```

</details>

## Full Font

The `typography.css` file only contains a subset of the `SBBWeb` fonts that does not contain all characters (e.g. the French "œ").
For including the full fontset, we provide the `fullfont.css` file which can be added after the `typography.css` file.

```css
@import '@sbb-esta/angular/typography.css';
@import '@sbb-esta/angular/fullfont.css';
```

## Mixins

If you need to reuse some mixins from the library, you have to configure your own Angular application in
SCSS mode and import via `@use`:

```scss
@use '@sbb-esta/lyne-components' as sbb;
```
