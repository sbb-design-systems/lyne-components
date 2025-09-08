/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-compact-paginator renders DOM"] = 
`<sbb-compact-paginator
  length="50"
  page-size="5"
  pager-position="start"
  size="m"
>
</sbb-compact-paginator>
`;
/* end snapshot sbb-compact-paginator renders DOM */

snapshots["sbb-compact-paginator renders Shadow DOM"] = 
`<div class="sbb-compact-paginator">
  <sbb-mini-button-group size="l">
    <sbb-mini-button
      aria-label="Previous page"
      data-action=""
      data-button=""
      disabled=""
      icon-name="chevron-small-left-small"
      id="sbb-paginator-prev-page"
      slot="li-0"
    >
    </sbb-mini-button>
    <sbb-divider
      orientation="vertical"
      slot="li-1"
    >
    </sbb-divider>
    <sbb-mini-button
      aria-label="Next page"
      data-action=""
      data-button=""
      icon-name="chevron-small-right-small"
      id="sbb-paginator-next-page"
      slot="li-2"
      tabindex="0"
    >
    </sbb-mini-button>
  </sbb-mini-button-group>
  <span
    aria-hidden="true"
    class="sbb-paginator__pages"
  >
    1
    <sbb-divider
      class="sbb-compact-paginator__divider"
      orientation="vertical"
      style="--sbb-divider-color:currentcolor;"
    >
    </sbb-divider>
    10
  </span>
  <sbb-screen-reader-only>
    Page 1 of 10
  </sbb-screen-reader-only>
</div>
<sbb-screen-reader-only
  id="status"
  role="status"
>
  Page 1 selected.
</sbb-screen-reader-only>
`;
/* end snapshot sbb-compact-paginator renders Shadow DOM */

snapshots["sbb-compact-paginator renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Previous page",
      "disabled": true
    },
    {
      "role": "button",
      "name": "Next page"
    },
    {
      "role": "text leaf",
      "name": "Page 1 of 10"
    },
    {
      "role": "text leaf",
      "name": "Page 1 selected."
    }
  ]
}
</p>
`;
/* end snapshot sbb-compact-paginator renders A11y tree Firefox */

snapshots["sbb-compact-paginator renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Previous page",
      "disabled": true
    },
    {
      "role": "button",
      "name": "Next page"
    },
    {
      "role": "text",
      "name": "Page 1 of 10"
    },
    {
      "role": "text",
      "name": "Page 1 selected."
    }
  ]
}
</p>
`;
/* end snapshot sbb-compact-paginator renders A11y tree Chrome */

snapshots["sbb-compact-paginator renders accessibility labels DOM"] = 
`<sbb-compact-paginator
  accessibility-next-page-label="Next slide"
  accessibility-page-label="Slide"
  accessibility-previous-page-label="Previous slide"
  length="50"
  page-size="5"
  pager-position="start"
  size="m"
>
</sbb-compact-paginator>
`;
/* end snapshot sbb-compact-paginator renders accessibility labels DOM */

snapshots["sbb-compact-paginator renders accessibility labels Shadow DOM"] = 
`<div class="sbb-compact-paginator">
  <sbb-mini-button-group size="l">
    <sbb-mini-button
      aria-label="Previous slide"
      data-action=""
      data-button=""
      disabled=""
      icon-name="chevron-small-left-small"
      id="sbb-paginator-prev-page"
      slot="li-0"
    >
    </sbb-mini-button>
    <sbb-divider
      orientation="vertical"
      slot="li-1"
    >
    </sbb-divider>
    <sbb-mini-button
      aria-label="Next slide"
      data-action=""
      data-button=""
      icon-name="chevron-small-right-small"
      id="sbb-paginator-next-page"
      slot="li-2"
      tabindex="0"
    >
    </sbb-mini-button>
  </sbb-mini-button-group>
  <span
    aria-hidden="true"
    class="sbb-paginator__pages"
  >
    1
    <sbb-divider
      class="sbb-compact-paginator__divider"
      orientation="vertical"
      style="--sbb-divider-color:currentcolor;"
    >
    </sbb-divider>
    10
  </span>
  <sbb-screen-reader-only>
    Slide 1 of 10
  </sbb-screen-reader-only>
</div>
<sbb-screen-reader-only
  id="status"
  role="status"
>
  Slide 1 selected.
</sbb-screen-reader-only>
`;
/* end snapshot sbb-compact-paginator renders accessibility labels Shadow DOM */

snapshots["sbb-compact-paginator renders accessibility labels A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Previous slide",
      "disabled": true
    },
    {
      "role": "button",
      "name": "Next slide"
    },
    {
      "role": "text",
      "name": "Slide 1 of 10"
    },
    {
      "role": "text",
      "name": "Slide 1 selected."
    }
  ]
}
</p>
`;
/* end snapshot sbb-compact-paginator renders accessibility labels A11y tree Chrome */

snapshots["sbb-compact-paginator renders accessibility labels A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Previous slide",
      "disabled": true
    },
    {
      "role": "button",
      "name": "Next slide"
    },
    {
      "role": "text leaf",
      "name": "Slide 1 of 10"
    },
    {
      "role": "text leaf",
      "name": "Slide 1 selected."
    }
  ]
}
</p>
`;
/* end snapshot sbb-compact-paginator renders accessibility labels A11y tree Firefox */

