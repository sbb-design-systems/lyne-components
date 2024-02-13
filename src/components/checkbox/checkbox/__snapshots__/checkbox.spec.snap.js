/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-checkbox renders"] = 
`<span class="sbb-checkbox-wrapper">
  <label class="sbb-checkbox">
    <input
      aria-hidden="true"
      tabindex="-1"
      type="checkbox"
    >
    <span class="sbb-checkbox__inner">
      <span class="sbb-checkbox__aligner">
        <sbb-visual-checkbox>
        </sbb-visual-checkbox>
      </span>
      <span class="sbb-checkbox__label">
        <slot>
        </slot>
        <span class="sbb-checkbox__label--icon">
          <slot name="icon">
          </slot>
        </span>
      </span>
    </span>
  </label>
</span>
`;
/* end snapshot sbb-checkbox renders */

snapshots["sbb-checkbox icon position start"] = 
`<span class="sbb-checkbox-wrapper">
  <label class="sbb-checkbox">
    <input
      aria-hidden="true"
      tabindex="-1"
      type="checkbox"
    >
    <span class="sbb-checkbox__inner">
      <span class="sbb-checkbox__aligner">
        <sbb-visual-checkbox>
        </sbb-visual-checkbox>
      </span>
      <span class="sbb-checkbox__label">
        <slot>
        </slot>
        <span class="sbb-checkbox__label--icon">
          <slot name="icon">
            <sbb-icon
              aria-hidden="true"
              data-namespace="default"
              name="tickets-class-small"
              role="img"
            >
            </sbb-icon>
          </slot>
        </span>
      </span>
    </span>
  </label>
</span>
`;
/* end snapshot sbb-checkbox icon position start */

snapshots["sbb-checkbox state checked"] = 
`<span class="sbb-checkbox-wrapper">
  <label class="sbb-checkbox">
    <input
      aria-hidden="true"
      checked=""
      tabindex="-1"
      type="checkbox"
    >
    <span class="sbb-checkbox__inner">
      <span class="sbb-checkbox__aligner">
        <sbb-visual-checkbox checked="">
        </sbb-visual-checkbox>
      </span>
      <span class="sbb-checkbox__label">
        <slot>
        </slot>
        <span class="sbb-checkbox__label--icon">
          <slot name="icon">
          </slot>
        </span>
      </span>
    </span>
  </label>
</span>
`;
/* end snapshot sbb-checkbox state checked */

snapshots["sbb-checkbox state indeterminate"] = 
`<span class="sbb-checkbox-wrapper">
  <label class="sbb-checkbox">
    <input
      aria-hidden="true"
      tabindex="-1"
      type="checkbox"
    >
    <span class="sbb-checkbox__inner">
      <span class="sbb-checkbox__aligner">
        <sbb-visual-checkbox indeterminate="">
        </sbb-visual-checkbox>
      </span>
      <span class="sbb-checkbox__label">
        <slot>
        </slot>
        <span class="sbb-checkbox__label--icon">
          <slot name="icon">
          </slot>
        </span>
      </span>
    </span>
  </label>
</span>
`;
/* end snapshot sbb-checkbox state indeterminate */

snapshots["sbb-checkbox state unchecked disabled"] = 
`<span class="sbb-checkbox-wrapper">
  <label class="sbb-checkbox">
    <input
      aria-hidden="true"
      disabled=""
      tabindex="-1"
      type="checkbox"
    >
    <span class="sbb-checkbox__inner">
      <span class="sbb-checkbox__aligner">
        <sbb-visual-checkbox disabled="">
        </sbb-visual-checkbox>
      </span>
      <span class="sbb-checkbox__label">
        <slot>
        </slot>
        <span class="sbb-checkbox__label--icon">
          <slot name="icon">
          </slot>
        </span>
      </span>
    </span>
  </label>
</span>
`;
/* end snapshot sbb-checkbox state unchecked disabled */

snapshots["sbb-checkbox icon position with slotted icon"] = 
`<span class="sbb-checkbox-wrapper">
  <label class="sbb-checkbox">
    <input
      aria-hidden="true"
      tabindex="-1"
      type="checkbox"
    >
    <span class="sbb-checkbox__inner">
      <span class="sbb-checkbox__aligner">
        <sbb-visual-checkbox>
        </sbb-visual-checkbox>
      </span>
      <span class="sbb-checkbox__label">
        <slot>
        </slot>
        <span class="sbb-checkbox__label--icon">
          <slot name="icon">
          </slot>
        </span>
      </span>
    </span>
  </label>
</span>
`;
/* end snapshot sbb-checkbox icon position with slotted icon */

snapshots["sbb-checkbox Unchecked - A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "checkbox",
      "name": "​ Label",
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-checkbox Unchecked - A11y tree Chrome */

snapshots["sbb-checkbox Checked - A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "checkbox",
      "name": "​ Label",
      "checked": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-checkbox Checked - A11y tree Chrome */

snapshots["sbb-checkbox Unchecked - A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "checkbox",
      "name": "​ Label"
    }
  ]
}
</p>
`;
/* end snapshot sbb-checkbox Unchecked - A11y tree Firefox */

snapshots["sbb-checkbox Checked - A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "checkbox",
      "name": "​ Label",
      "checked": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-checkbox Checked - A11y tree Firefox */

snapshots["sbb-checkbox Unchecked - A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "checkbox",
      "name": "​ Label",
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-checkbox Unchecked - A11y tree Safari */

snapshots["sbb-checkbox Checked - A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "checkbox",
      "name": "​ Label",
      "checked": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-checkbox Checked - A11y tree Safari */

