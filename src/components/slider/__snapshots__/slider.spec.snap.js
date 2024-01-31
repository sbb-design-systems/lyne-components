/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-slider renders"] = 
`<div class="sbb-slider__height-container">
  <div class="sbb-slider__wrapper">
    <slot name="prefix">
      <sbb-icon
        aria-hidden="true"
        data-namespace="default"
        name="walk-slow-small"
        role="img"
      >
      </sbb-icon>
    </slot>
    <div
      class="sbb-slider__container"
      style="--sbb-slider-value-fraction:0.2;"
    >
      <input
        class="sbb-slider__range-input"
        max="500"
        min="0"
        tabindex="-1"
        type="range"
        value="100"
        valueasnumber="100"
      >
      <div class="sbb-slider__line">
        <div class="sbb-slider__selected-line">
        </div>
      </div>
      <div class="sbb-slider__knob">
      </div>
    </div>
    <slot name="suffix">
      <sbb-icon
        aria-hidden="true"
        data-namespace="default"
        name="walk-fast-small"
        role="img"
      >
      </sbb-icon>
    </slot>
  </div>
</div>
`;
/* end snapshot sbb-slider renders */

snapshots["sbb-slider renders with no icons and default min/max"] = 
`<div class="sbb-slider__height-container">
  <div class="sbb-slider__wrapper">
    <slot name="prefix">
    </slot>
    <div
      class="sbb-slider__container"
      style="--sbb-slider-value-fraction:0.01;"
    >
      <input
        class="sbb-slider__range-input"
        max="100"
        min="0"
        tabindex="-1"
        type="range"
        value="1"
        valueasnumber="1"
      >
      <div class="sbb-slider__line">
        <div class="sbb-slider__selected-line">
        </div>
      </div>
      <div class="sbb-slider__knob">
      </div>
    </div>
    <slot name="suffix">
    </slot>
  </div>
</div>
`;
/* end snapshot sbb-slider renders with no icons and default min/max */

snapshots["sbb-slider A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "slider",
      "name": "",
      "valuetext": "",
      "valuemin": 0,
      "valuemax": 100,
      "orientation": "horizontal",
      "value": 1
    }
  ]
}
</p>
`;
/* end snapshot sbb-slider A11y tree Chrome */

snapshots["sbb-slider A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "slider",
      "name": "",
      "valuetext": "1",
      "value": "1"
    }
  ]
}
</p>
`;
/* end snapshot sbb-slider A11y tree Firefox */

snapshots["sbb-slider A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "slider",
      "name": "",
      "valuemax": 100,
      "orientation": "horizontal"
    }
  ]
}
</p>
`;
/* end snapshot sbb-slider A11y tree Safari */

