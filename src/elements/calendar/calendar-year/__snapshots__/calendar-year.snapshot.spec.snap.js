/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-calendar-year renders DOM"] = 
`<sbb-calendar-year tabindex="-1">
</sbb-calendar-year>
`;
/* end snapshot sbb-calendar-year renders DOM */

snapshots["sbb-calendar-year renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-calendar-year">
  2026
</span>
`;
/* end snapshot sbb-calendar-year renders Shadow DOM */

snapshots["sbb-calendar-year renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "button",
      "name": "2026",
      "invalid": false,
      "focusable": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-calendar-year renders A11y tree Chrome */

