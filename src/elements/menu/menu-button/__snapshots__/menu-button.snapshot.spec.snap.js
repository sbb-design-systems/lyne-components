/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-menu-button renders DOM"] = 
`<sbb-menu-button
  aria-label="a11y label"
  data-action=""
  data-button=""
  data-slot-names="unnamed"
  form="formid"
  name="name"
  tabindex="0"
  type="submit"
>
  Action
</sbb-menu-button>
`;
/* end snapshot sbb-menu-button renders DOM */

snapshots["sbb-menu-button renders Shadow DOM"] = 
`<span class="sbb-action-base sbb-menu-button">
  <span class="sbb-menu-action__content">
    <span class="sbb-menu-action__icon">
      <slot name="icon">
      </slot>
    </span>
    <span class="sbb-menu-action__label">
      <slot>
      </slot>
    </span>
  </span>
</span>
`;
/* end snapshot sbb-menu-button renders Shadow DOM */

snapshots["sbb-menu-button renders component with icon DOM"] = 
`<sbb-menu-button
  data-action=""
  data-button=""
  data-slot-names="unnamed"
  icon-name="menu-small"
  tabindex="0"
>
  Action
</sbb-menu-button>
`;
/* end snapshot sbb-menu-button renders component with icon DOM */

snapshots["sbb-menu-button renders component with icon Shadow DOM"] = 
`<span class="sbb-action-base sbb-menu-button">
  <span class="sbb-menu-action__content">
    <span class="sbb-menu-action__icon">
      <slot name="icon">
        <sbb-icon
          data-namespace="default"
          name="menu-small"
        >
        </sbb-icon>
      </slot>
    </span>
    <span class="sbb-menu-action__label">
      <slot>
      </slot>
    </span>
  </span>
</span>
`;
/* end snapshot sbb-menu-button renders component with icon Shadow DOM */

snapshots["sbb-menu-button renders component with icon A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "menuitem",
      "name": "Action"
    }
  ]
}
</p>
`;
/* end snapshot sbb-menu-button renders component with icon A11y tree Chrome */

snapshots["sbb-menu-button renders component with icon A11y tree Firefox"] = 
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
          "name": "Action"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-menu-button renders component with icon A11y tree Firefox */

