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

snapshots["sbb-stepper A11y tree Chrome"] = 
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
      "name": "Test step label 3",
      "disabled": true
    },
    {
      "role": "tab",
      "name": "Test step label 4"
    },
    {
      "role": "text",
      "name": "Test step content 1"
    }
  ]
}
</p>
`;
/* end snapshot sbb-stepper A11y tree Chrome */

snapshots["sbb-stepper A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "tab",
      "name": "1 Test step label 1",
      "selected": true
    },
    {
      "role": "tab",
      "name": "2 Test step label 2"
    },
    {
      "role": "tab",
      "name": "3 Test step label 3",
      "disabled": true
    },
    {
      "role": "tab",
      "name": "4 Test step label 4"
    },
    {
      "role": "text leaf",
      "name": "Test step content 1"
    },
    {
      "role": "tabpanel",
      "name": "2 Test step label 2"
    },
    {
      "role": "tabpanel",
      "name": "3 Test step label 3"
    }
  ]
}
</p>
`;
/* end snapshot sbb-stepper A11y tree Firefox */

snapshots["sbb-stepper A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "tabpanel",
      "name": "3 Test step label 3"
    },
    {
      "role": "tabpanel",
      "name": "2 Test step label 2"
    },
    {
      "role": "text",
      "name": "Test step content 1"
    },
    {
      "role": "tab",
      "name": "1 Test step label 1",
      "selected": true
    },
    {
      "role": "tab",
      "name": "2 Test step label 2"
    },
    {
      "role": "tab",
      "name": "3 Test step label 3",
      "disabled": true
    },
    {
      "role": "tab",
      "name": "4 Test step label 4"
    }
  ]
}
</p>
`;
/* end snapshot sbb-stepper A11y tree Safari */

