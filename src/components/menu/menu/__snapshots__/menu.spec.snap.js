/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots['sbb-menu renders with list'] = `<div class="sbb-menu__container">
  <div class="sbb-menu">
    <div class="sbb-menu__content">
      <ul class="sbb-menu-list">
        <li>
          <slot name="action-0">
          </slot>
        </li>
        <li>
          <slot name="action-1">
          </slot>
        </li>
        <li>
          <slot name="action-2">
          </slot>
        </li>
        <li>
          <slot name="action-3">
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

snapshots['sbb-menu renders'] = `<sbb-menu
  data-state="closed"
  id="sbb-menu-1"
  trigger="menu-trigger"
>
  <sbb-link
    href="https://www.sbb.ch/en"
    variant="block"
  >
    Profile
  </sbb-link>
  <sbb-menu-action
    dir="ltr"
    icon="tick-small"
    role="button"
    tabindex="0"
  >
    View
  </sbb-menu-action>
  <sbb-menu-action
    amount="1"
    aria-disabled="true"
    dir="ltr"
    disabled=""
    icon="pen-small"
    role="button"
  >
    Edit
  </sbb-menu-action>
  <sbb-menu-action
    amount="2"
    dir="ltr"
    icon="swisspass-small"
    role="button"
    tabindex="0"
  >
    Details
  </sbb-menu-action>
  <sbb-divider>
  </sbb-divider>
  <sbb-menu-action
    dir="ltr"
    icon="cross-small"
    role="button"
    tabindex="0"
  >
    Cancel
  </sbb-menu-action>
</sbb-menu>
`;
/* end snapshot sbb-menu renders */
