/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-dialog renders"] = 
`<div class="sbb-dialog__container">
  <div
    class="sbb-dialog"
    id="sbb-dialog-0"
  >
    <div class="sbb-dialog__wrapper">
      <slot name="title">
      </slot>
      <slot name="content">
      </slot>
      <slot name="actions">
      </slot>
    </div>
  </div>
</div>
<sbb-screen-reader-only aria-live="polite">
</sbb-screen-reader-only>
`;
/* end snapshot sbb-dialog renders */

snapshots["sbb-dialog A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-dialog A11y tree Chrome */

snapshots["sbb-dialog A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-dialog A11y tree Firefox */

