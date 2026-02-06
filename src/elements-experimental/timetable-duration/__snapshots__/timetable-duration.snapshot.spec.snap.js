/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-timetable-duration renders DOM"] = 
`<sbb-timetable-duration>
</sbb-timetable-duration>
`;
/* end snapshot sbb-timetable-duration renders DOM */

snapshots["sbb-timetable-duration renders Shadow DOM"] = 
`<p
  aria-label="3 Hours 12 Minutes."
  class="duration"
  role="text"
>
  <span
    aria-hidden="true"
    class="duration__text--visual"
    role="presentation"
  >
    3 h 12 min
  </span>
  <span class="duration__text--visually-hidden">
    3 Hours 12 Minutes.
  </span>
</p>
`;
/* end snapshot sbb-timetable-duration renders Shadow DOM */

snapshots["sbb-timetable-duration renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "paragraph",
      "name": "3 Hours 12 Minutes."
    }
  ]
}
</p>
`;
/* end snapshot sbb-timetable-duration renders A11y tree Chrome */

