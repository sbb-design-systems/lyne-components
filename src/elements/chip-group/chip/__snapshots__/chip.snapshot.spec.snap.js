/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-chip renders DOM"] = 
`<sbb-chip
  role="option"
  tabindex="-1"
  value="Value"
>
</sbb-chip>
`;
/* end snapshot sbb-chip renders DOM */

snapshots["sbb-chip renders Shadow DOM"] = 
`<div class="sbb-chip">
  <div class="sbb-chip__label-wrapper">
    <span class="sbb-chip__label">
      <slot>
        Value
      </slot>
    </span>
  </div>
  <sbb-mini-button
    class="sbb-chip__delete"
    data-action=""
    data-button=""
    icon-name="cross-tiny-small"
    tabindex="0"
  >
  </sbb-mini-button>
</div>
`;
/* end snapshot sbb-chip renders Shadow DOM */

snapshots["sbb-chip renders disabled DOM"] = 
`<sbb-chip
  disabled=""
  role="option"
  value="Value"
>
</sbb-chip>
`;
/* end snapshot sbb-chip renders disabled DOM */

snapshots["sbb-chip renders disabled Shadow DOM"] = 
`<div class="sbb-chip">
  <div class="sbb-chip__label-wrapper">
    <span class="sbb-chip__label">
      <slot>
        Value
      </slot>
    </span>
  </div>
  <sbb-mini-button
    class="sbb-chip__delete"
    data-action=""
    data-button=""
    icon-name="cross-tiny-small"
    tabindex="0"
  >
  </sbb-mini-button>
</div>
`;
/* end snapshot sbb-chip renders disabled Shadow DOM */

snapshots["sbb-chip renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "option",
      "name": "Value",
      "children": [
        {
          "role": "text",
          "name": "Value"
        },
        {
          "role": "button",
          "name": ""
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-chip renders A11y tree Chrome */

snapshots["sbb-chip renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text container",
      "name": "",
      "children": [
        {
          "role": "text leaf",
          "name": "Value"
        },
        {
          "role": "button",
          "name": ""
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-chip renders A11y tree Firefox */

snapshots["sbb-chip renders disabled A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Value"
    }
  ]
}
</p>
`;
/* end snapshot sbb-chip renders disabled A11y tree Chrome */

snapshots["sbb-chip renders disabled A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Value"
    }
  ]
}
</p>
`;
/* end snapshot sbb-chip renders disabled A11y tree Firefox */

snapshots["sbb-chip renders with label DOM"] = 
`<sbb-chip
  role="option"
  tabindex="-1"
  value="Value"
>
  Value label
</sbb-chip>
`;
/* end snapshot sbb-chip renders with label DOM */

snapshots["sbb-chip renders with label Shadow DOM"] = 
`<div class="sbb-chip">
  <div class="sbb-chip__label-wrapper">
    <span class="sbb-chip__label">
      <slot>
        Value
      </slot>
    </span>
  </div>
  <sbb-mini-button
    class="sbb-chip__delete"
    data-action=""
    data-button=""
    icon-name="cross-tiny-small"
    tabindex="0"
  >
  </sbb-mini-button>
</div>
`;
/* end snapshot sbb-chip renders with label Shadow DOM */

snapshots["sbb-chip renders with label A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "option",
      "name": "Value label",
      "children": [
        {
          "role": "text",
          "name": "Value label"
        },
        {
          "role": "button",
          "name": ""
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-chip renders with label A11y tree Chrome */

snapshots["sbb-chip renders with label A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text container",
      "name": "",
      "children": [
        {
          "role": "text leaf",
          "name": "Value label"
        },
        {
          "role": "button",
          "name": ""
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-chip renders with label A11y tree Firefox */

