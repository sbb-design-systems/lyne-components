/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-train-wagon render should render as type wagon"] = 
`<div class="sbb-train-wagon">
  <ul
    aria-label="Train coach"
    class="sbb-train-wagon__compartment"
  >
    <li
      aria-hidden="false"
      class="sbb-train-wagon__label"
    >
      <span class="sbb-screen-reader-only">
        Number,
      </span>
      38
    </li>
    <li class="sbb-train-wagon__class">
      <span class="sbb-screen-reader-only">
        First Class
      </span>
      <span aria-hidden="true">
        1
      </span>
    </li>
    <sbb-timetable-occupancy-icon
      aria-label="No occupancy forecast available"
      class="sbb-train-wagon__occupancy"
      data-namespace="default"
      role="listitem"
    >
    </sbb-timetable-occupancy-icon>
    <li class="sbb-screen-reader-only">
      No passage to the previous train coach
    </li>
  </ul>
  <span
    class="sbb-train-wagon__icons"
    hidden=""
  >
    <span hidden="">
      <slot>
      </slot>
    </span>
  </span>
</div>
`;
/* end snapshot sbb-train-wagon render should render as type wagon */

snapshots["sbb-train-wagon render should render as type wagon with one icon"] = 
`<div class="sbb-train-wagon">
  <ul
    aria-label="Train coach"
    class="sbb-train-wagon__compartment"
  >
    <li
      aria-hidden="true"
      class="sbb-train-wagon__label"
    >
    </li>
    <sbb-timetable-occupancy-icon
      aria-label="No occupancy forecast available"
      class="sbb-train-wagon__occupancy"
      data-namespace="default"
      role="listitem"
    >
    </sbb-timetable-occupancy-icon>
  </ul>
  <span class="sbb-train-wagon__icons">
    <sbb-screen-reader-only>
      Additional wagon information
    </sbb-screen-reader-only>
    <span class="sbb-train-wagon__icons-list">
      <span>
        <slot name="li-0">
        </slot>
      </span>
    </span>
    <span hidden="">
      <slot>
      </slot>
    </span>
  </span>
</div>
`;
/* end snapshot sbb-train-wagon render should render as type wagon with one icon */

snapshots["sbb-train-wagon render should render as type wagon with multiple icons"] = 
`<div class="sbb-train-wagon">
  <ul
    aria-label="Train coach"
    class="sbb-train-wagon__compartment"
  >
    <li
      aria-hidden="true"
      class="sbb-train-wagon__label"
    >
    </li>
    <sbb-timetable-occupancy-icon
      aria-label="No occupancy forecast available"
      class="sbb-train-wagon__occupancy"
      data-namespace="default"
      role="listitem"
    >
    </sbb-timetable-occupancy-icon>
  </ul>
  <span class="sbb-train-wagon__icons">
    <ul
      aria-label="Additional wagon information"
      class="sbb-train-wagon__icons-list"
    >
      <li>
        <slot name="li-0">
        </slot>
      </li>
      <li>
        <slot name="li-1">
        </slot>
      </li>
    </ul>
    <span hidden="">
      <slot>
      </slot>
    </span>
  </span>
</div>
`;
/* end snapshot sbb-train-wagon render should render as type wagon with multiple icons */

snapshots["sbb-train-wagon render should render as type locomotive"] = 
`<div class="sbb-train-wagon">
  <span class="sbb-train-wagon__compartment">
    <span class="sbb-screen-reader-only">
      Locomotive
    </span>
    <span
      aria-hidden="true"
      class="sbb-train-wagon__label"
    >
    </span>
  </span>
  <span class="sbb-screen-reader-only">
    , Top of the train
  </span>
</div>
`;
/* end snapshot sbb-train-wagon render should render as type locomotive */

snapshots["sbb-train-wagon render should render as type closed wagon without number"] = 
`<div class="sbb-train-wagon">
  <span class="sbb-train-wagon__compartment">
    <span class="sbb-screen-reader-only">
      Closed train coach
    </span>
    <span
      aria-hidden="true"
      class="sbb-train-wagon__label"
    >
    </span>
  </span>
</div>
`;
/* end snapshot sbb-train-wagon render should render as type closed wagon without number */

