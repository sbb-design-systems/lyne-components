/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-notification renders DOM"] = 
`<sbb-notification
  animation="all"
  size="m"
  type="info"
>
  The quick brown fox jumps over the lazy dog.
</sbb-notification>
`;
/* end snapshot sbb-notification renders DOM */

snapshots["sbb-notification renders Shadow DOM"] = 
`<div class="sbb-notification__wrapper">
  <div class="sbb-notification">
    <slot name="icon">
      <sbb-icon
        class="sbb-notification__icon"
        name="circle-information-small"
      >
      </sbb-icon>
    </slot>
    <span class="sbb-notification__content">
      <slot name="title">
      </slot>
      <p class="sbb-notification__text">
        <slot>
        </slot>
      </p>
    </span>
    <span class="sbb-notification__close-wrapper">
      <sbb-divider
        class="sbb-notification__divider"
        orientation="vertical"
      >
      </sbb-divider>
      <sbb-secondary-button
        aria-label="Close message"
        class="sbb-notification__close"
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
  size="m"
  type="success"
>
  <sbb-title
    level="3"
    slot="title"
    visual-level="5"
  >
    Title
  </sbb-title>
  The quick brown fox jumps over the lazy dog.
</sbb-notification>
`;
/* end snapshot sbb-notification renders with a title DOM */

snapshots["sbb-notification renders with a title Shadow DOM"] = 
`<div class="sbb-notification__wrapper">
  <div class="sbb-notification">
    <slot name="icon">
      <sbb-icon
        class="sbb-notification__icon"
        name="circle-tick-small"
      >
      </sbb-icon>
    </slot>
    <span class="sbb-notification__content">
      <slot name="title">
      </slot>
      <p class="sbb-notification__text">
        <slot>
        </slot>
      </p>
    </span>
    <span class="sbb-notification__close-wrapper">
      <sbb-divider
        class="sbb-notification__divider"
        orientation="vertical"
      >
      </sbb-divider>
      <sbb-secondary-button
        aria-label="Close message"
        class="sbb-notification__close"
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

snapshots["sbb-notification renders with a slotted title DOM"] = 
`<sbb-notification
  animation="all"
  size="m"
  type="info"
>
  <span slot="title">
    Slotted title
  </span>
  The quick brown fox jumps over the lazy dog.
</sbb-notification>
`;
/* end snapshot sbb-notification renders with a slotted title DOM */

snapshots["sbb-notification renders with a slotted title Shadow DOM"] = 
`<div class="sbb-notification__wrapper">
  <div class="sbb-notification">
    <sbb-icon
      class="sbb-notification__icon"
      name="circle-information-small"
    >
    </sbb-icon>
    <span class="sbb-notification__content">
      <sbb-title
        class="sbb-notification__title"
        level="3"
        visual-level="5"
      >
        <slot name="title">
        </slot>
      </sbb-title>
      <slot>
      </slot>
    </span>
    <span class="sbb-notification__close-wrapper">
      <sbb-divider
        class="sbb-notification__divider"
        orientation="vertical"
      >
      </sbb-divider>
      <sbb-secondary-button
        aria-label="Close message"
        class="sbb-notification__close"
        icon-name="cross-small"
        size="m"
        tabindex="0"
      >
      </sbb-secondary-button>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-notification renders with a slotted title Shadow DOM */

snapshots["sbb-notification renders without the close button DOM"] = 
`<sbb-notification
  animation="all"
  readonly=""
  size="m"
  type="info"
>
  <sbb-title
    level="3"
    slot="title"
    visual-level="5"
  >
    Title
  </sbb-title>
  The quick brown fox jumps over the lazy dog.
</sbb-notification>
`;
/* end snapshot sbb-notification renders without the close button DOM */

snapshots["sbb-notification renders without the close button Shadow DOM"] = 
`<div class="sbb-notification__wrapper">
  <div class="sbb-notification">
    <slot name="icon">
      <sbb-icon
        class="sbb-notification__icon"
        name="circle-information-small"
      >
      </sbb-icon>
    </slot>
    <span class="sbb-notification__content">
      <slot name="title">
      </slot>
      <p class="sbb-notification__text">
        <slot>
        </slot>
      </p>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-notification renders without the close button Shadow DOM */

snapshots["sbb-notification renders size s DOM"] = 
`<sbb-notification
  animation="all"
  size="s"
  type="info"
>
  <sbb-title
    level="3"
    slot="title"
    visual-level="6"
  >
    Title
  </sbb-title>
  The quick brown fox jumps over the lazy dog.
</sbb-notification>
`;
/* end snapshot sbb-notification renders size s DOM */

snapshots["sbb-notification renders size s Shadow DOM"] = 
`<div class="sbb-notification__wrapper">
  <div class="sbb-notification">
    <slot name="icon">
      <sbb-icon
        class="sbb-notification__icon"
        name="circle-information-small"
      >
      </sbb-icon>
    </slot>
    <span class="sbb-notification__content">
      <slot name="title">
      </slot>
      <p class="sbb-notification__text">
        <slot>
        </slot>
      </p>
    </span>
    <span class="sbb-notification__close-wrapper">
      <sbb-divider
        class="sbb-notification__divider"
        orientation="vertical"
      >
      </sbb-divider>
      <sbb-secondary-button
        aria-label="Close message"
        class="sbb-notification__close"
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
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "ignored": true,
      "role": "none",
      "children": [
        {
          "role": "generic",
          "name": ""
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-notification A11y tree Chrome */

