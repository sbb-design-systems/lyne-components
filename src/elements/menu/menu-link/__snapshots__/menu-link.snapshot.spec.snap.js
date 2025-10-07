/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-menu-link renders DOM"] = 
`<sbb-menu-link
  accessibility-label="a11y label"
  data-action=""
  data-link=""
  data-slot-names="unnamed"
  href="https://github.com/sbb-design-systems/lyne-components"
  target="_blank"
>
  Action
</sbb-menu-link>
`;
/* end snapshot sbb-menu-link renders DOM */

snapshots["sbb-menu-link renders Shadow DOM"] = 
`<a
  aria-label="a11y label"
  class="sbb-action-base sbb-menu-link"
  href="https://github.com/sbb-design-systems/lyne-components"
  rel="external noopener nofollow"
  role="menuitem"
  target="_blank"
>
  <span class="sbb-menu-action__content">
    <span class="sbb-menu-action__icon">
      <slot name="icon">
      </slot>
    </span>
    <span class="sbb-menu-action__label">
      <slot>
      </slot>
    </span>
    <span class="sbb-menu-submenu__icon">
      <sbb-icon
        data-namespace="default"
        name="chevron-small-right-small"
      >
      </sbb-icon>
    </span>
  </span>
  <sbb-screen-reader-only>
    . Link target opens in a new window.
  </sbb-screen-reader-only>
</a>
`;
/* end snapshot sbb-menu-link renders Shadow DOM */

snapshots["sbb-menu-link renders component with icon DOM"] = 
`<sbb-menu-link
  accessibility-label="a11y label"
  data-action=""
  data-link=""
  data-slot-names="unnamed"
  href="https://github.com/sbb-design-systems/lyne-components"
  icon-name="menu-small"
  target="_blank"
>
  Action
</sbb-menu-link>
`;
/* end snapshot sbb-menu-link renders component with icon DOM */

snapshots["sbb-menu-link renders component with icon Shadow DOM"] = 
`<a
  aria-label="a11y label"
  class="sbb-action-base sbb-menu-link"
  href="https://github.com/sbb-design-systems/lyne-components"
  rel="external noopener nofollow"
  role="menuitem"
  target="_blank"
>
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
    <span class="sbb-menu-submenu__icon">
      <sbb-icon
        data-namespace="default"
        name="chevron-small-right-small"
      >
      </sbb-icon>
    </span>
  </span>
  <sbb-screen-reader-only>
    . Link target opens in a new window.
  </sbb-screen-reader-only>
</a>
`;
/* end snapshot sbb-menu-link renders component with icon Shadow DOM */

snapshots["sbb-menu-link renders component with icon A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "menuitem",
      "name": "a11y label"
    }
  ]
}
</p>
`;
/* end snapshot sbb-menu-link renders component with icon A11y tree Chrome */

snapshots["sbb-menu-link renders component with icon A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text container",
      "name": "a11y label"
    }
  ]
}
</p>
`;
/* end snapshot sbb-menu-link renders component with icon A11y tree Firefox */

