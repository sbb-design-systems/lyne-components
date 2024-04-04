/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-navigation-link renders DOM"] = 
`<sbb-navigation-link
  data-action=""
  data-link=""
  dir="ltr"
  href="https://www.sbb.ch"
  role="link"
  size="l"
  tabindex="0"
  target="_blank"
>
  This is a link
</sbb-navigation-link>
`;
/* end snapshot sbb-navigation-link renders DOM */

snapshots["sbb-navigation-link renders Shadow DOM"] = 
`<a
  class="sbb-action-base sbb-navigation-link"
  href="https://www.sbb.ch"
  rel="external noopener nofollow"
  role="presentation"
  tabindex="-1"
  target="_blank"
>
  <sbb-icon
    aria-hidden="true"
    data-namespace="default"
    name="dash-small"
    role="img"
  >
  </sbb-icon>
  <slot>
  </slot>
  <sbb-screen-reader-only>
    . Link target opens in a new window.
  </sbb-screen-reader-only>
</a>
`;
/* end snapshot sbb-navigation-link renders Shadow DOM */

snapshots["sbb-navigation-link renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "This is a link . Link target opens in a new window.",
      "children": [
        {
          "role": "link",
          "name": "This is a link . Link target opens in a new window."
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-navigation-link renders A11y tree Chrome */

snapshots["sbb-navigation-link renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "This is a link . Link target opens in a new window.",
      "children": [
        {
          "role": "link",
          "name": "This is a link . Link target opens in a new window.",
          "value": "https://www.sbb.ch/"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-navigation-link renders A11y tree Firefox */

