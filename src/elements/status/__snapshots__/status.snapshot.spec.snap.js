/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-status renders DOM"] = 
`<sbb-status type="info">
  Status info text
</sbb-status>
`;
/* end snapshot sbb-status renders DOM */

snapshots["sbb-status renders Shadow DOM"] = 
`<div class="sbb-status">
  <span class="sbb-status__icon">
    <slot name="icon">
      <sbb-icon
        data-namespace="default"
        name="circle-information-small"
      >
      </sbb-icon>
    </slot>
  </span>
  <span class="sbb-status__content">
    <slot name="title">
    </slot>
    <p class="sbb-status__content-slot">
      <slot>
      </slot>
    </p>
  </span>
</div>
`;
/* end snapshot sbb-status renders Shadow DOM */

snapshots["sbb-status renders with title DOM"] = 
`<sbb-status type="info">
  <sbb-title
    level="3"
    slot="title"
    visual-level="5"
  >
    Title
  </sbb-title>
  Status info text
</sbb-status>
`;
/* end snapshot sbb-status renders with title DOM */

snapshots["sbb-status renders with title Shadow DOM"] = 
`<div class="sbb-status">
  <span class="sbb-status__icon">
    <slot name="icon">
      <sbb-icon
        data-namespace="default"
        name="circle-information-small"
      >
      </sbb-icon>
    </slot>
  </span>
  <span class="sbb-status__content">
    <slot name="title">
    </slot>
    <p class="sbb-status__content-slot">
      <slot>
      </slot>
    </p>
  </span>
</div>
`;
/* end snapshot sbb-status renders with title Shadow DOM */

snapshots["sbb-status renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Status info text"
    }
  ]
}
</p>
`;
/* end snapshot sbb-status renders A11y tree Chrome */

snapshots["sbb-status renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Status info text"
    }
  ]
}
</p>
`;
/* end snapshot sbb-status renders A11y tree Firefox */

snapshots["sbb-status renders with title A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Title",
      "level": 3
    },
    {
      "role": "text",
      "name": "Status info text"
    }
  ]
}
</p>
`;
/* end snapshot sbb-status renders with title A11y tree Chrome */

snapshots["sbb-status renders with title A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Title",
      "level": 3
    },
    {
      "role": "text leaf",
      "name": "Status info text "
    }
  ]
}
</p>
`;
/* end snapshot sbb-status renders with title A11y tree Firefox */

