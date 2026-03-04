### sbb-tab-nav-bar

The `sbb-tab-nav-bar` provides a tab-like UI for navigating between routes.

```html
<sbb-tab-nav-bar>
  <a href="..." class="sbb-active" aria-current="page">Nav item 1</a>
  <a href="...">Nav item 2</a>
  <a href="...">Nav item 3</a>
</sbb-tab-nav-bar>
```

As the `sbb-tab-label` component, it supports a prefix icon and an amount.

```html
<sbb-tab-nav-bar>
  <a href="..." class="sbb-active" aria-current="page">Nav item 1</a>
  ...

  <!-- With icon and amount -->
  <a href="...">
    <sbb-icon name="pie-small"></sbb-icon>
    Nav item 4
    <p class="sbb-tab-amount">42</p>
  </a>
</sbb-tab-nav-bar>
```

Please note that the amount should be wrapped with a `<p>` tag to better support screen readers.

## States

### Active

Add the `sbb-active` class to display the tab as active.
To indicate the active state to the assistive technologies, `aria-current="page"`
should be set whenever the CSS class `sbb-active` is set.

```html
<sbb-tab-nav-bar>
  <a href="..." class="sbb-active" aria-current="page"> Nav item 1 </a>
  ...
</sbb-tab-nav-bar>
```

### Disabled

Be aware that anchors do not support a `disabled` state. To achieve an equivalent one, consumer needs to:

- Add the `sbb-disabled` class;
- Mark the anchor with `aria-disabled="true"`.
- Remove the `href` attribute.
- Add `role="link"` to better support the case for assistive technologies

```html
<sbb-tab-nav-bar>
  ...
  <a class="sbb-disabled" aria-disabled="true" role="link"> Nav item 4 </a>
</sbb-tab-nav-bar>
```



### sbb-tab-label

The `sbb-tab-label` is a component which is meant to be used in combination with the
[sbb-tab-group](/docs/elements-sbb-tab-sbb-tab-group--docs) component
in order to display a tab label within the tab bar.

```html
<sbb-tab-label>Tab Label</sbb-tab-label>
```

## Slots

It is possible to provide a label via an unnamed slot; the component can optionally display a `sbb-icon`
at the component start using the `iconName` property or via custom content using the `icon` slot.

It's also possible to display a numeric amount at the component's end using the `amount` property or slot.

The label's heading tag can be changed using the `level` property.

```html
<sbb-tab-label icon-name="app-icon-small" amount="123"> Tab Label </sbb-tab-label>

<sbb-tab-label>
  <sbb-icon slot="icon" name="circle-information-small"></sbb-icon>
  Tab Label
  <span slot="amount">123</span>
</sbb-tab-label>
```

## States

It is possible to display the component in `disabled` state by using the self-named property.

```html
<sbb-tab-label disabled> Tab Label </sbb-tab-label>
```



### sbb-tab-group

The `sbb-tab-group` is a component used to organize and gather tabs that the user can navigate through;
use it when you want to provide navigation within blocks of content, instead of showing everything in one place
or requiring the user to navigate between several different views.

Each tab has a related content, distinct from other tabs' content;
tab panels can present different sections of content and include text, images, forms, other tab groups, etc.

```html
<sbb-tab-group>
  <sbb-tab-label>I am the first</sbb-tab-label>
  <sbb-tab> Tab content 1 </sbb-tab>

  <sbb-tab-label>I am the second</sbb-tab-label>
  <sbb-tab> Tab content 2 </sbb-tab>

  <sbb-tab-label>I am the third</sbb-tab-label>
  <sbb-tab> Tab content 3 </sbb-tab>
</sbb-tab-group>
```

To display a tab label within the tab bar, provide a `sbb-tab-label` right before its related tab content;
please refer to the [sbb-tab-label](/docs/elements-sbb-tab-sbb-tab-label--docs) documentation for more details.

The content element must be wrapped in a `sbb-tab` and placed right after its relative `sbb-tab-label`.
Tab groups can also be nested, which means that a `sbb-tab` can contain another `sbb-tab-group`,
as shown in the "Nested Tab Groups" example.

## Fixed height

By default, the tab group adjusts its height based on the content of the active tab.
If you want to set a fixed height for the tab group, you can apply the `fixed-height` attribute or property
and set an explicit (or implicit) height on the element.
This will make the tab content scrollable if it exceeds the available space.

```html
<sbb-tab-group fixed-height style="height: 400px;">
  <sbb-tab-label>Tab 1</sbb-tab-label>
  <sbb-tab>Long content that may need scrolling...</sbb-tab>

  <sbb-tab-label>Tab 2</sbb-tab-label>
  <sbb-tab>More content...</sbb-tab>
</sbb-tab-group>
```

## States

A tab can be selected, unselected, or in `disabled` state; disable a tab to mark it as unavailable.
Disabled tabs cannot be focused and may be invisible to assistive technologies such as screen readers.

It's possible to set the first selected tab using the `initialSelectedIndex` property.

```html
<sbb-tab-group initial-selected-index="1"> ... </sbb-tab-group>
```

## Events

Consumers can listen to the `tabchange` event, whose `event.detail` is typed as `SbbTabChangedEventDetails`.
From it, it's possible to retrieve the information about the current `sbb-tab-label`, `sbb-tab` and index, and,
if available, also the information about the previous ones.

```ts
type SbbTabChangedEventDetails = {
  activeIndex: number;
  activeTabLabel: SbbTabLabelElement;
  activeTab: SbbTabElement;
  previousIndex: number;
  previousTabLabel: SbbTabLabelElement | undefined;
  previousTab: SbbTabElement | undefined;
};
```



### sbb-tab

The `sbb-tab` is a component used to provide content to a `sbb-tab-group`
(see [sbb-tab-group](/docs/elements-sbb-tab-sbb-tab-group--docs) for more details).

```html
<sbb-tab> Content </sbb-tab>
```

## Slots

The content is projected in an unnamed slot.
Use a semantic element as a content wrapper (`p`, `article`, `section` and so on)
to improve screen-reader usability due to its implicit role.

```html
<sbb-tab>
  <section>Content</section>
</sbb-tab>
```

## Events

Consumers can listen to the `active` event on the `sbb-tab` component to intercept the activation event.

## Accessibility

The role and the id for the `aria-controls` attribute is managed directly by the `sbb-tab-group` component.

