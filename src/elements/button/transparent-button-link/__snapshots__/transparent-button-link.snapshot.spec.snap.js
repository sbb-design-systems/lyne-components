/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-transparent-button-link renders a sbb-transparent-button-link without icon DOM"] = 
`<sbb-transparent-button-link
  download=""
  href="https://www.sbb.ch"
  rel="noopener"
  size="m"
  target="_blank"
>
  Label Text
</sbb-transparent-button-link>
`;
/* end snapshot sbb-transparent-button-link renders a sbb-transparent-button-link without icon DOM */

snapshots["sbb-transparent-button-link renders a sbb-transparent-button-link without icon Shadow DOM"] = 
`<a
  aria-describedby="sbb-link-new-window"
  class="sbb-action-base sbb-transparent-button-link"
  download=""
  href="https://www.sbb.ch"
  rel="noopener"
  target="_blank"
>
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</a>
<span
  hidden=""
  id="sbb-link-new-window"
>
  Link target opens in a new window.
</span>
`;
/* end snapshot sbb-transparent-button-link renders a sbb-transparent-button-link without icon Shadow DOM */

snapshots["sbb-transparent-button-link renders a disabled sbb-transparent-button-link with slotted icon DOM"] = 
`<sbb-transparent-button-link
  disabled=""
  href="https://www.sbb.ch"
  size="m"
>
  <sbb-icon
    name="chevron-small-left-small"
    slot="icon"
  >
  </sbb-icon>
  Label Text
</sbb-transparent-button-link>
`;
/* end snapshot sbb-transparent-button-link renders a disabled sbb-transparent-button-link with slotted icon DOM */

snapshots["sbb-transparent-button-link renders a disabled sbb-transparent-button-link with slotted icon Shadow DOM"] = 
`<a
  aria-disabled="true"
  class="sbb-action-base sbb-transparent-button-link"
  href="https://www.sbb.ch"
  tabindex="-1"
>
  <slot name="icon">
  </slot>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</a>
`;
/* end snapshot sbb-transparent-button-link renders a disabled sbb-transparent-button-link with slotted icon Shadow DOM */

snapshots["sbb-transparent-button-link renders a sbb-transparent-button-link without icon A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "generic",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-transparent-button-link renders a sbb-transparent-button-link without icon A11y tree Chrome */

