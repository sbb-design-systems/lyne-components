/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-menu renders DOM"] = 
`<sbb-menu
  data-state="closed"
  id="sbb-menu-0"
  popover="manual"
  trigger="menu-trigger"
>
  <sbb-block-link
    data-action=""
    data-link=""
    data-sbb-link=""
    href="https://www.sbb.ch/en"
    icon-placement="start"
    negative=""
    size="s"
  >
    Profile
  </sbb-block-link>
  <sbb-menu-button
    data-action=""
    data-button=""
    icon-name="tick-small"
    tabindex="0"
  >
    View
  </sbb-menu-button>
  <sbb-menu-button
    data-action=""
    data-button=""
    disabled=""
    icon-name="pen-small"
    sbb-badge="1"
  >
    Edit
  </sbb-menu-button>
  <sbb-menu-button
    data-action=""
    data-button=""
    icon-name="swisspass-small"
    sbb-badge="2"
    tabindex="0"
  >
    Details
  </sbb-menu-button>
  <sbb-divider orientation="horizontal">
  </sbb-divider>
  <sbb-menu-button
    data-action=""
    data-button=""
    icon-name="cross-small"
    tabindex="0"
  >
    Cancel
  </sbb-menu-button>
</sbb-menu>
`;
/* end snapshot sbb-menu renders DOM */

snapshots["sbb-menu renders Shadow DOM"] = 
`<div class="sbb-menu__container">
  <div class="sbb-menu">
    <div class="sbb-menu__content">
      <slot>
      </slot>
      <sbb-divider orientation="horizontal">
      </sbb-divider>
      <sbb-menu-button
        data-action=""
        data-button=""
        icon-name="chevron-small-left-small"
        id="sbb-menu__back-button"
        tabindex="0"
      >
        Go back
      </sbb-menu-button>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-menu renders Shadow DOM */

snapshots["sbb-menu renders open DOM"] = 
`<sbb-menu
  data-state="opened"
  id="sbb-menu-2"
  popover="manual"
  trigger="menu-trigger"
>
  <sbb-block-link
    data-action=""
    data-link=""
    data-sbb-link=""
    href="https://www.sbb.ch/en"
    icon-placement="start"
    negative=""
    size="s"
  >
    Profile
  </sbb-block-link>
  <sbb-menu-button
    data-action=""
    data-button=""
    icon-name="tick-small"
    tabindex="0"
  >
    View
  </sbb-menu-button>
  <sbb-menu-button
    data-action=""
    data-button=""
    disabled=""
    icon-name="pen-small"
    sbb-badge="1"
  >
    Edit
  </sbb-menu-button>
  <sbb-menu-button
    data-action=""
    data-button=""
    icon-name="swisspass-small"
    sbb-badge="2"
    tabindex="0"
  >
    Details
  </sbb-menu-button>
  <sbb-divider orientation="horizontal">
  </sbb-divider>
  <sbb-menu-button
    data-action=""
    data-button=""
    icon-name="cross-small"
    tabindex="0"
  >
    Cancel
  </sbb-menu-button>
</sbb-menu>
`;
/* end snapshot sbb-menu renders open DOM */

snapshots["sbb-menu renders open Shadow DOM"] = 
`<div class="sbb-menu__container">
  <div class="sbb-menu">
    <div class="sbb-menu__content">
      <slot>
      </slot>
      <sbb-divider orientation="horizontal">
      </sbb-divider>
      <sbb-menu-button
        data-action=""
        data-button=""
        icon-name="chevron-small-left-small"
        id="sbb-menu__back-button"
        tabindex="0"
      >
        Go back
      </sbb-menu-button>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-menu renders open Shadow DOM */

snapshots["sbb-menu renders open A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "menu",
      "name": "",
      "orientation": "vertical",
      "children": [
        {
          "role": "link",
          "name": "Profile",
          "focused": true
        },
        {
          "role": "menuitem",
          "name": "View"
        },
        {
          "role": "menuitem",
          "name": "Edit 1",
          "disabled": true
        },
        {
          "role": "menuitem",
          "name": "Details 2"
        },
        {
          "role": "menuitem",
          "name": "Cancel"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-menu renders open A11y tree Chrome */

snapshots["sbb-menu renders open A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "menu",
      "name": "",
      "children": [
        {
          "role": "link",
          "name": "Profile",
          "focused": true,
          "value": "https://www.sbb.ch/en"
        },
        {
          "role": "menuitem",
          "name": "View"
        },
        {
          "role": "menuitem",
          "name": "Edit 1",
          "disabled": true
        },
        {
          "role": "menuitem",
          "name": "Details 2"
        },
        {
          "role": "menuitem",
          "name": "Cancel"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-menu renders open A11y tree Firefox */

