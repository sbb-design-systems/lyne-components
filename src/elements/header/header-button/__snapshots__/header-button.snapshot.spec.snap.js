/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-header-button renders DOM"] = 
`<sbb-header-button
  aria-label="a11y label"
  expand-from="zero"
  icon-name="pie-small"
  name="test"
  tabindex="0"
  type="reset"
  value="value"
>
  Action
</sbb-header-button>
`;
/* end snapshot sbb-header-button renders DOM */

snapshots["sbb-header-button renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-header-button">
  <span class="sbb-header-action__wrapper">
    <span class="sbb-header-action__icon">
      <slot name="icon">
        <sbb-icon name="pie-small">
        </sbb-icon>
      </slot>
    </span>
    <span class="sbb-header-action__text">
      <slot>
      </slot>
    </span>
  </span>
</span>
`;
/* end snapshot sbb-header-button renders Shadow DOM */

snapshots["sbb-header-button renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "button",
      "name": "a11y label",
      "invalid": false,
      "focusable": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-header-button renders A11y tree Chrome */

