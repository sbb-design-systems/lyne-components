/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Dom"] = 
`<sbb-button-link
  data-slot-names="unnamed"
  dir="ltr"
  download=""
  href="#"
  rel="noopener"
  role="link"
  size="m"
  tabindex="0"
  target="_blank"
>
  Label Text
</sbb-button-link>
`;
/* end snapshot Dom */

snapshots["ShadowDom"] = 
`<a
  class="sbb-action-base sbb-button-link"
  download=""
  href="#"
  rel="noopener"
  role="presentation"
  tabindex="-1"
  target="_blank"
>
  <span class="sbb-button__icon">
    <slot name="icon">
    </slot>
  </span>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
  <sbb-screenreader-only>
    . Link target opens in a new window.
  </sbb-screenreader-only>
</a>
`;
/* end snapshot ShadowDom */

snapshots["sbb-button-link renders a disabled sbb-button-link with slotted icon Dom"] = 
`<sbb-button-link
  aria-disabled="true"
  data-slot-names="icon unnamed"
  dir="ltr"
  disabled=""
  href="#"
  role="link"
  size="l"
>
  <sbb-icon
    aria-hidden="true"
    data-namespace="default"
    name="chevron-small-left-small"
    role="img"
    slot="icon"
  >
  </sbb-icon>
  Label Text
</sbb-button-link>
`;
/* end snapshot sbb-button-link renders a disabled sbb-button-link with slotted icon Dom */

snapshots["sbb-button-link renders a disabled sbb-button-link with slotted icon ShadowDom"] = 
`<a
  class="sbb-action-base sbb-button-link"
  href="#"
  role="presentation"
  tabindex="-1"
>
  <span class="sbb-button__icon">
    <slot name="icon">
    </slot>
  </span>
  <span class="sbb-button__label">
    <slot>
    </slot>
  </span>
</a>
`;
/* end snapshot sbb-button-link renders a disabled sbb-button-link with slotted icon ShadowDom */

snapshots["sbb-button-link A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-button-link A11y tree Chrome */

snapshots["sbb-button-link A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-button-link A11y tree Firefox */

snapshots["sbb-button-link A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-button-link A11y tree Safari */

