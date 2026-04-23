/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-card-button renders DOM"] = 
`<sbb-card color="white">
  <sbb-card-button
    active=""
    slot="action"
    tabindex="0"
  >
    Click me
  </sbb-card-button>
  Content
</sbb-card>
`;
/* end snapshot sbb-card-button renders DOM */

snapshots["sbb-card-button renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-card-button">
  <span class="sbb-screen-reader-only">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-card-button renders Shadow DOM */

snapshots["sbb-card-button renders A11y tree Chrome"] = 
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
/* end snapshot sbb-card-button renders A11y tree Chrome */

