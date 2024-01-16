/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-skiplink-list should render named slots if data-ssr-child-count attribute is set"] = 
`<div class="sbb-skiplink-list__wrapper">
  <sbb-title
    aria-level="2"
    class="sbb-link-list-title"
    id="sbb-skiplink-list-title-id"
    level="2"
    negative=""
    role="heading"
    visual-level="5"
    visually-hidden=""
  >
    <slot name="title">
    </slot>
  </sbb-title>
  <ul
    aria-labelledby="sbb-skiplink-list-title-id"
    class="sbb-skiplink-list"
  >
    <li>
      <slot name="link-0">
      </slot>
    </li>
    <li>
      <slot name="link-1">
      </slot>
    </li>
    <li>
      <slot name="link-2">
      </slot>
    </li>
  </ul>
  <span hidden="">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-skiplink-list should render named slots if data-ssr-child-count attribute is set */

snapshots["sbb-skiplink-list renders"] = 
`<div class="sbb-skiplink-list__wrapper">
  <sbb-title
    aria-level="2"
    class="sbb-link-list-title"
    id="sbb-skiplink-list-title-id"
    level="2"
    negative=""
    role="heading"
    visual-level="5"
    visually-hidden=""
  >
    <slot name="title">
    </slot>
  </sbb-title>
  <ul
    aria-labelledby="sbb-skiplink-list-title-id"
    class="sbb-skiplink-list"
  >
    <li>
      <slot name="link-0">
      </slot>
    </li>
    <li>
      <slot name="link-1">
      </slot>
    </li>
    <li>
      <slot name="link-2">
      </slot>
    </li>
  </ul>
  <span hidden="">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-skiplink-list renders */

snapshots["sbb-skiplink-list renders with title"] = 
`<div class="sbb-skiplink-list__wrapper">
  <sbb-title
    aria-level="3"
    class="sbb-link-list-title"
    id="sbb-skiplink-list-title-id"
    level="3"
    negative=""
    role="heading"
    visual-level="5"
    visually-hidden=""
  >
    <slot name="title">
      Skip to
    </slot>
  </sbb-title>
  <ul
    aria-labelledby="sbb-skiplink-list-title-id"
    class="sbb-skiplink-list"
  >
    <li>
      <slot name="link-0">
      </slot>
    </li>
    <li>
      <slot name="link-1">
      </slot>
    </li>
    <li>
      <slot name="link-2">
      </slot>
    </li>
  </ul>
  <span hidden="">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-skiplink-list renders with title */

