/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": ""
    },
    {
      "role": "button",
      "name": ""
    },
    {
      "role": "button",
      "name": ""
    },
    {
      "role": "button",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot A11y tree Chrome */

snapshots["A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": ""
    },
    {
      "role": "button",
      "name": ""
    },
    {
      "role": "button",
      "name": ""
    },
    {
      "role": "button",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot A11y tree Firefox */

snapshots["sbb-mini-button-group renders DOM"] = 
`<sbb-mini-button-group
  accessibility-label="Group label"
  size="m"
>
  <sbb-mini-button
    data-action=""
    data-button=""
    dir="ltr"
    icon-name="pen-small"
    role="button"
    slot="li-0"
    tabindex="0"
  >
  </sbb-mini-button>
  <sbb-mini-button
    data-action=""
    data-button=""
    dir="ltr"
    icon-name="pen-small"
    role="button"
    slot="li-1"
    tabindex="0"
  >
  </sbb-mini-button>
</sbb-mini-button-group>
`;
/* end snapshot sbb-mini-button-group renders DOM */

snapshots["sbb-mini-button-group renders Shadow DOM"] = 
`<ul
  aria-label="Group label"
  class="sbb-mini-button-group"
>
  <li>
    <slot name="li-0">
    </slot>
  </li>
  <li>
    <slot name="li-1">
    </slot>
  </li>
</ul>
<span hidden="">
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-mini-button-group renders Shadow DOM */

snapshots["sbb-mini-button-group renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": ""
    },
    {
      "role": "button",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-mini-button-group renders A11y tree Chrome */

snapshots["sbb-mini-button-group renders negative DOM"] = 
`<sbb-mini-button-group
  negative=""
  size="m"
>
  <sbb-mini-button
    data-action=""
    data-button=""
    dir="ltr"
    icon-name="pen-small"
    negative=""
    role="button"
    slot="li-0"
    tabindex="0"
  >
  </sbb-mini-button>
  <sbb-mini-button
    data-action=""
    data-button=""
    dir="ltr"
    icon-name="pen-small"
    negative=""
    role="button"
    slot="li-1"
    tabindex="0"
  >
  </sbb-mini-button>
</sbb-mini-button-group>
`;
/* end snapshot sbb-mini-button-group renders negative DOM */

snapshots["sbb-mini-button-group renders negative Shadow DOM"] = 
`<ul class="sbb-mini-button-group">
  <li>
    <slot name="li-0">
    </slot>
  </li>
  <li>
    <slot name="li-1">
    </slot>
  </li>
</ul>
<span hidden="">
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-mini-button-group renders negative Shadow DOM */

snapshots["sbb-mini-button-group renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": ""
    },
    {
      "role": "button",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-mini-button-group renders A11y tree Firefox */

