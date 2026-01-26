/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-checkbox-panel renders unchecked DOM"] = 
`<sbb-checkbox-panel
  color="white"
  size="m"
  tabindex="0"
>
  Label
  <span slot="subtext">
    Subtext
  </span>
  <span slot="suffix">
    Suffix
  </span>
</sbb-checkbox-panel>
`;
/* end snapshot sbb-checkbox-panel renders unchecked DOM */

snapshots["sbb-checkbox-panel renders unchecked Shadow DOM"] = 
`<span class="sbb-selection-panel">
  <div class="sbb-selection-panel__badge">
    <slot name="badge">
    </slot>
  </div>
  <span class="sbb-checkbox-wrapper">
    <span class="sbb-checkbox">
      <span class="sbb-checkbox__inner">
        <span class="sbb-checkbox__aligner">
          <sbb-visual-checkbox size="m">
          </sbb-visual-checkbox>
        </span>
        <span class="sbb-checkbox__label">
          <slot>
          </slot>
          <slot name="suffix">
          </slot>
        </span>
      </span>
      <slot name="subtext">
      </slot>
    </span>
  </span>
</span>
`;
/* end snapshot sbb-checkbox-panel renders unchecked Shadow DOM */

snapshots["sbb-checkbox-panel renders checked DOM"] = 
`<sbb-checkbox-panel
  checked=""
  color="white"
  size="m"
  tabindex="0"
>
  Label
  <span slot="subtext">
    Subtext
  </span>
  <span slot="suffix">
    Suffix
  </span>
</sbb-checkbox-panel>
`;
/* end snapshot sbb-checkbox-panel renders checked DOM */

snapshots["sbb-checkbox-panel renders checked Shadow DOM"] = 
`<span class="sbb-selection-panel">
  <div class="sbb-selection-panel__badge">
    <slot name="badge">
    </slot>
  </div>
  <span class="sbb-checkbox-wrapper">
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
          <slot name="suffix">
          </slot>
        </span>
      </span>
      <slot name="subtext">
      </slot>
    </span>
  </span>
</span>
`;
/* end snapshot sbb-checkbox-panel renders checked Shadow DOM */

snapshots["sbb-checkbox-panel renders indeterminate DOM"] = 
`<sbb-checkbox-panel
  color="white"
  indeterminate=""
  size="m"
  tabindex="0"
>
  Label
  <span slot="subtext">
    Subtext
  </span>
  <span slot="suffix">
    Suffix
  </span>
</sbb-checkbox-panel>
`;
/* end snapshot sbb-checkbox-panel renders indeterminate DOM */

snapshots["sbb-checkbox-panel renders indeterminate Shadow DOM"] = 
`<span class="sbb-selection-panel">
  <div class="sbb-selection-panel__badge">
    <slot name="badge">
    </slot>
  </div>
  <span class="sbb-checkbox-wrapper">
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
          <slot name="suffix">
          </slot>
        </span>
      </span>
      <slot name="subtext">
      </slot>
    </span>
  </span>
</span>
`;
/* end snapshot sbb-checkbox-panel renders indeterminate Shadow DOM */

snapshots["sbb-checkbox-panel renders unchecked disabled DOM"] = 
`<sbb-checkbox-panel
  color="white"
  disabled=""
  size="m"
  tabindex="0"
>
  Label
  <span slot="subtext">
    Subtext
  </span>
  <span slot="suffix">
    Suffix
  </span>
</sbb-checkbox-panel>
`;
/* end snapshot sbb-checkbox-panel renders unchecked disabled DOM */

snapshots["sbb-checkbox-panel renders unchecked disabled Shadow DOM"] = 
`<span class="sbb-selection-panel">
  <div class="sbb-selection-panel__badge">
    <slot name="badge">
    </slot>
  </div>
  <span class="sbb-checkbox-wrapper">
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
          <slot name="suffix">
          </slot>
        </span>
      </span>
      <slot name="subtext">
      </slot>
    </span>
  </span>
</span>
`;
/* end snapshot sbb-checkbox-panel renders unchecked disabled Shadow DOM */

snapshots["sbb-checkbox-panel Unchecked - A11y tree Chrome"] = 
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
/* end snapshot sbb-checkbox-panel Unchecked - A11y tree Chrome */

snapshots["sbb-checkbox-panel Checked - A11y tree Chrome"] = 
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
/* end snapshot sbb-checkbox-panel Checked - A11y tree Chrome */

