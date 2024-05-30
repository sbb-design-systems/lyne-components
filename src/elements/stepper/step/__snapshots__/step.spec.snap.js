/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-step renders - Dom"] = 
`<sbb-step
  id="sbb-step-0"
  role="tabpanel"
  slot="step"
>
  Step content
</sbb-step>
`;
/* end snapshot sbb-step renders - Dom */

snapshots["sbb-step renders - ShadowDom"] = 
`<div class="sbb-step--wrapper">
  <div
    class="sbb-step"
    tabindex="0"
  >
    <slot>
    </slot>
  </div>
</div>
`;
/* end snapshot sbb-step renders - ShadowDom */

snapshots["sbb-step A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-step A11y tree Chrome */

snapshots["sbb-step A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-step A11y tree Firefox */

snapshots["sbb-step A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-step A11y tree Safari */

