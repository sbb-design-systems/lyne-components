/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-stepper renders DOM"] = 
`<sbb-stepper
  orientation="horizontal"
  selected-index="0"
  size="m"
>
  <sbb-step-label
    slot="step-label"
    tabindex="0"
  >
    Test step label 1
  </sbb-step-label>
  <sbb-step slot="step">
    Test step content 1
  </sbb-step>
  <sbb-step-label
    slot="step-label"
    tabindex="-1"
  >
    Test step label 2
  </sbb-step-label>
  <sbb-step slot="step">
    Test step content 2
  </sbb-step>
  <sbb-step-label
    disabled=""
    slot="step-label"
    tabindex="-1"
  >
    Test step label 3
  </sbb-step-label>
  <sbb-step slot="step">
    Test step content 3
  </sbb-step>
  <sbb-step-label
    slot="step-label"
    tabindex="-1"
  >
    Test step label 4
  </sbb-step-label>
</sbb-stepper>
`;
/* end snapshot sbb-stepper renders DOM */

snapshots["sbb-stepper renders Shadow DOM"] = 
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
/* end snapshot sbb-stepper renders Shadow DOM */

snapshots["sbb-stepper renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "generic",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-stepper renders A11y tree Chrome */

