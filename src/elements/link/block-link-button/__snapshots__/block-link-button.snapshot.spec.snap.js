/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-block-link-button renders DOM"] = 
`<sbb-block-link-button
  form="formid"
  icon-placement="end"
  name="name"
  negative=""
  size="m"
  tabindex="0"
  type="submit"
>
  <sbb-icon
    name="chevron-small-right-small"
    slot="icon"
  >
  </sbb-icon>
  Travelcards & tickets.
</sbb-block-link-button>
`;
/* end snapshot sbb-block-link-button renders DOM */

snapshots["sbb-block-link-button renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-block-link-button">
  <span class="sbb-link__icon">
    <slot name="icon">
    </slot>
  </span>
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-block-link-button renders Shadow DOM */

snapshots["sbb-block-link-button renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "button",
      "name": "Travelcards & tickets.",
      "invalid": false,
      "focusable": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-block-link-button renders A11y tree Chrome */

