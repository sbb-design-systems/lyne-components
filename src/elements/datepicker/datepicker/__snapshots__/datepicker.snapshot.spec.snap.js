/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-datepicker renders DOM"] = 
`<sbb-form-field
  error-space="none"
  size="m"
  width="default"
>
  <sbb-datepicker-previous-day
    data-action=""
    data-button=""
    slot="prefix"
    tabindex="0"
  >
  </sbb-datepicker-previous-day>
  <sbb-date-input
    contenteditable="plaintext-only"
    id="datepicker-input"
    placeholder="DD.MM.YYYY"
    value="2021-12-20"
  >
    Mo, 20.12.2021
  </sbb-date-input>
  <sbb-datepicker-toggle
    aria-controls="sbb-datepicker-1"
    aria-expanded="false"
    aria-haspopup="dialog"
    data-action=""
    data-button=""
    slot="suffix"
    tabindex="0"
  >
  </sbb-datepicker-toggle>
  <sbb-datepicker-next-day
    data-action=""
    data-button=""
    slot="suffix"
    tabindex="0"
  >
  </sbb-datepicker-next-day>
  <sbb-datepicker
    data-state="closed"
    id="sbb-datepicker-1"
    popover="manual"
  >
  </sbb-datepicker>
</sbb-form-field>
`;
/* end snapshot sbb-datepicker renders DOM */

snapshots["sbb-datepicker renders Shadow DOM"] = 
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
/* end snapshot sbb-datepicker renders Shadow DOM */

snapshots["sbb-datepicker renders A11y tree Chrome"] = 
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
      "role": "button",
      "name": "Change to the previous day, currently selected December 20, 2021."
    },
    {
      "role": "textbox",
      "name": "DD.MM.YYYY",
      "value": "Mo, 20.12.2021"
    },
    {
      "role": "button",
      "name": "Show calendar",
      "haspopup": "dialog"
    },
    {
      "role": "button",
      "name": "Change to the next day, currently selected December 20, 2021."
    }
  ]
}
</p>
`;
/* end snapshot sbb-datepicker renders A11y tree Chrome */

snapshots["sbb-datepicker renders A11y tree Firefox"] = 
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
      "role": "button",
      "name": "Change to the previous day, currently selected December 20, 2021."
    },
    {
      "role": "textbox",
      "name": "",
      "value": "Mo, 20.12.2021"
    },
    {
      "role": "button",
      "name": "Show calendar",
      "haspopup": "dialog"
    },
    {
      "role": "button",
      "name": "Change to the next day, currently selected December 20, 2021."
    }
  ]
}
</p>
`;
/* end snapshot sbb-datepicker renders A11y tree Firefox */

