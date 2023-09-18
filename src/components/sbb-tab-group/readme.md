The `sbb-tab-group` is a component used to organize and gather tabs that the user can navigate through; 
use it when you want to provide navigation within blocks of content, instead of showing everything in one place 
or requiring the user to navigate between several different views. 
Each tab has a related content, distinct from other tabs' content; 
tab panels can present different sections of content and include text, images, forms, other tab groups, etc.

```html
<sbb-tab-group>
  <sbb-tab-title>I am the first</sbb-tab-title>
  <div>Tab content 1</div>

  <sbb-tab-title>I am the second</sbb-tab-title>
  <section>Tab content 2</section>

  <sbb-tab-title>I am the third</sbb-tab-title>
  <article>Tab content 3</article>
</sbb-tab-group>
```

In order to display a tab label within the tab bar, provide an `sbb-tab-title` right before the related tab content; 
please refer to the `sbb-tab-title` documentation for more details.
The content element should be wrapped in a `div`, a `section` or an `article` and placed right after its relative tab title.
Tab groups can also be nested, which means that a tab's content block can be represented by another `sbb-tab-group`, 
as shown in the "Nested Tab Groups" example.

### States

A tab can be selected, unselected, or in `disabled` state; disable a tab to mark it as unavailable. 
Disabled tabs cannot be focused and may be invisible to assistive technologies such as screen readers.
It's possible to set the first selected tab using the `initialSelectedIndex` property.

```html
<sbb-tab-group initial-selected-index='1'>
  ...
</sbb-tab-group>
```

<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                | Description                                                                                                                        | Type          | Default |
| ---------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------- |
| `initialSelectedIndex` | `initial-selected-index` | Sets the initial tab. If it matches a disabled tab or exceeds the length of the tab group, the first enabled tab will be selected. | `number`      | `0`     |
| `size`                 | `size`                   | Size variant, either l or xl.                                                                                                      | `"l" \| "xl"` | `'l'`   |


## Events

| Event        | Description                           | Type                |
| ------------ | ------------------------------------- | ------------------- |
| `did-change` | Emits an event on selected tab change | `CustomEvent<void>` |


## Methods

### `activateTab(tabIndex: number) => Promise<void>`

Activates a tab by index.

#### Returns

Type: `Promise<void>`



### `disableTab(tabIndex: number) => Promise<void>`

Disables a tab by index.

#### Returns

Type: `Promise<void>`



### `enableTab(tabIndex: number) => Promise<void>`

Enables a tab by index.

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                                                                                                                                                                                                                                                                 |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"tab-bar"` | When you provide the `sbb-tab-title` tag through the unnamed slot, it will be automatically moved to this slot. You do not need to use it directly.                                                                                                                         |
| `"unnamed"` | Provide html-content to show as tab content. Wrap the content in a `div`, a `section`, an `article` or provide a nested `sbb-tab-group`: This is correct: `<div>Some text <p>Some other text</p></div>` This is not correct: `<span>Some text</span><p>Some other text</p>` |


----------------------------------------------


