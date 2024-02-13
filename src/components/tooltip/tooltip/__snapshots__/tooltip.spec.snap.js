/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-tooltip renders"] = 
`<div class="sbb-tooltip__container">
  <div class="sbb-tooltip">
    <div class="sbb-tooltip__content">
      <span>
        <slot>
          No content
        </slot>
      </span>
      <span class="sbb-tooltip__close">
        <sbb-button
          aria-label="Close note"
          dir="ltr"
          icon-name="cross-small"
          role="button"
          sbb-tooltip-close=""
          size="m"
          tabindex="0"
          type="button"
          variant="secondary"
        >
        </sbb-button>
      </span>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-tooltip renders */

snapshots["sbb-tooltip A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-tooltip A11y tree Chrome */

snapshots["sbb-tooltip A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-tooltip A11y tree Firefox */

snapshots["sbb-tooltip A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-tooltip A11y tree Safari */

