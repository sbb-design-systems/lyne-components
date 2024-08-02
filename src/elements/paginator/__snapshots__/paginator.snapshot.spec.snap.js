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
  <div class="sbb-paginator__buttons">
    <sbb-mini-button
      aria-disabled="true"
      data-action=""
      data-button=""
      dir="ltr"
      disabled=""
      icon-name="chevron-left-small"
      id="sbb-paginator-prev-page"
      role="button"
    >
    </sbb-mini-button>
    <sbb-mini-button
      data-action=""
      data-button=""
      dir="ltr"
      icon-name="chevron-right-small"
      id="sbb-paginator-next-page"
      role="button"
      tabindex="0"
    >
    </sbb-mini-button>
  </div>
  <ul class="sbb-paginator__pages">
    <li
      class="sbb-paginator__page--number"
      data-selected="true"
    >
      <span
        aria-current="true"
        aria-selected="true"
        class="sbb-paginator__page--number-item"
        data-index="0"
        role="button"
        tabindex="0"
      >
        1
      </span>
    </li>
    <li class="sbb-paginator__page--number">
      <span
        class="sbb-paginator__page--number-item"
        data-index="1"
        role="button"
        tabindex="-1"
      >
        2
      </span>
    </li>
    <li class="sbb-paginator__page--number">
      <span
        class="sbb-paginator__page--number-item"
        data-index="2"
        role="button"
        tabindex="-1"
      >
        3
      </span>
    </li>
    <li class="sbb-paginator__page--number">
      <span
        class="sbb-paginator__page--number-item"
        data-index="3"
        role="button"
        tabindex="-1"
      >
        4
      </span>
    </li>
    <li class="sbb-paginator__page--ellipsis">
      <span class="sbb-paginator__page--ellipsis-item">
        ...
      </span>
    </li>
    <li class="sbb-paginator__page--number">
      <span
        class="sbb-paginator__page--number-item"
        data-index="12"
        role="button"
        tabindex="-1"
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
      "name": "",
      "disabled": true
    },
    {
      "role": "button",
      "name": ""
    },
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

snapshots["sbb-paginator renders with options Chrome-Firefox DOM"] = 
`<sbb-paginator
  length="50"
  page-size="10"
  size="m"
>
</sbb-paginator>
`;
/* end snapshot sbb-paginator renders with options Chrome-Firefox DOM */

snapshots["sbb-paginator renders with options Chrome-Firefox Shadow DOM"] = 
`<div class="sbb-paginator">
  <div class="sbb-paginator__buttons">
    <sbb-mini-button
      aria-disabled="true"
      data-action=""
      data-button=""
      dir="ltr"
      disabled=""
      icon-name="chevron-left-small"
      id="sbb-paginator-prev-page"
      role="button"
    >
    </sbb-mini-button>
    <sbb-mini-button
      data-action=""
      data-button=""
      dir="ltr"
      icon-name="chevron-right-small"
      id="sbb-paginator-next-page"
      role="button"
      tabindex="0"
    >
    </sbb-mini-button>
  </div>
  <ul class="sbb-paginator__pages">
    <li
      class="sbb-paginator__page--number"
      data-selected="true"
    >
      <span
        aria-current="true"
        aria-selected="true"
        class="sbb-paginator__page--number-item"
        data-index="0"
        role="button"
        tabindex="0"
      >
        1
      </span>
    </li>
    <li class="sbb-paginator__page--number">
      <span
        class="sbb-paginator__page--number-item"
        data-index="1"
        role="button"
        tabindex="-1"
      >
        2
      </span>
    </li>
    <li class="sbb-paginator__page--number">
      <span
        class="sbb-paginator__page--number-item"
        data-index="2"
        role="button"
        tabindex="-1"
      >
        3
      </span>
    </li>
    <li class="sbb-paginator__page--number">
      <span
        class="sbb-paginator__page--number-item"
        data-index="3"
        role="button"
        tabindex="-1"
      >
        4
      </span>
    </li>
    <li class="sbb-paginator__page--number">
      <span
        class="sbb-paginator__page--number-item"
        data-index="4"
        role="button"
        tabindex="-1"
      >
        5
      </span>
    </li>
  </ul>
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
</div>
`;
/* end snapshot sbb-paginator renders with options Chrome-Firefox Shadow DOM */

snapshots["sbb-paginator renders with options Safari DOM"] = 
`<sbb-paginator
  length="50"
  page-size="10"
  size="m"
>
</sbb-paginator>
`;
/* end snapshot sbb-paginator renders with options Safari DOM */

snapshots["sbb-paginator renders with options Safari Shadow DOM"] = 
`<div class="sbb-paginator">
  <div class="sbb-paginator__buttons">
    <sbb-mini-button
      aria-disabled="true"
      data-action=""
      data-button=""
      dir="ltr"
      disabled=""
      icon-name="chevron-left-small"
      id="sbb-paginator-prev-page"
      role="button"
    >
    </sbb-mini-button>
    <sbb-mini-button
      data-action=""
      data-button=""
      dir="ltr"
      icon-name="chevron-right-small"
      id="sbb-paginator-next-page"
      role="button"
      tabindex="0"
    >
    </sbb-mini-button>
  </div>
  <ul class="sbb-paginator__pages">
    <li
      class="sbb-paginator__page--number"
      data-selected="true"
    >
      <span
        aria-current="true"
        aria-selected="true"
        class="sbb-paginator__page--number-item"
        data-index="0"
        role="button"
        tabindex="0"
      >
        1
      </span>
    </li>
    <li class="sbb-paginator__page--number">
      <span
        class="sbb-paginator__page--number-item"
        data-index="1"
        role="button"
        tabindex="-1"
      >
        2
      </span>
    </li>
    <li class="sbb-paginator__page--number">
      <span
        class="sbb-paginator__page--number-item"
        data-index="2"
        role="button"
        tabindex="-1"
      >
        3
      </span>
    </li>
    <li class="sbb-paginator__page--number">
      <span
        class="sbb-paginator__page--number-item"
        data-index="3"
        role="button"
        tabindex="-1"
      >
        4
      </span>
    </li>
    <li class="sbb-paginator__page--number">
      <span
        class="sbb-paginator__page--number-item"
        data-index="4"
        role="button"
        tabindex="-1"
      >
        5
      </span>
    </li>
  </ul>
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
        id="sbb-select-2"
        role="listbox"
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
</div>
`;
/* end snapshot sbb-paginator renders with options Safari Shadow DOM */

snapshots["sbb-paginator renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "",
      "disabled": true
    },
    {
      "role": "button",
      "name": ""
    },
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

