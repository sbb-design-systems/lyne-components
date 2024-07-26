/* @web/test-runner snapshot v1 */
export const snapshots = {};

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

snapshots["sbb-paginator renders with options DOM"] = 
`<sbb-paginator
  length="50"
  page-size="10"
  size="m"
>
</sbb-paginator>
`;
/* end snapshot sbb-paginator renders with options DOM */

snapshots["sbb-paginator renders with options Shadow DOM"] = 
`<div class="sbb-paginator">
  <div class="sbb-paginator__page-size-options">
    Items per page
    <sbb-form-field
      borderless=""
      data-input-type="sbb-select"
      data-slot-names="unnamed"
      error-space="none"
      size="m"
      width="collapse"
    >
      <div
        aria-controls="sbb-select-2"
        aria-expanded="false"
        aria-haspopup="listbox"
        aria-owns="sbb-select-2"
        aria-required="false"
        class="sbb-screen-reader-only"
        role="combobox"
        style="top: 0px; height: 48px; width: 75px;"
        tabindex="0"
      >
        10
      </div>
      <sbb-select
        data-option-panel-origin-borderless=""
        data-state="closed"
        dir="ltr"
        value="10"
      >
        <sbb-option
          aria-selected="true"
          data-disable-highlight=""
          data-slot-names="unnamed"
          data-variant="select"
          id="sbb-option-3"
          role="option"
          selected=""
          value="10"
        >
          10
        </sbb-option>
        <sbb-option
          aria-selected="false"
          data-disable-highlight=""
          data-slot-names="unnamed"
          data-variant="select"
          id="sbb-option-4"
          role="option"
          value="25"
        >
          25
        </sbb-option>
        <sbb-option
          aria-selected="false"
          data-disable-highlight=""
          data-slot-names="unnamed"
          data-variant="select"
          id="sbb-option-5"
          role="option"
          value="50"
        >
          50
        </sbb-option>
      </sbb-select>
    </sbb-form-field>
  </div>
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
      <span
        class="sbb-paginator__page--number"
        role="button"
        tabindex="0"
      >
        5
      </span>
    </li>
  </ul>
</div>
`;
/* end snapshot sbb-paginator renders with options Shadow DOM */

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

