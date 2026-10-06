/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-train-wagon-button should render DOM"] = 
`<sbb-train-wagon-button
  blocked-passage="previous"
  label="38"
  occupancy="none"
  tabindex="0"
  wagon-class="1"
  wagon-type="wagon"
>
</sbb-train-wagon-button>
`;
/* end snapshot sbb-train-wagon-button should render DOM */

snapshots["sbb-train-wagon-button should render Shadow DOM"] = 
`<span class="sbb-action-base sbb-train-wagon-button">
  <div class="sbb-train-wagon">
    <ul
      aria-label="Train coach"
      class="sbb-train-wagon__compartment"
    >
      <li class="sbb-screen-reader-only">
        Number, 38
      </li>
      <li class="sbb-train-wagon__class">
        <span class="sbb-screen-reader-only">
          First Class
        </span>
        <span
          aria-hidden="true"
          class="first sbb-train-wagon__class-entry"
        >
          1
        </span>
      </li>
      <sbb-timetable-occupancy-icon
        class="sbb-train-wagon__occupancy"
        occupancy="none"
        role="listitem"
      >
      </sbb-timetable-occupancy-icon>
      <li class="sbb-screen-reader-only">
        No passage to the previous train coach
      </li>
    </ul>
    <span class="sbb-train-wagon__information-wrapper">
      <span
        aria-hidden="true"
        class="sbb-train-wagon__label"
      >
        38
      </span>
      <span hidden="">
        <slot>
        </slot>
      </span>
    </span>
  </div>
</span>
`;
/* end snapshot sbb-train-wagon-button should render Shadow DOM */

snapshots["sbb-train-wagon-button should render A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "button",
      "name": "Train coach",
      "invalid": false,
      "focusable": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-train-wagon-button should render A11y tree Chrome */

