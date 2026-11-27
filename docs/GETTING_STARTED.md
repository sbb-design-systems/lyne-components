# Getting Started

This document shows the basic steps to integrate the Lyne components into your project.

Component documentation is available on [digital.sbb.ch](https://digital.sbb.ch)
and on [Docs App](https://lyne-elements.app.sbb.ch).

Select your technology to get started:

- [Plain Javascript](#plain-javascript)
- [Angular](#angular)
- [React/Next.js](#reactnextjs)
- [Scoped custom element registries](#scoped-custom-element-registries)

## Plain Javascript

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
   See the [Theming Guide](/docs/guides-theming--docs) if you prefer more granularity on what to import.

   ```css
   @import 'node_modules/@sbb-esta/lyne-elements/standard-theme.css';

   /** If you are using experimental components, additionally add */
   @import 'node_modules/@sbb-esta/lyne-elements-experimental/standard-theme.css';
   ```

3. Import the desired element and add it to globalThis:

   ```ts
   import { SbbButtonElement } from '@sbb-esta/lyne-elements/button.js';

   globalThis.SbbButtonElement = SbbButtonElement;
   ```

## Angular

> ⓘ We provide a Lyne Angular wrapper which helps to use Lyne components in Angular.
> See https://lyne-angular.app.sbb.ch for more information.
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
   See the [Theming Guide](/docs/guides-theming--docs) if you prefer more granularity on what to import.
   Importing stylesheets is done by editing the `styles.(s)css`:

   ```css
   @import 'node_modules/@sbb-esta/lyne-elements/standard-theme.css';

   /** If you are using experimental components, additionally add */
   @import 'node_modules/@sbb-esta/lyne-elements-experimental/standard-theme.css';
   ```

   or editing your `angular.json`:

   ```json
     ...
     "styles": [
       "src/styles.scss",
       "node_modules/@sbb-esta/lyne-elements/standard-theme.css",

       /** If you are using experimental components */
       "node_modules/@sbb-esta/lyne-elements-experimental/standard-theme.css"
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

## React/Next.js

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
   See the [Theming Guide](/docs/guides-theming--docs) if you prefer more granularity on what to import.

   ```css
   @import '~@sbb-esta/lyne-elements/standard-theme.css';

   /** If you are using experimental components, additionally add */
   @import '~@sbb-esta/lyne-elements-experimental/standard-theme.css';
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

## Scoped custom element registries

By default, Lyne elements are registered in the global `customElements` registry.
In micro frontend setups, where multiple versions of Lyne (or other libraries using `sbb-*` tag names)
coexist on the same page, the elements can be registered in a
[scoped `CustomElementRegistry`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/CustomElementRegistry) instead.
This requires native browser support for scoped custom element registries;
polyfills are not supported.

> ⓘ Only the `.pure.js` entry points (e.g. `@sbb-esta/lyne-elements/button.pure.js`) can be used with
> a scoped registry. The regular entry points (e.g. `@sbb-esta/lyne-elements/button.js`) call `.define()`
> at import time and therefore always register the elements in the global registry.

Pass the registry to `define()`. All element dependencies (e.g. `sbb-icon`) are registered in the same registry:

```ts
import { SbbButtonElement } from '@sbb-esta/lyne-elements/button.pure.js';

const registry = new CustomElementRegistry();
SbbButtonElement.define(registry);

const host = document.querySelector('#my-micro-frontend')!;
const root = host.attachShadow({ mode: 'open', customElementRegistry: registry });
root.innerHTML = `<sbb-button>Label</sbb-button>`;
```

Alternatively, configure a default registry which is used by every `define()` call without an explicit registry.
`setDefaultCustomElementRegistry()` must be called before any element is defined
(i.e. before calling `define()` or importing any non-pure entry point).
Elements which are created internally (e.g. tooltips created via the `sbb-tooltip` attribute)
also use this registry.

```ts
import {
  getDefaultCustomElementRegistry,
  setDefaultCustomElementRegistry,
} from '@sbb-esta/lyne-elements/core.js';
import { SbbButtonElement } from '@sbb-esta/lyne-elements/button.pure.js';

const registry = new CustomElementRegistry();
setDefaultCustomElementRegistry(registry);
SbbButtonElement.define(); // registered in `registry`

getDefaultCustomElementRegistry(); // returns `registry`
setDefaultCustomElementRegistry(undefined); // resets to the global registry
```

When creating Lyne elements programmatically, they must be created in the correct registry,
as `document.createElement()` uses the global registry.
The following helpers are exported from `@sbb-esta/lyne-elements/core.js`:

- `customElementRegistryOf(node)`: returns the registry associated with the given node,
  falling back to the global registry.
- `createElementInRegistryOf(context, tagName)`: creates an element in the same registry as the given context node.

```ts
import { createElementInRegistryOf } from '@sbb-esta/lyne-elements/core.js';

const chip = createElementInRegistryOf(root, 'sbb-chip');
root.querySelector('sbb-chip-group')!.appendChild(chip);
```
