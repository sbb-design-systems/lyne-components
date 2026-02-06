/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-toggle-check renders DOM"] = 
`<sbb-toggle-check
  checked=""
  label-position="after"
  size="s"
  tabindex="0"
>
</sbb-toggle-check>
`;
/* end snapshot sbb-toggle-check renders DOM */

snapshots["sbb-toggle-check renders Shadow DOM"] = 
`<span class="sbb-toggle-check">
  <span class="sbb-toggle-check__container">
    <span class="sbb-toggle-check__label">
      <slot>
      </slot>
    </span>
    <span class="sbb-toggle-check__track">
      <span class="sbb-toggle-check__circle">
        <span class="sbb-toggle-check__icon">
          <slot name="icon">
            <sbb-icon name="tick-small">
            </sbb-icon>
          </slot>
        </span>
      </span>
    </span>
  </span>
</span>
`;
/* end snapshot sbb-toggle-check renders Shadow DOM */

snapshots["sbb-toggle-check A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "checkbox",
      "name": "​",
      "invalid": false,
      "focusable": true,
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-toggle-check A11y tree Chrome */

