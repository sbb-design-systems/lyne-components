/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-dialog renders an open dialog DOM"] = 
`<sbb-dialog
  backdrop="opaque"
  popover="manual"
>
  <sbb-dialog-title
    level="2"
    visual-level="4"
  >
    Title
  </sbb-dialog-title>
  <sbb-dialog-content class="sbb-scrollbar">
    Content
  </sbb-dialog-content>
</sbb-dialog>
`;
/* end snapshot sbb-dialog renders an open dialog DOM */

snapshots["sbb-dialog renders an open dialog Shadow DOM"] = 
`<div class="sbb-dialog__container">
  <div class="sbb-dialog">
    <div class="sbb-dialog__wrapper">
      <slot>
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
  negative=""
  popover="manual"
>
  <sbb-dialog-title
    level="2"
    negative=""
    visual-level="4"
  >
    Title
  </sbb-dialog-title>
  <sbb-dialog-close-button
    negative=""
    size="s"
    tabindex="0"
  >
  </sbb-dialog-close-button>
  <sbb-dialog-content class="sbb-scrollbar">
    Content
  </sbb-dialog-content>
</sbb-dialog>
`;
/* end snapshot sbb-dialog renders an open dialog with close button negative DOM */

snapshots["sbb-dialog renders an open dialog with close button negative Shadow DOM"] = 
`<div class="sbb-dialog__container">
  <div class="sbb-dialog">
    <div class="sbb-dialog__wrapper">
      <slot>
      </slot>
    </div>
  </div>
</div>
<sbb-screen-reader-only aria-live="polite">
</sbb-screen-reader-only>
`;
/* end snapshot sbb-dialog renders an open dialog with close button negative Shadow DOM */

snapshots["sbb-dialog renders an open dialog A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "group",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-dialog renders an open dialog A11y tree Chrome */

snapshots["sbb-dialog renders an open dialog with close button negative A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "group",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-dialog renders an open dialog with close button negative A11y tree Chrome */

