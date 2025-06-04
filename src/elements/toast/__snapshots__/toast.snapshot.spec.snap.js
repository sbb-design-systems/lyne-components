/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-toast renders DOM"] = 
`<sbb-toast
  aria-live="polite"
  data-state="closed"
  icon-name="circle-tick-small"
  popover="manual"
  position="bottom-center"
>
  <span>
    Lorem ipsum dolor
  </span>
</sbb-toast>
`;
/* end snapshot sbb-toast renders DOM */

snapshots["sbb-toast renders Shadow DOM"] = 
`<div class="sbb-toast__overlay-container">
  <div class="sbb-toast">
    <div class="sbb-toast-wrapper">
      <slot name="icon">
        <sbb-icon
          aria-hidden="true"
          data-namespace="default"
          name="circle-tick-small"
          role="img"
        >
        </sbb-icon>
      </slot>
      <div class="sbb-toast__content">
        <slot>
        </slot>
      </div>
      <slot name="action">
      </slot>
    </div>
    <div class="sbb-toast__close">
      <sbb-divider
        aria-orientation="vertical"
        class="sbb-toast__close-divider"
        negative=""
        orientation="vertical"
      >
      </sbb-divider>
      <sbb-transparent-button
        aria-label="Close message"
        class="sbb-toast__close-button"
        data-action=""
        data-button=""
        data-sbb-button=""
        icon-name="cross-small"
        negative=""
        sbb-toast-close=""
        size="m"
        tabindex="0"
      >
      </sbb-transparent-button>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-toast renders Shadow DOM */

snapshots["sbb-toast renders readonly DOM"] = 
`<sbb-toast
  aria-live="polite"
  data-state="closed"
  icon-name="circle-tick-small"
  popover="manual"
  position="bottom-center"
  readonly=""
>
  <span>
    Lorem ipsum dolor
  </span>
</sbb-toast>
`;
/* end snapshot sbb-toast renders readonly DOM */

snapshots["sbb-toast renders readonly Shadow DOM"] = 
`<div class="sbb-toast__overlay-container">
  <div class="sbb-toast">
    <div class="sbb-toast-wrapper">
      <slot name="icon">
        <sbb-icon
          aria-hidden="true"
          data-namespace="default"
          name="circle-tick-small"
          role="img"
        >
        </sbb-icon>
      </slot>
      <div class="sbb-toast__content">
        <slot>
        </slot>
      </div>
      <slot name="action">
      </slot>
    </div>
    <div class="sbb-toast__close">
      <sbb-divider
        aria-orientation="vertical"
        class="sbb-toast__close-divider"
        negative=""
        orientation="vertical"
      >
      </sbb-divider>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-toast renders readonly Shadow DOM */

snapshots["sbb-toast renders with action DOM"] = 
`<sbb-toast
  aria-live="polite"
  data-state="closed"
  icon-name="circle-tick-small"
  popover="manual"
  position="bottom-center"
>
  <span>
    Lorem ipsum dolor
  </span>
  <sbb-link
    data-action=""
    data-link=""
    data-sbb-link=""
    data-slot-names="unnamed"
    href="https://www.sbb.ch"
    negative=""
    sbb-toast-close=""
    size="s"
    slot="action"
    target="_blank"
  >
    Link action
  </sbb-link>
</sbb-toast>
`;
/* end snapshot sbb-toast renders with action DOM */

snapshots["sbb-toast renders with action Shadow DOM"] = 
`<div class="sbb-toast__overlay-container">
  <div class="sbb-toast">
    <div class="sbb-toast-wrapper">
      <slot name="icon">
        <sbb-icon
          aria-hidden="true"
          data-namespace="default"
          name="circle-tick-small"
          role="img"
        >
        </sbb-icon>
      </slot>
      <div class="sbb-toast__content">
        <slot>
        </slot>
      </div>
      <slot name="action">
      </slot>
    </div>
    <div class="sbb-toast__close">
      <sbb-divider
        aria-orientation="vertical"
        class="sbb-toast__close-divider"
        negative=""
        orientation="vertical"
      >
      </sbb-divider>
      <sbb-transparent-button
        aria-label="Close message"
        class="sbb-toast__close-button"
        data-action=""
        data-button=""
        data-sbb-button=""
        icon-name="cross-small"
        negative=""
        sbb-toast-close=""
        size="m"
        tabindex="0"
      >
      </sbb-transparent-button>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-toast renders with action Shadow DOM */

snapshots["sbb-toast renders A11y tree Chrome"] =
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-toast renders A11y tree Chrome */

snapshots["sbb-toast renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-toast renders A11y tree Firefox */

snapshots["sbb-toast renders readonly A11y tree Chrome"] =
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-toast renders readonly A11y tree Chrome */

snapshots["sbb-toast renders readonly A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-toast renders readonly A11y tree Firefox */

