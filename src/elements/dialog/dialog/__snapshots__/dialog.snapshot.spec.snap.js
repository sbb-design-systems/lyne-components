/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-dialog renders an open dialog DOM"] = 
`<sbb-dialog
  backdrop="opaque"
  data-state="opened"
  popover="manual"
>
  <sbb-dialog-title
    level="2"
    slot="title-section"
    visual-level="4"
  >
    Title
  </sbb-dialog-title>
  <sbb-dialog-content>
    Content
  </sbb-dialog-content>
</sbb-dialog>
`;
/* end snapshot sbb-dialog renders an open dialog DOM */

snapshots["sbb-dialog renders an open dialog Shadow DOM"] = 
`<div class="sbb-dialog__container">
  <div class="sbb-dialog">
    <div class="sbb-dialog__wrapper">
      <div class="sbb-dialog-title-section">
        <slot name="title-section">
        </slot>
      </div>
      <div class="sbb-dialog-content-container">
        <slot>
        </slot>
      </div>
      <slot name="actions">
      </slot>
    </div>
  </div>
</div>
<sbb-screen-reader-only aria-live="polite">
</sbb-screen-reader-only>
`;
/* end snapshot sbb-dialog renders an open dialog Shadow DOM */

snapshots["sbb-dialog renders an open dialog with close button negative DOM"] = 
`<sbb-dialog
  backdrop="opaque"
  data-state="opened"
  negative=""
  popover="manual"
>
  <sbb-dialog-title
    level="2"
    negative=""
    slot="title-section"
    visual-level="4"
  >
    Title
  </sbb-dialog-title>
  <sbb-dialog-close-button
    data-action=""
    data-button=""
    data-sbb-button=""
    icon-name="cross-small"
    negative=""
    size="s"
    slot="title-section"
    tabindex="0"
  >
  </sbb-dialog-close-button>
  <sbb-dialog-content>
    Content
  </sbb-dialog-content>
</sbb-dialog>
`;
/* end snapshot sbb-dialog renders an open dialog with close button negative DOM */

snapshots["sbb-dialog renders an open dialog with close button negative Shadow DOM"] = 
`<div class="sbb-dialog__container">
  <div class="sbb-dialog">
    <div class="sbb-dialog__wrapper">
      <div class="sbb-dialog-title-section">
        <slot name="title-section">
        </slot>
      </div>
      <div class="sbb-dialog-content-container">
        <slot>
        </slot>
      </div>
      <slot name="actions">
      </slot>
    </div>
  </div>
</div>
<sbb-screen-reader-only aria-live="polite">
</sbb-screen-reader-only>
`;
/* end snapshot sbb-dialog renders an open dialog with close button negative Shadow DOM */

snapshots["sbb-dialog renders an open dialog A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Title",
      "level": 2
    },
    {
      "role": "text leaf",
      "name": "Content"
    },
    {
      "role": "text leaf",
      "name": "Dialog, Title "
    }
  ]
}
</p>
`;
/* end snapshot sbb-dialog renders an open dialog A11y tree Firefox */

snapshots["sbb-dialog renders an open dialog A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Title",
      "level": 2
    },
    {
      "role": "text",
      "name": "Content"
    },
    {
      "role": "text",
      "name": "Dialog, Title "
    }
  ]
}
</p>
`;
/* end snapshot sbb-dialog renders an open dialog A11y tree Chrome */

snapshots["sbb-dialog renders an open dialog with close button negative A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Title",
      "level": 2
    },
    {
      "role": "button",
      "name": "Close secondary window",
      "focused": true
    },
    {
      "role": "text leaf",
      "name": "Content"
    },
    {
      "role": "text leaf",
      "name": "Dialog, Title "
    }
  ]
}
</p>
`;
/* end snapshot sbb-dialog renders an open dialog with close button negative A11y tree Firefox */

snapshots["sbb-dialog renders an open dialog with close button negative A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Title",
      "level": 2
    },
    {
      "role": "button",
      "name": "Close secondary window",
      "focused": true
    },
    {
      "role": "text",
      "name": "Content"
    },
    {
      "role": "text",
      "name": "Dialog, Title "
    }
  ]
}
</p>
`;
/* end snapshot sbb-dialog renders an open dialog with close button negative A11y tree Chrome */

