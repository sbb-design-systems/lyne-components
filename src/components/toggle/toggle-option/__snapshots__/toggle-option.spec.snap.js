/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-toggle-option renders"] = 
`<input
  aria-hidden="true"
  id="sbb-toggle-option-id"
  tabindex="-1"
  type="radio"
  value="Option 1"
>
<label
  class="sbb-toggle-option"
  for="sbb-toggle-option-id"
>
  <slot name="icon">
  </slot>
  <span class="sbb-toggle-option__label">
    <slot>
    </slot>
  </span>
</label>
`;
/* end snapshot sbb-toggle-option renders */

snapshots["sbb-toggle-option renders with sbb-icon"] = 
`<input
  aria-hidden="true"
  id="sbb-toggle-option-id"
  tabindex="-1"
  type="radio"
>
<label
  class="sbb-toggle-option"
  for="sbb-toggle-option-id"
>
  <slot name="icon">
    <sbb-icon
      aria-hidden="true"
      data-namespace="default"
      name="arrow-right-small"
      role="img"
    >
    </sbb-icon>
  </slot>
  <span class="sbb-toggle-option__label">
    <slot>
    </slot>
  </span>
</label>
`;
/* end snapshot sbb-toggle-option renders with sbb-icon */

snapshots["sbb-toggle-option renders with slotted sbb-icon"] = 
`<input
  aria-hidden="true"
  id="sbb-toggle-option-id"
  tabindex="-1"
  type="radio"
>
<label
  class="sbb-toggle-option"
  for="sbb-toggle-option-id"
>
  <slot name="icon">
  </slot>
  <span class="sbb-toggle-option__label">
    <slot>
    </slot>
  </span>
</label>
`;
/* end snapshot sbb-toggle-option renders with slotted sbb-icon */

snapshots["sbb-toggle-option A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "",
      "checked": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-toggle-option A11y tree Chrome */

snapshots["sbb-toggle-option A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "",
      "checked": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-toggle-option A11y tree Firefox */

