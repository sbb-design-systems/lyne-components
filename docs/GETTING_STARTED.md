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

   /** If you are using experimental components */
   @import 'node_modules/@sbb-esta/lyne-elements-experimental/standard-theme.css';
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

   /** If you are using experimental components */
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

   /** If you are using experimental components */
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

</details>

## Components

Component documentation is available on [digital.sbb.ch](https://digital.sbb.ch)
and on [Docs App](https://lyne-elements.app.sbb.ch).

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
