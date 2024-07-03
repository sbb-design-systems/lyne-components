/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-status renders"] = 
`<div class="sbb-status">
  <span class="sbb-status__icon">
    <slot name="icon">
      <sbb-icon
        aria-hidden="true"
        data-namespace="default"
        name="circle-information-small"
        role="img"
      >
      </sbb-icon>
    </slot>
  </span>
  <span class="sbb-status__content">
    <sbb-title
      aria-level="3"
      class="sbb-status__title"
      level="3"
      role="heading"
      visual-level="5"
    >
      <slot name="title">
      </slot>
    </sbb-title>
    <p class="sbb-status__content-slot">
      <slot>
      </slot>
    </p>
  </span>
</div>
`;
/* end snapshot sbb-status renders */

snapshots["sbb-status renders with the status title"] = 
`<div class="sbb-status">
  <span class="sbb-status__icon">
    <slot name="icon">
      <sbb-icon
        aria-hidden="true"
        data-namespace="default"
        name="circle-information-small"
        role="img"
      >
      </sbb-icon>
    </slot>
  </span>
  <span class="sbb-status__content">
    <sbb-title
      aria-level="3"
      class="sbb-status__title"
      level="3"
      role="heading"
      visual-level="5"
    >
      <slot name="title">
        Title
      </slot>
    </sbb-title>
    <p class="sbb-status__content-slot">
      <slot>
      </slot>
    </p>
  </span>
</div>
`;
/* end snapshot sbb-status renders with the status title */

snapshots["sbb-status A11y tree Chrome"] = 
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
/* end snapshot sbb-status A11y tree Chrome */

snapshots["sbb-status A11y tree Firefox"] = 
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
/* end snapshot sbb-status A11y tree Firefox */

snapshots["sbb-status renders DOM"] = 
`<sbb-status
  data-slot-names="unnamed"
  type="info"
>
  Status info text
</sbb-status>
`;
/* end snapshot sbb-status renders DOM */

snapshots["sbb-status renders Shadow DOM"] = 
`<div class="sbb-status">
  <span class="sbb-status__icon">
    <slot name="icon">
      <sbb-icon
        aria-hidden="true"
        data-namespace="default"
        name="circle-information-small"
        role="img"
      >
      </sbb-icon>
    </slot>
  </span>
  <span class="sbb-status__content">
    <sbb-title
      aria-level="3"
      class="sbb-status__title"
      level="3"
      role="heading"
      visual-level="5"
    >
      <slot name="title">
      </slot>
    </sbb-title>
    <p class="sbb-status__content-slot">
      <slot>
      </slot>
    </p>
  </span>
</div>
`;
/* end snapshot sbb-status renders Shadow DOM */

snapshots["sbb-status renders with title DOM"] = 
`<sbb-status
  data-slot-names="unnamed"
  title-content="Title"
  type="info"
>
  Status info text
</sbb-status>
`;
/* end snapshot sbb-status renders with title DOM */

snapshots["sbb-status renders with title Shadow DOM"] = 
`<div class="sbb-status">
  <span class="sbb-status__icon">
    <slot name="icon">
      <sbb-icon
        aria-hidden="true"
        data-namespace="default"
        name="circle-information-small"
        role="img"
      >
      </sbb-icon>
    </slot>
  </span>
  <span class="sbb-status__content">
    <sbb-title
      aria-level="3"
      class="sbb-status__title"
      level="3"
      role="heading"
      visual-level="5"
    >
      <slot name="title">
        Title
      </slot>
    </sbb-title>
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

snapshots["sbb-status renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Status info text "
    }
  ]
}
</p>
`;
/* end snapshot sbb-status renders A11y tree Firefox */

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

