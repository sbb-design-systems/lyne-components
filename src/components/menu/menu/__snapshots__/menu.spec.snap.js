/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-menu renders"] = 
`<sbb-menu
  data-state="closed"
  id="sbb-menu-0"
  trigger="menu-trigger"
>
  <sbb-block-link href="https://www.sbb.ch/en">
    Profile
  </sbb-block-link>
  <sbb-menu-button
    dir="ltr"
    icon-name="tick-small"
    role="button"
    tabindex="0"
  >
    View
  </sbb-menu-button>
  <sbb-menu-button
    amount="1"
    aria-disabled="true"
    dir="ltr"
    disabled=""
    icon-name="pen-small"
    role="button"
  >
    Edit
  </sbb-menu-button>
  <sbb-menu-button
    amount="2"
    dir="ltr"
    icon-name="swisspass-small"
    role="button"
    tabindex="0"
  >
    Details
  </sbb-menu-button>
  <sbb-divider>
  </sbb-divider>
  <sbb-menu-button
    dir="ltr"
    icon-name="cross-small"
    role="button"
    tabindex="0"
  >
    Cancel
  </sbb-menu-button>
</sbb-menu>
`;
/* end snapshot sbb-menu renders */

snapshots["sbb-menu renders with list"] = 
`<div class="sbb-menu__container">
  <div class="sbb-menu">
    <div class="sbb-menu__content">
      <ul class="sbb-menu-list">
        <li>
          <slot name="li-0">
          </slot>
        </li>
        <li>
          <slot name="li-1">
          </slot>
        </li>
        <li>
          <slot name="li-2">
          </slot>
        </li>
        <li>
          <slot name="li-3">
          </slot>
        </li>
      </ul>
      <span hidden="">
        <slot>
        </slot>
      </span>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-menu renders with list */

