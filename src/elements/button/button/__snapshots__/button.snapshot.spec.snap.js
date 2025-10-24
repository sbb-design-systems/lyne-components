/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-button renders an sbb-button without icon DOM"] = 
`<sbb-button
  data-action=""
  data-button=""
  data-sbb-button=""
  disabled=""
  form="formid"
  name="name"
  negative=""
  size="m"
  type="button"
  value="value"
>
  Label Text
</sbb-button>
`;
/* end snapshot sbb-button renders an sbb-button without icon DOM */

snapshots["sbb-button renders an sbb-button without icon Shadow DOM"] = 
`<span class="sbb-action-base sbb-button">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-button renders an sbb-button without icon Shadow DOM */

snapshots["sbb-button renders an sbb-button with slotted icon DOM"] = 
`<sbb-button
  data-action=""
  data-button=""
  data-sbb-button=""
  size="l"
  tabindex="0"
>
  <sbb-icon
    data-namespace="default"
    name="chevron-small-left-small"
    slot="icon"
  >
  </sbb-icon>
  Label Text
</sbb-button>
`;
/* end snapshot sbb-button renders an sbb-button with slotted icon DOM */

snapshots["sbb-button renders an sbb-button with slotted icon Shadow DOM"] = 
`<span class="sbb-action-base sbb-button">
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-button renders an sbb-button with slotted icon Shadow DOM */

snapshots["sbb-button renders an sbb-button in loading state DOM"] = 
`<sbb-button
  data-action=""
  data-button=""
  data-sbb-button=""
  icon-name="arrow-right-small"
  loading=""
  size="l"
  style="--sbb-button-width: 136px;"
  tabindex="0"
>
  Loading Button
</sbb-button>
`;
/* end snapshot sbb-button renders an sbb-button in loading state DOM */

snapshots["sbb-button renders an sbb-button in loading state Shadow DOM"] = 
`<span class="sbb-action-base sbb-button">
  <slot name="icon">
    <sbb-icon
      data-namespace="default"
      name="arrow-right-small"
    >
    </sbb-icon>
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
  <div class="sbb-button-loading-border">
  </div>
</span>
`;
/* end snapshot sbb-button renders an sbb-button in loading state Shadow DOM */

snapshots["sbb-button renders an sbb-button with slotted icon A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Label Text"
    }
  ]
}
</p>
`;
/* end snapshot sbb-button renders an sbb-button with slotted icon A11y tree Firefox */

snapshots["sbb-button renders an sbb-button with slotted icon A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Label Text"
    }
  ]
}
</p>
`;
/* end snapshot sbb-button renders an sbb-button with slotted icon A11y tree Chrome */

snapshots["sbb-button renders an sbb-button in loading state A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Loading Button",
      "disabled": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-button renders an sbb-button in loading state A11y tree Firefox */

snapshots["sbb-button renders an sbb-button in loading state A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Loading Button",
      "disabled": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-button renders an sbb-button in loading state A11y tree Chrome */

