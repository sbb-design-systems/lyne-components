/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-teaser renders after centered DOM"] = 
`<sbb-teaser
  accessibility-label="SBB teaser"
  alignment="after-centered"
  href="https://github.com/sbb-design-systems/lyne-components"
>
</sbb-teaser>
`;
/* end snapshot sbb-teaser renders after centered DOM */

snapshots["sbb-teaser renders after centered Shadow DOM"] = 
`<div class="sbb-teaser__wrapper">
  <a
    aria-label="SBB teaser"
    class="sbb-action-base sbb-teaser"
    href="https://github.com/sbb-design-systems/lyne-components"
  >
    <sbb-screen-reader-only>
      SBB teaser
    </sbb-screen-reader-only>
  </a>
  <span class="sbb-teaser__container">
    <span class="sbb-teaser__image-wrapper">
      <slot name="image">
      </slot>
    </span>
    <span class="sbb-teaser__text">
      <slot name="chip">
      </slot>
      <slot name="title">
      </slot>
      <p class="sbb-teaser__description">
        <slot>
        </slot>
      </p>
    </span>
  </span>
</div>
`;
/* end snapshot sbb-teaser renders after centered Shadow DOM */

snapshots["renders after with title set DOM"] = 
`<sbb-teaser
  accessibility-label="SBB teaser"
  alignment="after"
  href="https://github.com/sbb-design-systems/lyne-components"
>
  <sbb-title level="2">Title</sbb-title>
</sbb-teaser>
`;
/* end snapshot sbb-teaser renders after with title level set DOM */

snapshots["renders after with title set Shadow DOM"] = 
`<div class="sbb-teaser__wrapper">
  <a
    aria-label="SBB teaser"
    class="sbb-action-base sbb-teaser"
    href="https://github.com/sbb-design-systems/lyne-components"
  >
    <sbb-screen-reader-only>
      SBB teaser
    </sbb-screen-reader-only>
  </a>
  <span class="sbb-teaser__container">
    <span class="sbb-teaser__image-wrapper">
      <slot name="image">
      </slot>
    </span>
    <span class="sbb-teaser__text">
      <sbb-chip-label
        class="sbb-teaser__chip-label"
        color="charcoal"
        size="xxs"
      >
        <slot name="chip">
        </slot>
      </sbb-chip-label>
      <slot>
      </slot>
    </span>
  </span>
</div>
`;
/* end snapshot sbb-teaser renders after with title level set Shadow DOM */

snapshots["sbb-teaser renders below with projected content DOM"] = 
`<sbb-teaser
  accessibility-label="SBB teaser"
  alignment="below"
  href="https://github.com/sbb-design-systems/lyne-components"
>
  <figure
    class="sbb-figure"
    slot="image"
  >
    <img alt="400x300">
  </figure>
  <sbb-chip-label
    color="charcoal"
    size="xxs"
    slot="chip"
  >
    Chip
  </sbb-chip-label>
  <sbb-title
    level="2"
    slot="title"
    visual-level="5"
  >
    Title
  </sbb-title>
  A brief description.
</sbb-teaser>
`;
/* end snapshot sbb-teaser renders below with projected content DOM */

snapshots["sbb-teaser renders below with projected content Shadow DOM"] = 
`<div class="sbb-teaser__wrapper">
  <a
    aria-label="SBB teaser"
    class="sbb-action-base sbb-teaser"
    href="https://github.com/sbb-design-systems/lyne-components"
  >
    <sbb-screen-reader-only>
      SBB teaser
    </sbb-screen-reader-only>
  </a>
  <span class="sbb-teaser__container">
    <span class="sbb-teaser__image-wrapper">
      <slot name="image">
      </slot>
    </span>
    <span class="sbb-teaser__text">
      <slot name="chip">
      </slot>
      <slot name="title">
      </slot>
      <p class="sbb-teaser__description">
        <slot>
        </slot>
      </p>
    </span>
  </span>
</div>
`;
/* end snapshot sbb-teaser renders below with projected content Shadow DOM */

snapshots["sbb-teaser renders after centered A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "generic",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-teaser renders after centered A11y tree Chrome */

snapshots["sbb-teaser renders after with title set DOM"] = 
`<sbb-teaser
  accessibility-label="SBB teaser"
  alignment="after"
  href="https://github.com/sbb-design-systems/lyne-components"
>
  <sbb-title
    level="2"
    slot="title"
    visual-level="5"
  >
    Title
  </sbb-title>
</sbb-teaser>
`;
/* end snapshot sbb-teaser renders after with title set DOM */

snapshots["sbb-teaser renders after with title set Shadow DOM"] = 
`<div class="sbb-teaser__wrapper">
  <a
    aria-label="SBB teaser"
    class="sbb-action-base sbb-teaser"
    href="https://github.com/sbb-design-systems/lyne-components"
  >
    <sbb-screen-reader-only>
      SBB teaser
    </sbb-screen-reader-only>
  </a>
  <span class="sbb-teaser__container">
    <span class="sbb-teaser__image-wrapper">
      <slot name="image">
      </slot>
    </span>
    <span class="sbb-teaser__text">
      <slot name="chip">
      </slot>
      <slot name="title">
      </slot>
      <p class="sbb-teaser__description">
        <slot>
        </slot>
      </p>
    </span>
  </span>
</div>
`;
/* end snapshot sbb-teaser renders after with title set Shadow DOM */

