/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-chip-group renders DOM"] = 
`<sbb-chip-group>
  <sbb-chip
    tabindex="-1"
    value="Value 1"
  >
  </sbb-chip>
</sbb-chip-group>
`;
/* end snapshot sbb-chip-group renders DOM */

snapshots["sbb-chip-group renders Shadow DOM"] = 
`<slot>
</slot>
`;
/* end snapshot sbb-chip-group renders Shadow DOM */

snapshots["sbb-chip-group renders with form-field DOM"] = 
`<sbb-form-field
  error-space="none"
  size="m"
  width="default"
>
  <label
    for="sbb-form-field-input-0"
    slot="label"
  >
    Field label
  </label>
  <sbb-chip-group name="field-1">
    <sbb-chip
      tabindex="-1"
      value="Value 1"
    >
    </sbb-chip>
    <sbb-chip
      tabindex="-1"
      value="Value 2"
    >
    </sbb-chip>
    <input
      aria-description="Selected elements: 2"
      id="sbb-form-field-input-0"
    >
  </sbb-chip-group>
</sbb-form-field>
`;
/* end snapshot sbb-chip-group renders with form-field DOM */

snapshots["sbb-chip-group renders with form-field Shadow DOM"] = 
`<div class="sbb-form-field__space-wrapper">
  <div
    class="sbb-form-field__wrapper"
    id="overlay-anchor"
  >
    <slot name="prefix">
    </slot>
    <div class="sbb-form-field__input-container">
      <span
        aria-hidden="true"
        class="sbb-form-field__label-spacer"
      >
      </span>
      <span class="sbb-form-field__label">
        <span class="sbb-form-field__label-ellipsis">
          <slot name="label">
          </slot>
        </span>
      </span>
      <div class="sbb-form-field__input">
        <slot>
        </slot>
      </div>
    </div>
    <slot name="suffix">
    </slot>
  </div>
  <div class="sbb-form-field__error">
    <slot name="error">
    </slot>
  </div>
</div>
`;
/* end snapshot sbb-chip-group renders with form-field Shadow DOM */

snapshots["sbb-chip-group renders with form-field A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "ignored": true,
      "role": "none",
      "children": [
        {
          "role": "generic",
          "name": ""
        },
        {
          "role": "generic",
          "name": ""
        },
        {
          "ignored": true,
          "role": "none"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-chip-group renders with form-field A11y tree Chrome */

