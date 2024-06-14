/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-radio-button-panel should render unchecked DOM"] = 
`<sbb-radio-button-panel
  aria-checked="false"
  aria-required="false"
  data-slot-names="subtext suffix unnamed"
  role="radio"
  size="m"
  value="radio-value"
>
  Label
  <span slot="subtext">
    Subtext
  </span>
  <span slot="suffix">
    Suffix
  </span>
</sbb-radio-button-panel>
`;
/* end snapshot sbb-radio-button-panel should render unchecked DOM */

snapshots["sbb-radio-button-panel should render unchecked Shadow DOM"] = 
`<label class="sbb-selection-panel">
  <div class="sbb-selection-panel__badge">
    <slot name="badge">
    </slot>
  </div>
  <span class="sbb-radio-button">
    <input
      aria-hidden="true"
      class="sbb-screen-reader-only"
      tabindex="-1"
      type="radio"
      value="radio-value"
    >
    <span class="sbb-radio-button__label-slot">
      <slot>
      </slot>
      <slot name="suffix">
      </slot>
    </span>
    <slot name="subtext">
    </slot>
  </span>
</label>
`;
/* end snapshot sbb-radio-button-panel should render unchecked Shadow DOM */

snapshots["sbb-radio-button-panel should render checked DOM"] = 
`<sbb-radio-button-panel
  aria-checked="true"
  aria-required="false"
  checked=""
  data-checked=""
  data-slot-names="subtext suffix unnamed"
  role="radio"
  size="m"
  value="radio-value"
>
  Label
  <span slot="subtext">
    Subtext
  </span>
  <span slot="suffix">
    Suffix
  </span>
</sbb-radio-button-panel>
`;
/* end snapshot sbb-radio-button-panel should render checked DOM */

snapshots["sbb-radio-button-panel should render checked Shadow DOM"] = 
`<label class="sbb-selection-panel">
  <div class="sbb-selection-panel__badge">
    <slot name="badge">
    </slot>
  </div>
  <span class="sbb-radio-button">
    <input
      aria-hidden="true"
      checked=""
      class="sbb-screen-reader-only"
      tabindex="-1"
      type="radio"
      value="radio-value"
    >
    <span class="sbb-radio-button__label-slot">
      <slot>
      </slot>
      <slot name="suffix">
      </slot>
    </span>
    <slot name="subtext">
    </slot>
  </span>
</label>
`;
/* end snapshot sbb-radio-button-panel should render checked Shadow DOM */

snapshots["sbb-radio-button-panel Unchecked - A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "Label"
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-panel Unchecked - A11y tree Firefox */

snapshots["sbb-radio-button-panel Unchecked - A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "Label",
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-panel Unchecked - A11y tree Chrome */

snapshots["sbb-radio-button-panel Checked - A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "Label",
      "checked": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-panel Checked - A11y tree Chrome */

snapshots["sbb-radio-button-panel Checked - A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "radio",
      "name": "Label",
      "checked": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-radio-button-panel Checked - A11y tree Firefox */

