/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-teaser renders end centered - DOM"] = 
`<sbb-teaser
  alignment="end-centered"
  aria-label="Sbb teaser"
  dir="ltr"
  href="https://github.com/lyne-design-system/lyne-components"
  role="link"
  tabindex="0"
>
</sbb-teaser>
`;
/* end snapshot sbb-teaser renders end centered - DOM */

snapshots["sbb-teaser renders end centered - ShadowDOM"] = 
`<a
  class="sbb-teaser"
  href="https://github.com/lyne-design-system/lyne-components"
  role="presentation"
  tabindex="-1"
>
  <span class="sbb-teaser__container">
    <span class="sbb-teaser__image-wrapper">
      <slot name="image">
      </slot>
    </span>
    <span class="sbb-teaser__text">
      <sbb-title
        aria-level="5"
        class="sbb-teaser__lead"
        level="5"
        role="heading"
        visual-level="5"
      >
        <slot name="title">
        </slot>
      </sbb-title>
      <p class="sbb-teaser__description">
        <slot name="description">
        </slot>
      </p>
    </span>
  </span>
</a>
`;
/* end snapshot sbb-teaser renders end centered - ShadowDOM */

snapshots["sbb-teaser renders end top with title level set - DOM"] = 
`<sbb-teaser
  alignment="end-top"
  aria-label="Sbb teaser"
  dir="ltr"
  href="https://github.com/lyne-design-system/lyne-components"
  role="link"
  tabindex="0"
  title-level="2"
>
</sbb-teaser>
`;
/* end snapshot sbb-teaser renders end top with title level set - DOM */

snapshots["sbb-teaser renders bottom with projected content - DOM"] = 
`<sbb-teaser
  alignment="bottom"
  aria-label="Sbb teaser"
  dir="ltr"
  href="https://github.com/lyne-design-system/lyne-components"
  role="link"
  tabindex="0"
>
  <img
    alt="400x300"
    slot="image"
    src="/src/components/teaser/stories/placeholder.png"
  >
  <span slot="chip">
    Chip
  </span>
  <span slot="title">
    TITLE
  </span>
  <p slot="description">
    description
  </p>
</sbb-teaser>
`;
/* end snapshot sbb-teaser renders bottom with projected content - DOM */

snapshots["sbb-teaser renders bottom with projected content - ShadowDOM"] = 
`<a
  class="sbb-teaser"
  href="https://github.com/lyne-design-system/lyne-components"
  role="presentation"
  tabindex="-1"
>
  <span class="sbb-teaser__container">
    <span class="sbb-teaser__image-wrapper">
      <slot name="image">
      </slot>
    </span>
    <span class="sbb-teaser__text">
      <sbb-chip
        class="sbb-teaser__chip"
        color="charcoal"
        size="xxs"
      >
        <slot name="chip">
        </slot>
      </sbb-chip>
      <sbb-title
        aria-level="5"
        class="sbb-teaser__lead"
        level="5"
        role="heading"
        visual-level="5"
      >
        <slot name="title">
        </slot>
      </sbb-title>
      <p class="sbb-teaser__description">
        <slot name="description">
        </slot>
      </p>
    </span>
  </span>
</a>
`;
/* end snapshot sbb-teaser renders bottom with projected content - ShadowDOM */

snapshots["sbb-teaser renders static - DOM"] = 
`<sbb-teaser
  alignment="end-centered"
  dir="ltr"
>
</sbb-teaser>
`;
/* end snapshot sbb-teaser renders static - DOM */

snapshots["sbb-teaser renders static - ShadowDOM"] = 
`<span class="sbb-teaser">
  <span class="sbb-teaser__container">
    <span class="sbb-teaser__image-wrapper">
      <slot name="image">
      </slot>
    </span>
    <span class="sbb-teaser__text">
      <sbb-title
        aria-level="5"
        class="sbb-teaser__lead"
        level="5"
        role="heading"
        visual-level="5"
      >
        <slot name="title">
        </slot>
      </sbb-title>
      <p class="sbb-teaser__description">
        <slot name="description">
        </slot>
      </p>
    </span>
  </span>
</span>
`;
/* end snapshot sbb-teaser renders static - ShadowDOM */

snapshots["sbb-teaser renders end top with title level set - ShadowDOM"] = 
`<a
  class="sbb-teaser"
  href="https://github.com/lyne-design-system/lyne-components"
  role="presentation"
  tabindex="-1"
>
  <span class="sbb-teaser__container">
    <span class="sbb-teaser__image-wrapper">
      <slot name="image">
      </slot>
    </span>
    <span class="sbb-teaser__text">
      <sbb-title
        aria-level="2"
        class="sbb-teaser__lead"
        level="2"
        role="heading"
        visual-level="5"
      >
        <slot name="title">
        </slot>
      </sbb-title>
      <p class="sbb-teaser__description">
        <slot name="description">
        </slot>
      </p>
    </span>
  </span>
</a>
`;
/* end snapshot sbb-teaser renders end top with title level set - ShadowDOM */

