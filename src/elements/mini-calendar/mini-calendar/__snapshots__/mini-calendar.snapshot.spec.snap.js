/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-mini-calendar renders DOM"] = 
`<sbb-mini-calendar orientation="horizontal">
  <sbb-mini-calendar-month
    date="2025-01"
    style="--sbb-mini-calendar-month-offset: 3;"
  >
    <sbb-mini-calendar-day
      date="2025-01-01"
      tabindex="0"
    >
    </sbb-mini-calendar-day>
  </sbb-mini-calendar-month>
</sbb-mini-calendar>
`;
/* end snapshot sbb-mini-calendar renders DOM */

snapshots["sbb-mini-calendar renders Shadow DOM"] = 
`<slot>
</slot>
`;
/* end snapshot sbb-mini-calendar renders Shadow DOM */

snapshots["sbb-mini-calendar renders A11y tree Chrome"] = 
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
              "ignored": true,
              "role": "none",
              "children": [
                {
                  "ignored": true,
                  "role": "none",
                  "children": [
                    {
                      "role": "generic",
                      "name": ""
                    },
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
          ]
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-mini-calendar renders A11y tree Chrome */

