/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-tab-group renders DOM"] = 
`<sbb-tab-group initial-selected-index="0">
  <sbb-tab-label
    active=""
    slot="tab-bar"
    tabindex="0"
  >
    Test tab label 1
  </sbb-tab-label>
  <sbb-tab
    id="sbb-tab-0"
    tabindex="0"
  >
    Test tab content 1
  </sbb-tab>
  <sbb-tab-label
    slot="tab-bar"
    tabindex="-1"
  >
    Test tab label 2
  </sbb-tab-label>
  <sbb-tab
    id="sbb-tab-1"
    tabindex="0"
  >
    Test tab content 2
  </sbb-tab>
  <sbb-tab-label
    disabled=""
    slot="tab-bar"
    tabindex="-1"
  >
    Test tab label 3
  </sbb-tab-label>
  <sbb-tab
    id="sbb-tab-2"
    tabindex="0"
  >
    Test tab content 3
  </sbb-tab>
  <sbb-tab-label
    slot="tab-bar"
    tabindex="-1"
  >
    Test tab label 4
  </sbb-tab-label>
  <sbb-tab
    id="sbb-tab-3"
    tabindex="0"
  >
    Test tab content 4
  </sbb-tab>
</sbb-tab-group>
`;
/* end snapshot sbb-tab-group renders DOM */

snapshots["sbb-tab-group renders Shadow DOM"] = 
`<div
  class="sbb-tab-group"
  role="tablist"
>
  <slot name="tab-bar">
  </slot>
</div>
<div class="sbb-tab-group-content">
  <slot>
  </slot>
</div>
`;
/* end snapshot sbb-tab-group renders Shadow DOM */

snapshots["sbb-tab-group renders A11y tree Chrome"] = 
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
          "role": "tablist",
          "name": "",
          "multiselectable": false,
          "orientation": "horizontal"
        },
        {
          "ignored": true,
          "role": "none",
          "children": [
            {
              "role": "tabpanel",
              "name": "",
              "focusable": true
            },
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
                      "role": "none"
                    }
                  ]
                }
              ]
            },
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
                      "role": "none"
                    }
                  ]
                }
              ]
            },
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
                      "role": "none"
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
/* end snapshot sbb-tab-group renders A11y tree Chrome */

