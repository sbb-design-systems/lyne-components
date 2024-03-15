/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-stepper renders"] = 
`<div class="sbb-stepper">
  <div
    class="sbb-stepper__labels"
    role="tablist"
  >
    <slot name="step-label">
    </slot>
  </div>
  <div class="sbb-stepper__steps">
    <slot name="step">
    </slot>
  </div>
</div>
`;
/* end snapshot sbb-stepper renders */

snapshots["sbb-tab-group A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "tab",
      "name": "Test step label 1",
      "selected": true
    },
    {
      "role": "tab",
      "name": "Test step label 2"
    },
    {
      "role": "tab",
      "name": "Test step label 3"
    },
    {
      "role": "tab",
      "name": "Test step label 4"
    },
    {
      "role": "tabpanel",
      "name": "",
      "children": [
        {
          "role": "text",
          "name": "Test step content 1"
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
      "name": "Test step label 1",
      "selected": true
    },
    {
      "role": "tab",
      "name": "Test step label 2"
    },
    {
      "role": "tab",
      "name": "Test step label 3"
    },
    {
      "role": "tab",
      "name": "Test step label 4"
    },
    {
      "role": "tabpanel",
      "name": "",
      "children": [
        {
          "role": "text leaf",
          "name": "Test step content 1"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-tab-group A11y tree Firefox */

snapshots["sbb-tab-group A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "tab",
      "name": "Test step label 1",
      "selected": true
    },
    {
      "role": "tab",
      "name": "Test step label 2"
    },
    {
      "role": "tab",
      "name": "Test step label 3"
    },
    {
      "role": "tab",
      "name": "Test step label 4"
    },
    {
      "role": "tabpanel",
      "name": "",
      "children": [
        {
          "role": "text",
          "name": "Test step content 1"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-tab-group A11y tree Safari */

snapshots["sbb-stepper A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-stepper A11y tree Chrome */

