/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-teaser-hero should render without link"] = 
`<span class="sbb-teaser-hero">
  <span class="sbb-teaser-hero__panel">
    <p class="sbb-teaser-hero__panel-text">
      <slot>
      </slot>
    </p>
  </span>
  <slot name="image">
    <sbb-image
      alt="SBB CFF FFS Employee"
      image-src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Hoehenrundweg-Gryden-Lenk.jpg"
    >
    </sbb-image>
  </slot>
</span>
`;
/* end snapshot sbb-teaser-hero should render without link */

snapshots["sbb-teaser-hero should render with slots"] = 
`<a
  class="sbb-teaser-hero"
  href="https://www.sbb.ch"
  role="presentation"
  tabindex="-1"
>
  <span class="sbb-teaser-hero__panel">
    <p class="sbb-teaser-hero__panel-text">
      <slot>
      </slot>
    </p>
    <sbb-link
      class="sbb-teaser-hero__panel-link"
      data-slot-names="link-content unnamed"
      dir="ltr"
      icon-name="chevron-small-right-small"
      icon-placement="end"
      is-static=""
      negative=""
      size="m"
      variant="block"
    >
      <slot name="link-content">
      </slot>
    </sbb-link>
  </span>
  <slot name="image">
  </slot>
</a>
`;
/* end snapshot sbb-teaser-hero should render with slots */

snapshots["sbb-teaser-hero should render all properties Dom"] = 
`<sbb-teaser-hero
  aria-label="label"
  dir="ltr"
  href="https://www.sbb.ch"
  image-alt="SBB CFF FFS Employee"
  image-src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Hoehenrundweg-Gryden-Lenk.jpg"
  link-content="Find out more"
  rel="external"
  role="link"
  tabindex="0"
  target="_blank"
>
  Break out and explore castles and palaces.
</sbb-teaser-hero>
`;
/* end snapshot sbb-teaser-hero should render all properties Dom */

snapshots["sbb-teaser-hero should render all properties ShadowDom"] = 
`<a
  class="sbb-teaser-hero"
  href="https://www.sbb.ch"
  rel="external"
  role="presentation"
  tabindex="-1"
  target="_blank"
>
  <span class="sbb-teaser-hero__panel">
    <p class="sbb-teaser-hero__panel-text">
      <slot>
      </slot>
    </p>
    <sbb-link
      class="sbb-teaser-hero__panel-link"
      data-slot-names="unnamed"
      dir="ltr"
      icon-name="chevron-small-right-small"
      icon-placement="end"
      is-static=""
      negative=""
      size="m"
      variant="block"
    >
      <slot name="link-content">
        Find out more
      </slot>
    </sbb-link>
  </span>
  <slot name="image">
    <sbb-image
      alt="SBB CFF FFS Employee"
      image-src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Hoehenrundweg-Gryden-Lenk.jpg"
    >
    </sbb-image>
  </slot>
  <span class="sbb-teaser-hero__opens-in-new-window">
    . Link target opens in new window.
  </span>
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
      "name": "label",
      "children": [
        {
          "role": "link",
          "name": "Break out and explore castles and palaces. Find out more . Link target opens in new window."
        }
      ]
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
      "children": [
        {
          "role": "link",
          "name": "Break out and explore castles and palaces. Find out more . Link target opens in new window.",
          "value": "https://www.sbb.ch/"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-teaser-hero should render all properties A11y tree Firefox */

snapshots["sbb-teaser-hero should render all properties A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "label",
      "children": [
        {
          "role": "link",
          "name": "Break out and explore castles and palaces. Find out more SBB CFF FFS Employee . Link target opens in new window.",
          "children": [
            {
              "role": "text",
              "name": "Break out and explore castles and palaces."
            },
            {
              "role": "text",
              "name": "Find out more"
            },
            {
              "role": "image",
              "name": "SBB CFF FFS Employee"
            },
            {
              "role": "text",
              "name": ". "
            },
            {
              "role": "text",
              "name": "Link target opens in new window."
            }
          ]
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-teaser-hero should render all properties A11y tree Safari */

