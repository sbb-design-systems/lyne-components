/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-calendar-day renders DOM"] = 
`<sbb-calendar-day
  slot="2025-01-01"
  tabindex="-1"
>
</sbb-calendar-day>
`;
/* end snapshot sbb-calendar-day renders DOM */

snapshots["sbb-calendar-day renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-calendar-day">
  <span
    aria-hidden="true"
    class="sbb-calendar-day__value"
  >
    1
  </span>
  <span class="sbb-calendar-day__extra">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-calendar-day renders Shadow DOM */

snapshots["sbb-calendar-day renders with content DOM"] = 
`<sbb-calendar-day
  slot="2025-01-01"
  tabindex="-1"
>
  <span>
    99.-
  </span>
</sbb-calendar-day>
`;
/* end snapshot sbb-calendar-day renders with content DOM */

snapshots["sbb-calendar-day renders with content Shadow DOM"] = 
`<span class="sbb-action-base sbb-calendar-day">
  <span
    aria-hidden="true"
    class="sbb-calendar-day__value"
  >
    1
  </span>
  <span class="sbb-calendar-day__extra">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-calendar-day renders with content Shadow DOM */

snapshots["sbb-calendar-day renders A11y tree Chrome"] = 
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
/* end snapshot sbb-calendar-day renders A11y tree Chrome */

snapshots["sbb-calendar-day renders with content A11y tree Chrome"] = 
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
/* end snapshot sbb-calendar-day renders with content A11y tree Chrome */

