/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-timetable-form-field renders DOM"] = 
`<sbb-timetable-form-field
  borderless=""
  error-space="none"
  floating-label=""
  size="l"
  width="collapse"
>
  <label
    for="sbb-form-field-input-0"
    slot="label"
  >
    From
  </label>
  <input
    id="sbb-form-field-input-0"
    name="from"
    type="text"
  >
</sbb-timetable-form-field>
`;
/* end snapshot sbb-timetable-form-field renders DOM */

snapshots["sbb-timetable-form-field renders Shadow DOM"] = 
`<sbb-icon
  class="sbb-timetable-form-field__start-route-icon"
  data-namespace="default"
  name="route-circle-start-small"
>
</sbb-icon>
<div class="sbb-form-field__space-wrapper">
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
/* end snapshot sbb-timetable-form-field renders Shadow DOM */

snapshots["sbb-timetable-form-field renders A11y tree Chrome"] = 
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
      "name": "From"
    },
    {
      "role": "textbox",
      "name": "From"
    }
  ]
}
</p>
`;
/* end snapshot sbb-timetable-form-field renders A11y tree Chrome */

snapshots["sbb-timetable-form-field renders A11y tree Firefox"] = 
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
      "name": "From"
    },
    {
      "role": "textbox",
      "name": "From"
    }
  ]
}
</p>
`;
/* end snapshot sbb-timetable-form-field renders A11y tree Firefox */

