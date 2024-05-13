/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-teaser-hero should render with slots"] = 
`<a
  aria-label="label"
  class="sbb-action-base sbb-teaser-hero"
  href="https://www.sbb.ch"
>
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
      dir="ltr"
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
/* end snapshot sbb-teaser-hero should render with slots */

snapshots["sbb-teaser-hero should render all properties Dom"] = 
`<sbb-teaser-hero
  accessibility-label="label"
  data-action=""
  data-link=""
  dir="ltr"
  href="https://www.sbb.ch"
  image-alt="SBB CFF FFS Employee"
  image-src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Hoehenrundweg-Gryden-Lenk.jpg"
  link-content="Find out more"
  rel="external"
  target="_blank"
>
  Break out and explore castles and palaces.
</sbb-teaser-hero>
`;
/* end snapshot sbb-teaser-hero should render all properties Dom */

snapshots["sbb-teaser-hero should render all properties ShadowDom"] = 
`<a
  aria-label="label"
  class="sbb-action-base sbb-teaser-hero"
  href="https://www.sbb.ch"
  rel="external"
  target="_blank"
>
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
      dir="ltr"
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
      image-src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Hoehenrundweg-Gryden-Lenk.jpg"
    >
    </sbb-image>
  </slot>
  <sbb-screen-reader-only>
    . Link target opens in a new window.
  </sbb-screen-reader-only>
</a>
`;
/* end snapshot sbb-teaser-hero should render all properties ShadowDom */

snapshots["sbb-teaser-hero should render all properties A11y tree Chrome"] = 
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
/* end snapshot sbb-teaser-hero should render all properties A11y tree Chrome */

snapshots["sbb-teaser-hero should render all properties A11y tree Firefox"] = 
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
/* end snapshot sbb-teaser-hero should render all properties A11y tree Firefox */

