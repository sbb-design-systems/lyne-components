/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-notification renders"] = 
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
      <sbb-title
        aria-level="3"
        class="sbb-notification__title"
        level="3"
        role="heading"
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
        aria-orientation="vertical"
        class="sbb-notification__divider"
        orientation="vertical"
        role="separator"
      >
      </sbb-divider>
      <sbb-secondary-button
        aria-label="Close message"
        class="sbb-notification__close"
        data-action=""
        data-button=""
        data-sbb-button=""
        dir="ltr"
        icon-name="cross-small"
        role="button"
        size="m"
        tabindex="0"
      >
      </sbb-secondary-button>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-notification renders */

snapshots["sbb-notification renders with a title"] = 
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
      <sbb-title
        aria-level="3"
        class="sbb-notification__title"
        level="3"
        role="heading"
        visual-level="5"
      >
        <slot name="title">
          Title
        </slot>
      </sbb-title>
      <slot>
      </slot>
    </span>
    <span class="sbb-notification__close-wrapper">
      <sbb-divider
        aria-orientation="vertical"
        class="sbb-notification__divider"
        orientation="vertical"
        role="separator"
      >
      </sbb-divider>
      <sbb-secondary-button
        aria-label="Close message"
        class="sbb-notification__close"
        data-action=""
        data-button=""
        data-sbb-button=""
        dir="ltr"
        icon-name="cross-small"
        role="button"
        size="m"
        tabindex="0"
      >
      </sbb-secondary-button>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-notification renders with a title */

snapshots["sbb-notification renders with a slotted title"] = 
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
      <sbb-title
        aria-level="3"
        class="sbb-notification__title"
        level="3"
        role="heading"
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
        aria-orientation="vertical"
        class="sbb-notification__divider"
        orientation="vertical"
        role="separator"
      >
      </sbb-divider>
      <sbb-secondary-button
        aria-label="Close message"
        class="sbb-notification__close"
        data-action=""
        data-button=""
        data-sbb-button=""
        dir="ltr"
        icon-name="cross-small"
        role="button"
        size="m"
        tabindex="0"
      >
      </sbb-secondary-button>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-notification renders with a slotted title */

snapshots["sbb-notification renders without the close button"] = 
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
      <sbb-title
        aria-level="3"
        class="sbb-notification__title"
        level="3"
        role="heading"
        visual-level="5"
      >
        <slot name="title">
          Title
        </slot>
      </sbb-title>
      <slot>
      </slot>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-notification renders without the close button */

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

snapshots["sbb-notification renders Dom"] = 
`<sbb-notification
  animation="all"
  data-slot-names="unnamed"
  data-state="opening"
  size="m"
  style="--sbb-notification-height: 76px;"
  type="info"
>
  The quick brown fox jumps over the lazy dog.
</sbb-notification>
`;
/* end snapshot sbb-notification renders Dom */

snapshots["sbb-notification renders ShadowDom"] = 
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
      <sbb-title
        aria-level="3"
        class="sbb-notification__title"
        level="3"
        role="heading"
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
        aria-orientation="vertical"
        class="sbb-notification__divider"
        orientation="vertical"
        role="separator"
      >
      </sbb-divider>
      <sbb-secondary-button
        aria-label="Close message"
        class="sbb-notification__close"
        data-action=""
        data-button=""
        data-sbb-button=""
        dir="ltr"
        icon-name="cross-small"
        role="button"
        size="m"
        tabindex="0"
      >
      </sbb-secondary-button>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-notification renders ShadowDom */

snapshots["sbb-notification renders with a title Dom"] = 
`<sbb-notification
  animation="all"
  data-slot-names="unnamed"
  data-state="opening"
  size="m"
  style="--sbb-notification-height: 88px;"
  title-content="Title"
  type="info"
>
  The quick brown fox jumps over the lazy dog.
</sbb-notification>
`;
/* end snapshot sbb-notification renders with a title Dom */

snapshots["sbb-notification renders with a title ShadowDom"] = 
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
      <sbb-title
        aria-level="3"
        class="sbb-notification__title"
        level="3"
        role="heading"
        visual-level="5"
      >
        <slot name="title">
          Title
        </slot>
      </sbb-title>
      <slot>
      </slot>
    </span>
    <span class="sbb-notification__close-wrapper">
      <sbb-divider
        aria-orientation="vertical"
        class="sbb-notification__divider"
        orientation="vertical"
        role="separator"
      >
      </sbb-divider>
      <sbb-secondary-button
        aria-label="Close message"
        class="sbb-notification__close"
        data-action=""
        data-button=""
        data-sbb-button=""
        dir="ltr"
        icon-name="cross-small"
        role="button"
        size="m"
        tabindex="0"
      >
      </sbb-secondary-button>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-notification renders with a title ShadowDom */

snapshots["sbb-notification renders with a slotted title Dom"] = 
`<sbb-notification
  animation="all"
  data-slot-names="title unnamed"
  data-state="opening"
  size="m"
  style="--sbb-notification-height: 88px;"
  type="info"
>
  <span slot="title">
    Slotted title
  </span>
  The quick brown fox jumps over the lazy dog.
</sbb-notification>
`;
/* end snapshot sbb-notification renders with a slotted title Dom */

snapshots["sbb-notification renders with a slotted title ShadowDom"] = 
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
      <sbb-title
        aria-level="3"
        class="sbb-notification__title"
        level="3"
        role="heading"
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
        aria-orientation="vertical"
        class="sbb-notification__divider"
        orientation="vertical"
        role="separator"
      >
      </sbb-divider>
      <sbb-secondary-button
        aria-label="Close message"
        class="sbb-notification__close"
        data-action=""
        data-button=""
        data-sbb-button=""
        dir="ltr"
        icon-name="cross-small"
        role="button"
        size="m"
        tabindex="0"
      >
      </sbb-secondary-button>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-notification renders with a slotted title ShadowDom */

snapshots["sbb-notification renders without the close button Dom"] = 
`<sbb-notification
  animation="all"
  data-slot-names="unnamed"
  data-state="opening"
  readonly=""
  size="m"
  style="--sbb-notification-height: 88px;"
  title-content="Title"
  type="info"
>
  The quick brown fox jumps over the lazy dog.
</sbb-notification>
`;
/* end snapshot sbb-notification renders without the close button Dom */

snapshots["sbb-notification renders without the close button ShadowDom"] = 
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
      <sbb-title
        aria-level="3"
        class="sbb-notification__title"
        level="3"
        role="heading"
        visual-level="5"
      >
        <slot name="title">
          Title
        </slot>
      </sbb-title>
      <slot>
      </slot>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-notification renders without the close button ShadowDom */

snapshots["sbb-notification renders size s Dom"] = 
`<sbb-notification
  animation="all"
  data-slot-names="unnamed"
  data-state="opening"
  size="s"
  style="--sbb-notification-height: 70px;"
  title-content="Title"
  type="info"
>
  The quick brown fox jumps over the lazy dog.
</sbb-notification>
`;
/* end snapshot sbb-notification renders size s Dom */

snapshots["sbb-notification renders size s ShadowDom"] = 
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
      <sbb-title
        aria-level="3"
        class="sbb-notification__title"
        level="3"
        role="heading"
        visual-level="6"
      >
        <slot name="title">
          Title
        </slot>
      </sbb-title>
      <slot>
      </slot>
    </span>
    <span class="sbb-notification__close-wrapper">
      <sbb-divider
        aria-orientation="vertical"
        class="sbb-notification__divider"
        orientation="vertical"
        role="separator"
      >
      </sbb-divider>
      <sbb-secondary-button
        aria-label="Close message"
        class="sbb-notification__close"
        data-action=""
        data-button=""
        data-sbb-button=""
        dir="ltr"
        icon-name="cross-small"
        role="button"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-notification renders size s ShadowDom */

