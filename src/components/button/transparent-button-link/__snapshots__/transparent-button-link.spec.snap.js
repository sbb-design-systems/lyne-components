/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Dom"] = 
`<sbb-transparent-button-link
  data-slot-names="unnamed"
  dir="ltr"
  download=""
  href="https://www.sbb.ch"
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
  href="https://www.sbb.ch"
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
  href="https://www.sbb.ch"
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
  href="https://www.sbb.ch"
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

snapshots["A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot A11y tree Chrome */

snapshots["A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot A11y tree Firefox */

snapshots["A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot A11y tree Safari */

snapshots["sbb-transparent-button-link renders a sbb-transparent-button-link without icon Dom"] = 
`<sbb-transparent-button-link
  data-slot-names="unnamed"
  dir="ltr"
  download=""
  href="https://www.sbb.ch"
  rel="noopener"
  role="link"
  size="m"
  tabindex="0"
  target="_blank"
>
  Label Text
</sbb-transparent-button-link>
`;
/* end snapshot sbb-transparent-button-link renders a sbb-transparent-button-link without icon Dom */

snapshots["sbb-transparent-button-link renders a sbb-transparent-button-link without icon ShadowDom"] = 
`<a
  class="sbb-action-base sbb-transparent-button-link"
  download=""
  href="https://www.sbb.ch"
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
/* end snapshot sbb-transparent-button-link renders a sbb-transparent-button-link without icon ShadowDom */

snapshots["sbb-transparent-button-link renders a sbb-transparent-button-link without icon A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Label Text . Link target opens in a new window.",
      "children": [
        {
          "role": "link",
          "name": "Label Text . Link target opens in a new window."
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-transparent-button-link renders a sbb-transparent-button-link without icon A11y tree Chrome */

snapshots["sbb-transparent-button-link renders a sbb-transparent-button-link without icon A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Label Text . Link target opens in a new window.",
      "children": [
        {
          "role": "link",
          "name": "Label Text . Link target opens in a new window.",
          "value": "https://www.sbb.ch/"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-transparent-button-link renders a sbb-transparent-button-link without icon A11y tree Firefox */

snapshots["sbb-transparent-button-link renders a sbb-transparent-button-link without icon A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "",
      "children": [
        {
          "role": "link",
          "name": "Label Text . Link target opens in a new window.",
          "children": [
            {
              "role": "text",
              "name": "Label Text"
            },
            {
              "role": "text",
              "name": ". "
            },
            {
              "role": "text",
              "name": "Link target opens in a new window."
            }
          ]
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-transparent-button-link renders a sbb-transparent-button-link without icon A11y tree Safari */

