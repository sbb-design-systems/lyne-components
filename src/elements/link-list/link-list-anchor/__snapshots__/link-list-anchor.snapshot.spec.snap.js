/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-link-list-anchor renders DOM"] = 
`<sbb-link-list-anchor
  data-slot-names="li-0 li-1 li-2"
  size="s"
  title-content="title"
>
  <sbb-block-link
    data-action=""
    data-link=""
    data-sbb-link=""
    data-slot-names="unnamed"
    href="https://www.sbb.ch"
    icon-placement="start"
    size="s"
    slot="li-0"
  >
    Link 0
  </sbb-block-link>
  <sbb-block-link
    data-action=""
    data-link=""
    data-sbb-link=""
    data-slot-names="unnamed"
    href="https://www.sbb.ch"
    icon-placement="start"
    size="s"
    slot="li-1"
  >
    Link 1
  </sbb-block-link>
  <sbb-block-link
    data-action=""
    data-link=""
    data-sbb-link=""
    data-slot-names="unnamed"
    href="https://www.sbb.ch"
    icon-placement="start"
    size="s"
    slot="li-2"
  >
    Link 2
  </sbb-block-link>
</sbb-link-list-anchor>
`;
/* end snapshot sbb-link-list-anchor renders DOM */

snapshots["sbb-link-list-anchor renders Shadow DOM"] = 
`<div class="sbb-link-list-wrapper">
  <sbb-title
    aria-level="2"
    class="sbb-link-list-title"
    id="sbb-link-list-title-id"
    level="2"
    role="heading"
    visual-level="5"
  >
    <slot name="title">
      title
    </slot>
  </sbb-title>
  <ul
    aria-labelledby="sbb-link-list-title-id"
    class="sbb-link-list-anchor"
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
/* end snapshot sbb-link-list-anchor renders Shadow DOM */

snapshots["sbb-link-list-anchor renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "title",
      "level": 2
    },
    {
      "role": "link",
      "name": "Link 0"
    },
    {
      "role": "link",
      "name": "Link 1"
    },
    {
      "role": "link",
      "name": "Link 2"
    }
  ]
}
</p>
`;
/* end snapshot sbb-link-list-anchor renders A11y tree Chrome */

snapshots["sbb-link-list-anchor renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "title",
      "level": 2
    },
    {
      "role": "link",
      "name": "Link 0",
      "value": "https://www.sbb.ch/"
    },
    {
      "role": "link",
      "name": "Link 1",
      "value": "https://www.sbb.ch/"
    },
    {
      "role": "link",
      "name": "Link 2",
      "value": "https://www.sbb.ch/"
    }
  ]
}
</p>
`;
/* end snapshot sbb-link-list-anchor renders A11y tree Firefox */

