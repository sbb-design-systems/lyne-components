/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-tab-group renders"] = 
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
/* end snapshot sbb-tab-group renders */

snapshots["sbb-tab-group A11y tree Chrome"] = 
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
/* end snapshot sbb-tab-group A11y tree Chrome */

snapshots["sbb-tab-group A11y tree Firefox"] = 
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
/* end snapshot sbb-tab-group A11y tree Firefox */

