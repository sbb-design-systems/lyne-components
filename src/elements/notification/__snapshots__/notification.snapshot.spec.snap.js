/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-notification renders DOM"] = 
`<sbb-notification
  animation="all"
  data-state="opened"
  size="m"
  type="info"
>
  <p>
    The quick brown fox jumps over the lazy dog.
  </p>
</sbb-notification>
`;
/* end snapshot sbb-notification renders DOM */

snapshots["sbb-notification renders Shadow DOM"] = 
`<div class="sbb-notification__wrapper">
  <div class="sbb-notification">
    <sbb-icon
      aria-hidden="true"
      class="sbb-notification__icon"
      data-namespace="default"
      name="circle-information-small"
      role="img"
    >
    </sbb-icon>
    <span class="sbb-notification__content">
      <slot>
      </slot>
    </span>
    <span class="sbb-notification__close-wrapper">
      <sbb-divider
        aria-orientation="vertical"
        class="sbb-notification__divider"
        orientation="vertical"
      >
      </sbb-divider>
      <sbb-secondary-button
        aria-label="Close message"
        class="sbb-notification__close"
        data-action=""
        data-button=""
        data-sbb-button=""
        icon-name="cross-small"
        size="m"
        tabindex="0"
      >
      </sbb-secondary-button>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-notification renders Shadow DOM */

snapshots["sbb-notification renders with a title DOM"] = 
`<sbb-notification
  animation="all"
  data-state="opened"
  size="m"
  type="info"
>
  <sbb-title
    level="3"
    visual-level="5"
  >
    Title
  </sbb-title>
  <p>
    The quick brown fox jumps over the lazy dog.
  </p>
</sbb-notification>
`;
/* end snapshot sbb-notification renders with a title DOM */

snapshots["sbb-notification renders with a title Shadow DOM"] = 
`<div class="sbb-notification__wrapper">
  <div class="sbb-notification">
    <sbb-icon
      aria-hidden="true"
      class="sbb-notification__icon"
      data-namespace="default"
      name="circle-information-small"
      role="img"
    >
    </sbb-icon>
    <span class="sbb-notification__content">
      <slot>
      </slot>
    </span>
    <span class="sbb-notification__close-wrapper">
      <sbb-divider
        aria-orientation="vertical"
        class="sbb-notification__divider"
        orientation="vertical"
      >
      </sbb-divider>
      <sbb-secondary-button
        aria-label="Close message"
        class="sbb-notification__close"
        data-action=""
        data-button=""
        data-sbb-button=""
        icon-name="cross-small"
        size="m"
        tabindex="0"
      >
      </sbb-secondary-button>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-notification renders with a title Shadow DOM */

snapshots["sbb-notification renders without the close button DOM"] = 
`<sbb-notification
  animation="all"
  data-state="opened"
  readonly=""
  size="m"
  type="info"
>
  <sbb-title
    level="3"
    visual-level="5"
  >
    Title
  </sbb-title>
  <p>
    The quick brown fox jumps over the lazy dog.
  </p>
</sbb-notification>
`;
/* end snapshot sbb-notification renders without the close button DOM */

snapshots["sbb-notification renders without the close button Shadow DOM"] = 
`<div class="sbb-notification__wrapper">
  <div class="sbb-notification">
    <sbb-icon
      aria-hidden="true"
      class="sbb-notification__icon"
      data-namespace="default"
      name="circle-information-small"
      role="img"
    >
    </sbb-icon>
    <span class="sbb-notification__content">
      <slot>
      </slot>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-notification renders without the close button Shadow DOM */

snapshots["sbb-notification renders size s DOM"] = 
`<sbb-notification
  animation="all"
  data-state="opened"
  size="s"
  type="info"
>
  <sbb-title
    level="3"
    visual-level="6"
  >
    Title
  </sbb-title>
  <p>
    The quick brown fox jumps over the lazy dog.
  </p>
</sbb-notification>
`;
/* end snapshot sbb-notification renders size s DOM */

snapshots["sbb-notification renders size s Shadow DOM"] = 
`<div class="sbb-notification__wrapper">
  <div class="sbb-notification">
    <sbb-icon
      aria-hidden="true"
      class="sbb-notification__icon"
      data-namespace="default"
      name="circle-information-small"
      role="img"
    >
    </sbb-icon>
    <span class="sbb-notification__content">
      <slot>
      </slot>
    </span>
    <span class="sbb-notification__close-wrapper">
      <sbb-divider
        aria-orientation="vertical"
        class="sbb-notification__divider"
        orientation="vertical"
      >
      </sbb-divider>
      <sbb-secondary-button
        aria-label="Close message"
        class="sbb-notification__close"
        data-action=""
        data-button=""
        data-sbb-button=""
        icon-name="cross-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-notification renders size s Shadow DOM */

snapshots["sbb-notification A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Test title",
      "level": 3
    },
    {
      "role": "text",
      "name": "Lorem ipsum ..."
    },
    {
      "role": "button",
      "name": "Close message"
    }
  ]
}
</p>
`;
/* end snapshot sbb-notification A11y tree Chrome */

snapshots["sbb-notification A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Test title",
      "level": 3
    },
    {
      "role": "text leaf",
      "name": "Lorem ipsum ..."
    },
    {
      "role": "button",
      "name": "Close message"
    }
  ]
}
</p>
`;
/* end snapshot sbb-notification A11y tree Firefox */

