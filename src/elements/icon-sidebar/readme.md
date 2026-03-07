The `<sbb-icon-sidebar>` is a component that can display action items with an icon on the left or right side of the viewport.

The `sbb-icon-sidebar-container` is a component that holds together the `sbb-icon-sidebar-content`
and one or two `sbb-icon-sidebar` elements.

Inside the `sbb-icon-sidebar-content` another `sbb-icon-sidebar-container` can be placed
to achieve multiple nested icon sidebars.

The icon sidebar components are designed to add side content to a fullscreen app.
To set up an icon sidebar we use three components: `<sbb-icon-sidebar-container>` which acts as a structural container for
our content and sidebar, `<sbb-icon-sidebar-content>` which represents the main content,
and `<sbb-icon-sidebar>` which represents the added side content.

```html
<sbb-icon-sidebar-container>
  <sbb-icon-sidebar>
    <sbb-icon-sidebar-link
      sbb-tooltip="Go to the party"
      accessibility-label="Go to the party"
      icon-name="glass-cocktail-small"
      href="#"
    ></sbb-icon-sidebar-link>
    <sbb-icon-sidebar-link
      sbb-tooltip="Be a unicorn"
      accessibility-label="Be a unicorn"
      icon-name="unicorn-small"
      href="#"
      class="sbb-active"
      accessibility-current="page"
    ></sbb-icon-sidebar-link>
  </sbb-icon-sidebar>
  <sbb-icon-sidebar-content role="main">
    <p style="padding: var(--sbb-spacing-fixed-4x); margin: 0">
      In the enchanting world of fantasy, unicorns are legendary creatures known for their grace,
      purity, and magical abilities. These mystical beings have inspired countless tales of bravery
      and wonder. Here, we delve into some captivating unicorn success stories that continue to
      enchant and inspire, each with a touch of public transport magic.
    </p>
  </sbb-icon-sidebar-content>
</sbb-icon-sidebar-container>
```

## Style

If the `sbb-sidebar-container` is placed after the `sbb-header`, an automatic `margin-block-start` is added.
In other contexts you may need to set the margin manually, e.g. `margin-block-start: var(--sbb-header-height);`.

## Color

Per default, the `<sbb-icon-sidebar>` receives a white background color. As alternative,
it's possible to set the color property to `milk`.
If using the `<sbb-icon-sidebar>` along with a `<sbb-sidebar>`, it's recommended to alternate
the background colors (`white` / `milk`) for a clear visual distinction.

```html
<sbb-icon-sidebar color="milk"></sbb-icon-sidebar>
```

## Position

An `<sbb-icon-sidebar>` can be positioned at the left or right side of the viewport.
To display the icon sidebar on the right side, place the `<sbb-icon-sidebar>`
after the `<sbb-icon-sidebar-content>` in the DOM.
Technically it's possible to place two icon sidebars, but from UX perspective it's not recommended.

**positioned on the right side:**

```html
<sbb-icon-sidebar-container>
  <sbb-icon-sidebar-content role="main">Content</sbb-icon-sidebar-content>
  <sbb-icon-sidebar>Sidebar Content</sbb-icon-sidebar>
</sbb-icon-sidebar-container>
```

## Icon Sidebar Link

The `<sbb-icon-sidebar-link>` component provides the same functionality as a native `<a>`,
enhanced with the design of the icon sidebar link.

```html
<sbb-icon-sidebar-link
  icon-name="glass-cocktail-small"
  href="https://www.sbb.ch"
  accessibility-label="Go to the party"
></sbb-icon-sidebar-link>
```

As an alternative, the icon can be slotted:

```html
<sbb-icon-sidebar-link accessibility-label="Go to the party" href="https://www.sbb.ch">
  <sbb-icon name="glass-cocktail-small" slot="icon"></sbb-icon>
</sbb-icon-sidebar-link>
```

### Active / current state

Use `sbb-active` CSS class to visually indicate whether the icon sidebar button is currently selected.

```html
<sbb-icon-sidebar-link
  href="https://www.sbb.ch"
  icon-name="glass-cocktail-small"
  accessibility-label="Go to the party"
  class="sbb-active"
  accessibility-current="page"
></sbb-icon-sidebar-link>
```

## Icon Sidebar Button

The `<sbb-icon-sidebar-button>` component provides the same functionality as a native `<button>`
enhanced with the design of the icon sidebar button.
The `<sbb-icon-sidebar-button>` is intended to be used inside `<sbb-icon-sidebar>`.

```html
<sbb-icon-sidebar-button
  icon-name="glass-cocktail-small"
  aria-label="Go to the party"
></sbb-icon-sidebar-button>
```

As an alternative, the icon can be slotted:

```html
<sbb-icon-sidebar-button aria-label="Go to the party">
  <sbb-icon name="glass-cocktail-small" slot="icon"></sbb-icon>
</sbb-icon-sidebar-button>
```

### Active / current state

Use `sbb-active` CSS class to visually indicate whether the icon sidebar button is currently selected.

```html
<sbb-icon-sidebar-button
  icon-name="glass-cocktail-small"
  aria-label="Go to the party"
  class="sbb-active"
  aria-current="page"
></sbb-icon-sidebar-button>
```

## Combine with `sbb-sidebar`

It's possible the combine the `<sbb-icon-sidebar>` with the `<sbb-sidebar>` as following:

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
The value should be either the id of the `<sbb-sidebar-content>` / `<sbb-icon-sidebar-content>`
or the element reference itself. Note that when using nested sidebars, it's required to
continuously update the `scrollOrigin` property with the id/reference of the
currently active `<sbb-sidebar-content>` / `<sbb-icon-sidebar-content>`. Also, depending
on how e.g. a RouterOutlet (Angular) is used, it may also be necessary to update the `scrollOrigin`
property when the navigation changes.

```html
<sbb-header scroll-origin="content">...</sbb-header>
<sbb-icon-sidebar-container>
  <sbb-icon-sidebar>...</sbb-icon-sidebar>
  <sbb-icon-sidebar-content id="content" role="main">Content</sbb-sidebar-content>
</sbb-icon-sidebar-container>
```

## Accessibility

The `<sbb-icon-sidebar>` has the role `navigation` applied.

The `<sbb-sidebar-content>` should be given a role based on what it contains. If it
represents the primary content of the page, it may make sense to mark it `role="main"`. If no more
specific role makes sense, `role="region"` is a good fallback.

As described in [sbb-icon-sidebar-link](/docs/elements-sbb-sidebar-sbb-icon-sidebar-link--docs) and
[sbb-icon-sidebar-button](/docs/elements-sbb-sidebar-sbb-icon-sidebar-button--docs), it's important to set
both a label and a tooltip to the action elements.
It's also described how to set the current icon as active (aria-current).

The `<sbb-icon-sidebar-content>` should be given a role based on what it contains. If it
represents the primary content of the page, it may make sense to mark it `role="main"`. If no more
specific role makes sense, `role="region"` is a good fallback.

```html
<sbb-icon-sidebar-container>
  <sbb-icon-sidebar>Sidebar Content</sbb-icon-sidebar>
  <sbb-icon-sidebar-content role="main">Content</sbb-icon-sidebar-content>
</sbb-icon-sidebar-container>
```

For the `sbb-icon-sidebar-button` and `sbb-icon-sidebar-link>` the definition of a meaningful
`aria-label` or `accessibility-label` (`sbb-icon-sidebar-link>`, forwarded as `aria-label` to the
inner `<a>` element) is mandatory as only an icon is displayed.
To show the user which entry is active, `accessibility-current='page'` (or `aria-current="page"`
for `sbb-icon-sidebar-button`) should be set whenever `sbb-active` class is set.
See https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current for more
information.
