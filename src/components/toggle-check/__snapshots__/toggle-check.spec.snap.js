/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-toggle-check renders sbb-toggle-check"] = 
`<label class="sbb-toggle-check">
  <input
    aria-hidden="true"
    tabindex="-1"
    type="checkbox"
  >
  <span class="sbb-toggle-check__container">
    <span
      class="sbb-toggle-check__label"
      hidden=""
    >
      <slot>
      </slot>
    </span>
    <span class="sbb-toggle-check__track">
      <span class="sbb-toggle-check__circle">
        <span class="sbb-toggle-check__icon">
          <slot name="icon">
            <sbb-icon
              aria-hidden="true"
              data-namespace="default"
              name="tick-small"
              role="img"
            >
            </sbb-icon>
          </slot>
        </span>
      </span>
    </span>
  </span>
</label>
`;
/* end snapshot sbb-toggle-check renders sbb-toggle-check */

snapshots["sbb-toggle-check label position renders label before toggle"] = 
`<label class="sbb-toggle-check">
  <input
    aria-hidden="true"
    tabindex="-1"
    type="checkbox"
  >
  <span class="sbb-toggle-check__container">
    <span class="sbb-toggle-check__label">
      <slot>
      </slot>
    </span>
    <span class="sbb-toggle-check__track">
      <span class="sbb-toggle-check__circle">
        <span class="sbb-toggle-check__icon">
          <slot name="icon">
            <sbb-icon
              aria-hidden="true"
              data-namespace="default"
              name="tick-small"
              role="img"
            >
            </sbb-icon>
          </slot>
        </span>
      </span>
    </span>
  </span>
</label>
`;
/* end snapshot sbb-toggle-check label position renders label before toggle */

snapshots["sbb-toggle-check states checked state renders toggle in checked state"] = 
`<label class="sbb-toggle-check">
  <input
    aria-hidden="true"
    checked=""
    tabindex="-1"
    type="checkbox"
  >
  <span class="sbb-toggle-check__container">
    <span
      class="sbb-toggle-check__label"
      hidden=""
    >
      <slot>
      </slot>
    </span>
    <span class="sbb-toggle-check__track">
      <span class="sbb-toggle-check__circle">
        <span class="sbb-toggle-check__icon">
          <slot name="icon">
            <sbb-icon
              aria-hidden="true"
              data-namespace="default"
              name="tick-small"
              role="img"
            >
            </sbb-icon>
          </slot>
        </span>
      </span>
    </span>
  </span>
</label>
`;
/* end snapshot sbb-toggle-check states checked state renders toggle in checked state */

snapshots["sbb-toggle-check states disabled state renders toggle in disabled state"] = 
`<label class="sbb-toggle-check">
  <input
    aria-hidden="true"
    disabled=""
    tabindex="-1"
    type="checkbox"
  >
  <span class="sbb-toggle-check__container">
    <span
      class="sbb-toggle-check__label"
      hidden=""
    >
      <slot>
      </slot>
    </span>
    <span class="sbb-toggle-check__track">
      <span class="sbb-toggle-check__circle">
        <span class="sbb-toggle-check__icon">
          <slot name="icon">
            <sbb-icon
              aria-hidden="true"
              data-namespace="default"
              name="tick-small"
              role="img"
            >
            </sbb-icon>
          </slot>
        </span>
      </span>
    </span>
  </span>
</label>
`;
/* end snapshot sbb-toggle-check states disabled state renders toggle in disabled state */

snapshots["sbb-toggle-check states disabled and checked state renders toggle in disabled and checked state"] = 
`<label class="sbb-toggle-check">
  <input
    aria-hidden="true"
    checked=""
    disabled=""
    tabindex="-1"
    type="checkbox"
  >
  <span class="sbb-toggle-check__container">
    <span
      class="sbb-toggle-check__label"
      hidden=""
    >
      <slot>
      </slot>
    </span>
    <span class="sbb-toggle-check__track">
      <span class="sbb-toggle-check__circle">
        <span class="sbb-toggle-check__icon">
          <slot name="icon">
            <sbb-icon
              aria-hidden="true"
              data-namespace="default"
              name="tick-small"
              role="img"
            >
            </sbb-icon>
          </slot>
        </span>
      </span>
    </span>
  </span>
</label>
`;
/* end snapshot sbb-toggle-check states disabled and checked state renders toggle in disabled and checked state */

snapshots["sbb-toggle-check A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "checkbox",
      "name": "​",
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-toggle-check A11y tree Chrome */

snapshots["sbb-toggle-check A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "checkbox",
      "name": "​"
    }
  ]
}
</p>
`;
/* end snapshot sbb-toggle-check A11y tree Firefox */

snapshots["sbb-toggle-check A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "checkbox",
      "name": "​",
      "checked": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-toggle-check A11y tree Safari */

