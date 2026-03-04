### sbb-navigation-section

The `sbb-navigation-section` is a container for both [sbb-navigation-list](/docs/elements-sbb-navigation-sbb-navigation-list--docs) and [sbb-button](/docs/elements-sbb-button-sbb-button--docs).
Its intended use is inside a [sbb-navigation](/docs/elements-sbb-navigation-sbb-navigation--docs) component, in which it can be seen as a 'second-level' panel.

## Trigger

To display the `sbb-navigation-section` component you must provide a trigger element using the `trigger` property,
Optionally a label can be provided via slot or via the `titleContent` property.

```html
<sbb-navigation-section trigger="nav1" titleContent="Title 1">
  <sbb-navigation-list label="Label 1.1">
    <sbb-navigation-link accessibility-current="page" href="...">Label 1.1.1</sbb-navigation-link>
    <sbb-navigation-link href="...">Label 1.1.2</sbb-navigation-link>
    ...
  </sbb-navigation-list>
  <sbb-button>Something</sbb-button>
</sbb-navigation-section>
```

## Accessibility

When a navigation action is marked to indicate the user is currently on that page,
`accessibility-current="page"` (for `sbb-navigation-link`s) or `aria-current="page"` (for `sbb-navigation-button`s)
should be set on that action.
Similarly, if a navigation action is marked to indicate a selected option (e.g. the selected language),
`aria-pressed` should be set on that action.

### Controlling initial focus

The first element with the attribute `sbb-focus-initial` will receive focus on opening.
If the attribute is not used, the first focusable element receives focus (recommended).

```html
<sbb-navigation-section trigger="nav1">
  <sbb-navigation-list label="Label 1.1">
    <sbb-navigation-link href="...">Label 1.1.1</sbb-navigation-link>
    <sbb-navigation-link sbb-focus-initial href="...">Label 1.1.2</sbb-navigation-link>
    ...
  </sbb-navigation-list>
</sbb-navigation-section>
```



### sbb-navigation-marker

The `sbb-navigation-marker` component is a collection of [sbb-navigation-button](/docs/elements-sbb-navigation-sbb-navigation-button--docs)
and [sbb-navigation-link](/docs/elements-sbb-navigation-sbb-navigation-link--docs).
Its intended use is inside a [sbb-navigation](/docs/elements-sbb-navigation-sbb-navigation--docs) component.

```html
<sbb-navigation-marker>
  <sbb-navigation-button id="nav1">Label 1</sbb-navigation-button>
  <sbb-navigation-button id="nav2">Label 2</sbb-navigation-button>
  <sbb-navigation-link href="https://www.sbb.ch/some/route">Label 3</sbb-navigation-link>
  <sbb-navigation-marker></sbb-navigation-marker
></sbb-navigation-marker>
```

## Style

The component has a property named `size` which is proxied to all the `sbb-navigation-button`/`sbb-navigation-link` within it.
Possible values are `l` (default) and `s`.

```html
<sbb-navigation-marker size="s">
  ...
  <sbb-navigation-marker></sbb-navigation-marker
></sbb-navigation-marker>
```



### sbb-navigation-list

The `sbb-navigation-list` component is a collection of [sbb-navigation-button](/docs/elements-sbb-navigation-sbb-navigation-button--docs)
and [sbb-navigation-link](/docs/elements-sbb-navigation-sbb-navigation-link--docs).
Its intended use is inside a [sbb-navigation-section](/docs/elements-sbb-navigation-sbb-navigation-section--docs) component.
Optionally, a label can be provided via slot via the self-named property or the self-named slot.

```html
<sbb-navigation-list label="Label 1.1">
  <sbb-navigation-link href="...">Label 1.1.1</sbb-navigation-link>
  <sbb-navigation-link href="...">Label 1.1.2</sbb-navigation-link>
  <sbb-navigation-button>Label 1.1.3</sbb-navigation-link>
</sbb-navigation-list>
```



### sbb-navigation-link

The `sbb-navigation-link` component is an action element contained by
a [sbb-navigation-list](/docs/elements-sbb-navigation-sbb-navigation-list--docs) component
or a [sbb-navigation-marker](/docs/elements-sbb-navigation-sbb-navigation-marker--docs) component.

## Link properties

The component is internally rendered as a link,
accepting its associated properties (`href`, `target`, `rel` and `download`).

```html
<sbb-navigation-link href="#info" target="_blank">Link</sbb-navigation-link>
```

## State

The navigation button can have an initial active state which can be set by using the class `.sbb-active`.

```html
<sbb-navigation-link class="sbb-active" href="#info" target="_blank">Link</sbb-navigation-link>
```

## Style

The component has three different sizes, which can be changed using the `size` property (`l`, which is the default, `m` and `s`).

```html
<sbb-navigation-link href="#info" size="m">Link</sbb-navigation-link>
```



### sbb-navigation-button

The `sbb-navigation-button` component is an action element contained by
a [sbb-navigation-list](/docs/elements-sbb-navigation-sbb-navigation-list--docs) component
or a [sbb-navigation-marker](/docs/elements-sbb-navigation-sbb-navigation-marker--docs) component.

## Button properties

The component is internally rendered as a button,
accepting its associated properties (`type`, `name`, `value` and `form`).

```html
<sbb-navigation-button value="menu" name="menu">Button</sbb-navigation-button>
```

## State

The navigation button can have an initial active state which can be set by using the class `.sbb-active`.

```html
<sbb-navigation-button class="sbb-active" value="menu" name="menu">Button</sbb-navigation-button>
```

## Style

The component has three different sizes, which can be changed using the `size` property (`l`, which is the default, `m` and `s`).

```html
<sbb-navigation-button value="menu" name="menu" size="m">Button</sbb-navigation-button>
```



### sbb-navigation

The `sbb-navigation` component provides a way to present a navigation menu.

Some of its features are:

- uses a native dialog element;
- creates a backdrop for disabling interaction below the navigation;
- disables scrolling of the page content while open;
- manages focus properly by setting it on the first focusable element or the first action with the `.sbb-active` class;
- can act as a host for components as [sbb-navigation-list](/docs/elements-sbb-navigation-sbb-navigation-list--docs),
  [sbb-navigation-marker](/docs/elements-sbb-navigation-sbb-navigation-marker--docs)
  and [sbb-navigation-section](/docs/elements-sbb-navigation-sbb-navigation-section--docs);

## Interactions

To display the `sbb-navigation` component you can either provide a trigger element using the `trigger` property,
or call the `open()` method on the `sbb-navigation` component.

```html
<!-- Trigger element -->
<sbb-button id="nav-trigger">Navigation trigger</sbb-button>

<!-- Navigation component with navigation sections -->
<sbb-navigation trigger="nav-trigger">
  <sbb-navigation-marker>
    <sbb-navigation-button aria-current="page" id="nav-section-1">Label 1</sbb-navigation-button>
    <sbb-navigation-button id="nav-section-2">Label 2</sbb-navigation-button>
    <sbb-navigation-link href="https://www.sbb.ch/some/route">Label 3</sbb-navigation-link>
  <sbb-navigation-marker>

  <sbb-navigation-marker>
    <sbb-navigation-button aria-pressed="true">Language 1</sbb-navigation-button>
    <sbb-navigation-button aria-pressed="false">Language 2</sbb-navigation-button>
    <sbb-navigation-button aria-pressed="false">Language 3</sbb-navigation-button>
  <sbb-navigation-marker>

  <sbb-navigation-section trigger="nav-section-1">
    <span slot="label">Title 1</span>
    <sbb-navigation-list>
      <span slot="label">Label 1.1</span>
      <sbb-navigation-link href="...">Label 1.1.1</sbb-navigation-link>
      <sbb-navigation-link href="...">Label 1.1.2</sbb-navigation-link>
      <sbb-navigation-link href="...">Label 1.1.3</sbb-navigation-link>
    </sbb-navigation-list>
    ...
    <sbb-button>Something</sbb-button>
  </sbb-navigation-section>
  ...
</sbb-navigation>
```

## Accessibility

On opening, the focus will be automatically set on the first focusable element (unless manually specified, see below).
If there is a trigger for a navigation section with the CSS class `.sbb-active`,
the first occurrence automatically opens the connected section.
When a navigation action is marked to indicate the user is currently on that page,
`accessibility-current="page"` (for `sbb-navigation-link`s) or `aria-current="page"` (for `sbb-navigation-button`s)
should be set on that action.
Similarly, if a navigation action is marked to indicate a selected option (e.g. the selected language),
`aria-pressed` should be set on that action.

### Controlling initial focus

The first element with the attribute `sbb-focus-initial` will receive focus on opening.
If the attribute is not used, the first focusable element receives focus (recommended).

```html
<sbb-navigation >
  <sbb-navigation-marker>
    <sbb-navigation-button>Label 1</sbb-navigation-button>
    <sbb-navigation-button sbb-focus-initial>Label 2</sbb-navigation-button>
      ...
</sbb-navigation>
```

