/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-chip renders DOM"] = 
`<sbb-chip
  tabindex="-1"
  value="Value"
>
</sbb-chip>
`;
/* end snapshot sbb-chip renders DOM */

snapshots["sbb-chip renders Shadow DOM"] = 
`<div class="sbb-chip__label-wrapper">
  <span class="sbb-chip__label">
    <slot>
      Value
    </slot>
  </span>
</div>
<sbb-mini-button
  aria-hidden="true"
  class="sbb-chip__delete"
  icon-name="cross-tiny-small"
  tabindex="0"
>
</sbb-mini-button>
<sbb-screen-reader-only>
  , Press the Delete button to remove the chip
</sbb-screen-reader-only>
`;
/* end snapshot sbb-chip renders Shadow DOM */

snapshots["sbb-chip renders with label DOM"] = 
`<sbb-chip
  tabindex="-1"
  value="Value"
>
  Value label
</sbb-chip>
`;
/* end snapshot sbb-chip renders with label DOM */

snapshots["sbb-chip renders with label Shadow DOM"] = 
`<div class="sbb-chip__label-wrapper">
  <span class="sbb-chip__label">
    <slot>
      Value
    </slot>
  </span>
</div>
<sbb-mini-button
  aria-hidden="true"
  class="sbb-chip__delete"
  icon-name="cross-tiny-small"
  tabindex="0"
>
</sbb-mini-button>
<sbb-screen-reader-only>
  , Press the Delete button to remove the chip
</sbb-screen-reader-only>
`;
/* end snapshot sbb-chip renders with label Shadow DOM */

snapshots["sbb-chip renders disabled DOM"] = 
`<sbb-chip
  disabled=""
  value="Value"
>
</sbb-chip>
`;
/* end snapshot sbb-chip renders disabled DOM */

snapshots["sbb-chip renders disabled Shadow DOM"] = 
`<div class="sbb-chip__label-wrapper">
  <span class="sbb-chip__label">
    <slot>
      Value
    </slot>
  </span>
</div>
<sbb-mini-button
  aria-hidden="true"
  class="sbb-chip__delete"
  icon-name="cross-tiny-small"
  tabindex="0"
>
</sbb-mini-button>
<sbb-screen-reader-only>
  , Press the Delete button to remove the chip
</sbb-screen-reader-only>
`;
/* end snapshot sbb-chip renders disabled Shadow DOM */

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
          "role": "text leaf",
          "name": ", "
        },
        {
          "role": "text leaf",
          "name": "Press the Delete button to remove the chip"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-chip renders A11y tree Firefox */

snapshots["sbb-chip renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "option",
      "name": "Value , Press the Delete button to remove the chip"
    }
  ]
}
</p>
`;
/* end snapshot sbb-chip renders A11y tree Chrome */

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
          "role": "text leaf",
          "name": ", "
        },
        {
          "role": "text leaf",
          "name": "Press the Delete button to remove the chip"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-chip renders with label A11y tree Firefox */

snapshots["sbb-chip renders with label A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "option",
      "name": "Value label , Press the Delete button to remove the chip"
    }
  ]
}
</p>
`;
/* end snapshot sbb-chip renders with label A11y tree Chrome */

snapshots["sbb-chip renders disabled A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Value"
    },
    {
      "role": "text",
      "name": ", "
    },
    {
      "role": "text",
      "name": "Press the Delete button to remove the chip"
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
    },
    {
      "role": "text leaf",
      "name": ", "
    },
    {
      "role": "text leaf",
      "name": "Press the Delete button to remove the chip"
    }
  ]
}
</p>
`;
/* end snapshot sbb-chip renders disabled A11y tree Firefox */

