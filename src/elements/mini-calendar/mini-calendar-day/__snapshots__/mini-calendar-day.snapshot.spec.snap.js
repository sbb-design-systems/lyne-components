/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-mini-calendar-day renders DOM"] = 
`<sbb-mini-calendar-day
  aria-label="January 1, 2025"
  data-action=""
  data-button=""
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
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "January 1, 2025"
    }
  ]
}
</p>
`;
/* end snapshot sbb-mini-calendar-day renders A11y tree Chrome */

snapshots["sbb-mini-calendar-day renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "January 1, 2025"
    }
  ]
}
</p>
`;
/* end snapshot sbb-mini-calendar-day renders A11y tree Firefox */

