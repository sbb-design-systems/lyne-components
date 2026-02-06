/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-checkbox should render unchecked DOM"] = 
`<sbb-checkbox
  icon-placement="end"
  size="m"
  tabindex="0"
>
  Label
</sbb-checkbox>
`;
/* end snapshot sbb-checkbox should render unchecked DOM */

snapshots["sbb-checkbox should render unchecked Shadow DOM"] = 
`<span class="sbb-checkbox-wrapper">
  <span class="sbb-checkbox">
    <span class="sbb-checkbox__inner">
      <span class="sbb-checkbox__aligner">
        <sbb-visual-checkbox size="m">
        </sbb-visual-checkbox>
      </span>
      <span class="sbb-checkbox__label">
        <slot>
        </slot>
        <slot name="icon">
        </slot>
      </span>
    </span>
  </span>
</span>
`;
/* end snapshot sbb-checkbox should render unchecked Shadow DOM */

snapshots["sbb-checkbox should render checked DOM"] = 
`<sbb-checkbox
  checked=""
  icon-placement="end"
  size="m"
  tabindex="0"
>
  Label
</sbb-checkbox>
`;
/* end snapshot sbb-checkbox should render checked DOM */

snapshots["sbb-checkbox should render checked Shadow DOM"] = 
`<span class="sbb-checkbox-wrapper">
  <span class="sbb-checkbox">
    <span class="sbb-checkbox__inner">
      <span class="sbb-checkbox__aligner">
        <sbb-visual-checkbox
          checked=""
          size="m"
        >
        </sbb-visual-checkbox>
      </span>
      <span class="sbb-checkbox__label">
        <slot>
        </slot>
        <slot name="icon">
        </slot>
      </span>
    </span>
  </span>
</span>
`;
/* end snapshot sbb-checkbox should render checked Shadow DOM */

snapshots["sbb-checkbox should render indeterminate DOM"] = 
`<sbb-checkbox
  icon-placement="end"
  indeterminate=""
  size="m"
  tabindex="0"
>
  Label
</sbb-checkbox>
`;
/* end snapshot sbb-checkbox should render indeterminate DOM */

snapshots["sbb-checkbox should render indeterminate Shadow DOM"] = 
`<span class="sbb-checkbox-wrapper">
  <span class="sbb-checkbox">
    <span class="sbb-checkbox__inner">
      <span class="sbb-checkbox__aligner">
        <sbb-visual-checkbox
          indeterminate=""
          size="m"
        >
        </sbb-visual-checkbox>
      </span>
      <span class="sbb-checkbox__label">
        <slot>
        </slot>
        <slot name="icon">
        </slot>
      </span>
    </span>
  </span>
</span>
`;
/* end snapshot sbb-checkbox should render indeterminate Shadow DOM */

snapshots["sbb-checkbox should render unchecked disabled DOM"] = 
`<sbb-checkbox
  disabled=""
  icon-placement="end"
  size="m"
  tabindex="0"
>
  Label
</sbb-checkbox>
`;
/* end snapshot sbb-checkbox should render unchecked disabled DOM */

snapshots["sbb-checkbox should render unchecked disabled Shadow DOM"] = 
`<span class="sbb-checkbox-wrapper">
  <span class="sbb-checkbox">
    <span class="sbb-checkbox__inner">
      <span class="sbb-checkbox__aligner">
        <sbb-visual-checkbox
          disabled=""
          size="m"
        >
        </sbb-visual-checkbox>
      </span>
      <span class="sbb-checkbox__label">
        <slot>
        </slot>
        <slot name="icon">
        </slot>
      </span>
    </span>
  </span>
</span>
`;
/* end snapshot sbb-checkbox should render unchecked disabled Shadow DOM */

snapshots["sbb-checkbox Unchecked - A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "checkbox",
      "name": "​ Label",
      "invalid": false,
      "focusable": true,
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
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "checkbox",
      "name": "​ Label",
      "invalid": false,
      "focusable": true,
      "checked": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-checkbox Checked - A11y tree Chrome */

