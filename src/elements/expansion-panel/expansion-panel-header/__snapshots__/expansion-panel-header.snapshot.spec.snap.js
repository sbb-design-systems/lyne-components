/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-expansion-panel-header renders DOM"] = 
`<sbb-expansion-panel-header
  slot="header"
  tabindex="0"
>
  Header
</sbb-expansion-panel-header>
`;
/* end snapshot sbb-expansion-panel-header renders DOM */

snapshots["sbb-expansion-panel-header renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-expansion-panel-header">
  <span class="sbb-expansion-panel-header__title">
    <span class="sbb-expansion-panel-header__icon">
      <slot name="icon">
      </slot>
    </span>
    <slot>
    </slot>
  </span>
  <span class="sbb-expansion-panel-header__toggle">
    <sbb-icon
      class="sbb-expansion-panel-header__toggle-icon"
      name="chevron-small-down-medium"
    >
    </sbb-icon>
  </span>
</span>
`;
/* end snapshot sbb-expansion-panel-header renders Shadow DOM */

snapshots["sbb-expansion-panel-header renders with icon DOM"] = 
`<sbb-expansion-panel-header
  icon-name="pie-medium"
  slot="header"
  tabindex="0"
>
  Header
</sbb-expansion-panel-header>
`;
/* end snapshot sbb-expansion-panel-header renders with icon DOM */

snapshots["sbb-expansion-panel-header renders with icon Shadow DOM"] = 
`<span class="sbb-action-base sbb-expansion-panel-header">
  <span class="sbb-expansion-panel-header__title">
    <span class="sbb-expansion-panel-header__icon">
      <slot name="icon">
        <sbb-icon name="pie-medium">
        </sbb-icon>
      </slot>
    </span>
    <slot>
    </slot>
  </span>
  <span class="sbb-expansion-panel-header__toggle">
    <sbb-icon
      class="sbb-expansion-panel-header__toggle-icon"
      name="chevron-small-down-medium"
    >
    </sbb-icon>
  </span>
</span>
`;
/* end snapshot sbb-expansion-panel-header renders with icon Shadow DOM */

snapshots["sbb-expansion-panel-header renders with slotted icon DOM"] = 
`<sbb-expansion-panel-header
  slot="header"
  tabindex="0"
>
  <sbb-icon
    name="pie-medium"
    slot="icon"
  >
  </sbb-icon>
  Header
</sbb-expansion-panel-header>
`;
/* end snapshot sbb-expansion-panel-header renders with slotted icon DOM */

snapshots["sbb-expansion-panel-header renders with slotted icon Shadow DOM"] = 
`<span class="sbb-action-base sbb-expansion-panel-header">
  <span class="sbb-expansion-panel-header__title">
    <span class="sbb-expansion-panel-header__icon">
      <slot name="icon">
      </slot>
    </span>
    <slot>
    </slot>
  </span>
  <span class="sbb-expansion-panel-header__toggle">
    <sbb-icon
      class="sbb-expansion-panel-header__toggle-icon"
      name="chevron-small-down-medium"
    >
    </sbb-icon>
  </span>
</span>
`;
/* end snapshot sbb-expansion-panel-header renders with slotted icon Shadow DOM */

snapshots["sbb-expansion-panel-header renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "button",
      "name": "Header",
      "invalid": false,
      "focusable": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-expansion-panel-header renders A11y tree Chrome */

