/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-toast renders Chrome-Safari Dom"] =
`<sbb-toast
  data-slot-names="unnamed"
  data-state="closed"
  dismissible=""
  icon-name="circle-tick-small"
  position="bottom-center"
>
  <span>
    'Lorem ipsum dolor'
  </span>
</sbb-toast>
`;
/* end snapshot sbb-toast renders Chrome-Safari Dom */

snapshots["sbb-toast renders Chrome-Safari ShadowDom"] = 
`<div class="sbb-toast__overlay-container">
  <div class="sbb-toast">
    <div class="sbb-toast__icon">
      <slot name="icon">
        <sbb-icon name="circle-tick-small">
        </sbb-icon>
      </slot>
    </div>
    <div
      aria-live="polite"
      class="sbb-toast__content"
    >
      <slot>
      </slot>
    </div>
    <div class="sbb-toast__action">
      <slot name="action">
        <sbb-button
          aria-label="Close message"
          class="sbb-toast__action-button"
          dir="ltr"
          icon-name="cross-small"
          negative=""
          role="button"
          sbb-toast-close=""
          size="m"
          tabindex="0"
          variant="transparent"
        >
        </sbb-button>
      </slot>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-toast renders Chrome-Safari ShadowDom */

snapshots["sbb-toast renders A11y tree Chrome"] =
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-toast renders A11y tree Chrome */

snapshots["sbb-toast renders Firefox Dom"] = 
`<sbb-toast
  data-slot-names="unnamed"
  data-state="closed"
  dismissible=""
  icon-name="circle-tick-small"
  position="bottom-center"
>
  <span>
    'Lorem ipsum dolor'
  </span>
</sbb-toast>
`;
/* end snapshot sbb-toast renders Firefox Dom */

snapshots["sbb-toast renders Firefox ShadowDom"] = 
`<div class="sbb-toast__overlay-container">
  <div
    class="sbb-toast"
    role="status"
  >
    <div class="sbb-toast__icon">
      <slot name="icon">
        <sbb-icon name="circle-tick-small">
        </sbb-icon>
      </slot>
    </div>
    <div
      aria-live="polite"
      class="sbb-toast__content"
    >
      <slot>
      </slot>
    </div>
    <div class="sbb-toast__action">
      <slot name="action">
        <sbb-button
          aria-label="Close message"
          class="sbb-toast__action-button"
          dir="ltr"
          icon-name="cross-small"
          negative=""
          role="button"
          sbb-toast-close=""
          size="m"
          tabindex="0"
          variant="transparent"
        >
        </sbb-button>
      </slot>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-toast renders Firefox ShadowDom */

snapshots["sbb-toast renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-toast renders A11y tree Firefox */

snapshots["sbb-toast renders A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-toast renders A11y tree Safari */

