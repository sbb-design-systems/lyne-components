/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-teaser-hero renders DOM"] = 
`<sbb-teaser-hero
  accessibility-label="label"
  data-action=""
  data-link=""
  data-slot-names="chip unnamed"
  href="https://www.sbb.ch"
  image-alt="SBB CFF FFS Employee"
  link-content="Find out more"
  rel="external"
  target="_blank"
>
  Break out and explore castles and palaces.
  <sbb-chip
    color="charcoal"
    size="xxs"
    slot="chip"
  >
    Label
  </sbb-chip>
</sbb-teaser-hero>
`;
/* end snapshot sbb-teaser-hero renders DOM */

snapshots["sbb-teaser-hero renders Shadow DOM"] = 
`<a
  aria-label="label"
  class="sbb-action-base sbb-teaser-hero"
  href="https://www.sbb.ch"
  rel="external"
  target="_blank"
>
  <slot name="chip">
  </slot>
  <span class="sbb-teaser-hero__panel">
    <p class="sbb-teaser-hero__panel-text">
      <slot>
      </slot>
    </p>
    <sbb-block-link-static
      class="sbb-teaser-hero__panel-link"
      data-action=""
      data-sbb-link=""
      data-slot-names="unnamed"
      icon-name="chevron-small-right-small"
      icon-placement="end"
      negative=""
      size="m"
    >
      <slot name="link-content">
        Find out more
      </slot>
    </sbb-block-link-static>
  </span>
  <slot name="image">
    <sbb-image
      alt="SBB CFF FFS Employee"
      aspect-ratio="16-9"
      border-radius="default"
      data-loaded=""
      data-teaser=""
    >
    </sbb-image>
  </slot>
  <sbb-screen-reader-only>
    . Link target opens in a new window.
  </sbb-screen-reader-only>
</a>
`;
/* end snapshot sbb-teaser-hero renders Shadow DOM */

snapshots["sbb-teaser-hero renders with slots DOM"] = 
`<sbb-teaser-hero
  accessibility-label="label"
  data-action=""
  data-link=""
  data-slot-names="chip image link-content unnamed"
  href="https://www.sbb.ch"
>
  Break out and explore castles and palaces.
  <span slot="link-content">
    Find out more
  </span>
  <sbb-image
    alt="SBB CFF FFS Employee"
    aspect-ratio="16-9"
    border-radius="default"
    data-loaded=""
    data-teaser=""
    slot="image"
  >
  </sbb-image>
  <sbb-chip
    color="charcoal"
    size="xxs"
    slot="chip"
  >
    Label
  </sbb-chip>
</sbb-teaser-hero>
`;
/* end snapshot sbb-teaser-hero renders with slots DOM */

snapshots["sbb-teaser-hero renders with slots Shadow DOM"] = 
`<a
  aria-label="label"
  class="sbb-action-base sbb-teaser-hero"
  href="https://www.sbb.ch"
>
  <slot name="chip">
  </slot>
  <span class="sbb-teaser-hero__panel">
    <p class="sbb-teaser-hero__panel-text">
      <slot>
      </slot>
    </p>
    <sbb-block-link-static
      class="sbb-teaser-hero__panel-link"
      data-action=""
      data-sbb-link=""
      data-slot-names="link-content unnamed"
      icon-name="chevron-small-right-small"
      icon-placement="end"
      negative=""
      size="m"
    >
      <slot name="link-content">
      </slot>
    </sbb-block-link-static>
  </span>
  <slot name="image">
  </slot>
</a>
`;
/* end snapshot sbb-teaser-hero renders with slots Shadow DOM */

snapshots["sbb-teaser-hero renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "label"
    }
  ]
}
</p>
`;
/* end snapshot sbb-teaser-hero renders A11y tree Chrome */

snapshots["sbb-teaser-hero renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "label",
      "value": "https://www.sbb.ch/"
    }
  ]
}
</p>
`;
/* end snapshot sbb-teaser-hero renders A11y tree Firefox */

