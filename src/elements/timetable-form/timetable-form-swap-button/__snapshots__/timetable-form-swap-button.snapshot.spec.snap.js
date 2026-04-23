/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-timetable-form-swap-button renders DOM"] = 
`<sbb-timetable-form-swap-button
  size="l"
  tabindex="0"
>
</sbb-timetable-form-swap-button>
`;
/* end snapshot sbb-timetable-form-swap-button renders DOM */

snapshots["sbb-timetable-form-swap-button renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-timetable-form-swap-button">
  <slot name="icon">
    <sbb-icon name="arrow-change-small">
    </sbb-icon>
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-timetable-form-swap-button renders Shadow DOM */

snapshots["sbb-timetable-form-swap-button renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "button",
      "name": "Swap from and to",
      "invalid": false,
      "focusable": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-timetable-form-swap-button renders A11y tree Chrome */

