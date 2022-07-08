The `sbb-icon` component provides a solid way of rendering registered and named icons. The component will dynamically load an SVG for each icon, avoiding multiple requests to the same icon. The icon components are not tied to specific icon sets; you can register a new SVG icon or a custom namespace and then provide the `sbb-icon` with the `name` property in the format `name="icon-name"` or `name="namespace:icon-name"`. Note that if you do not provide a namespace, the default namespace "sbb" will be used pointing to the [SBB Icons CDN](https://lyne-icons.netlify.app/). 

## Usage

The example below shows how to render an icon named `app-icon-medium` that points to the default SBB Icons CDN:

```html
<!-- Will use "sbb" as the default namespace -->
<sbb-icon name="app-icon-medium"></sbb-icon>
```

### Register a namespace

In order to register a custom namespace, use the `registerNamespace` API by providing: 
- the name of the namespace;
- the URL from which to fetch the icons.

The example below shows how to register and use a custom namespace called `my-namespace` (you can also overwrite the default "sbb" namespace with your own custom url):

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
> **Note:** In order to use the registration API to register a new namespace/icon, it is necessary to import the `sbb_icon` module from the path `@sbb-esta/lyne-components/dist/esm/sbb-icon.entry.js`. This is a temporary solution for this specific use, which will eventually be changed with a different approach.

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                                                                                                   | Type      | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `name`     | `name`     | The provided name consisting of the namespace and the name of the icon. If the namespace is missing, the default namespace "sbb" will be used. E.g. `name` (will use "sbb" as namespace) or `namespace:name`. | `string`  | `undefined` |
| `sanitize` | `sanitize` | When set to `false`, SVG content that is HTTP fetched will not be checked if the response SVG content has any `<script>` elements, or any attributes that start with `on`, such as `onclick`.                 | `boolean` | `true`      |


----------------------------------------------


