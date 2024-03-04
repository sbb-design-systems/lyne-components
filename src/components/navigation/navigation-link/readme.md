The `sbb-navigation-link` component is an action element contained by
a [sbb-navigation-list](/docs/components-sbb-navigation-sbb-navigation-list--docs) component
or a [sbb-navigation-marker](/docs/components-sbb-navigation-sbb-navigation-marker--docs) component.

## Link properties

The component is internally rendered as a link,
accepting its associated properties (`href`, `target`, `rel` and `download`).

```html
<sbb-navigation-link href="#info" target="_blank">Link</sbb-navigation-link>
```

## Style

The component has three different sizes, which can be changed using the `size` property (`l`, which is the default, `m` and `s`).

```html
<sbb-navigation-link href="#info" size="m">Link</sbb-navigation-link>
```

<!-- Auto Generated Below -->

## Properties

| Name               | Attribute  | Privacy | Type                                    | Default | Description                                                       |
| ------------------ | ---------- | ------- | --------------------------------------- | ------- | ----------------------------------------------------------------- |
| `size`             | `size`     | public  | `SbbNavigationActionSize \| undefined`  | `'l'`   | Action size variant.                                              |
| `navigationMarker` | -          | public  | `SbbNavigationMarkerElement \| null`    | `null`  |                                                                   |
| `href`             | `href`     | public  | `string \| undefined`                   |         | The href value you want to link to.                               |
| `target`           | `target`   | public  | `LinkTargetType \| string \| undefined` |         | Where to display the linked URL.                                  |
| `rel`              | `rel`      | public  | `string \| undefined`                   |         | The relationship of the linked URL as space-separated link types. |
| `download`         | `download` | public  | `boolean \| undefined`                  |         | Whether the browser will show the download dialog on click.       |

## Slots

| Name | Description                                                       |
| ---- | ----------------------------------------------------------------- |
|      | Use the unnamed slot to add content to the `sbb-navigation-link`. |
