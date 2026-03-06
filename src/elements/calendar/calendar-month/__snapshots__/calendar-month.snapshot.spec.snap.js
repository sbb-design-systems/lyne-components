/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-calendar-month renders DOM"] = 
`<sbb-calendar-month tabindex="-1">
</sbb-calendar-month>
`;
/* end snapshot sbb-calendar-month renders DOM */

snapshots["sbb-calendar-month renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-calendar-month">
  Feb
</span>
`;
/* end snapshot sbb-calendar-month renders Shadow DOM */

snapshots["sbb-calendar-month renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "button",
      "name": "February 2025",
      "invalid": false,
      "focusable": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-calendar-month renders A11y tree Chrome */

