/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-timetable-occupancy-icon renders with high occupancy DOM"] = 
`<sbb-timetable-occupancy-icon occupancy="high">
</sbb-timetable-occupancy-icon>
`;
/* end snapshot sbb-timetable-occupancy-icon renders with high occupancy DOM */

snapshots["sbb-timetable-occupancy-icon renders with high occupancy Shadow DOM"] = 
`<span class="sbb-icon-inner">
  <svg-fake
    data-name="utilization-high"
    height="24"
    style="width:24px;height:24px"
    width="24"
  >
  </svg-fake>
</span>
`;
/* end snapshot sbb-timetable-occupancy-icon renders with high occupancy Shadow DOM */

snapshots["sbb-timetable-occupancy-icon renders with none occupancy in negative mode DOM"] = 
`<sbb-timetable-occupancy-icon
  negative=""
  occupancy="none"
>
</sbb-timetable-occupancy-icon>
`;
/* end snapshot sbb-timetable-occupancy-icon renders with none occupancy in negative mode DOM */

snapshots["sbb-timetable-occupancy-icon renders with none occupancy in negative mode Shadow DOM"] = 
`<span class="sbb-icon-inner">
  <svg-fake
    data-name="utilization-none-negative"
    height="24"
    style="width:24px;height:24px"
    width="24"
  >
  </svg-fake>
</span>
`;
/* end snapshot sbb-timetable-occupancy-icon renders with none occupancy in negative mode Shadow DOM */

