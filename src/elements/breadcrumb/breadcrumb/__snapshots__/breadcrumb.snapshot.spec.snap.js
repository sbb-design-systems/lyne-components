/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-breadcrumb with text renders - DOM"] = 
`<sbb-breadcrumb
  data-action=""
  data-link=""
  dir="ltr"
  download=""
  href="https://example.com/test"
  rel="subsection"
  target="_blank"
>
  Breadcrumb
</sbb-breadcrumb>
`;
/* end snapshot sbb-breadcrumb with text renders - DOM */

snapshots["sbb-breadcrumb with text renders - Shadow DOM"] = 
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
/* end snapshot sbb-breadcrumb with text renders - Shadow DOM */

snapshots["sbb-breadcrumb with icon renders - DOM"] = 
`<sbb-breadcrumb
  data-action=""
  data-link=""
  dir="ltr"
  href="/"
  icon-name="house-small"
>
</sbb-breadcrumb>
`;
/* end snapshot sbb-breadcrumb with icon renders - DOM */

snapshots["sbb-breadcrumb with icon renders - Shadow DOM"] = 
`<a
  class="sbb-action-base sbb-breadcrumb"
  href="/"
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
/* end snapshot sbb-breadcrumb with icon renders - Shadow DOM */

snapshots["sbb-breadcrumb with icon and text renders - DOM"] = 
`<sbb-breadcrumb
  data-action=""
  data-link=""
  dir="ltr"
  href="/"
  icon-name="house-small"
>
  Home
</sbb-breadcrumb>
`;
/* end snapshot sbb-breadcrumb with icon and text renders - DOM */

snapshots["sbb-breadcrumb with icon and text renders - Shadow DOM"] = 
`<a
  class="sbb-action-base sbb-breadcrumb"
  href="/"
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
/* end snapshot sbb-breadcrumb with icon and text renders - Shadow DOM */

snapshots["sbb-breadcrumb with icon and text A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Home"
    },
    {
      "role": "link",
      "name": "Breadcrumb"
    }
  ]
}
</p>
`;
/* end snapshot sbb-breadcrumb with icon and text A11y tree Chrome */

snapshots["sbb-breadcrumb with icon and text A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Home",
      "value": "http://localhost:8000/"
    },
    {
      "role": "link",
      "name": "Breadcrumb",
      "value": "https://example.com/test"
    }
  ]
}
</p>
`;
/* end snapshot sbb-breadcrumb with icon and text A11y tree Firefox */

snapshots["sbb-breadcrumb with text A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Breadcrumb . Link target opens in a new window."
    }
  ]
}
</p>
`;
/* end snapshot sbb-breadcrumb with text A11y tree Chrome */

snapshots["sbb-breadcrumb with text A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Breadcrumb . Link target opens in a new window.",
      "value": "https://example.com/test"
    }
  ]
}
</p>
`;
/* end snapshot sbb-breadcrumb with text A11y tree Firefox */

