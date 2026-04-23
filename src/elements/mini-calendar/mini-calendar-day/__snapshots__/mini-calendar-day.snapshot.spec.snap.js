/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-mini-calendar-day renders DOM"] = 
`<sbb-mini-calendar-day
  date="2025-01-01"
  tabindex="0"
>
</sbb-mini-calendar-day>
`;
/* end snapshot sbb-mini-calendar-day renders DOM */

snapshots["sbb-mini-calendar-day renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-mini-calendar-day">
</span>
`;
/* end snapshot sbb-mini-calendar-day renders Shadow DOM */

snapshots["sbb-mini-calendar-day renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "button",
      "name": "January 1, 2025",
      "invalid": false,
      "focusable": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-mini-calendar-day renders A11y tree Chrome */

