/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-selection-action-panel renders DOM"] = 
`<sbb-selection-action-panel>
  <sbb-checkbox-panel
    aria-description="%"
    color="white"
    size="m"
    tabindex="0"
  >
    Value one
    <span slot="subtext">
      Subtext
    </span>
  </sbb-checkbox-panel>
  <sbb-secondary-button
    icon-name="arrow-right-small"
    size="m"
    tabindex="0"
  >
  </sbb-secondary-button>
  <sbb-card-badge
    color="charcoal"
    slot="badge"
  >
    %
  </sbb-card-badge>
</sbb-selection-action-panel>
`;
/* end snapshot sbb-selection-action-panel renders DOM */

snapshots["sbb-selection-action-panel renders Shadow DOM"] = 
`<div class="sbb-selection-action-panel__badge">
  <slot name="badge">
  </slot>
</div>
<div class="sbb-selection-action-panel">
  <slot>
  </slot>
</div>
`;
/* end snapshot sbb-selection-action-panel renders Shadow DOM */

snapshots["sbb-selection-action-panel renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "%"
    },
    {
      "role": "checkbox",
      "name": "​ Value one Subtext",
      "description": "%",
      "checked": false
    },
    {
      "role": "button",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-selection-action-panel renders A11y tree Chrome */

snapshots["sbb-selection-action-panel renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "%"
    },
    {
      "role": "checkbox",
      "name": "​ Value one Subtext",
      "description": "%"
    },
    {
      "role": "button",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-selection-action-panel renders A11y tree Firefox */

