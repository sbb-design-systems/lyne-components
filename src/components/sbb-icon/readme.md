The `sbb-icon` component provides a solid way of rendering registered and named icons. 
The component will dynamically load an SVG for each icon, avoiding multiple requests to the same icon. 
The icon components are not tied to specific icon sets; you can register a new SVG icon or a custom namespace 
and then provide the `sbb-icon` with the `name` property in the format `name="icon-name"` or `name="namespace:icon-name"`. 
Note that if you do not provide a namespace, the default namespace "sbb" will be used 
pointing to the [SBB Icons CDN](https://lyne-icons.netlify.app/). 

## Usage

The example below shows how to render an icon named `app-icon-medium` that points to the default SBB Icons CDN:

```html
<!-- Will use "sbb" as the default namespace -->
<sbb-icon name="app-icon-medium"></sbb-icon>
```

### Accessibility

Similar to an `<img>` element, an icon alone does not convey any useful information for a
screen-reader user. The user of `<sbb-icon>` must provide additional information pertaining to how
the icon is used. Based on the use-cases described below, `sbb-icon` is marked as
`aria-hidden="true"` by default, but this can be overridden by adding `aria-hidden="false"` to the
element.

In thinking about accessibility, it is useful to place icon use into one of three categories:

1. **Decorative**: the icon conveys no real semantic meaning and is purely cosmetic.
2. **Interactive**: a user will click or otherwise interact with the icon to perform some action.
3. **Indicator**: the icon is not interactive, but it conveys some information, such as a status.
   This includes using the icon in place of text inside of a larger message.

### Register a namespace
*This feature is subject to change**

In order to register a custom namespace, use the `registerNamespace` API by providing: 
- the name of the namespace;
- the URL from which to fetch the icons.

The example below shows how to register and use a custom namespace called `my-namespace` 
(you can also overwrite the default "sbb" namespace with your own custom url):

```js
import { sbb_icon } from '@sbb-esta/lyne-components/dist/esm/sbb-icon.entry.js';
sbb_icon.registerNamespace('my-namespace', 'https://my-custom-icon-cdn.ch/');
```

In the HTML, you can now use the namespace as shown below:

```html
<!-- Will fetch the icon from the url: "https://my-custom-icon-cdn.ch/icon-name.svg"-->
<sbb-icon name="my-namespace:icon-name"></sbb-icon>
```

### Register an icon
*This feature is subject to change**

In order to register a custom icon, use the `registerIcon` API by providing: 
- the name of the icon;
- the name of the namespace;
- the SVG content to render on the page;
- the properties `sanitize` and `colorImmutable` (optional).

If set to true, `colorImmutable` adds the class `color-immutable` to the SVG to prevent changing the icon color.
The example below shows how to register and render a custom icon named `app-logo` with a custom namespace named `custom`:

```js
import { sbb_icon } from '@sbb-esta/lyne-components/dist/esm/sbb-icon.entry.js';
sbb_icon.registerIcon('my-icon', 'custom', '<svg>...</svg>', { sanitize: true, colorImmutable: false });
```

In the HTML, you can now use the icon as shown below:

```html
<!-- Will render the registered SVG icon -->
<sbb-icon name="custom:my-icon"></sbb-icon>
```

> ***Note:** In order to use the registration API to register a new namespace/icon, 
> it is necessary to import the `sbb_icon` module from the path `@sbb-esta/lyne-components/dist/esm/sbb-icon.entry.js`. 
> This is a temporary solution for this specific use, which will eventually be changed with a different approach.

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                                                                                                                                                                   | Type      | Default     |
| ------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `ariaHidden` | `aria-hidden` | The aria-hidden property is set to "true" by default, since an icon alone does not convey any useful information for a screen-reader user.                                                                    | `string`  | `'true'`    |
| `ariaLabel`  | `aria-label`  | Only set the aria-label if aria-hidden is set to "false".                                                                                                                                                     | `string`  | `undefined` |
| `name`       | `name`        | The provided name consisting of the namespace and the name of the icon. If the namespace is missing, the default namespace "sbb" will be used. E.g. `name` (will use "sbb" as namespace) or `namespace:name`. | `string`  | `undefined` |
| `sanitize`   | `sanitize`    | When set to `false`, SVG content that is HTTP fetched will not be checked if the response SVG content has any `<script>` elements, or any attributes that start with `on`, such as `onclick`.                 | `boolean` | `true`      |


## Dependencies

### Used by

 - [sbb-alert](../sbb-alert)
 - [sbb-button](../sbb-button)
 - [sbb-form-field](../sbb-form-field)
 - [sbb-link](../sbb-link)
 - [sbb-pearl-chain-time](../sbb-pearl-chain-time)
 - [sbb-timetable-row](../sbb-timetable-row)
 - [sbb-toggle-check](../sbb-toggle-check)

### Graph
```mermaid
graph TD;
  sbb-alert --> sbb-icon
  sbb-button --> sbb-icon
  sbb-form-field --> sbb-icon
  sbb-link --> sbb-icon
  sbb-pearl-chain-time --> sbb-icon
  sbb-timetable-row --> sbb-icon
  sbb-toggle-check --> sbb-icon
  style sbb-icon fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


