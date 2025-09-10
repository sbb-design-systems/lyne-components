/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-mini-calendar-month renders January DOM"] = 
`<sbb-mini-calendar-month
  date="2025-01"
  style="--sbb-mini-calendar-month-offset: 3;"
>
  <sbb-mini-calendar-day
    aria-label="January 1, 2025"
    data-action=""
    data-button=""
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
    aria-label="June 1, 2025"
    data-action=""
    data-button=""
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
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "January 1, 2025"
    },
    {
      "role": "text",
      "name": "Jan."
    }
  ]
}
</p>
`;
/* end snapshot sbb-mini-calendar-month renders January A11y tree Chrome */

snapshots["sbb-mini-calendar-month renders January A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "January 1, 2025"
    },
    {
      "role": "text leaf",
      "name": "Jan."
    }
  ]
}
</p>
`;
/* end snapshot sbb-mini-calendar-month renders January A11y tree Firefox */

