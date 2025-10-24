/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-button-link renders a sbb-button-link without icon DOM"] = 
`<sbb-button-link
  data-action=""
  data-link=""
  data-sbb-button=""
  download=""
  href="https://www.sbb.ch"
  rel="noopener"
  size="m"
  target="_blank"
>
  Label Text
</sbb-button-link>
`;
/* end snapshot sbb-button-link renders a sbb-button-link without icon DOM */

snapshots["sbb-button-link renders a sbb-button-link without icon Shadow DOM"] = 
`<a
  class="sbb-action-base sbb-button-link"
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
/* end snapshot sbb-button-link renders a sbb-button-link without icon Shadow DOM */

snapshots["sbb-button-link renders a disabled sbb-button-link with slotted icon DOM"] = 
`<sbb-button-link
  data-action=""
  data-link=""
  data-sbb-button=""
  disabled=""
  href="https://www.sbb.ch"
  size="l"
>
  <sbb-icon
    data-namespace="default"
    name="chevron-small-left-small"
    slot="icon"
  >
  </sbb-icon>
  Label Text
</sbb-button-link>
`;
/* end snapshot sbb-button-link renders a disabled sbb-button-link with slotted icon DOM */

snapshots["sbb-button-link renders a disabled sbb-button-link with slotted icon Shadow DOM"] = 
`<a
  aria-disabled="true"
  class="sbb-action-base sbb-button-link"
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
/* end snapshot sbb-button-link renders a disabled sbb-button-link with slotted icon Shadow DOM */

snapshots["sbb-button-link renders a sbb-button-link without icon A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Label Text . Link target opens in a new window."
    }
  ]
}
</p>
`;
/* end snapshot sbb-button-link renders a sbb-button-link without icon A11y tree Chrome */

snapshots["sbb-button-link renders a sbb-button-link without icon A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Label Text . Link target opens in a new window.",
      "value": "https://www.sbb.ch/"
    }
  ]
}
</p>
`;
/* end snapshot sbb-button-link renders a sbb-button-link without icon A11y tree Firefox */

