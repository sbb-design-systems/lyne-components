/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-mini-calendar renders DOM"] = 
`<sbb-mini-calendar orientation="horizontal">
  <sbb-mini-calendar-month
    date="2025-01"
    style="--sbb-mini-calendar-month-offset: 3;"
  >
    <sbb-mini-calendar-day
      data-action=""
      data-button=""
      date="2025-01-01"
      tabindex="0"
    >
    </sbb-mini-calendar-day>
  </sbb-mini-calendar-month>
</sbb-mini-calendar>
`;
/* end snapshot sbb-mini-calendar renders DOM */

snapshots["sbb-mini-calendar renders Shadow DOM"] = 
`<div class="sbb-mini-calendar">
  <slot>
  </slot>
</div>
`;
/* end snapshot sbb-mini-calendar renders Shadow DOM */

snapshots["sbb-mini-calendar renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "2025"
    },
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
/* end snapshot sbb-mini-calendar renders A11y tree Firefox */

snapshots["sbb-mini-calendar renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "2025"
    },
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
/* end snapshot sbb-mini-calendar renders A11y tree Chrome */

