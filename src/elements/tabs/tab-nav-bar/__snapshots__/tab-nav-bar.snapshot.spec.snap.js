/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-tab-nav-bar renders DOM"] = 
`<sbb-tab-nav-bar size="l">
  <a
    aria-current="page"
    class="sbb-active"
    href="https://www.sbb.ch"
    slot="li-0"
  >
    Nav item 1
  </a>
  <a
    href="https://www.sbb.ch"
    slot="li-1"
  >
    Nav item 2
  </a>
  <a
    aria-disabled="true"
    class="sbb-disabled"
    role="link"
    slot="li-2"
  >
    Nav item 3
  </a>
</sbb-tab-nav-bar>
`;
/* end snapshot sbb-tab-nav-bar renders DOM */

snapshots["sbb-tab-nav-bar renders Shadow DOM"] = 
`<ul class="sbb-tab-nav-bar">
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
`;
/* end snapshot sbb-tab-nav-bar renders Shadow DOM */

snapshots["sbb-tab-nav-bar renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Nav item 1"
    },
    {
      "role": "link",
      "name": "Nav item 2"
    },
    {
      "role": "text",
      "name": "Nav item 3"
    }
  ]
}
</p>
`;
/* end snapshot sbb-tab-nav-bar renders A11y tree Chrome */

snapshots["sbb-tab-nav-bar renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "link",
      "name": "Nav item 1",
      "value": "https://www.sbb.ch/"
    },
    {
      "role": "link",
      "name": "Nav item 2",
      "value": "https://www.sbb.ch/"
    },
    {
      "role": "text leaf",
      "name": "Nav item 3"
    }
  ]
}
</p>
`;
/* end snapshot sbb-tab-nav-bar renders A11y tree Firefox */

