/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-tab-nav-bar renders DOM"] = 
`<sbb-tab-nav-bar size="l">
  <a
    class="sbb-active"
    href="#"
  >
    Nav item 1
  </a>
  <a href="#">
    Nav item 2
  </a>
  <a
    aria-disabled="true"
    class="sbb-disabled"
  >
    Nav item 3
  </a>
</sbb-tab-nav-bar>
`;
/* end snapshot sbb-tab-nav-bar renders DOM */

snapshots["sbb-tab-nav-bar renders Shadow DOM"] = 
`<slot>
</slot>
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
      "value": "http://localhost:8000/?wtr-session-id=TI4JtgqCpuJQiYomOjPJI#"
    },
    {
      "role": "link",
      "name": "Nav item 2",
      "value": "http://localhost:8000/?wtr-session-id=TI4JtgqCpuJQiYomOjPJI#"
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

