/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "1"
    },
    {
      "role": "button",
      "name": "2"
    },
    {
      "role": "button",
      "name": "3"
    },
    {
      "role": "button",
      "name": "4"
    },
    {
      "role": "text",
      "name": "..."
    },
    {
      "role": "button",
      "name": "13"
    }
  ]
}
</p>
`;
/* end snapshot A11y tree Chrome */

snapshots["A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "1"
    },
    {
      "role": "button",
      "name": "2"
    },
    {
      "role": "button",
      "name": "3"
    },
    {
      "role": "button",
      "name": "4"
    },
    {
      "role": "text leaf",
      "name": "..."
    },
    {
      "role": "button",
      "name": "13"
    }
  ]
}
</p>
`;
/* end snapshot A11y tree Firefox */

snapshots["sbb-paginator renders DOM"] = 
`<sbb-paginator
  length="50"
  page-size="4"
  size="m"
>
</sbb-paginator>
`;
/* end snapshot sbb-paginator renders DOM */

snapshots["sbb-paginator renders Shadow DOM"] = 
`<div class="sbb-paginator">
  <ul class="sbb-paginator__pages">
    <li
      class="sbb-paginator__page"
      data-active="true"
    >
      <span
        aria-current="true"
        aria-selected="true"
        class="sbb-paginator__page--number"
        role="button"
        tabindex="-1"
      >
        1
      </span>
    </li>
    <li class="sbb-paginator__page">
      <span
        class="sbb-paginator__page--number"
        role="button"
        tabindex="0"
      >
        2
      </span>
    </li>
    <li class="sbb-paginator__page">
      <span
        class="sbb-paginator__page--number"
        role="button"
        tabindex="0"
      >
        3
      </span>
    </li>
    <li class="sbb-paginator__page">
      <span
        class="sbb-paginator__page--number"
        role="button"
        tabindex="0"
      >
        4
      </span>
    </li>
    <li class="sbb-paginator__page">
      <span class="sbb-paginator__page--ellipsis">
        ...
      </span>
    </li>
    <li class="sbb-paginator__page">
      <span
        class="sbb-paginator__page--number"
        role="button"
        tabindex="0"
      >
        13
      </span>
    </li>
  </ul>
</div>
`;
/* end snapshot sbb-paginator renders Shadow DOM */

snapshots["sbb-paginator renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "1"
    },
    {
      "role": "button",
      "name": "2"
    },
    {
      "role": "button",
      "name": "3"
    },
    {
      "role": "button",
      "name": "4"
    },
    {
      "role": "text",
      "name": "..."
    },
    {
      "role": "button",
      "name": "13"
    }
  ]
}
</p>
`;
/* end snapshot sbb-paginator renders A11y tree Chrome */

snapshots["sbb-paginator renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "1"
    },
    {
      "role": "button",
      "name": "2"
    },
    {
      "role": "button",
      "name": "3"
    },
    {
      "role": "button",
      "name": "4"
    },
    {
      "role": "text leaf",
      "name": "..."
    },
    {
      "role": "button",
      "name": "13"
    }
  ]
}
</p>
`;
/* end snapshot sbb-paginator renders A11y tree Firefox */

