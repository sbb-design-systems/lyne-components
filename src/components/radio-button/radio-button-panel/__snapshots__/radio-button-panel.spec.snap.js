/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-radio-button-panel renders - Dom"] = 
`<sbb-radio-button-panel
  aria-checked="false"
  aria-disabled="false"
  aria-required="false"
  data-slot-names="unnamed"
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
/* end snapshot sbb-radio-button-panel renders - Dom */

snapshots["sbb-radio-button-panel renders - ShadowDom"] = 
`<label class="sbb-radio-button">
  <input
    aria-hidden="true"
    class="sbb-radio-button__input"
    tabindex="-1"
    type="radio"
    value="radio-value"
  >
  <span class="sbb-radio-button__label-slot">
    <slot>
    </slot>
  </span>
</label>
`;
/* end snapshot sbb-radio-button-panel renders - ShadowDom */

snapshots["sbb-radio-button-panel should render unchecked DOM"] = 
`<sbb-radio-button-panel
  aria-checked="false"
  aria-disabled="false"
  aria-required="false"
  data-slot-names="unnamed"
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
`<label class="sbb-radio-button">
  <input
    aria-hidden="true"
    class="sbb-radio-button__input"
    tabindex="-1"
    type="radio"
    value="radio-value"
  >
  <span class="sbb-radio-button__label-slot">
    <slot>
    </slot>
  </span>
</label>
`;
/* end snapshot sbb-radio-button-panel should render unchecked Shadow DOM */

snapshots["sbb-radio-button-panel A11y tree Chrome"] = 
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
/* end snapshot sbb-radio-button-panel A11y tree Chrome */

