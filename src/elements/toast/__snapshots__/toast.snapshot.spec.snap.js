/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-toast renders DOM"] = 
`<sbb-toast
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
        <sbb-icon name="circle-tick-small">
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
        class="sbb-toast__close-divider"
        negative=""
        orientation="vertical"
      >
      </sbb-divider>
      <sbb-transparent-button
        aria-label="Close message"
        class="sbb-toast__close-button"
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
        <sbb-icon name="circle-tick-small">
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
  icon-name="circle-tick-small"
  popover="manual"
  position="bottom-center"
>
  <span>
    Lorem ipsum dolor
  </span>
  <sbb-link
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
        <sbb-icon name="circle-tick-small">
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
        class="sbb-toast__close-divider"
        negative=""
        orientation="vertical"
      >
      </sbb-divider>
      <sbb-transparent-button
        aria-label="Close message"
        class="sbb-toast__close-button"
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
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "ignored": true,
      "role": "none",
      "children": [
        {
          "ignored": true,
          "role": "none"
        },
        {
          "ignored": true,
          "role": "none"
        },
        {
          "ignored": true,
          "role": "none"
        },
        {
          "ignored": true,
          "role": "none",
          "children": [
            {
              "ignored": true,
              "role": "none"
            }
          ]
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-toast renders A11y tree Chrome */

snapshots["sbb-toast renders readonly A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "ignored": true,
      "role": "none",
      "children": [
        {
          "ignored": true,
          "role": "none"
        },
        {
          "ignored": true,
          "role": "none"
        },
        {
          "ignored": true,
          "role": "none"
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-toast renders readonly A11y tree Chrome */

snapshots["sbb-toast renders in dark mode DOM"] = 
`<sbb-toast
  icon-name="circle-tick-small"
  popover="manual"
  position="bottom-center"
>
  <span>
    Lorem ipsum dolor
  </span>
  <sbb-link
    href="https://www.sbb.ch"
    sbb-toast-close=""
    size="s"
    slot="action"
    target="_blank"
  >
    Link action
  </sbb-link>
</sbb-toast>
`;
/* end snapshot sbb-toast renders in dark mode DOM */

snapshots["sbb-toast renders in dark mode Shadow DOM"] = 
`<div class="sbb-toast__overlay-container">
  <div class="sbb-toast">
    <div class="sbb-toast-wrapper">
      <slot name="icon">
        <sbb-icon name="circle-tick-small">
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
        class="sbb-toast__close-divider"
        orientation="vertical"
      >
      </sbb-divider>
      <sbb-transparent-button
        aria-label="Close message"
        class="sbb-toast__close-button"
        icon-name="cross-small"
        sbb-toast-close=""
        size="m"
        tabindex="0"
      >
      </sbb-transparent-button>
    </div>
  </div>
</div>
`;
/* end snapshot sbb-toast renders in dark mode Shadow DOM */

