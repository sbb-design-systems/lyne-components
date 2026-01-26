/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-mini-calendar-month renders January DOM"] = 
`<sbb-mini-calendar-month
  date="2025-01"
  style="--sbb-mini-calendar-month-offset: 3;"
>
  <sbb-mini-calendar-day
    date="2025-01-01"
    tabindex="0"
  >
  </sbb-mini-calendar-day>
</sbb-mini-calendar-month>
`;
/* end snapshot sbb-mini-calendar-month renders January DOM */

snapshots["sbb-mini-calendar-month renders January Shadow DOM"] = 
`<div class="sbb-mini-calendar-month">
  <div class="sbb-mini-calendar-month-label-year">
    2025
  </div>
  <div class="sbb-mini-calendar-month-wrapper">
    <slot>
    </slot>
  </div>
  <div class="sbb-mini-calendar-month-label-month">
    Jan.
  </div>
</div>
`;
/* end snapshot sbb-mini-calendar-month renders January Shadow DOM */

snapshots["sbb-mini-calendar-month renders June DOM"] = 
`<sbb-mini-calendar-month
  date="2025-06"
  style="--sbb-mini-calendar-month-offset: 7;"
>
  <sbb-mini-calendar-day
    date="2025-06-01"
    tabindex="0"
  >
  </sbb-mini-calendar-day>
</sbb-mini-calendar-month>
`;
/* end snapshot sbb-mini-calendar-month renders June DOM */

snapshots["sbb-mini-calendar-month renders June Shadow DOM"] = 
`<div class="sbb-mini-calendar-month">
  <div class="sbb-mini-calendar-month-label-year">
    2025
  </div>
  <div class="sbb-mini-calendar-month-wrapper">
    <slot>
    </slot>
  </div>
  <div class="sbb-mini-calendar-month-label-month">
    Jun.
  </div>
</div>
`;
/* end snapshot sbb-mini-calendar-month renders June Shadow DOM */

snapshots["sbb-mini-calendar-month renders January A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "ignored": true,
      "role": "none",
      "children": [
        {
          "ignored": true,
          "role": "none",
          "children": [
            {
              "role": "button",
              "name": "January 1, 2025",
              "invalid": false,
              "focusable": true
            }
          ]
        },
        {
          "role": "generic",
          "name": ""
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-mini-calendar-month renders January A11y tree Chrome */

