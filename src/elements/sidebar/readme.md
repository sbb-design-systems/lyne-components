The `<sbb-sidebar>` is a component that can display items on the left or right side of the viewport.
Every slotted content will be displayed, but it's designed to be used for navigation.

The sidebar components are designed to add side content to a fullscreen app.
To set up a sidebar we use three components: `<sbb-sidebar-container>` which acts as a
structural container for our content and sidebar, `<sbb-sidebar-content>` which represents
the main content, and `<sbb-sidebar>` which represents the added side content.

Per `<sbb-sidebar-container>` it's allowed to place one `<sbb-sidebar>` with `position="start"`
and one `<sbb-sidebar>` with `position="end"`. More than one sidebar of the same position value
is not allowed.

```html
<sbb-sidebar-container>
  <sbb-sidebar role="navigation">
    <sbb-sidebar-title>Sidebar Title</sbb-sidebar-title>
    <sbb-sidebar-close-button></sbb-sidebar-close-button>
    <sbb-link-list>
      <sbb-block-link href="#">Link 1</sbb-block-link>
      <sbb-block-link href="#" class="sbb-active" accessibility-current="page">
        Link 2
      </sbb-block-link>
    </sbb-link-list>
  </sbb-sidebar>
  <sbb-sidebar-content role="main">
    <p style="padding: var(--sbb-spacing-fixed-4x); margin: 0">
      In the enchanting world of fantasy, unicorns are legendary creatures known for their grace,
      purity, and magical abilities. These mystical beings have inspired countless tales of bravery
      and wonder. Here, we delve into some captivating unicorn success stories that continue to
      enchant and inspire, each with a touch of public transport magic.
    </p>
  </sbb-sidebar-content>
</sbb-sidebar-container>
```

The `sbb-sidebar-title` component extends the [sbb-title](/docs/elements-sbb-title--docs) component.

Use it inside the `sbb-sidebar` to display a header in the sidebar with a title.
The slot `title-section` is automatically assigned to be properly positioned on the `sbb-sidebar`.
In scenarios where the visual representation needs to be different from the semantic meaning of
the title level, it is possible to use the `visualLevel` property (default value: `5`).

```html
<sbb-sidebar role="navigation">
  <sbb-sidebar-title>A describing title of the sidebar</sbb-sidebar-title>
</sbb-sidebar>
```

The `sbb-sidebar-close-button` component extends the [sbb-secondary-button](/docs/elements-sbb-button-sbb-secondary-button--docs) component.
Use it in inside the [sbb-sidebar](/docs/elements-sbb-sidebar-sbb-sidebar--docs)
to display a close button in the sidebar.
The slot `title-section` is automatically assigned to be properly positioned on the `sbb-sidebar`.

Clicking the close button closes the parent sidebar.

```html
<sbb-sidebar role="navigation">
  <sbb-sidebar-close-button></sbb-sidebar-close-button>
  Content
</sbb-sidebar>
```

## Opening and closing a sidebar

A `<sbb-sidebar>` can be opened or closed using the `open()`, `close()` and `toggle()` methods.

The opened state can also be set via the `opened` property.

Listening to the `open` and `close` events allows to react after transitions have been executed.
If for a certain reason the opening or closing should be prevented,
it's possible to call `preventDefault()` on the `beforeopen` or `beforeclose` events.

**It is strongly recommended to use a button to toggle the sidebar.**
Even with `mode="side"` and an opened sidebar at larger sizes, the sidebar will collapse if there is not enough space.
In this case a toggle button is strongly recommended, otherwise the user will not be able to open the sidebar.
Ideally the button can be placed in the `<sbb-header>`.

### Close button

By slotting a `<sbb-sidebar-close-button>` into the `<sbb-sidebar>`, a close button will be shown.

```html
<sbb-sidebar role="navigation">
  <sbb-sidebar-close-button></sbb-sidebar-close-button>
  Sidebar Content
</sbb-sidebar>
```

## Title

We recommend to give the sidebar a title by using the `<sbb-sidebar-title>` element.

```html
<sbb-sidebar role="navigation">
  <sbb-sidebar-title>Title</sbb-sidebar-title>
</sbb-sidebar>
```

## Mode

The `<sbb-sidebar>` can be rendered in one of two different ways based on the `mode` property.

| Mode   | Description                                                                                                           |
| ------ | --------------------------------------------------------------------------------------------------------------------- |
| `side` | Sidebar appears side-by-side with the main content, shrinking the main content's width to make space for the sidebar. |
| `over` | Sidebar floats over the primary content, which is covered by a backdrop                                               |

If no `mode` is specified, `side` is used by default. The `over` sidebar mode shows a backdrop,
while the `side` mode does not.

If there is not enough space available and the mode is `side`, the sidebar collapses and automatically
changes to a forced `over` mode (the mode property itself will not change).
Whenever there is enough space available, the `<sbb-sidebar>` changes back to mode `side`.

At maximum, one `<sbb-sidebar>` with `mode="over"` should be opened simultaneously on a page.

```html
<sbb-sidebar mode="over" role="navigation"></sbb-sidebar>
```

## Style

If the `sbb-sidebar-container` is placed after the `sbb-header`, an automatic `margin-block-start` is added.
In other contexts you may need to set the margin manually, e.g. `margin-block-start: var(--sbb-header-height);`.

## Color

Per default, the `<sbb-sidebar>` receives a white background color. As alternative,
it's possible to set the color property to `milk`.
If using the `<sbb-sidebar>` along with a `<sbb-icon-sidebar>`, it's recommended to alternate
the background colors (`white` / `milk`) for a clear visual distinction.

```html
<sbb-sidebar color="milk" role="navigation"></sbb-sidebar>
```

## Position

An `<sbb-sidebar>` can be positioned via `position` property and its values `start` or `end`.
To display the sidebar on the right side, place the `<sbb-sidebar>`
after the `<sbb-sidebar-content>` in the DOM which guarantees a logical order for focusing.

```html
<sbb-sidebar-container>
  <sbb-sidebar-content role="main">Content</sbb-sidebar-content>
  <sbb-sidebar position="end" role="navigation">Sidebar Content</sbb-sidebar>
</sbb-sidebar-container>
```

## Size

The `<sbb-sidebar>` has a default width. The width can
be explicitly set via CSS:

```css
sbb-sidebar {
  width: 200px;
}
```

## Accessibility

If the sidebar is on `mode="over"`, the sidebar acts like an overlay element with an activated focus trap.

### Roles

The `<sbb-sidebar>` and `<sbb-sidebar-content>` should each be given an appropriate role attribute
depending on the context in which they are used.

For example, a `<sbb-sidebar>` that contains links
to other pages might be marked `role="navigation"`, whereas one that contains a table of
contents about might be marked as `role="directory"`. If there is no more specific role that
describes your sidebar, `role="region"` is recommended.

Similarly, the `<sbb-sidebar-content>` should be given a role based on what it contains. If it
represents the primary content of the page, it may make sense to mark it `role="main"`. If no more
specific role makes sense, `role="region"` is again a good fallback.

### Active / Current State

Whenever an action item has an active state, it's recommended to set `aria-current="page"`
respectively `accessibility-current="page"` for link elements.
For link elements, the class `sbb-active` can be used to visually display an active state.

```html
<sbb-sidebar role="navigation">
  <sbb-link-list>
    <sbb-block-link>Link 1</sbb-block-link>
    <sbb-block-link class="sbb-active" accessibility-current="page">Link 2</sbb-block-link>
  </sbb-link-list>
</sbb-sidebar
```

### Trigger Button

If a button should trigger the opening or closing, certain
accessibility information on the trigger button should be set.

- `aria-controls="id of the sidebar"` (id should be linked to the sidebar)
- `aria-expanded="true"` or `aria-expanded="false"` (should be updated to the opened state of the sidebar)
- `aria-label` (Describes the toggle action)

```html
<sbb-header expanded scroll-origin="content" size="s">
  <sbb-header-button
    id="toggle-button"
    icon-name="arrows-right-left-small"
    aria-controls="sidebar"
    aria-expanded="true"
    @click="${() => document.querySelector('#sidebar')?.toggle() }"
  >
    Toggle sidebar
  </sbb-header-button>
</sbb-header>
<sbb-sidebar-container>
  <sbb-sidebar
    id="sidebar"
    role="navigation"
    @open="${() => document.querySelector('#toggle-button')?.setAttribute('aria-expanded', 'true') }"
    @close="${() => document.querySelector('#toggle-button')?.setAttribute('aria-expanded', 'false') }"
  >
    <sbb-link-list>
      <sbb-block-link>Link 1</sbb-block-link>
      <sbb-block-link class="sbb-active" accessibility-current="page">Link 2</sbb-block-link>
    </sbb-link-list>
  </sbb-sidebar>
  <sbb-sidebar-content role="main" id="content">Content</sbb-sidebar-content>
</sbb-sidebar-container>
```

### Controlling initial focus

The first element with the attribute `sbb-focus-initial` will receive focus on opening.
If the attribute is not used, the first focusable element receives focus (recommended).

```html
<sbb-sidebar-container>
  <sbb-sidebar role="navigation">
    <sbb-link-list>
      <sbb-block-link>Link 1</sbb-block-link>
      <sbb-block-link sbb-focus-initial>Link 2</sbb-block-link>
    </sbb-link-list>
  </sbb-sidebar>
  <sbb-sidebar-content role="main">Content</sbb-sidebar-content>
</sbb-sidebar-container>
```

## Combine with `<sbb-icon-sidebar>`

It's possible the combine the `<sbb-sidebar>` with the `<sbb-icon-sidebar>` as following:

```html
<sbb-icon-sidebar-container>
  <sbb-icon-sidebar>Icon sidebar content</sbb-icon-sidebar>
  <sbb-icon-sidebar-content>
    <sbb-sidebar-container>
      <sbb-sidebar role="navigation">Sidebar content</sbb-sidebar>
      <sbb-sidebar-content role="main">Content</sbb-sidebar-content>
    </sbb-sidebar-container>
  </sbb-icon-sidebar-content>
</sbb-icon-sidebar-container>
```

## Use with `sbb-header`

In order to correctly display the shadow of the header when scrolled,
you need to set the `scrollOrigin` property of the `<sbb-header>`.
The value should be either the id of the `<sbb-sidebar-content>`
or the element reference itself. Note that when using nested sidebars, it's required to
continuously update the `scrollOrigin` property with the id/reference of the
currently active `<sbb-sidebar-content>`. Also, depending
on how e.g. a RouterOutlet (Angular) is used, it may also be necessary to update the `scrollOrigin`
property when the navigation changes.

```html
<sbb-header scroll-origin="content">...</sbb-header>
<sbb-sidebar-container>
  <sbb-sidebar role="navigation">...</sbb-sidebar>
  <sbb-sidebar-content id="content" role="main">Content</sbb-sidebar-content>
</sbb-sidebar-container>
```
