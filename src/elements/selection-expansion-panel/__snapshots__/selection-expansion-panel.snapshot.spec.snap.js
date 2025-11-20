/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-selection-expansion-panel renders DOM"] = 
`<sbb-selection-expansion-panel data-state="closed">
  <sbb-checkbox-panel
    color="white"
    data-has-card-badge=""
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
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "checkbox",
      "name": "% ​ Value one Suffix Subtext , collapsed",
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-selection-expansion-panel renders A11y tree Chrome */

snapshots["sbb-selection-expansion-panel renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "checkbox",
      "name": "% ​ Value one Suffix Subtext , collapsed"
    }
  ]
}
</p>
`;
/* end snapshot sbb-selection-expansion-panel renders A11y tree Firefox */

