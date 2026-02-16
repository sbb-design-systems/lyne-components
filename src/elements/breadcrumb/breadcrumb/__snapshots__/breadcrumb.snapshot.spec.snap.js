/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-breadcrumb renders with text DOM"] = 
`<sbb-breadcrumb
  download=""
  href="https://example.com/test"
  rel="subsection"
  target="_blank"
>
  Breadcrumb
</sbb-breadcrumb>
`;
/* end snapshot sbb-breadcrumb renders with text DOM */

snapshots["sbb-breadcrumb renders with text Shadow DOM"] = 
`<a
  class="sbb-action-base sbb-breadcrumb"
  download=""
  href="https://example.com/test"
  rel="subsection"
  target="_blank"
>
  <slot name="icon">
  </slot>
  <span class="sbb-breadcrumb__label">
    <slot>
    </slot>
  </span>
  <sbb-screen-reader-only>
    . Link target opens in a new window.
  </sbb-screen-reader-only>
</a>
`;
/* end snapshot sbb-breadcrumb renders with text Shadow DOM */

snapshots["sbb-breadcrumb renders with icon DOM"] = 
`<sbb-breadcrumb
  href="/"
  icon-name="house-small"
>
</sbb-breadcrumb>
`;
/* end snapshot sbb-breadcrumb renders with icon DOM */

snapshots["sbb-breadcrumb renders with icon Shadow DOM"] = 
`<a
  class="sbb-action-base sbb-breadcrumb"
  href="/"
>
  <slot name="icon">
    <sbb-icon
      class="sbb-breadcrumb__icon"
      name="house-small"
    >
    </sbb-icon>
  </slot>
  <span class="sbb-breadcrumb__label">
    <slot>
    </slot>
  </span>
</a>
`;
/* end snapshot sbb-breadcrumb renders with icon Shadow DOM */

snapshots["sbb-breadcrumb renders with icon and text DOM"] = 
`<sbb-breadcrumb
  href="/"
  icon-name="house-small"
>
  Home
</sbb-breadcrumb>
`;
/* end snapshot sbb-breadcrumb renders with icon and text DOM */

snapshots["sbb-breadcrumb renders with icon and text Shadow DOM"] = 
`<a
  class="sbb-action-base sbb-breadcrumb"
  href="/"
>
  <slot name="icon">
    <sbb-icon
      class="sbb-breadcrumb__icon"
      name="house-small"
    >
    </sbb-icon>
  </slot>
  <span class="sbb-breadcrumb__label">
    <slot>
    </slot>
  </span>
</a>
`;
/* end snapshot sbb-breadcrumb renders with icon and text Shadow DOM */

snapshots["sbb-breadcrumb renders with text A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "generic",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-breadcrumb renders with text A11y tree Chrome */

