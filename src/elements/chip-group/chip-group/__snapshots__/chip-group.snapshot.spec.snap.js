/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-chip-group renders DOM"] = 
`<sbb-chip-group tabindex="0">
  <sbb-chip value="Value 1">
  </sbb-chip>
</sbb-chip-group>
`;
/* end snapshot sbb-chip-group renders DOM */

snapshots["sbb-chip-group renders Shadow DOM"] = 
`<div
  class="sbb-chip-group"
  role="grid"
>
  <slot>
  </slot>
</div>
`;
/* end snapshot sbb-chip-group renders Shadow DOM */

snapshots["sbb-chip-group renders with form-field DOM"] = 
`<sbb-form-field
  data-input-empty=""
  data-input-type="input"
  data-slot-names="label unnamed"
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
  <sbb-chip-group
    name="field-1"
    tabindex="0"
  >
    <sbb-chip value="Value 1">
    </sbb-chip>
    <sbb-chip value="Value 2">
    </sbb-chip>
  </sbb-chip-group>
  <input id="sbb-form-field-input-0">
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

snapshots["sbb-chip-group renders with form-field A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "statictext",
      "name": "​"
    },
    {
      "role": "text leaf",
      "name": "Field label"
    },
    {
      "role": "text container",
      "name": "",
      "children": [
        {
          "role": "grid",
          "name": "",
          "children": [
            {
              "role": "gridcell",
              "name": "Value 1"
            },
            {
              "role": "button",
              "name": "Remove Value 1"
            },
            {
              "role": "gridcell",
              "name": "Value 2"
            },
            {
              "role": "button",
              "name": "Remove Value 2"
            }
          ]
        }
      ]
    },
    {
      "role": "textbox",
      "name": "Field label"
    }
  ]
}
</p>
`;
/* end snapshot sbb-chip-group renders with form-field A11y tree Firefox */

snapshots["sbb-chip-group renders with form-field A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "​"
    },
    {
      "role": "text",
      "name": "Field label"
    },
    {
      "role": "generic",
      "name": "",
      "children": [
        {
          "role": "gridcell",
          "name": "Value 1"
        },
        {
          "role": "button",
          "name": "Remove Value 1"
        },
        {
          "role": "gridcell",
          "name": "Value 2"
        },
        {
          "role": "button",
          "name": "Remove Value 2"
        }
      ]
    },
    {
      "role": "textbox",
      "name": "Field label"
    }
  ]
}
</p>
`;
/* end snapshot sbb-chip-group renders with form-field A11y tree Chrome */

