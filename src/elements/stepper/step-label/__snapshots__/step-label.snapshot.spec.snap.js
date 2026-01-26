/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-step-label renders DOM"] = 
`<sbb-step-label
  id="sbb-step-label-0"
  slot="step-label"
  tabindex="-1"
>
  Label
</sbb-step-label>
`;
/* end snapshot sbb-step-label renders DOM */

snapshots["sbb-step-label renders Shadow DOM"] = 
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
/* end snapshot sbb-step-label renders Shadow DOM */

snapshots["sbb-step-label renders with icon DOM"] = 
`<sbb-step-label
  icon-name="tick-small"
  id="sbb-step-label-2"
  slot="step-label"
  tabindex="-1"
>
  Label
</sbb-step-label>
`;
/* end snapshot sbb-step-label renders with icon DOM */

snapshots["sbb-step-label renders with icon Shadow DOM"] = 
`<div class="sbb-step-label">
  <span class="sbb-step-label__prefix">
    <slot name="icon">
      <sbb-icon name="tick-small">
      </sbb-icon>
    </slot>
  </span>
  <span class="sbb-step-label__text">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-step-label renders with icon Shadow DOM */

snapshots["sbb-step-label renders disabled DOM"] = 
`<sbb-step-label
  disabled=""
  id="sbb-step-label-4"
  slot="step-label"
  tabindex="-1"
>
  Label
</sbb-step-label>
`;
/* end snapshot sbb-step-label renders disabled DOM */

snapshots["sbb-step-label renders disabled Shadow DOM"] = 
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
/* end snapshot sbb-step-label renders disabled Shadow DOM */

snapshots["sbb-step-label A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "tab",
      "name": "Label",
      "invalid": false,
      "focusable": true,
      "selected": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-step-label A11y tree Chrome */

