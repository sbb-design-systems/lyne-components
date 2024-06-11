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
    role="tab"
    slot="tab-bar"
    tabindex="0"
  >
    Test tab label 1
  </sbb-tab-label>
  <div
    active=""
    id="sbb-tab-panel-1"
    role="tabpanel"
    tabindex="0"
  >
    Test tab content 1
  </div>
  <sbb-tab-label
    aria-controls="sbb-tab-panel-2"
    aria-selected="false"
    data-size="l"
    data-slot-names="unnamed"
    role="tab"
    slot="tab-bar"
    tabindex="-1"
  >
    Test tab label 2
  </sbb-tab-label>
  <div
    id="sbb-tab-panel-2"
    role="tabpanel"
    tabindex="0"
  >
    Test tab content 2
  </div>
  <sbb-tab-label
    aria-controls="sbb-tab-panel-3"
    aria-selected="false"
    data-size="l"
    data-slot-names="unnamed"
    disabled=""
    role="tab"
    slot="tab-bar"
    tabindex="-1"
  >
    Test tab label 3
  </sbb-tab-label>
  <div
    id="sbb-tab-panel-3"
    role="tabpanel"
    tabindex="0"
  >
    Test tab content 3
  </div>
  <sbb-tab-label
    aria-controls=""
    aria-selected="false"
    data-size="l"
    data-slot-names="unnamed"
    role="tab"
    slot="tab-bar"
    tabindex="-1"
  >
    Test tab label 4
  </sbb-tab-label>
  <div role="tabpanel">
    No content.
  </div>
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
          "name": "Test tab content 1"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-tab-group renders A11y tree Firefox */

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

