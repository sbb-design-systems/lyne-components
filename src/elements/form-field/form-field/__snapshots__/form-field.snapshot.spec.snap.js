/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-form-field renders input DOM"] = 
`<sbb-form-field
  error-space="none"
  size="m"
  width="default"
>
  <label
    for="sbb-form-field-input-0"
    slot="label"
  >
    Fill input
  </label>
  <input
    id="sbb-form-field-input-0"
    placeholder="This is an input"
  >
</sbb-form-field>
`;
/* end snapshot sbb-form-field renders input DOM */

snapshots["sbb-form-field renders input Shadow DOM"] = 
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
/* end snapshot sbb-form-field renders input Shadow DOM */

snapshots["sbb-form-field renders disabled input DOM"] = 
`<sbb-form-field
  error-space="none"
  size="m"
  width="default"
>
  <label
    for="sbb-form-field-input-2"
    slot="label"
  >
    Fill input
  </label>
  <input
    class="input"
    disabled=""
    id="sbb-form-field-input-2"
    placeholder="This is an input"
  >
</sbb-form-field>
`;
/* end snapshot sbb-form-field renders disabled input DOM */

snapshots["sbb-form-field renders disabled input Shadow DOM"] = 
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
/* end snapshot sbb-form-field renders disabled input Shadow DOM */

snapshots["sbb-form-field renders readonly input with error DOM"] = 
`<sbb-form-field
  error-space="none"
  size="m"
  width="default"
>
  <label
    for="sbb-form-field-input-4"
    slot="label"
  >
    Fill input
  </label>
  <input
    aria-describedby=""
    class="input"
    id="sbb-form-field-input-4"
    placeholder="This is an input"
    readonly=""
  >
  <sbb-error
    id="error"
    role="status"
    slot="error"
  >
    You can't change this value.
  </sbb-error>
</sbb-form-field>
`;
/* end snapshot sbb-form-field renders readonly input with error DOM */

snapshots["sbb-form-field renders readonly input with error Shadow DOM"] = 
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
/* end snapshot sbb-form-field renders readonly input with error Shadow DOM */

snapshots["sbb-form-field should render select without label DOM"] = 
`<sbb-form-field
  error-space="none"
  size="m"
  width="default"
>
  <select>
    <option>
      Value 1
    </option>
    <option>
      Value 2
    </option>
    <option>
      Value 3
    </option>
  </select>
</sbb-form-field>
`;
/* end snapshot sbb-form-field should render select without label DOM */

snapshots["sbb-form-field should render select without label Shadow DOM"] = 
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
      <sbb-icon
        class="sbb-form-field__select-input-icon"
        name="chevron-small-down-small"
      >
      </sbb-icon>
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
/* end snapshot sbb-form-field should render select without label Shadow DOM */

snapshots["sbb-form-field renders select with optional flag and borderless DOM"] = 
`<sbb-form-field
  borderless=""
  error-space="none"
  optional=""
  size="m"
  width="default"
>
  <label
    for="sbb-form-field-input-6"
    slot="label"
  >
    Select option:
  </label>
  <select id="sbb-form-field-input-6">
    <option>
      Value 1
    </option>
    <option>
      Value 2
    </option>
    <option>
      Value 3
    </option>
  </select>
</sbb-form-field>
`;
/* end snapshot sbb-form-field renders select with optional flag and borderless DOM */

snapshots["sbb-form-field renders select with optional flag and borderless Shadow DOM"] = 
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
          <span aria-hidden="true">
            (optional)
          </span>
        </span>
      </span>
      <div class="sbb-form-field__input">
        <slot>
        </slot>
      </div>
      <sbb-icon
        class="sbb-form-field__select-input-icon"
        name="chevron-small-down-small"
      >
      </sbb-icon>
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
/* end snapshot sbb-form-field renders select with optional flag and borderless Shadow DOM */

snapshots["sbb-form-field A11y tree Chrome"] = 
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
/* end snapshot sbb-form-field A11y tree Chrome */

