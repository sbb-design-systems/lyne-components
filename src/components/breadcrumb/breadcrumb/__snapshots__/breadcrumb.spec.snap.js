/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-breadcrumb renders with text"] = 
`<a
  class="sbb-breadcrumb"
  download=""
  href="/test"
  rel="subsection"
  role="presentation"
  tabindex="-1"
  target="_blank"
>
  <slot name="icon">
  </slot>
  <span class="sbb-breadcrumb__label">
    <slot>
    </slot>
  </span>
  <span class="sbb-breadcrumb__label--opens-in-new-window">
    . Link target opens in new window.
  </span>
</a>
`;
/* end snapshot sbb-breadcrumb renders with text */

snapshots["sbb-breadcrumb renders with icon"] = 
`<a
  class="sbb-breadcrumb"
  href="/"
  role="presentation"
  tabindex="-1"
>
  <slot name="icon">
    <sbb-icon
      aria-hidden="true"
      class="sbb-breadcrumb__icon"
      data-namespace="default"
      name="house-small"
      role="img"
    >
    </sbb-icon>
  </slot>
  <span
    class="sbb-breadcrumb__label"
    hidden=""
  >
    <slot>
    </slot>
  </span>
</a>
`;
/* end snapshot sbb-breadcrumb renders with icon */

snapshots["sbb-breadcrumb renders with icon and text"] = 
`<a
  class="sbb-breadcrumb"
  href="/"
  role="presentation"
  tabindex="-1"
>
  <slot name="icon">
    <sbb-icon
      aria-hidden="true"
      class="sbb-breadcrumb__icon"
      data-namespace="default"
      name="house-small"
      role="img"
    >
    </sbb-icon>
  </slot>
  <span class="sbb-breadcrumb__label">
    <slot>
    </slot>
  </span>
</a>
`;
/* end snapshot sbb-breadcrumb renders with icon and text */

snapshots["sbb-breadcrumb renders as span if no href is provided"] = 
`<span class="sbb-breadcrumb">
  <slot name="icon">
  </slot>
  <span class="sbb-breadcrumb__label">
    <slot>
    </slot>
  </span>
</span>
`;
/* end snapshot sbb-breadcrumb renders as span if no href is provided */

