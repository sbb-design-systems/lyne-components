/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-checkbox-panel should render unchecked DOM"] = 
`<sbb-checkbox-panel
  data-slot-names="subtext suffix unnamed"
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
/* end snapshot sbb-checkbox-panel should render unchecked DOM */

snapshots["sbb-checkbox-panel should render unchecked Shadow DOM"] = 
`<span class="sbb-selection-panel">
  <div class="sbb-selection-expansion-panel__badge">
    <slot name="badge">
    </slot>
  </div>
  <span class="sbb-checkbox-wrapper">
    <span class="sbb-checkbox">
      <span class="sbb-checkbox__inner">
        <span class="sbb-checkbox__aligner">
          <sbb-visual-checkbox>
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
/* end snapshot sbb-checkbox-panel should render unchecked Shadow DOM */

snapshots["sbb-checkbox-panel should render checked DOM"] = 
`<sbb-checkbox-panel
  checked=""
  data-checked=""
  data-slot-names="subtext suffix unnamed"
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
/* end snapshot sbb-checkbox-panel should render checked DOM */

snapshots["sbb-checkbox-panel should render checked Shadow DOM"] = 
`<span class="sbb-selection-panel">
  <div class="sbb-selection-expansion-panel__badge">
    <slot name="badge">
    </slot>
  </div>
  <span class="sbb-checkbox-wrapper">
    <span class="sbb-checkbox">
      <span class="sbb-checkbox__inner">
        <span class="sbb-checkbox__aligner">
          <sbb-visual-checkbox checked="">
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
/* end snapshot sbb-checkbox-panel should render checked Shadow DOM */

snapshots["sbb-checkbox-panel should render indeterminate DOM"] = 
`<sbb-checkbox-panel
  data-slot-names="subtext suffix unnamed"
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
/* end snapshot sbb-checkbox-panel should render indeterminate DOM */

snapshots["sbb-checkbox-panel should render indeterminate Shadow DOM"] = 
`<span class="sbb-selection-panel">
  <div class="sbb-selection-expansion-panel__badge">
    <slot name="badge">
    </slot>
  </div>
  <span class="sbb-checkbox-wrapper">
    <span class="sbb-checkbox">
      <span class="sbb-checkbox__inner">
        <span class="sbb-checkbox__aligner">
          <sbb-visual-checkbox indeterminate="">
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
/* end snapshot sbb-checkbox-panel should render indeterminate Shadow DOM */

snapshots["sbb-checkbox-panel should render unchecked disabled DOM"] = 
`<sbb-checkbox-panel
  data-slot-names="subtext suffix unnamed"
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
/* end snapshot sbb-checkbox-panel should render unchecked disabled DOM */

snapshots["sbb-checkbox-panel should render unchecked disabled Shadow DOM"] = 
`<span class="sbb-selection-panel">
  <div class="sbb-selection-expansion-panel__badge">
    <slot name="badge">
    </slot>
  </div>
  <span class="sbb-checkbox-wrapper">
    <span class="sbb-checkbox">
      <span class="sbb-checkbox__inner">
        <span class="sbb-checkbox__aligner">
          <sbb-visual-checkbox disabled="">
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
/* end snapshot sbb-checkbox-panel should render unchecked disabled Shadow DOM */

snapshots["sbb-checkbox-panel Unchecked - A11y tree Firefox"] = 
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
/* end snapshot sbb-checkbox-panel Unchecked - A11y tree Firefox */

snapshots["sbb-checkbox-panel Unchecked - A11y tree Chrome"] = 
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
/* end snapshot sbb-checkbox-panel Unchecked - A11y tree Chrome */

snapshots["sbb-checkbox-panel Checked - A11y tree Chrome"] = 
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
/* end snapshot sbb-checkbox-panel Checked - A11y tree Chrome */

snapshots["sbb-checkbox-panel Checked - A11y tree Firefox"] = 
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
/* end snapshot sbb-checkbox-panel Checked - A11y tree Firefox */

