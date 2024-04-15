/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-datepicker-next-day renders"] = 
`<sbb-datepicker-next-day
  aria-disabled="true"
  aria-label="Next day"
  data-action=""
  data-button=""
  data-disabled=""
  dir="ltr"
  role="button"
  slot="suffix"
>
</sbb-datepicker-next-day>
`;
/* end snapshot sbb-datepicker-next-day renders */

snapshots["sbb-datepicker-next-day renders with connected datepicker"] = 
`<sbb-datepicker-next-day
  aria-label="Change to the next day, currently selected December 31, 2022."
  data-action=""
  data-button=""
  date-picker="datepicker"
  dir="ltr"
  role="button"
  slot="suffix"
  tabindex="0"
>
</sbb-datepicker-next-day>
`;
/* end snapshot sbb-datepicker-next-day renders with connected datepicker */

snapshots["sbb-datepicker-next-day A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Next day",
      "disabled": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-datepicker-next-day A11y tree Chrome */

snapshots["sbb-datepicker-next-day A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "button",
      "name": "Next day",
      "disabled": true
    }
  ]
}
</p>
`;
/* end snapshot sbb-datepicker-next-day A11y tree Firefox */

