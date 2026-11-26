/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-toggle-slide renders DOM"] = 
`<sbb-toggle-slide
  checked=""
  disabled=""
  tabindex="0"
>
  <sbb-toggle-slide-unchecked-label>
    Pull right to start
  </sbb-toggle-slide-unchecked-label>
  <sbb-toggle-slide-unchecked-label>
    Pull left to stop
  </sbb-toggle-slide-unchecked-label>
</sbb-toggle-slide>
`;
/* end snapshot sbb-toggle-slide renders DOM */

snapshots["sbb-toggle-slide renders Shadow DOM"] = 
`<span
  aria-hidden="true"
  class="sbb-toggle-slide__call-to-actions"
>
  <slot>
  </slot>
</span>
<span
  aria-hidden="true"
  class="sbb-toggle-slide__track"
>
  <sbb-button-static
    class="sbb-toggle-slide__button"
    disabled=""
  >
    <span
      class="sbb-toggle-slide__icon-wrapper"
      slot="icon"
    >
      <sbb-icon name="lock-closed-small">
      </sbb-icon>
      <sbb-icon name="arrow-right-small">
      </sbb-icon>
      <sbb-icon name="tick-small">
      </sbb-icon>
    </span>
  </sbb-button-static>
</span>
`;
/* end snapshot sbb-toggle-slide renders Shadow DOM */

snapshots["sbb-toggle-slide renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "switch",
      "name": "",
      "disabled": true,
      "invalid": false,
      "checked": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-toggle-slide renders A11y tree Chrome */

