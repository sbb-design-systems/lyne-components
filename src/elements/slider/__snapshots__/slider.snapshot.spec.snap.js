/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-slider renders DOM"] = 
`<sbb-slider
  id="slider-1"
  style="--sbb-slider-value-fraction: 0.01;"
  tabindex="0"
  value="1"
>
</sbb-slider>
`;
/* end snapshot sbb-slider renders DOM */

snapshots["sbb-slider renders Shadow DOM"] = 
`<div class="sbb-slider__height-container">
  <div class="sbb-slider__wrapper">
    <slot name="prefix">
    </slot>
    <div class="sbb-slider__container">
      <input
        class="sbb-slider__range-input"
        max="100"
        min="0"
        tabindex="-1"
        type="range"
        value="1"
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
/* end snapshot sbb-slider renders Shadow DOM */

snapshots["sbb-slider renders with properties DOM"] = 
`<sbb-slider
  end-icon="walk-fast-small"
  max="500"
  min="0"
  start-icon="walk-slow-small"
  style="--sbb-slider-value-fraction: 0.2;"
  tabindex="0"
  value="100"
>
</sbb-slider>
`;
/* end snapshot sbb-slider renders with properties DOM */

snapshots["sbb-slider renders with properties Shadow DOM"] = 
`<div class="sbb-slider__height-container">
  <div class="sbb-slider__wrapper">
    <slot name="prefix">
      <sbb-icon name="walk-slow-small">
      </sbb-icon>
    </slot>
    <div class="sbb-slider__container">
      <input
        class="sbb-slider__range-input"
        max="500"
        min="0"
        tabindex="-1"
        type="range"
        value="100"
      >
      <div class="sbb-slider__line">
        <div class="sbb-slider__selected-line">
        </div>
      </div>
      <div class="sbb-slider__knob">
      </div>
    </div>
    <slot name="suffix">
      <sbb-icon name="walk-fast-small">
      </sbb-icon>
    </slot>
  </div>
</div>
`;
/* end snapshot sbb-slider renders with properties Shadow DOM */

snapshots["sbb-slider renders disabled DOM"] = 
`<sbb-slider
  disabled=""
  end-icon="walk-fast-small"
  max="500"
  min="0"
  start-icon="walk-slow-small"
  style="--sbb-slider-value-fraction: 0.2;"
  tabindex="0"
  value="100"
>
</sbb-slider>
`;
/* end snapshot sbb-slider renders disabled DOM */

snapshots["sbb-slider renders disabled Shadow DOM"] = 
`<div class="sbb-slider__height-container">
  <div class="sbb-slider__wrapper">
    <slot name="prefix">
      <sbb-icon name="walk-slow-small">
      </sbb-icon>
    </slot>
    <div class="sbb-slider__container">
      <input
        class="sbb-slider__range-input"
        disabled=""
        max="500"
        min="0"
        tabindex="-1"
        type="range"
        value="100"
      >
      <div class="sbb-slider__line">
        <div class="sbb-slider__selected-line">
        </div>
      </div>
      <div class="sbb-slider__knob">
      </div>
    </div>
    <slot name="suffix">
      <sbb-icon name="walk-fast-small">
      </sbb-icon>
    </slot>
  </div>
</div>
`;
/* end snapshot sbb-slider renders disabled Shadow DOM */

snapshots["sbb-slider renders readonly DOM"] = 
`<sbb-slider
  end-icon="walk-fast-small"
  max="500"
  min="0"
  readonly=""
  start-icon="walk-slow-small"
  style="--sbb-slider-value-fraction: 0.2;"
  tabindex="0"
  value="100"
>
</sbb-slider>
`;
/* end snapshot sbb-slider renders readonly DOM */

snapshots["sbb-slider renders readonly Shadow DOM"] = 
`<div class="sbb-slider__height-container">
  <div class="sbb-slider__wrapper">
    <slot name="prefix">
      <sbb-icon name="walk-slow-small">
      </sbb-icon>
    </slot>
    <div class="sbb-slider__container">
      <input
        class="sbb-slider__range-input"
        disabled=""
        max="500"
        min="0"
        tabindex="-1"
        type="range"
        value="100"
      >
      <div class="sbb-slider__line">
        <div class="sbb-slider__selected-line">
        </div>
      </div>
      <div class="sbb-slider__knob">
      </div>
    </div>
    <slot name="suffix">
      <sbb-icon name="walk-fast-small">
      </sbb-icon>
    </slot>
  </div>
</div>
`;
/* end snapshot sbb-slider renders readonly Shadow DOM */

snapshots["sbb-slider renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "generic",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-slider renders A11y tree Chrome */

snapshots["sbb-slider renders with properties A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "slider",
      "name": "",
      "value": 100,
      "invalid": false,
      "focusable": true,
      "settable": true,
      "orientation": "horizontal",
      "valuemin": 0,
      "valuemax": 500,
      "valuetext": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-slider renders with properties A11y tree Chrome */

snapshots["sbb-slider renders disabled A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "slider",
      "name": "",
      "value": 100,
      "disabled": true,
      "invalid": false,
      "orientation": "horizontal",
      "valuemin": 0,
      "valuemax": 500,
      "valuetext": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-slider renders disabled A11y tree Chrome */

snapshots["sbb-slider renders readonly A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "slider",
      "name": "",
      "value": 100,
      "invalid": false,
      "focusable": true,
      "orientation": "horizontal",
      "valuemin": 0,
      "valuemax": 500,
      "valuetext": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-slider renders readonly A11y tree Chrome */

snapshots["sbb-slider renders in form DOM"] = 
`<sbb-slider
  max="10"
  min="0"
  name="sbb-slider"
  style="--sbb-slider-value-fraction: 0.1;"
  tabindex="0"
  value="1"
>
</sbb-slider>
`;
/* end snapshot sbb-slider renders in form DOM */

snapshots["sbb-slider renders in form Shadow DOM"] = 
`<div class="sbb-slider__height-container">
  <div class="sbb-slider__wrapper">
    <slot name="prefix">
    </slot>
    <div class="sbb-slider__container">
      <input
        class="sbb-slider__range-input"
        max="10"
        min="0"
        tabindex="-1"
        type="range"
        value="1"
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
/* end snapshot sbb-slider renders in form Shadow DOM */

snapshots["sbb-slider renders in form A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "generic",
      "name": ""
    }
  ]
}
</p>
`;
/* end snapshot sbb-slider renders in form A11y tree Chrome */

