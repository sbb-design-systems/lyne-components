/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-secondary-button-link renders a sbb-secondary-button-link without icon DOM"] = 
`<sbb-secondary-button-link
  download=""
  href="https://www.sbb.ch"
  rel="noopener"
  size="m"
  target="_blank"
>
  Label Text
</sbb-secondary-button-link>
`;
/* end snapshot sbb-secondary-button-link renders a sbb-secondary-button-link without icon DOM */

snapshots["sbb-secondary-button-link renders a sbb-secondary-button-link without icon Shadow DOM"] = 
`<a
  class="sbb-action-base sbb-secondary-button-link"
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
  <sbb-screen-reader-only>
    . Link target opens in a new window.
  </sbb-screen-reader-only>
</a>
`;
/* end snapshot sbb-secondary-button-link renders a sbb-secondary-button-link without icon Shadow DOM */

snapshots["sbb-secondary-button-link renders a disabled sbb-secondary-button-link with slotted icon DOM"] = 
`<sbb-secondary-button-link
  disabled=""
  href="https://www.sbb.ch"
  size="l"
>
  <sbb-icon
    name="chevron-small-left-small"
    slot="icon"
  >
  </sbb-icon>
  Label Text
</sbb-secondary-button-link>
`;
/* end snapshot sbb-secondary-button-link renders a disabled sbb-secondary-button-link with slotted icon DOM */

snapshots["sbb-secondary-button-link renders a disabled sbb-secondary-button-link with slotted icon Shadow DOM"] = 
`<a
  aria-disabled="true"
  class="sbb-action-base sbb-secondary-button-link"
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
/* end snapshot sbb-secondary-button-link renders a disabled sbb-secondary-button-link with slotted icon Shadow DOM */

snapshots["sbb-secondary-button-link renders a sbb-secondary-button-link without icon A11y tree Chrome"] = 
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
/* end snapshot sbb-secondary-button-link renders a sbb-secondary-button-link without icon A11y tree Chrome */

