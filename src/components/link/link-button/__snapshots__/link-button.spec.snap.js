/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-link-button renders - DOM"] = 
`<sbb-link-button
  aria-label="Travelcards &amp; tickets"
  data-action=""
  data-button=""
  data-sbb-link=""
  data-slot-names="unnamed"
  dir="ltr"
  form="form"
  name="name"
  role="button"
  size="m"
  tabindex="0"
  type="button"
  value="value"
>
  Travelcards & tickets.
</sbb-link-button>
`;
/* end snapshot sbb-link-button renders - DOM */

snapshots["sbb-link-button renders - ShadowDOM"] = 
`<span class="sbb-action-base sbb-link-button">
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-link-button renders - ShadowDOM */

snapshots["sbb-link-button A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Travelcards & tickets"
    }
  ]
}
</p>
`;
/* end snapshot sbb-link-button A11y tree Chrome */

snapshots["sbb-link-button A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Travelcards & tickets"
    }
  ]
}
</p>
`;
/* end snapshot sbb-link-button A11y tree Firefox */

snapshots["sbb-link-button A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Travelcards & tickets"
    }
  ]
}
</p>
`;
/* end snapshot sbb-link-button A11y tree Safari */

