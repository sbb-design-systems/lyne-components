/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-link-button renders DOM"] = 
`<sbb-link-button
  aria-label="Travelcards &amp; tickets"
  form="form"
  name="name"
  size="m"
  tabindex="0"
  type="button"
  value="value"
>
  Travelcards & tickets.
</sbb-link-button>
`;
/* end snapshot sbb-link-button renders DOM */

snapshots["sbb-link-button renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-link-button">
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-link-button renders Shadow DOM */

snapshots["sbb-link-button renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "button",
      "name": "Travelcards & tickets",
      "invalid": false,
      "focusable": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-link-button renders A11y tree Chrome */

