/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-selection-expansion-panel renders DOM"] = 
`<sbb-selection-expansion-panel>
  <sbb-checkbox-panel
    color="white"
    size="m"
    tabindex="0"
  >
    Value one
    <span slot="subtext">
      Subtext
    </span>
    <span slot="suffix">
      Suffix
    </span>
    <sbb-card-badge
      color="charcoal"
      slot="badge"
    >
      %
    </sbb-card-badge>
  </sbb-checkbox-panel>
  <div slot="content">
    Inner content
  </div>
</sbb-selection-expansion-panel>
`;
/* end snapshot sbb-selection-expansion-panel renders DOM */

snapshots["sbb-selection-expansion-panel renders Shadow DOM"] = 
`<div class="sbb-selection-expansion-panel__input">
  <slot>
  </slot>
</div>
<div
  class="sbb-selection-expansion-panel__content--wrapper"
  inert=""
>
  <div class="sbb-selection-expansion-panel__content">
    <sbb-divider orientation="horizontal">
    </sbb-divider>
    <slot name="content">
    </slot>
  </div>
</div>
`;
/* end snapshot sbb-selection-expansion-panel renders Shadow DOM */

snapshots["sbb-selection-expansion-panel renders A11y tree Chrome"] = 
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
/* end snapshot sbb-selection-expansion-panel renders A11y tree Chrome */

