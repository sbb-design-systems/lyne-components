/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-tab-label renders DOM"] = 
`<sbb-tab-label data-slot-names="unnamed">
  Label
</sbb-tab-label>
`;
/* end snapshot sbb-tab-label renders DOM */

snapshots["sbb-tab-label renders Shadow DOM"] = 
`<div class="sbb-tab-label__wrapper">
  <h1 class="sbb-tab-label">
    <span class="sbb-tab-label__icon">
      <slot name="icon">
      </slot>
    </span>
    <span class="sbb-tab-label__text">
      <slot>
      </slot>
    </span>
    <span class="sbb-tab-label__amount">
      <slot name="amount">
      </slot>
    </span>
  </h1>
</div>
`;
/* end snapshot sbb-tab-label renders Shadow DOM */

snapshots["sbb-tab-label renders correctly an H2 heading tag DOM"] = 
`<sbb-tab-label
  data-slot-names="unnamed"
  icon-name="pie-small"
  level="2"
>
  Label
</sbb-tab-label>
`;
/* end snapshot sbb-tab-label renders correctly an H2 heading tag DOM */

snapshots["sbb-tab-label renders correctly an H2 heading tag Shadow DOM"] = 
`<div class="sbb-tab-label__wrapper">
  <h2 class="sbb-tab-label">
    <span class="sbb-tab-label__icon">
      <slot name="icon">
        <sbb-icon
          aria-hidden="true"
          data-namespace="default"
          name="pie-small"
          role="img"
        >
        </sbb-icon>
      </slot>
    </span>
    <span class="sbb-tab-label__text">
      <slot>
      </slot>
    </span>
    <span class="sbb-tab-label__amount">
      <slot name="amount">
      </slot>
    </span>
  </h2>
</div>
`;
/* end snapshot sbb-tab-label renders correctly an H2 heading tag Shadow DOM */

snapshots["sbb-tab-label renders an H1 heading tag if the provided level is greater than 6 DOM"] = 
`<sbb-tab-label
  amount="78"
  data-slot-names="unnamed"
  level="7"
>
  Label
</sbb-tab-label>
`;
/* end snapshot sbb-tab-label renders an H1 heading tag if the provided level is greater than 6 DOM */

snapshots["sbb-tab-label renders an H1 heading tag if the provided level is greater than 6 Shadow DOM"] = 
`<div class="sbb-tab-label__wrapper">
  <h1 class="sbb-tab-label">
    <span class="sbb-tab-label__icon">
      <slot name="icon">
      </slot>
    </span>
    <span class="sbb-tab-label__text">
      <slot>
      </slot>
    </span>
    <span class="sbb-tab-label__amount">
      <slot name="amount">
        78
      </slot>
    </span>
  </h1>
</div>
`;
/* end snapshot sbb-tab-label renders an H1 heading tag if the provided level is greater than 6 Shadow DOM */

snapshots["sbb-tab-label A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Tab title",
      "level": 1
    }
  ]
}
</p>
`;
/* end snapshot sbb-tab-label A11y tree Chrome */

snapshots["sbb-tab-label A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Tab title"
    }
  ]
}
</p>
`;
/* end snapshot sbb-tab-label A11y tree Safari */

snapshots["sbb-tab-label A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Tab title",
      "level": 1
    }
  ]
}
</p>
`;
/* end snapshot sbb-tab-label A11y tree Firefox */

