/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-toggle-check renders DOM"] = 
`<sbb-toggle-check
  checked=""
  data-checked=""
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
            <sbb-icon
              data-namespace="default"
              name="tick-small"
            >
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
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "checkbox",
      "name": "​",
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-toggle-check A11y tree Chrome */

snapshots["sbb-toggle-check A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "checkbox",
      "name": "​"
    }
  ]
}
</p>
`;
/* end snapshot sbb-toggle-check A11y tree Firefox */

