/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-tab-group renders DOM"] = 
`<sbb-tab-group initial-selected-index="0">
  <sbb-tab-label
    active=""
    aria-controls="sbb-tab-panel-1"
    aria-selected="true"
    data-size="l"
    data-slot-names="unnamed"
    slot="tab-bar"
    tabindex="0"
  >
    Test tab label 1
  </sbb-tab-label>
  <sbb-tab
    active=""
    id="sbb-tab-panel-1"
    tabindex="0"
  >
    Test tab content 1
  </sbb-tab>
  <sbb-tab-label
    aria-controls="sbb-tab-panel-2"
    aria-selected="false"
    data-size="l"
    data-slot-names="unnamed"
    slot="tab-bar"
    tabindex="-1"
  >
    Test tab label 2
  </sbb-tab-label>
  <sbb-tab
    id="sbb-tab-panel-2"
    tabindex="0"
  >
    Test tab content 2
  </sbb-tab>
  <sbb-tab-label
    aria-controls="sbb-tab-panel-3"
    aria-selected="false"
    data-size="l"
    data-slot-names="unnamed"
    disabled=""
    slot="tab-bar"
    tabindex="-1"
  >
    Test tab label 3
  </sbb-tab-label>
  <sbb-tab
    id="sbb-tab-panel-3"
    tabindex="0"
  >
    Test tab content 3
  </sbb-tab>
  <sbb-tab-label
    aria-controls="sbb-tab-panel-4"
    aria-selected="false"
    data-size="l"
    data-slot-names="unnamed"
    slot="tab-bar"
    tabindex="-1"
  >
    Test tab label 4
  </sbb-tab-label>
  <sbb-tab
    id="sbb-tab-panel-4"
    tabindex="0"
  >
    Test tab content 4
  </sbb-tab>
</sbb-tab-group>
`;
/* end snapshot sbb-tab-group renders DOM */

snapshots["sbb-tab-group renders Shadow DOM"] = 
`<div
  class="tab-group"
  role="tablist"
>
  <slot name="tab-bar">
  </slot>
</div>
<div class="tab-content">
  <slot>
  </slot>
</div>
`;
/* end snapshot sbb-tab-group renders Shadow DOM */

snapshots["sbb-tab-group renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "tab",
      "name": "Test tab label 1",
      "selected": true
    },
    {
      "role": "tab",
      "name": "Test tab label 2"
    },
    {
      "role": "tab",
      "name": "Test tab label 3"
    },
    {
      "role": "tab",
      "name": "Test tab label 4"
    },
    {
      "role": "tabpanel",
      "name": "",
      "children": [
        {
          "role": "text",
          "name": "Test tab content 1"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-tab-group renders A11y tree Chrome */

snapshots["sbb-tab-group renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "tab",
      "name": "Test tab label 1",
      "selected": true
    },
    {
      "role": "tab",
      "name": "Test tab label 2"
    },
    {
      "role": "tab",
      "name": "Test tab label 3"
    },
    {
      "role": "tab",
      "name": "Test tab label 4"
    },
    {
      "role": "tabpanel",
      "name": "",
      "children": [
        {
          "role": "text leaf",
          "name": "Test tab content 1 "
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-tab-group renders A11y tree Firefox */

