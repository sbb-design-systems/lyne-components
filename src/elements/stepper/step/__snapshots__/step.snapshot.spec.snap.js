/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-step renders DOM"] = 
`<sbb-step
  id="sbb-step-0"
  slot="step"
>
  Step content
</sbb-step>
`;
/* end snapshot sbb-step renders DOM */

snapshots["sbb-step renders Shadow DOM"] = 
`<div class="sbb-step--wrapper">
  <div class="sbb-step">
    <slot>
    </slot>
  </div>
</div>
`;
/* end snapshot sbb-step renders Shadow DOM */

snapshots["sbb-step renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "tabpanel",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-step renders A11y tree Chrome */

