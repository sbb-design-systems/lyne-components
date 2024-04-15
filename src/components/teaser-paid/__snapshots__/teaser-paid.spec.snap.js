/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-teaser-paid Dom"] = 
`<sbb-teaser-paid
  aria-label="label"
  data-action=""
  data-link=""
  dir="ltr"
  href="https://www.sbb.ch"
  rel="external"
  role="link"
  tabindex="0"
  target="_blank"
>
</sbb-teaser-paid>
`;
/* end snapshot sbb-teaser-paid Dom */

snapshots["sbb-teaser-paid ShadowDom"] = 
`<a
  class="sbb-action-base sbb-teaser-paid"
  href="https://www.sbb.ch"
  rel="external"
  role="presentation"
  tabindex="-1"
  target="_blank"
>
  <slot name="chip">
  </slot>
  <slot name="image">
  </slot>
  <sbb-screen-reader-only>
    . Link target opens in a new window.
  </sbb-screen-reader-only>
</a>
`;
/* end snapshot sbb-teaser-paid ShadowDom */

snapshots["sbb-teaser-paid A11y tree Chrome"] = 
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
          "name": ". Link target opens in a new window."
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-teaser-paid A11y tree Chrome */

snapshots["sbb-teaser-paid A11y tree Firefox"] = 
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
          "name": ". Link target opens in a new window.",
          "value": "https://www.sbb.ch/"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-teaser-paid A11y tree Firefox */

