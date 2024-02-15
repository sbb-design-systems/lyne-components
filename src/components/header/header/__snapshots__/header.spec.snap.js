/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-header renders"] = 
`<header class="sbb-header">
  <div class="sbb-header__wrapper">
    <slot>
    </slot>
    <div class="sbb-header__logo">
      <slot name="logo">
        <sbb-logo protective-room="none">
        </sbb-logo>
      </slot>
    </div>
  </div>
</header>
`;
/* end snapshot sbb-header renders */

snapshots["sbb-header renders actions and logo Dom"] = 
`<sbb-header>
  <sbb-header-action
    href="https://github.com/lyne-design-system/lyne-components"
    icon-name="hamburger-menu-small"
  >
    Menu
  </sbb-header-action>
  <div slot="logo">
    <circle
      cx="25"
      cy="75"
      r="20"
    >
    </circle>
  </div>
</sbb-header>
`;
/* end snapshot sbb-header renders actions and logo Dom */

snapshots["sbb-header renders actions and logo ShadowDom"] = 
`<header class="sbb-header">
  <div class="sbb-header__wrapper">
    <slot>
    </slot>
    <div class="sbb-header__logo">
      <slot name="logo">
        <sbb-logo protective-room="none">
        </sbb-logo>
      </slot>
    </div>
  </div>
</header>
`;
/* end snapshot sbb-header renders actions and logo ShadowDom */

snapshots["sbb-header renders actions and logo A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Menu"
    }
  ]
}
</p>
`;
/* end snapshot sbb-header renders actions and logo A11y tree Chrome */

snapshots["sbb-header renders actions and logo A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Menu"
    }
  ]
}
</p>
`;
/* end snapshot sbb-header renders actions and logo A11y tree Firefox */

snapshots["sbb-header renders actions and logo A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Menu"
    }
  ]
}
</p>
`;
/* end snapshot sbb-header renders actions and logo A11y tree Safari */

