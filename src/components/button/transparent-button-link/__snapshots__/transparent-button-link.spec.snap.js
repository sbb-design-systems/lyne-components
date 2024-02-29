/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Dom"] = 
`<sbb-transparent-button-link
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
</sbb-transparent-button-link>
`;
/* end snapshot Dom */

snapshots["ShadowDom"] = 
`<a
  class="sbb-action-base sbb-transparent-button-link"
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

snapshots["sbb-transparent-button-link renders a disabled sbb-transparent-button-link with slotted icon Dom"] = 
`<sbb-transparent-button-link
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
</sbb-transparent-button-link>
`;
/* end snapshot sbb-transparent-button-link renders a disabled sbb-transparent-button-link with slotted icon Dom */

snapshots["sbb-transparent-button-link renders a disabled sbb-transparent-button-link with slotted icon ShadowDom"] = 
`<a
  class="sbb-action-base sbb-transparent-button-link"
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
/* end snapshot sbb-transparent-button-link renders a disabled sbb-transparent-button-link with slotted icon ShadowDom */

snapshots["sbb-transparent-button-link A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-transparent-button-link A11y tree Chrome */

snapshots["sbb-transparent-button-link A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-transparent-button-link A11y tree Firefox */

snapshots["sbb-transparent-button-link A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-transparent-button-link A11y tree Safari */

