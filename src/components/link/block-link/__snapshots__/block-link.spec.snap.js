/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-block-link renders - DOM"] = 
`<sbb-block-link
  aria-label="Travelcards &amp; tickets"
  data-action=""
  data-link=""
  data-sbb-link=""
  data-slot-names="unnamed"
  dir="ltr"
  download=""
  href="https://github.com/lyne-design-system/lyne-components"
  icon-placement="start"
  role="link"
  size="m"
  tabindex="0"
>
  Travelcards & tickets.
</sbb-block-link>
`;
/* end snapshot sbb-block-link renders - DOM */

snapshots["sbb-block-link renders - ShadowDOM"] = 
`<a
  class="sbb-action-base sbb-block-link"
  download=""
  href="https://github.com/lyne-design-system/lyne-components"
  role="presentation"
  tabindex="-1"
>
  <span class="sbb-link__icon">
    <slot name="icon">
    </slot>
  </span>
  <slot>
  </slot>
</a>
`;
/* end snapshot sbb-block-link renders - ShadowDOM */

snapshots["sbb-block-link A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Travelcards & tickets",
      "children": [
        {
          "role": "link",
          "name": "Travelcards & tickets."
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-block-link A11y tree Chrome */

snapshots["sbb-block-link A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Travelcards & tickets",
      "children": [
        {
          "role": "link",
          "name": "Travelcards & tickets.",
          "value": "https://github.com/lyne-design-system/lyne-components"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-block-link A11y tree Firefox */

