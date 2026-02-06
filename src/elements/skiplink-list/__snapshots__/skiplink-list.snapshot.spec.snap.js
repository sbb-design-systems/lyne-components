/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-skiplink-list should render named slots if data-ssr-child-count attribute is set"] = 
`<div class="sbb-skiplink-list__wrapper">
  <h2
    class="sbb-skiplink-list-title"
    id="sbb-skiplink-list-title-id"
  >
    <slot name="title">
    </slot>
  </h2>
  <ul
    aria-labelledby="sbb-skiplink-list-title-id"
    class="sbb-skiplink-list"
  >
    <li>
      <slot name="li-0">
      </slot>
    </li>
    <li>
      <slot name="li-1">
      </slot>
    </li>
    <li>
      <slot name="li-2">
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

snapshots["sbb-skiplink-list renders DOM"] = 
`<sbb-skiplink-list>
  <sbb-block-link
    href="#"
    icon-placement="start"
    negative=""
    size="m"
    slot="li-0"
  >
    Link 1
  </sbb-block-link>
  <sbb-block-link
    href="#"
    icon-placement="start"
    negative=""
    size="m"
    slot="li-1"
  >
    Link 2
  </sbb-block-link>
  <sbb-block-link
    href="#"
    icon-placement="start"
    negative=""
    size="m"
    slot="li-2"
  >
    Link 3
  </sbb-block-link>
</sbb-skiplink-list>
`;
/* end snapshot sbb-skiplink-list renders DOM */

snapshots["sbb-skiplink-list renders Shadow DOM"] = 
`<div class="sbb-skiplink-list__wrapper">
  <h2
    class="sbb-skiplink-list-title"
    id="sbb-skiplink-list-title-id"
  >
    <slot name="title">
    </slot>
  </h2>
  <ul
    aria-labelledby="sbb-skiplink-list-title-id"
    class="sbb-skiplink-list"
  >
    <li>
      <slot name="li-0">
      </slot>
    </li>
    <li>
      <slot name="li-1">
      </slot>
    </li>
    <li>
      <slot name="li-2">
      </slot>
    </li>
  </ul>
  <span hidden="">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-skiplink-list renders Shadow DOM */

snapshots["sbb-skiplink-list renders with title DOM"] = 
`<sbb-skiplink-list
  title-content="Skip to"
  title-level="3"
>
  <sbb-block-link
    href="https://www.sbb.ch"
    icon-placement="start"
    negative=""
    size="m"
    slot="li-0"
  >
    Link 1
  </sbb-block-link>
  <sbb-block-link
    href="https://www.sbb.ch"
    icon-placement="start"
    negative=""
    size="m"
    slot="li-1"
  >
    Link 2
  </sbb-block-link>
  <sbb-block-link
    href="https://www.sbb.ch"
    icon-placement="start"
    negative=""
    size="m"
    slot="li-2"
  >
    Link 3
  </sbb-block-link>
</sbb-skiplink-list>
`;
/* end snapshot sbb-skiplink-list renders with title DOM */

snapshots["sbb-skiplink-list renders with title Shadow DOM"] = 
`<div class="sbb-skiplink-list__wrapper">
  <h3
    class="sbb-skiplink-list-title"
    id="sbb-skiplink-list-title-id"
  >
    <slot name="title">
      Skip to
    </slot>
  </h3>
  <ul
    aria-labelledby="sbb-skiplink-list-title-id"
    class="sbb-skiplink-list"
  >
    <li>
      <slot name="li-0">
      </slot>
    </li>
    <li>
      <slot name="li-1">
      </slot>
    </li>
    <li>
      <slot name="li-2">
      </slot>
    </li>
  </ul>
  <span hidden="">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-skiplink-list renders with title Shadow DOM */

snapshots["sbb-skiplink-list renders with title A11y tree Chrome"] = 
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
/* end snapshot sbb-skiplink-list renders with title A11y tree Chrome */

