/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-step-label renders Dom"] = 
`<sbb-step-label
  data-action=""
  data-button=""
  dir="ltr"
  id="sbb-step-label-0"
  role="tab"
  slot="step-label"
  tabindex="-1"
>
  Label
</sbb-step-label>
`;
/* end snapshot sbb-step-label renders Dom */

snapshots["sbb-step-label renders ShadowDom"] = 
`<div class="sbb-step-label">
  <span class="sbb-step-label__prefix">
    <slot name="icon">
    </slot>
  </span>
  <span class="sbb-step-label__text">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-step-label renders ShadowDom */

snapshots["sbb-step-label renders with icon Dom"] = 
`<sbb-step-label
  data-action=""
  data-button=""
  dir="ltr"
  icon-name="tick-small"
  id="sbb-step-label-2"
  role="tab"
  slot="step-label"
  tabindex="-1"
>
  Label
</sbb-step-label>
`;
/* end snapshot sbb-step-label renders with icon Dom */

snapshots["sbb-step-label renders with icon ShadowDom"] = 
`<div class="sbb-step-label">
  <span class="sbb-step-label__prefix">
    <slot name="icon">
      <sbb-icon
        aria-hidden="true"
        data-namespace="default"
        name="tick-small"
        role="img"
      >
      </sbb-icon>
    </slot>
  </span>
  <span class="sbb-step-label__text">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-step-label renders with icon ShadowDom */

snapshots["sbb-step-label renders disabled Dom"] = 
`<sbb-step-label
  data-action=""
  data-button=""
  data-disabled=""
  dir="ltr"
  disabled=""
  id="sbb-step-label-4"
  role="tab"
  slot="step-label"
  tabindex="-1"
>
  Label
</sbb-step-label>
`;
/* end snapshot sbb-step-label renders disabled Dom */

snapshots["sbb-step-label renders disabled ShadowDom"] = 
`<div class="sbb-step-label">
  <span class="sbb-step-label__prefix">
    <slot name="icon">
    </slot>
  </span>
  <span class="sbb-step-label__text">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-step-label renders disabled ShadowDom */

snapshots["sbb-step-label A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "tab",
      "name": "Label"
    }
  ]
}
</p>
`;
/* end snapshot sbb-step-label A11y tree Chrome */

snapshots["sbb-step-label A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "tab",
      "name": "Label"
    }
  ]
}
</p>
`;
/* end snapshot sbb-step-label A11y tree Firefox */

