/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-selection-expansion-panel renders DOM"] = 
`<sbb-selection-expansion-panel
  data-size="m"
  data-slot-names="content unnamed"
  data-state="closed"
>
  <sbb-checkbox-panel
    data-has-card-badge=""
    data-slot-names="badge subtext suffix unnamed"
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
      role="text"
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
`<div class="sbb-selection-expansion-panel">
  <div class="sbb-selection-expansion-panel__input">
    <slot>
    </slot>
  </div>
  <div
    class="sbb-selection-expansion-panel__content--wrapper"
    inert=""
  >
    <div class="sbb-selection-expansion-panel__content">
      <sbb-divider
        aria-orientation="horizontal"
        orientation="horizontal"
        role="separator"
      >
      </sbb-divider>
      <slot name="content">
      </slot>
    </div>
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

snapshots["sbb-selection-expansion-panel renders A11y tree Safari"] = 
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
/* end snapshot sbb-selection-expansion-panel renders A11y tree Safari */

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

