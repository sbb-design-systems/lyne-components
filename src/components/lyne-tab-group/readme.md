Tab groups are used to organize and group tabs that the user can navigate through. Use tabs when you want to provide navigation within a group of contents, instead of showing everything in one place or requiring the user to navigate between several different views.

## Usage
Tabs should be represented by heading tags. Therefore provide one of the following tags for the label: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`. The related content element must always immediately follow the specified heading tag and should be wrapped in a `div`, a `section` or an `article`.

Each tab should have a related content, distinct from other tabs' content. Tab panels can present different sections of content and include text, images, forms, other tab groups, etc.

```html
<h1>Tab Label</h1>
<div>Tab content...</div>
```

A tab can be selected, unselected, or disabled. Disable a tab to mark it as unavailable. Disabled tabs cannot be focused and may be invisible to assistive technologies such as screen readers.

Tab buttons can have an icon to the left of the label, provide a `lyne-icon` component before the label and within the heading tag in order to show it. They can also have numbers to the right of the label by providing a `lyne-tab-amount` component after the label and within the heading tag.

```html
<!-- Icon -->
<h1>
  <lyne-icon><svg></svg></lyne-icon> Tab Label
</h1>

<!-- Amount -->
<h1>
  Tab Label <lyne-tab-amount>123</lyne-tab-amount>
</h1>

<!-- Icon and amount -->
<h1>
  <lyne-icon><svg></svg></lyne-icon> Tab Label <lyne-tab-amount>123</lyne-tab-amount>
</h1>
```

Tab groups can be nested (e.g. a tab's related content can contain another tab group).

<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                | Description                                                                                                                        | Type     | Default |
| ---------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| `initialSelectedIndex` | `initial-selected-index` | Sets the initial tab. If it matches a disabled tab or exceeds the length of the tab group, the first enabled tab will be selected. | `number` | `0`     |


## Events

| Event                       | Description            | Type                |
| --------------------------- | ---------------------- | ------------------- |
| `lyne-tab-group_tab-change` | On selected tab change | `CustomEvent<void>` |


## Methods

### `activateTab(tabIndex: number) => Promise<void>`

Activate tab by index

#### Returns

Type: `Promise<void>`



### `disableTab(tabIndex: number) => Promise<void>`

Disable tab by index

#### Returns

Type: `Promise<void>`



### `enableTab(tabIndex: number) => Promise<void>`

Enable tab by index

#### Returns

Type: `Promise<void>`




----------------------------------------------


