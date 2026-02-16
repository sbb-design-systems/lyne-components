/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-clock renders DOM"] = 
`<sbb-clock>
</sbb-clock>
`;
/* end snapshot sbb-clock renders DOM */

snapshots["sbb-clock renders Shadow DOM"] = 
`<span class="sbb-clock__face">
</span>
<span class="sbb-clock__hand-hours">
</span>
<span class="sbb-clock__hand-minutes sbb-clock__hand-minutes--no-transition">
</span>
<span class="sbb-clock__hand-seconds">
</span>
`;
/* end snapshot sbb-clock renders Shadow DOM */

snapshots["sbb-clock renders with fixed time DOM"] = 
`<sbb-clock
  now="12:30:00"
  style="--sbb-clock-animation-play-state: paused; --sbb-clock-hours-animation-start-angle: 15deg; --sbb-clock-hours-animation-duration: 41400s; --sbb-clock-seconds-animation-start-angle: 0deg; --sbb-clock-seconds-animation-duration: 60s;"
>
</sbb-clock>
`;
/* end snapshot sbb-clock renders with fixed time DOM */

snapshots["sbb-clock renders with fixed time Shadow DOM"] = 
`<span class="sbb-clock__face">
</span>
<span class="sbb-clock__hand-hours sbb-clock__hand-hours--initial-hour">
</span>
<span
  class="sbb-clock__hand-minutes sbb-clock__hand-minutes--no-transition"
  style="transform: rotateZ(180deg);"
>
</span>
<span class="sbb-clock__hand-seconds sbb-clock__hand-seconds--initial-minute">
</span>
`;
/* end snapshot sbb-clock renders with fixed time Shadow DOM */

snapshots["sbb-clock renders A11y tree Chrome"] = 
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
/* end snapshot sbb-clock renders A11y tree Chrome */

