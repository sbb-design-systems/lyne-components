/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-datepicker-previous-day renders"] = 
`<sbb-datepicker-previous-day
  aria-disabled="true"
  aria-label="Previous day"
  data-action=""
  data-button=""
  data-disabled=""
  dir="ltr"
  role="button"
  slot="prefix"
>
</sbb-datepicker-previous-day>
`;
/* end snapshot sbb-datepicker-previous-day renders */

snapshots["sbb-datepicker-previous-day renders with connected datepicker"] = 
`<sbb-datepicker-previous-day
  aria-label="Change to the previous day, currently selected December 31, 2022."
  data-action=""
  data-button=""
  date-picker="datepicker"
  dir="ltr"
  role="button"
  slot="prefix"
  tabindex="0"
>
</sbb-datepicker-previous-day>
`;
/* end snapshot sbb-datepicker-previous-day renders with connected datepicker */

snapshots["sbb-datepicker-previous-day A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Previous day",
      "disabled": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-datepicker-previous-day A11y tree Chrome */

snapshots["sbb-datepicker-previous-day A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Previous day",
      "disabled": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-datepicker-previous-day A11y tree Firefox */

