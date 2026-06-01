/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-calendar default renders DOM"] = 
`<sbb-calendar
  orientation="horizontal"
  value="2023-01-20T00:00:00"
>
</sbb-calendar>
`;
/* end snapshot sbb-calendar default renders DOM */

snapshots["sbb-calendar default renders Shadow DOM"] = 
`<div class="sbb-calendar__wrapper">
  <div class="sbb-calendar__day-view sbb-calendar__table-wrapper">
    <div class="sbb-calendar__table-header">
      <span>
        January 2023
      </span>
      <sbb-secondary-button
        aria-label="Change to the previous month"
        class="sbb-calendar__control"
        icon-name="chevron-small-left-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Change to the next month"
        class="sbb-calendar__control"
        icon-name="chevron-small-right-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__control"
        icon-name="chevron-small-up-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
    </div>
    <table class="sbb-calendar__table">
      <thead>
        <tr>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Monday
            </span>
            <span aria-hidden="true">
              M
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Tuesday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Wednesday
            </span>
            <span aria-hidden="true">
              W
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Thursday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Friday
            </span>
            <span aria-hidden="true">
              F
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Saturday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Sunday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-01">
              <sbb-calendar-day
                slot="2023-01-01"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-02">
              <sbb-calendar-day
                slot="2023-01-02"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-03">
              <sbb-calendar-day
                slot="2023-01-03"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-04">
              <sbb-calendar-day
                slot="2023-01-04"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-05">
              <sbb-calendar-day
                slot="2023-01-05"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-06">
              <sbb-calendar-day
                slot="2023-01-06"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-07">
              <sbb-calendar-day
                slot="2023-01-07"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-08">
              <sbb-calendar-day
                slot="2023-01-08"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-09">
              <sbb-calendar-day
                slot="2023-01-09"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-10">
              <sbb-calendar-day
                slot="2023-01-10"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-11">
              <sbb-calendar-day
                slot="2023-01-11"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-12">
              <sbb-calendar-day
                slot="2023-01-12"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-13">
              <sbb-calendar-day
                slot="2023-01-13"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-14">
              <sbb-calendar-day
                slot="2023-01-14"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-15">
              <sbb-calendar-day
                slot="2023-01-15"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-16">
              <sbb-calendar-day
                slot="2023-01-16"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-17">
              <sbb-calendar-day
                slot="2023-01-17"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-18">
              <sbb-calendar-day
                slot="2023-01-18"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-19">
              <sbb-calendar-day
                slot="2023-01-19"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-20">
              <sbb-calendar-day
                slot="2023-01-20"
                tabindex="0"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-21">
              <sbb-calendar-day
                slot="2023-01-21"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-22">
              <sbb-calendar-day
                slot="2023-01-22"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-23">
              <sbb-calendar-day
                slot="2023-01-23"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-24">
              <sbb-calendar-day
                slot="2023-01-24"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-25">
              <sbb-calendar-day
                slot="2023-01-25"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-26">
              <sbb-calendar-day
                slot="2023-01-26"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-27">
              <sbb-calendar-day
                slot="2023-01-27"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-28">
              <sbb-calendar-day
                slot="2023-01-28"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-29">
              <sbb-calendar-day
                slot="2023-01-29"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-30">
              <sbb-calendar-day
                slot="2023-01-30"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-31">
              <sbb-calendar-day
                slot="2023-01-31"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`;
/* end snapshot sbb-calendar default renders Shadow DOM */

snapshots["sbb-calendar default renders vertical DOM"] = 
`<sbb-calendar
  orientation="vertical"
  value="2023-01-20T00:00:00"
>
</sbb-calendar>
`;
/* end snapshot sbb-calendar default renders vertical DOM */

snapshots["sbb-calendar default renders vertical Shadow DOM"] = 
`<div class="sbb-calendar__wrapper">
  <div class="sbb-calendar__day-view sbb-calendar__table-wrapper">
    <div class="sbb-calendar__table-header">
      <span>
        January 2023
      </span>
      <sbb-secondary-button
        aria-label="Change to the previous month"
        class="sbb-calendar__control"
        icon-name="chevron-small-left-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Change to the next month"
        class="sbb-calendar__control"
        icon-name="chevron-small-right-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__control"
        icon-name="chevron-small-up-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
    </div>
    <table class="sbb-calendar__table">
      <tbody>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Monday
            </span>
            <span aria-hidden="true">
              M
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-02">
              <sbb-calendar-day
                slot="2023-01-02"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-09">
              <sbb-calendar-day
                slot="2023-01-09"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-16">
              <sbb-calendar-day
                slot="2023-01-16"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-23">
              <sbb-calendar-day
                slot="2023-01-23"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-30">
              <sbb-calendar-day
                slot="2023-01-30"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Tuesday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-03">
              <sbb-calendar-day
                slot="2023-01-03"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-10">
              <sbb-calendar-day
                slot="2023-01-10"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-17">
              <sbb-calendar-day
                slot="2023-01-17"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-24">
              <sbb-calendar-day
                slot="2023-01-24"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-31">
              <sbb-calendar-day
                slot="2023-01-31"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Wednesday
            </span>
            <span aria-hidden="true">
              W
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-04">
              <sbb-calendar-day
                slot="2023-01-04"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-11">
              <sbb-calendar-day
                slot="2023-01-11"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-18">
              <sbb-calendar-day
                slot="2023-01-18"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-25">
              <sbb-calendar-day
                slot="2023-01-25"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Thursday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-05">
              <sbb-calendar-day
                slot="2023-01-05"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-12">
              <sbb-calendar-day
                slot="2023-01-12"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-19">
              <sbb-calendar-day
                slot="2023-01-19"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-26">
              <sbb-calendar-day
                slot="2023-01-26"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Friday
            </span>
            <span aria-hidden="true">
              F
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-06">
              <sbb-calendar-day
                slot="2023-01-06"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-13">
              <sbb-calendar-day
                slot="2023-01-13"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-20">
              <sbb-calendar-day
                slot="2023-01-20"
                tabindex="0"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-27">
              <sbb-calendar-day
                slot="2023-01-27"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Saturday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-07">
              <sbb-calendar-day
                slot="2023-01-07"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-14">
              <sbb-calendar-day
                slot="2023-01-14"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-21">
              <sbb-calendar-day
                slot="2023-01-21"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-28">
              <sbb-calendar-day
                slot="2023-01-28"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Sunday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-01">
              <sbb-calendar-day
                slot="2023-01-01"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-08">
              <sbb-calendar-day
                slot="2023-01-08"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-15">
              <sbb-calendar-day
                slot="2023-01-15"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-22">
              <sbb-calendar-day
                slot="2023-01-22"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-29">
              <sbb-calendar-day
                slot="2023-01-29"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`;
/* end snapshot sbb-calendar default renders vertical Shadow DOM */

snapshots["sbb-calendar default renders in year view DOM"] = 
`<sbb-calendar
  orientation="horizontal"
  value="2023-01-20T00:00:00"
  view="year"
>
</sbb-calendar>
`;
/* end snapshot sbb-calendar default renders in year view DOM */

snapshots["sbb-calendar default renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "generic",
      "name": "",
      "invalid": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-calendar default renders A11y tree Chrome */

snapshots["sbb-calendar default renders in year view Shadow DOM"] = 
`<div class="sbb-calendar__wrapper">
  <div class="sbb-calendar__day-view sbb-calendar__table-wrapper">
    <div class="sbb-calendar__table-header">
      <span>
        January 2023
      </span>
      <sbb-secondary-button
        aria-label="Change to the previous month"
        class="sbb-calendar__control"
        icon-name="chevron-small-left-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Change to the next month"
        class="sbb-calendar__control"
        icon-name="chevron-small-right-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__control"
        icon-name="chevron-small-up-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
    </div>
    <table class="sbb-calendar__table">
      <thead>
        <tr>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Monday
            </span>
            <span aria-hidden="true">
              M
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Tuesday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Wednesday
            </span>
            <span aria-hidden="true">
              W
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Thursday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Friday
            </span>
            <span aria-hidden="true">
              F
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Saturday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Sunday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-01">
              <sbb-calendar-day
                slot="2023-01-01"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-02">
              <sbb-calendar-day
                slot="2023-01-02"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-03">
              <sbb-calendar-day
                slot="2023-01-03"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-04">
              <sbb-calendar-day
                slot="2023-01-04"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-05">
              <sbb-calendar-day
                slot="2023-01-05"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-06">
              <sbb-calendar-day
                slot="2023-01-06"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-07">
              <sbb-calendar-day
                slot="2023-01-07"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-08">
              <sbb-calendar-day
                slot="2023-01-08"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-09">
              <sbb-calendar-day
                slot="2023-01-09"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-10">
              <sbb-calendar-day
                slot="2023-01-10"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-11">
              <sbb-calendar-day
                slot="2023-01-11"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-12">
              <sbb-calendar-day
                slot="2023-01-12"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-13">
              <sbb-calendar-day
                slot="2023-01-13"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-14">
              <sbb-calendar-day
                slot="2023-01-14"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-15">
              <sbb-calendar-day
                slot="2023-01-15"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-16">
              <sbb-calendar-day
                slot="2023-01-16"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-17">
              <sbb-calendar-day
                slot="2023-01-17"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-18">
              <sbb-calendar-day
                slot="2023-01-18"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-19">
              <sbb-calendar-day
                slot="2023-01-19"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-20">
              <sbb-calendar-day
                slot="2023-01-20"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-21">
              <sbb-calendar-day
                slot="2023-01-21"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-22">
              <sbb-calendar-day
                slot="2023-01-22"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-23">
              <sbb-calendar-day
                slot="2023-01-23"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-24">
              <sbb-calendar-day
                slot="2023-01-24"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-25">
              <sbb-calendar-day
                slot="2023-01-25"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-26">
              <sbb-calendar-day
                slot="2023-01-26"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-27">
              <sbb-calendar-day
                slot="2023-01-27"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-28">
              <sbb-calendar-day
                slot="2023-01-28"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-29">
              <sbb-calendar-day
                slot="2023-01-29"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-30">
              <sbb-calendar-day
                slot="2023-01-30"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-31">
              <sbb-calendar-day
                slot="2023-01-31"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="sbb-calendar__table-wrapper sbb-calendar__year-view">
    <div class="sbb-calendar__table-header">
      <span>
        2016 - 2039
      </span>
      <sbb-secondary-button
        aria-label="Change to the previous 24 years"
        class="sbb-calendar__control"
        icon-name="chevron-small-left-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Change to the next 24 years"
        class="sbb-calendar__control"
        icon-name="chevron-small-right-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Choose date 2016 - 2039"
        class="sbb-calendar__control"
        icon-name="chevron-small-down-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <span
        class="sbb-screen-reader-only"
        role="status"
      >
        2016 - 2039
      </span>
    </div>
    <table class="sbb-calendar__table">
      <tbody>
        <tr>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="0">
            </sbb-calendar-year>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`;
/* end snapshot sbb-calendar default renders in year view Shadow DOM */

snapshots["sbb-calendar default renders in month view DOM"] = 
`<sbb-calendar
  orientation="horizontal"
  value="2023-01-20T00:00:00"
  view="month"
>
</sbb-calendar>
`;
/* end snapshot sbb-calendar default renders in month view DOM */

snapshots["sbb-calendar default renders in month view Shadow DOM"] = 
`<div class="sbb-calendar__wrapper">
  <div class="sbb-calendar__day-view sbb-calendar__table-wrapper">
    <div class="sbb-calendar__table-header">
      <span>
        January 2023
      </span>
      <sbb-secondary-button
        aria-label="Change to the previous month"
        class="sbb-calendar__control"
        icon-name="chevron-small-left-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Change to the next month"
        class="sbb-calendar__control"
        icon-name="chevron-small-right-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__control"
        icon-name="chevron-small-up-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
    </div>
    <table class="sbb-calendar__table">
      <thead>
        <tr>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Monday
            </span>
            <span aria-hidden="true">
              M
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Tuesday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Wednesday
            </span>
            <span aria-hidden="true">
              W
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Thursday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Friday
            </span>
            <span aria-hidden="true">
              F
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Saturday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Sunday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-01">
              <sbb-calendar-day
                slot="2023-01-01"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-02">
              <sbb-calendar-day
                slot="2023-01-02"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-03">
              <sbb-calendar-day
                slot="2023-01-03"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-04">
              <sbb-calendar-day
                slot="2023-01-04"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-05">
              <sbb-calendar-day
                slot="2023-01-05"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-06">
              <sbb-calendar-day
                slot="2023-01-06"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-07">
              <sbb-calendar-day
                slot="2023-01-07"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-08">
              <sbb-calendar-day
                slot="2023-01-08"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-09">
              <sbb-calendar-day
                slot="2023-01-09"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-10">
              <sbb-calendar-day
                slot="2023-01-10"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-11">
              <sbb-calendar-day
                slot="2023-01-11"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-12">
              <sbb-calendar-day
                slot="2023-01-12"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-13">
              <sbb-calendar-day
                slot="2023-01-13"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-14">
              <sbb-calendar-day
                slot="2023-01-14"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-15">
              <sbb-calendar-day
                slot="2023-01-15"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-16">
              <sbb-calendar-day
                slot="2023-01-16"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-17">
              <sbb-calendar-day
                slot="2023-01-17"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-18">
              <sbb-calendar-day
                slot="2023-01-18"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-19">
              <sbb-calendar-day
                slot="2023-01-19"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-20">
              <sbb-calendar-day
                slot="2023-01-20"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-21">
              <sbb-calendar-day
                slot="2023-01-21"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-22">
              <sbb-calendar-day
                slot="2023-01-22"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-23">
              <sbb-calendar-day
                slot="2023-01-23"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-24">
              <sbb-calendar-day
                slot="2023-01-24"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-25">
              <sbb-calendar-day
                slot="2023-01-25"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-26">
              <sbb-calendar-day
                slot="2023-01-26"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-27">
              <sbb-calendar-day
                slot="2023-01-27"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-28">
              <sbb-calendar-day
                slot="2023-01-28"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-29">
              <sbb-calendar-day
                slot="2023-01-29"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-30">
              <sbb-calendar-day
                slot="2023-01-30"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-31">
              <sbb-calendar-day
                slot="2023-01-31"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="sbb-calendar__month-view sbb-calendar__table-wrapper">
    <div class="sbb-calendar__table-header">
      <span>
        2023
      </span>
      <sbb-secondary-button
        aria-label="Change to the previous year"
        class="sbb-calendar__control"
        icon-name="chevron-small-left-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Change to the next year"
        class="sbb-calendar__control"
        icon-name="chevron-small-right-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Choose date 2023"
        class="sbb-calendar__control"
        icon-name="chevron-small-down-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <span
        class="sbb-screen-reader-only"
        role="status"
      >
        2023
      </span>
    </div>
    <table class="sbb-calendar__table">
      <tbody>
        <tr>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="0">
            </sbb-calendar-month>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="-1">
            </sbb-calendar-month>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="-1">
            </sbb-calendar-month>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="-1">
            </sbb-calendar-month>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="-1">
            </sbb-calendar-month>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="-1">
            </sbb-calendar-month>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="-1">
            </sbb-calendar-month>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="-1">
            </sbb-calendar-month>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="-1">
            </sbb-calendar-month>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="-1">
            </sbb-calendar-month>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="-1">
            </sbb-calendar-month>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="-1">
            </sbb-calendar-month>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`;
/* end snapshot sbb-calendar default renders in month view Shadow DOM */

snapshots["sbb-calendar default renders multiple DOM"] = 
`<sbb-calendar
  multiple=""
  orientation="horizontal"
  value="2023-01-20T00:00:00"
>
</sbb-calendar>
`;
/* end snapshot sbb-calendar default renders multiple DOM */

snapshots["sbb-calendar default renders multiple Shadow DOM"] = 
`<div class="sbb-calendar__wrapper">
  <div class="sbb-calendar__day-view sbb-calendar__table-wrapper">
    <div class="sbb-calendar__table-header">
      <span>
        January 2023
      </span>
      <sbb-secondary-button
        aria-label="Change to the previous month"
        class="sbb-calendar__control"
        icon-name="chevron-small-left-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Change to the next month"
        class="sbb-calendar__control"
        icon-name="chevron-small-right-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__control"
        icon-name="chevron-small-up-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
    </div>
    <table class="sbb-calendar__table">
      <thead>
        <tr>
          <th class="sbb-calendar__table-header-cell">
            <sbb-calendar-weekday tabindex="0">
            </sbb-calendar-weekday>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <sbb-calendar-weekday tabindex="0">
            </sbb-calendar-weekday>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <sbb-calendar-weekday tabindex="0">
            </sbb-calendar-weekday>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <sbb-calendar-weekday tabindex="0">
            </sbb-calendar-weekday>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <sbb-calendar-weekday tabindex="0">
            </sbb-calendar-weekday>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <sbb-calendar-weekday tabindex="0">
            </sbb-calendar-weekday>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <sbb-calendar-weekday tabindex="0">
            </sbb-calendar-weekday>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-01">
              <sbb-calendar-day
                slot="2023-01-01"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-02">
              <sbb-calendar-day
                slot="2023-01-02"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-03">
              <sbb-calendar-day
                slot="2023-01-03"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-04">
              <sbb-calendar-day
                slot="2023-01-04"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-05">
              <sbb-calendar-day
                slot="2023-01-05"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-06">
              <sbb-calendar-day
                slot="2023-01-06"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-07">
              <sbb-calendar-day
                slot="2023-01-07"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-08">
              <sbb-calendar-day
                slot="2023-01-08"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-09">
              <sbb-calendar-day
                slot="2023-01-09"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-10">
              <sbb-calendar-day
                slot="2023-01-10"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-11">
              <sbb-calendar-day
                slot="2023-01-11"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-12">
              <sbb-calendar-day
                slot="2023-01-12"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-13">
              <sbb-calendar-day
                slot="2023-01-13"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-14">
              <sbb-calendar-day
                slot="2023-01-14"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-15">
              <sbb-calendar-day
                slot="2023-01-15"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-16">
              <sbb-calendar-day
                slot="2023-01-16"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-17">
              <sbb-calendar-day
                slot="2023-01-17"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-18">
              <sbb-calendar-day
                slot="2023-01-18"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-19">
              <sbb-calendar-day
                slot="2023-01-19"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-20">
              <sbb-calendar-day
                slot="2023-01-20"
                tabindex="0"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-21">
              <sbb-calendar-day
                slot="2023-01-21"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-22">
              <sbb-calendar-day
                slot="2023-01-22"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-23">
              <sbb-calendar-day
                slot="2023-01-23"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-24">
              <sbb-calendar-day
                slot="2023-01-24"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-25">
              <sbb-calendar-day
                slot="2023-01-25"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-26">
              <sbb-calendar-day
                slot="2023-01-26"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-27">
              <sbb-calendar-day
                slot="2023-01-27"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-28">
              <sbb-calendar-day
                slot="2023-01-28"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-29">
              <sbb-calendar-day
                slot="2023-01-29"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-30">
              <sbb-calendar-day
                slot="2023-01-30"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-31">
              <sbb-calendar-day
                slot="2023-01-31"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`;
/* end snapshot sbb-calendar default renders multiple Shadow DOM */

snapshots["sbb-calendar default renders horizontal wide with week numbers DOM"] = 
`<sbb-calendar
  amount="2"
  orientation="horizontal"
  value="2023-01-20T00:00:00"
  week-numbers=""
>
</sbb-calendar>
`;
/* end snapshot sbb-calendar default renders horizontal wide with week numbers DOM */

snapshots["sbb-calendar default renders horizontal wide with week numbers Shadow DOM"] = 
`<div class="sbb-calendar__wrapper">
  <div class="sbb-calendar__day-view sbb-calendar__table-wrapper">
    <div class="sbb-calendar__table-header">
      <span>
        January 2023
      </span>
      <sbb-secondary-button
        aria-label="Change to the previous month"
        class="sbb-calendar__control"
        icon-name="chevron-small-left-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Change to the next month"
        class="sbb-calendar__control"
        icon-name="chevron-small-right-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__control"
        icon-name="chevron-small-up-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
    </div>
    <table class="sbb-calendar__table">
      <thead>
        <tr>
          <th class="sbb-calendar__table-header-cell">
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Monday
            </span>
            <span aria-hidden="true">
              M
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Tuesday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Wednesday
            </span>
            <span aria-hidden="true">
              W
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Thursday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Friday
            </span>
            <span aria-hidden="true">
              F
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Saturday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Sunday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Week 52
            </span>
            <span aria-hidden="true">
              52
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-01">
              <sbb-calendar-day
                slot="2023-01-01"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Week 1
            </span>
            <span aria-hidden="true">
              1
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-02">
              <sbb-calendar-day
                slot="2023-01-02"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-03">
              <sbb-calendar-day
                slot="2023-01-03"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-04">
              <sbb-calendar-day
                slot="2023-01-04"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-05">
              <sbb-calendar-day
                slot="2023-01-05"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-06">
              <sbb-calendar-day
                slot="2023-01-06"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-07">
              <sbb-calendar-day
                slot="2023-01-07"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-08">
              <sbb-calendar-day
                slot="2023-01-08"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Week 2
            </span>
            <span aria-hidden="true">
              2
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-09">
              <sbb-calendar-day
                slot="2023-01-09"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-10">
              <sbb-calendar-day
                slot="2023-01-10"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-11">
              <sbb-calendar-day
                slot="2023-01-11"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-12">
              <sbb-calendar-day
                slot="2023-01-12"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-13">
              <sbb-calendar-day
                slot="2023-01-13"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-14">
              <sbb-calendar-day
                slot="2023-01-14"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-15">
              <sbb-calendar-day
                slot="2023-01-15"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Week 3
            </span>
            <span aria-hidden="true">
              3
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-16">
              <sbb-calendar-day
                slot="2023-01-16"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-17">
              <sbb-calendar-day
                slot="2023-01-17"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-18">
              <sbb-calendar-day
                slot="2023-01-18"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-19">
              <sbb-calendar-day
                slot="2023-01-19"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-20">
              <sbb-calendar-day
                slot="2023-01-20"
                tabindex="0"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-21">
              <sbb-calendar-day
                slot="2023-01-21"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-22">
              <sbb-calendar-day
                slot="2023-01-22"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Week 4
            </span>
            <span aria-hidden="true">
              4
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-23">
              <sbb-calendar-day
                slot="2023-01-23"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-24">
              <sbb-calendar-day
                slot="2023-01-24"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-25">
              <sbb-calendar-day
                slot="2023-01-25"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-26">
              <sbb-calendar-day
                slot="2023-01-26"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-27">
              <sbb-calendar-day
                slot="2023-01-27"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-28">
              <sbb-calendar-day
                slot="2023-01-28"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-29">
              <sbb-calendar-day
                slot="2023-01-29"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Week 5
            </span>
            <span aria-hidden="true">
              5
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-30">
              <sbb-calendar-day
                slot="2023-01-30"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-31">
              <sbb-calendar-day
                slot="2023-01-31"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="sbb-calendar__day-view sbb-calendar__table-wrapper">
    <div class="sbb-calendar__table-header">
      <span>
        February 2023
      </span>
    </div>
    <table class="sbb-calendar__table">
      <thead>
        <tr>
          <th class="sbb-calendar__table-header-cell">
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Monday
            </span>
            <span aria-hidden="true">
              M
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Tuesday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Wednesday
            </span>
            <span aria-hidden="true">
              W
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Thursday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Friday
            </span>
            <span aria-hidden="true">
              F
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Saturday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Sunday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Week 5
            </span>
            <span aria-hidden="true">
              5
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-01">
              <sbb-calendar-day
                slot="2023-02-01"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-02">
              <sbb-calendar-day
                slot="2023-02-02"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-03">
              <sbb-calendar-day
                slot="2023-02-03"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-04">
              <sbb-calendar-day
                slot="2023-02-04"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-05">
              <sbb-calendar-day
                slot="2023-02-05"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Week 6
            </span>
            <span aria-hidden="true">
              6
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-06">
              <sbb-calendar-day
                slot="2023-02-06"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-07">
              <sbb-calendar-day
                slot="2023-02-07"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-08">
              <sbb-calendar-day
                slot="2023-02-08"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-09">
              <sbb-calendar-day
                slot="2023-02-09"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-10">
              <sbb-calendar-day
                slot="2023-02-10"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-11">
              <sbb-calendar-day
                slot="2023-02-11"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-12">
              <sbb-calendar-day
                slot="2023-02-12"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Week 7
            </span>
            <span aria-hidden="true">
              7
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-13">
              <sbb-calendar-day
                slot="2023-02-13"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-14">
              <sbb-calendar-day
                slot="2023-02-14"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-15">
              <sbb-calendar-day
                slot="2023-02-15"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-16">
              <sbb-calendar-day
                slot="2023-02-16"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-17">
              <sbb-calendar-day
                slot="2023-02-17"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-18">
              <sbb-calendar-day
                slot="2023-02-18"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-19">
              <sbb-calendar-day
                slot="2023-02-19"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Week 8
            </span>
            <span aria-hidden="true">
              8
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-20">
              <sbb-calendar-day
                slot="2023-02-20"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-21">
              <sbb-calendar-day
                slot="2023-02-21"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-22">
              <sbb-calendar-day
                slot="2023-02-22"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-23">
              <sbb-calendar-day
                slot="2023-02-23"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-24">
              <sbb-calendar-day
                slot="2023-02-24"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-25">
              <sbb-calendar-day
                slot="2023-02-25"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-26">
              <sbb-calendar-day
                slot="2023-02-26"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Week 9
            </span>
            <span aria-hidden="true">
              9
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-27">
              <sbb-calendar-day
                slot="2023-02-27"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-28">
              <sbb-calendar-day
                slot="2023-02-28"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`;
/* end snapshot sbb-calendar default renders horizontal wide with week numbers Shadow DOM */

snapshots["sbb-calendar default renders vertical wide with week numbers DOM"] = 
`<sbb-calendar
  amount="2"
  orientation="vertical"
  value="2023-01-20T00:00:00"
  week-numbers=""
>
</sbb-calendar>
`;
/* end snapshot sbb-calendar default renders vertical wide with week numbers DOM */

snapshots["sbb-calendar default renders vertical wide with week numbers Shadow DOM"] = 
`<div class="sbb-calendar__wrapper">
  <div class="sbb-calendar__day-view sbb-calendar__table-wrapper">
    <div class="sbb-calendar__table-header">
      <span>
        January 2023
      </span>
      <sbb-secondary-button
        aria-label="Change to the previous month"
        class="sbb-calendar__control"
        icon-name="chevron-small-left-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Change to the next month"
        class="sbb-calendar__control"
        icon-name="chevron-small-right-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__control"
        icon-name="chevron-small-up-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
    </div>
    <table class="sbb-calendar__table">
      <thead>
        <tr>
          <th class="sbb-calendar__table-data">
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Week 52
            </span>
            <span aria-hidden="true">
              52
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Week 1
            </span>
            <span aria-hidden="true">
              1
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Week 2
            </span>
            <span aria-hidden="true">
              2
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Week 3
            </span>
            <span aria-hidden="true">
              3
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Week 4
            </span>
            <span aria-hidden="true">
              4
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Week 5
            </span>
            <span aria-hidden="true">
              5
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Monday
            </span>
            <span aria-hidden="true">
              M
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-02">
              <sbb-calendar-day
                slot="2023-01-02"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-09">
              <sbb-calendar-day
                slot="2023-01-09"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-16">
              <sbb-calendar-day
                slot="2023-01-16"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-23">
              <sbb-calendar-day
                slot="2023-01-23"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-30">
              <sbb-calendar-day
                slot="2023-01-30"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Tuesday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-03">
              <sbb-calendar-day
                slot="2023-01-03"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-10">
              <sbb-calendar-day
                slot="2023-01-10"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-17">
              <sbb-calendar-day
                slot="2023-01-17"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-24">
              <sbb-calendar-day
                slot="2023-01-24"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-31">
              <sbb-calendar-day
                slot="2023-01-31"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Wednesday
            </span>
            <span aria-hidden="true">
              W
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-04">
              <sbb-calendar-day
                slot="2023-01-04"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-11">
              <sbb-calendar-day
                slot="2023-01-11"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-18">
              <sbb-calendar-day
                slot="2023-01-18"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-25">
              <sbb-calendar-day
                slot="2023-01-25"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Thursday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-05">
              <sbb-calendar-day
                slot="2023-01-05"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-12">
              <sbb-calendar-day
                slot="2023-01-12"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-19">
              <sbb-calendar-day
                slot="2023-01-19"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-26">
              <sbb-calendar-day
                slot="2023-01-26"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Friday
            </span>
            <span aria-hidden="true">
              F
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-06">
              <sbb-calendar-day
                slot="2023-01-06"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-13">
              <sbb-calendar-day
                slot="2023-01-13"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-20">
              <sbb-calendar-day
                slot="2023-01-20"
                tabindex="0"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-27">
              <sbb-calendar-day
                slot="2023-01-27"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Saturday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-07">
              <sbb-calendar-day
                slot="2023-01-07"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-14">
              <sbb-calendar-day
                slot="2023-01-14"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-21">
              <sbb-calendar-day
                slot="2023-01-21"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-28">
              <sbb-calendar-day
                slot="2023-01-28"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Sunday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-01">
              <sbb-calendar-day
                slot="2023-01-01"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-08">
              <sbb-calendar-day
                slot="2023-01-08"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-15">
              <sbb-calendar-day
                slot="2023-01-15"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-22">
              <sbb-calendar-day
                slot="2023-01-22"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-29">
              <sbb-calendar-day
                slot="2023-01-29"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="sbb-calendar__day-view sbb-calendar__table-wrapper">
    <div class="sbb-calendar__table-header">
      <span>
        February 2023
      </span>
    </div>
    <table class="sbb-calendar__table">
      <thead>
        <tr>
          <th class="sbb-calendar__table-data">
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Week 5
            </span>
            <span aria-hidden="true">
              5
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Week 6
            </span>
            <span aria-hidden="true">
              6
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Week 7
            </span>
            <span aria-hidden="true">
              7
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Week 8
            </span>
            <span aria-hidden="true">
              8
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Week 9
            </span>
            <span aria-hidden="true">
              9
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Monday
            </span>
            <span aria-hidden="true">
              M
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-06">
              <sbb-calendar-day
                slot="2023-02-06"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-13">
              <sbb-calendar-day
                slot="2023-02-13"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-20">
              <sbb-calendar-day
                slot="2023-02-20"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-27">
              <sbb-calendar-day
                slot="2023-02-27"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Tuesday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-07">
              <sbb-calendar-day
                slot="2023-02-07"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-14">
              <sbb-calendar-day
                slot="2023-02-14"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-21">
              <sbb-calendar-day
                slot="2023-02-21"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-28">
              <sbb-calendar-day
                slot="2023-02-28"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Wednesday
            </span>
            <span aria-hidden="true">
              W
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-01">
              <sbb-calendar-day
                slot="2023-02-01"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-08">
              <sbb-calendar-day
                slot="2023-02-08"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-15">
              <sbb-calendar-day
                slot="2023-02-15"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-22">
              <sbb-calendar-day
                slot="2023-02-22"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Thursday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-02">
              <sbb-calendar-day
                slot="2023-02-02"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-09">
              <sbb-calendar-day
                slot="2023-02-09"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-16">
              <sbb-calendar-day
                slot="2023-02-16"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-23">
              <sbb-calendar-day
                slot="2023-02-23"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Friday
            </span>
            <span aria-hidden="true">
              F
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-03">
              <sbb-calendar-day
                slot="2023-02-03"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-10">
              <sbb-calendar-day
                slot="2023-02-10"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-17">
              <sbb-calendar-day
                slot="2023-02-17"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-24">
              <sbb-calendar-day
                slot="2023-02-24"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Saturday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-04">
              <sbb-calendar-day
                slot="2023-02-04"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-11">
              <sbb-calendar-day
                slot="2023-02-11"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-18">
              <sbb-calendar-day
                slot="2023-02-18"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-25">
              <sbb-calendar-day
                slot="2023-02-25"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Sunday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-05">
              <sbb-calendar-day
                slot="2023-02-05"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-12">
              <sbb-calendar-day
                slot="2023-02-12"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-19">
              <sbb-calendar-day
                slot="2023-02-19"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-26">
              <sbb-calendar-day
                slot="2023-02-26"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`;
/* end snapshot sbb-calendar default renders vertical wide with week numbers Shadow DOM */

snapshots["sbb-calendar enhanced renders DOM"] = 
`<sbb-calendar
  orientation="horizontal"
  value="2023-01-20T00:00:00"
>
  <sbb-calendar-day
    slot="2023-01-01"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-02"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-03"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-04"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-05"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-06"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-07"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-08"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-09"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-10"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-11"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-12"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-13"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-14"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-15"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-16"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-17"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-18"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-19"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-20"
    tabindex="0"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-21"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-22"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-23"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-24"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-25"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-26"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-27"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-28"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-29"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-30"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-31"
    tabindex="-1"
  >
  </sbb-calendar-day>
</sbb-calendar>
`;
/* end snapshot sbb-calendar enhanced renders DOM */

snapshots["sbb-calendar enhanced renders Shadow DOM"] = 
`<div class="sbb-calendar__wrapper">
  <div class="sbb-calendar__day-view sbb-calendar__table-wrapper">
    <div class="sbb-calendar__table-header">
      <span>
        January 2023
      </span>
      <sbb-secondary-button
        aria-label="Change to the previous month"
        class="sbb-calendar__control"
        icon-name="chevron-small-left-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Change to the next month"
        class="sbb-calendar__control"
        icon-name="chevron-small-right-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__control"
        icon-name="chevron-small-up-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
    </div>
    <table class="sbb-calendar__table">
      <thead>
        <tr>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Monday
            </span>
            <span aria-hidden="true">
              M
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Tuesday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Wednesday
            </span>
            <span aria-hidden="true">
              W
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Thursday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Friday
            </span>
            <span aria-hidden="true">
              F
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Saturday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Sunday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-01">
              <sbb-calendar-day
                slot="2023-01-01"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-02">
              <sbb-calendar-day
                slot="2023-01-02"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-03">
              <sbb-calendar-day
                slot="2023-01-03"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-04">
              <sbb-calendar-day
                slot="2023-01-04"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-05">
              <sbb-calendar-day
                slot="2023-01-05"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-06">
              <sbb-calendar-day
                slot="2023-01-06"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-07">
              <sbb-calendar-day
                slot="2023-01-07"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-08">
              <sbb-calendar-day
                slot="2023-01-08"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-09">
              <sbb-calendar-day
                slot="2023-01-09"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-10">
              <sbb-calendar-day
                slot="2023-01-10"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-11">
              <sbb-calendar-day
                slot="2023-01-11"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-12">
              <sbb-calendar-day
                slot="2023-01-12"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-13">
              <sbb-calendar-day
                slot="2023-01-13"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-14">
              <sbb-calendar-day
                slot="2023-01-14"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-15">
              <sbb-calendar-day
                slot="2023-01-15"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-16">
              <sbb-calendar-day
                slot="2023-01-16"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-17">
              <sbb-calendar-day
                slot="2023-01-17"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-18">
              <sbb-calendar-day
                slot="2023-01-18"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-19">
              <sbb-calendar-day
                slot="2023-01-19"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-20">
              <sbb-calendar-day
                slot="2023-01-20"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-21">
              <sbb-calendar-day
                slot="2023-01-21"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-22">
              <sbb-calendar-day
                slot="2023-01-22"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-23">
              <sbb-calendar-day
                slot="2023-01-23"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-24">
              <sbb-calendar-day
                slot="2023-01-24"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-25">
              <sbb-calendar-day
                slot="2023-01-25"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-26">
              <sbb-calendar-day
                slot="2023-01-26"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-27">
              <sbb-calendar-day
                slot="2023-01-27"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-28">
              <sbb-calendar-day
                slot="2023-01-28"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-29">
              <sbb-calendar-day
                slot="2023-01-29"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-30">
              <sbb-calendar-day
                slot="2023-01-30"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-31">
              <sbb-calendar-day
                slot="2023-01-31"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`;
/* end snapshot sbb-calendar enhanced renders Shadow DOM */

snapshots["sbb-calendar enhanced renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "generic",
      "name": "",
      "invalid": false
    }
  ]
}
</p>
`;
/* end snapshot sbb-calendar enhanced renders A11y tree Chrome */

snapshots["sbb-calendar enhanced renders vertical DOM"] = 
`<sbb-calendar
  orientation="vertical"
  value="2023-01-20T00:00:00"
>
  <sbb-calendar-day
    slot="2023-01-01"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-02"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-03"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-04"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-05"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-06"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-07"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-08"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-09"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-10"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-11"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-12"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-13"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-14"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-15"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-16"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-17"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-18"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-19"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-20"
    tabindex="0"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-21"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-22"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-23"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-24"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-25"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-26"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-27"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-28"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-29"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-30"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-31"
    tabindex="-1"
  >
  </sbb-calendar-day>
</sbb-calendar>
`;
/* end snapshot sbb-calendar enhanced renders vertical DOM */

snapshots["sbb-calendar enhanced renders vertical Shadow DOM"] = 
`<div class="sbb-calendar__wrapper">
  <div class="sbb-calendar__day-view sbb-calendar__table-wrapper">
    <div class="sbb-calendar__table-header">
      <span>
        January 2023
      </span>
      <sbb-secondary-button
        aria-label="Change to the previous month"
        class="sbb-calendar__control"
        icon-name="chevron-small-left-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Change to the next month"
        class="sbb-calendar__control"
        icon-name="chevron-small-right-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__control"
        icon-name="chevron-small-up-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
    </div>
    <table class="sbb-calendar__table">
      <tbody>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Monday
            </span>
            <span aria-hidden="true">
              M
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-02">
              <sbb-calendar-day
                slot="2023-01-02"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-09">
              <sbb-calendar-day
                slot="2023-01-09"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-16">
              <sbb-calendar-day
                slot="2023-01-16"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-23">
              <sbb-calendar-day
                slot="2023-01-23"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-30">
              <sbb-calendar-day
                slot="2023-01-30"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Tuesday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-03">
              <sbb-calendar-day
                slot="2023-01-03"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-10">
              <sbb-calendar-day
                slot="2023-01-10"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-17">
              <sbb-calendar-day
                slot="2023-01-17"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-24">
              <sbb-calendar-day
                slot="2023-01-24"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-31">
              <sbb-calendar-day
                slot="2023-01-31"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Wednesday
            </span>
            <span aria-hidden="true">
              W
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-04">
              <sbb-calendar-day
                slot="2023-01-04"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-11">
              <sbb-calendar-day
                slot="2023-01-11"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-18">
              <sbb-calendar-day
                slot="2023-01-18"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-25">
              <sbb-calendar-day
                slot="2023-01-25"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Thursday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-05">
              <sbb-calendar-day
                slot="2023-01-05"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-12">
              <sbb-calendar-day
                slot="2023-01-12"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-19">
              <sbb-calendar-day
                slot="2023-01-19"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-26">
              <sbb-calendar-day
                slot="2023-01-26"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Friday
            </span>
            <span aria-hidden="true">
              F
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-06">
              <sbb-calendar-day
                slot="2023-01-06"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-13">
              <sbb-calendar-day
                slot="2023-01-13"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-20">
              <sbb-calendar-day
                slot="2023-01-20"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-27">
              <sbb-calendar-day
                slot="2023-01-27"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Saturday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-07">
              <sbb-calendar-day
                slot="2023-01-07"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-14">
              <sbb-calendar-day
                slot="2023-01-14"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-21">
              <sbb-calendar-day
                slot="2023-01-21"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-28">
              <sbb-calendar-day
                slot="2023-01-28"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Sunday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-01">
              <sbb-calendar-day
                slot="2023-01-01"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-08">
              <sbb-calendar-day
                slot="2023-01-08"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-15">
              <sbb-calendar-day
                slot="2023-01-15"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-22">
              <sbb-calendar-day
                slot="2023-01-22"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-29">
              <sbb-calendar-day
                slot="2023-01-29"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`;
/* end snapshot sbb-calendar enhanced renders vertical Shadow DOM */

snapshots["sbb-calendar enhanced renders in year view DOM"] = 
`<sbb-calendar
  orientation="horizontal"
  value="2023-01-20T00:00:00"
  view="year"
>
  <sbb-calendar-day
    slot="2023-01-01"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-02"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-03"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-04"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-05"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-06"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-07"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-08"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-09"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-10"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-11"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-12"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-13"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-14"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-15"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-16"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-17"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-18"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-19"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-20"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-21"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-22"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-23"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-24"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-25"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-26"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-27"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-28"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-29"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-30"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-31"
    tabindex="-1"
  >
  </sbb-calendar-day>
</sbb-calendar>
`;
/* end snapshot sbb-calendar enhanced renders in year view DOM */

snapshots["sbb-calendar enhanced renders in year view Shadow DOM"] = 
`<div class="sbb-calendar__wrapper">
  <div class="sbb-calendar__day-view sbb-calendar__table-wrapper">
    <div class="sbb-calendar__table-header">
      <span>
        January 2023
      </span>
      <sbb-secondary-button
        aria-label="Change to the previous month"
        class="sbb-calendar__control"
        icon-name="chevron-small-left-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Change to the next month"
        class="sbb-calendar__control"
        icon-name="chevron-small-right-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__control"
        icon-name="chevron-small-up-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
    </div>
    <table class="sbb-calendar__table">
      <thead>
        <tr>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Monday
            </span>
            <span aria-hidden="true">
              M
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Tuesday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Wednesday
            </span>
            <span aria-hidden="true">
              W
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Thursday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Friday
            </span>
            <span aria-hidden="true">
              F
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Saturday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Sunday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-01">
              <sbb-calendar-day
                slot="2023-01-01"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-02">
              <sbb-calendar-day
                slot="2023-01-02"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-03">
              <sbb-calendar-day
                slot="2023-01-03"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-04">
              <sbb-calendar-day
                slot="2023-01-04"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-05">
              <sbb-calendar-day
                slot="2023-01-05"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-06">
              <sbb-calendar-day
                slot="2023-01-06"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-07">
              <sbb-calendar-day
                slot="2023-01-07"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-08">
              <sbb-calendar-day
                slot="2023-01-08"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-09">
              <sbb-calendar-day
                slot="2023-01-09"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-10">
              <sbb-calendar-day
                slot="2023-01-10"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-11">
              <sbb-calendar-day
                slot="2023-01-11"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-12">
              <sbb-calendar-day
                slot="2023-01-12"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-13">
              <sbb-calendar-day
                slot="2023-01-13"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-14">
              <sbb-calendar-day
                slot="2023-01-14"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-15">
              <sbb-calendar-day
                slot="2023-01-15"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-16">
              <sbb-calendar-day
                slot="2023-01-16"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-17">
              <sbb-calendar-day
                slot="2023-01-17"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-18">
              <sbb-calendar-day
                slot="2023-01-18"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-19">
              <sbb-calendar-day
                slot="2023-01-19"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-20">
              <sbb-calendar-day
                slot="2023-01-20"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-21">
              <sbb-calendar-day
                slot="2023-01-21"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-22">
              <sbb-calendar-day
                slot="2023-01-22"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-23">
              <sbb-calendar-day
                slot="2023-01-23"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-24">
              <sbb-calendar-day
                slot="2023-01-24"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-25">
              <sbb-calendar-day
                slot="2023-01-25"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-26">
              <sbb-calendar-day
                slot="2023-01-26"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-27">
              <sbb-calendar-day
                slot="2023-01-27"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-28">
              <sbb-calendar-day
                slot="2023-01-28"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-29">
              <sbb-calendar-day
                slot="2023-01-29"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-30">
              <sbb-calendar-day
                slot="2023-01-30"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-31">
              <sbb-calendar-day
                slot="2023-01-31"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="sbb-calendar__table-wrapper sbb-calendar__year-view">
    <div class="sbb-calendar__table-header">
      <span>
        2016 - 2039
      </span>
      <sbb-secondary-button
        aria-label="Change to the previous 24 years"
        class="sbb-calendar__control"
        icon-name="chevron-small-left-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Change to the next 24 years"
        class="sbb-calendar__control"
        icon-name="chevron-small-right-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Choose date 2016 - 2039"
        class="sbb-calendar__control"
        icon-name="chevron-small-down-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <span
        class="sbb-screen-reader-only"
        role="status"
      >
        2016 - 2039
      </span>
    </div>
    <table class="sbb-calendar__table">
      <tbody>
        <tr>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="0">
            </sbb-calendar-year>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-year tabindex="-1">
            </sbb-calendar-year>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`;
/* end snapshot sbb-calendar enhanced renders in year view Shadow DOM */

snapshots["sbb-calendar enhanced renders in month view DOM"] = 
`<sbb-calendar
  orientation="horizontal"
  value="2023-01-20T00:00:00"
  view="month"
>
  <sbb-calendar-day
    slot="2023-01-01"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-02"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-03"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-04"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-05"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-06"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-07"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-08"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-09"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-10"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-11"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-12"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-13"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-14"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-15"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-16"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-17"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-18"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-19"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-20"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-21"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-22"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-23"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-24"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-25"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-26"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-27"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-28"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-29"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-30"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-31"
    tabindex="-1"
  >
  </sbb-calendar-day>
</sbb-calendar>
`;
/* end snapshot sbb-calendar enhanced renders in month view DOM */

snapshots["sbb-calendar enhanced renders in month view Shadow DOM"] = 
`<div class="sbb-calendar__wrapper">
  <div class="sbb-calendar__day-view sbb-calendar__table-wrapper">
    <div class="sbb-calendar__table-header">
      <span>
        January 2023
      </span>
      <sbb-secondary-button
        aria-label="Change to the previous month"
        class="sbb-calendar__control"
        icon-name="chevron-small-left-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Change to the next month"
        class="sbb-calendar__control"
        icon-name="chevron-small-right-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__control"
        icon-name="chevron-small-up-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
    </div>
    <table class="sbb-calendar__table">
      <thead>
        <tr>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Monday
            </span>
            <span aria-hidden="true">
              M
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Tuesday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Wednesday
            </span>
            <span aria-hidden="true">
              W
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Thursday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Friday
            </span>
            <span aria-hidden="true">
              F
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Saturday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Sunday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-01">
              <sbb-calendar-day
                slot="2023-01-01"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-02">
              <sbb-calendar-day
                slot="2023-01-02"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-03">
              <sbb-calendar-day
                slot="2023-01-03"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-04">
              <sbb-calendar-day
                slot="2023-01-04"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-05">
              <sbb-calendar-day
                slot="2023-01-05"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-06">
              <sbb-calendar-day
                slot="2023-01-06"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-07">
              <sbb-calendar-day
                slot="2023-01-07"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-08">
              <sbb-calendar-day
                slot="2023-01-08"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-09">
              <sbb-calendar-day
                slot="2023-01-09"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-10">
              <sbb-calendar-day
                slot="2023-01-10"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-11">
              <sbb-calendar-day
                slot="2023-01-11"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-12">
              <sbb-calendar-day
                slot="2023-01-12"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-13">
              <sbb-calendar-day
                slot="2023-01-13"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-14">
              <sbb-calendar-day
                slot="2023-01-14"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-15">
              <sbb-calendar-day
                slot="2023-01-15"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-16">
              <sbb-calendar-day
                slot="2023-01-16"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-17">
              <sbb-calendar-day
                slot="2023-01-17"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-18">
              <sbb-calendar-day
                slot="2023-01-18"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-19">
              <sbb-calendar-day
                slot="2023-01-19"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-20">
              <sbb-calendar-day
                slot="2023-01-20"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-21">
              <sbb-calendar-day
                slot="2023-01-21"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-22">
              <sbb-calendar-day
                slot="2023-01-22"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-23">
              <sbb-calendar-day
                slot="2023-01-23"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-24">
              <sbb-calendar-day
                slot="2023-01-24"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-25">
              <sbb-calendar-day
                slot="2023-01-25"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-26">
              <sbb-calendar-day
                slot="2023-01-26"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-27">
              <sbb-calendar-day
                slot="2023-01-27"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-28">
              <sbb-calendar-day
                slot="2023-01-28"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-29">
              <sbb-calendar-day
                slot="2023-01-29"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-30">
              <sbb-calendar-day
                slot="2023-01-30"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-31">
              <sbb-calendar-day
                slot="2023-01-31"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="sbb-calendar__month-view sbb-calendar__table-wrapper">
    <div class="sbb-calendar__table-header">
      <span>
        2023
      </span>
      <sbb-secondary-button
        aria-label="Change to the previous year"
        class="sbb-calendar__control"
        icon-name="chevron-small-left-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Change to the next year"
        class="sbb-calendar__control"
        icon-name="chevron-small-right-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Choose date 2023"
        class="sbb-calendar__control"
        icon-name="chevron-small-down-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <span
        class="sbb-screen-reader-only"
        role="status"
      >
        2023
      </span>
    </div>
    <table class="sbb-calendar__table">
      <tbody>
        <tr>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="0">
            </sbb-calendar-month>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="-1">
            </sbb-calendar-month>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="-1">
            </sbb-calendar-month>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="-1">
            </sbb-calendar-month>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="-1">
            </sbb-calendar-month>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="-1">
            </sbb-calendar-month>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="-1">
            </sbb-calendar-month>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="-1">
            </sbb-calendar-month>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="-1">
            </sbb-calendar-month>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="-1">
            </sbb-calendar-month>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="-1">
            </sbb-calendar-month>
          </td>
          <td class="sbb-calendar__table-data">
            <sbb-calendar-month tabindex="-1">
            </sbb-calendar-month>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`;
/* end snapshot sbb-calendar enhanced renders in month view Shadow DOM */

snapshots["sbb-calendar enhanced renders multiple DOM"] = 
`<sbb-calendar
  multiple=""
  orientation="horizontal"
  value="2023-01-20T00:00:00"
>
  <sbb-calendar-day
    slot="2023-01-01"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-02"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-03"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-04"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-05"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-06"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-07"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-08"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-09"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-10"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-11"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-12"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-13"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-14"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-15"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-16"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-17"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-18"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-19"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-20"
    tabindex="0"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-21"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-22"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-23"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-24"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-25"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-26"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-27"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-28"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-29"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-30"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-31"
    tabindex="-1"
  >
  </sbb-calendar-day>
</sbb-calendar>
`;
/* end snapshot sbb-calendar enhanced renders multiple DOM */

snapshots["sbb-calendar enhanced renders multiple Shadow DOM"] = 
`<div class="sbb-calendar__wrapper">
  <div class="sbb-calendar__day-view sbb-calendar__table-wrapper">
    <div class="sbb-calendar__table-header">
      <span>
        January 2023
      </span>
      <sbb-secondary-button
        aria-label="Change to the previous month"
        class="sbb-calendar__control"
        icon-name="chevron-small-left-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Change to the next month"
        class="sbb-calendar__control"
        icon-name="chevron-small-right-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__control"
        icon-name="chevron-small-up-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
    </div>
    <table class="sbb-calendar__table">
      <thead>
        <tr>
          <th class="sbb-calendar__table-header-cell">
            <sbb-calendar-weekday tabindex="0">
            </sbb-calendar-weekday>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <sbb-calendar-weekday tabindex="0">
            </sbb-calendar-weekday>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <sbb-calendar-weekday tabindex="0">
            </sbb-calendar-weekday>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <sbb-calendar-weekday tabindex="0">
            </sbb-calendar-weekday>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <sbb-calendar-weekday tabindex="0">
            </sbb-calendar-weekday>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <sbb-calendar-weekday tabindex="0">
            </sbb-calendar-weekday>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <sbb-calendar-weekday tabindex="0">
            </sbb-calendar-weekday>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-01">
              <sbb-calendar-day
                slot="2023-01-01"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-02">
              <sbb-calendar-day
                slot="2023-01-02"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-03">
              <sbb-calendar-day
                slot="2023-01-03"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-04">
              <sbb-calendar-day
                slot="2023-01-04"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-05">
              <sbb-calendar-day
                slot="2023-01-05"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-06">
              <sbb-calendar-day
                slot="2023-01-06"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-07">
              <sbb-calendar-day
                slot="2023-01-07"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-08">
              <sbb-calendar-day
                slot="2023-01-08"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-09">
              <sbb-calendar-day
                slot="2023-01-09"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-10">
              <sbb-calendar-day
                slot="2023-01-10"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-11">
              <sbb-calendar-day
                slot="2023-01-11"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-12">
              <sbb-calendar-day
                slot="2023-01-12"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-13">
              <sbb-calendar-day
                slot="2023-01-13"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-14">
              <sbb-calendar-day
                slot="2023-01-14"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-15">
              <sbb-calendar-day
                slot="2023-01-15"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-16">
              <sbb-calendar-day
                slot="2023-01-16"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-17">
              <sbb-calendar-day
                slot="2023-01-17"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-18">
              <sbb-calendar-day
                slot="2023-01-18"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-19">
              <sbb-calendar-day
                slot="2023-01-19"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-20">
              <sbb-calendar-day
                slot="2023-01-20"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-21">
              <sbb-calendar-day
                slot="2023-01-21"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-22">
              <sbb-calendar-day
                slot="2023-01-22"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-23">
              <sbb-calendar-day
                slot="2023-01-23"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-24">
              <sbb-calendar-day
                slot="2023-01-24"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-25">
              <sbb-calendar-day
                slot="2023-01-25"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-26">
              <sbb-calendar-day
                slot="2023-01-26"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-27">
              <sbb-calendar-day
                slot="2023-01-27"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-28">
              <sbb-calendar-day
                slot="2023-01-28"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-29">
              <sbb-calendar-day
                slot="2023-01-29"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-30">
              <sbb-calendar-day
                slot="2023-01-30"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-31">
              <sbb-calendar-day
                slot="2023-01-31"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`;
/* end snapshot sbb-calendar enhanced renders multiple Shadow DOM */

snapshots["sbb-calendar enhanced renders horizontal wide with week numbers DOM"] = 
`<sbb-calendar
  amount="2"
  orientation="horizontal"
  value="2023-01-20T00:00:00"
  week-numbers=""
>
  <sbb-calendar-day
    slot="2023-01-01"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-02"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-03"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-04"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-05"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-06"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-07"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-08"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-09"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-10"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-11"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-12"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-13"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-14"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-15"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-16"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-17"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-18"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-19"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-20"
    tabindex="0"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-21"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-22"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-23"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-24"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-25"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-26"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-27"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-28"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-29"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-30"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-31"
    tabindex="-1"
  >
  </sbb-calendar-day>
</sbb-calendar>
`;
/* end snapshot sbb-calendar enhanced renders horizontal wide with week numbers DOM */

snapshots["sbb-calendar enhanced renders horizontal wide with week numbers Shadow DOM"] = 
`<div class="sbb-calendar__wrapper">
  <div class="sbb-calendar__day-view sbb-calendar__table-wrapper">
    <div class="sbb-calendar__table-header">
      <span>
        January 2023
      </span>
      <sbb-secondary-button
        aria-label="Change to the previous month"
        class="sbb-calendar__control"
        icon-name="chevron-small-left-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Change to the next month"
        class="sbb-calendar__control"
        icon-name="chevron-small-right-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__control"
        icon-name="chevron-small-up-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
    </div>
    <table class="sbb-calendar__table">
      <thead>
        <tr>
          <th class="sbb-calendar__table-header-cell">
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Monday
            </span>
            <span aria-hidden="true">
              M
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Tuesday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Wednesday
            </span>
            <span aria-hidden="true">
              W
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Thursday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Friday
            </span>
            <span aria-hidden="true">
              F
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Saturday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Sunday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Week 52
            </span>
            <span aria-hidden="true">
              52
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-01">
              <sbb-calendar-day
                slot="2023-01-01"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Week 1
            </span>
            <span aria-hidden="true">
              1
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-02">
              <sbb-calendar-day
                slot="2023-01-02"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-03">
              <sbb-calendar-day
                slot="2023-01-03"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-04">
              <sbb-calendar-day
                slot="2023-01-04"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-05">
              <sbb-calendar-day
                slot="2023-01-05"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-06">
              <sbb-calendar-day
                slot="2023-01-06"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-07">
              <sbb-calendar-day
                slot="2023-01-07"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-08">
              <sbb-calendar-day
                slot="2023-01-08"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Week 2
            </span>
            <span aria-hidden="true">
              2
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-09">
              <sbb-calendar-day
                slot="2023-01-09"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-10">
              <sbb-calendar-day
                slot="2023-01-10"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-11">
              <sbb-calendar-day
                slot="2023-01-11"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-12">
              <sbb-calendar-day
                slot="2023-01-12"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-13">
              <sbb-calendar-day
                slot="2023-01-13"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-14">
              <sbb-calendar-day
                slot="2023-01-14"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-15">
              <sbb-calendar-day
                slot="2023-01-15"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Week 3
            </span>
            <span aria-hidden="true">
              3
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-16">
              <sbb-calendar-day
                slot="2023-01-16"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-17">
              <sbb-calendar-day
                slot="2023-01-17"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-18">
              <sbb-calendar-day
                slot="2023-01-18"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-19">
              <sbb-calendar-day
                slot="2023-01-19"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-20">
              <sbb-calendar-day
                slot="2023-01-20"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-21">
              <sbb-calendar-day
                slot="2023-01-21"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-22">
              <sbb-calendar-day
                slot="2023-01-22"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Week 4
            </span>
            <span aria-hidden="true">
              4
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-23">
              <sbb-calendar-day
                slot="2023-01-23"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-24">
              <sbb-calendar-day
                slot="2023-01-24"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-25">
              <sbb-calendar-day
                slot="2023-01-25"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-26">
              <sbb-calendar-day
                slot="2023-01-26"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-27">
              <sbb-calendar-day
                slot="2023-01-27"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-28">
              <sbb-calendar-day
                slot="2023-01-28"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-29">
              <sbb-calendar-day
                slot="2023-01-29"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Week 5
            </span>
            <span aria-hidden="true">
              5
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-30">
              <sbb-calendar-day
                slot="2023-01-30"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-31">
              <sbb-calendar-day
                slot="2023-01-31"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="sbb-calendar__day-view sbb-calendar__table-wrapper">
    <div class="sbb-calendar__table-header">
      <span>
        February 2023
      </span>
    </div>
    <table class="sbb-calendar__table">
      <thead>
        <tr>
          <th class="sbb-calendar__table-header-cell">
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Monday
            </span>
            <span aria-hidden="true">
              M
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Tuesday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Wednesday
            </span>
            <span aria-hidden="true">
              W
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Thursday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Friday
            </span>
            <span aria-hidden="true">
              F
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Saturday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Sunday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Week 5
            </span>
            <span aria-hidden="true">
              5
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-01">
              <sbb-calendar-day
                slot="2023-02-01"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-02">
              <sbb-calendar-day
                slot="2023-02-02"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-03">
              <sbb-calendar-day
                slot="2023-02-03"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-04">
              <sbb-calendar-day
                slot="2023-02-04"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-05">
              <sbb-calendar-day
                slot="2023-02-05"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Week 6
            </span>
            <span aria-hidden="true">
              6
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-06">
              <sbb-calendar-day
                slot="2023-02-06"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-07">
              <sbb-calendar-day
                slot="2023-02-07"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-08">
              <sbb-calendar-day
                slot="2023-02-08"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-09">
              <sbb-calendar-day
                slot="2023-02-09"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-10">
              <sbb-calendar-day
                slot="2023-02-10"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-11">
              <sbb-calendar-day
                slot="2023-02-11"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-12">
              <sbb-calendar-day
                slot="2023-02-12"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Week 7
            </span>
            <span aria-hidden="true">
              7
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-13">
              <sbb-calendar-day
                slot="2023-02-13"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-14">
              <sbb-calendar-day
                slot="2023-02-14"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-15">
              <sbb-calendar-day
                slot="2023-02-15"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-16">
              <sbb-calendar-day
                slot="2023-02-16"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-17">
              <sbb-calendar-day
                slot="2023-02-17"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-18">
              <sbb-calendar-day
                slot="2023-02-18"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-19">
              <sbb-calendar-day
                slot="2023-02-19"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Week 8
            </span>
            <span aria-hidden="true">
              8
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-20">
              <sbb-calendar-day
                slot="2023-02-20"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-21">
              <sbb-calendar-day
                slot="2023-02-21"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-22">
              <sbb-calendar-day
                slot="2023-02-22"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-23">
              <sbb-calendar-day
                slot="2023-02-23"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-24">
              <sbb-calendar-day
                slot="2023-02-24"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-25">
              <sbb-calendar-day
                slot="2023-02-25"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-26">
              <sbb-calendar-day
                slot="2023-02-26"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Week 9
            </span>
            <span aria-hidden="true">
              9
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-27">
              <sbb-calendar-day
                slot="2023-02-27"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-28">
              <sbb-calendar-day
                slot="2023-02-28"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`;
/* end snapshot sbb-calendar enhanced renders horizontal wide with week numbers Shadow DOM */

snapshots["sbb-calendar enhanced renders vertical wide with week numbers DOM"] = 
`<sbb-calendar
  amount="2"
  orientation="vertical"
  value="2023-01-20T00:00:00"
  week-numbers=""
>
  <sbb-calendar-day
    slot="2023-01-01"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-02"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-03"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-04"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-05"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-06"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-07"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-08"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-09"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-10"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-11"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-12"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-13"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-14"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-15"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-16"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-17"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-18"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-19"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-20"
    tabindex="0"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-21"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-22"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-23"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-24"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-25"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-26"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-27"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-28"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-29"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-30"
    tabindex="-1"
  >
  </sbb-calendar-day>
  <sbb-calendar-day
    slot="2023-01-31"
    tabindex="-1"
  >
  </sbb-calendar-day>
</sbb-calendar>
`;
/* end snapshot sbb-calendar enhanced renders vertical wide with week numbers DOM */

snapshots["sbb-calendar enhanced renders vertical wide with week numbers Shadow DOM"] = 
`<div class="sbb-calendar__wrapper">
  <div class="sbb-calendar__day-view sbb-calendar__table-wrapper">
    <div class="sbb-calendar__table-header">
      <span>
        January 2023
      </span>
      <sbb-secondary-button
        aria-label="Change to the previous month"
        class="sbb-calendar__control"
        icon-name="chevron-small-left-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Change to the next month"
        class="sbb-calendar__control"
        icon-name="chevron-small-right-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
      <sbb-secondary-button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__control"
        icon-name="chevron-small-up-small"
        size="s"
        tabindex="0"
      >
      </sbb-secondary-button>
    </div>
    <table class="sbb-calendar__table">
      <thead>
        <tr>
          <th class="sbb-calendar__table-data">
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Week 52
            </span>
            <span aria-hidden="true">
              52
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Week 1
            </span>
            <span aria-hidden="true">
              1
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Week 2
            </span>
            <span aria-hidden="true">
              2
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Week 3
            </span>
            <span aria-hidden="true">
              3
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Week 4
            </span>
            <span aria-hidden="true">
              4
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Week 5
            </span>
            <span aria-hidden="true">
              5
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Monday
            </span>
            <span aria-hidden="true">
              M
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-02">
              <sbb-calendar-day
                slot="2023-01-02"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-09">
              <sbb-calendar-day
                slot="2023-01-09"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-16">
              <sbb-calendar-day
                slot="2023-01-16"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-23">
              <sbb-calendar-day
                slot="2023-01-23"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-30">
              <sbb-calendar-day
                slot="2023-01-30"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Tuesday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-03">
              <sbb-calendar-day
                slot="2023-01-03"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-10">
              <sbb-calendar-day
                slot="2023-01-10"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-17">
              <sbb-calendar-day
                slot="2023-01-17"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-24">
              <sbb-calendar-day
                slot="2023-01-24"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-31">
              <sbb-calendar-day
                slot="2023-01-31"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Wednesday
            </span>
            <span aria-hidden="true">
              W
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-04">
              <sbb-calendar-day
                slot="2023-01-04"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-11">
              <sbb-calendar-day
                slot="2023-01-11"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-18">
              <sbb-calendar-day
                slot="2023-01-18"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-25">
              <sbb-calendar-day
                slot="2023-01-25"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Thursday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-05">
              <sbb-calendar-day
                slot="2023-01-05"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-12">
              <sbb-calendar-day
                slot="2023-01-12"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-19">
              <sbb-calendar-day
                slot="2023-01-19"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-26">
              <sbb-calendar-day
                slot="2023-01-26"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Friday
            </span>
            <span aria-hidden="true">
              F
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-06">
              <sbb-calendar-day
                slot="2023-01-06"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-13">
              <sbb-calendar-day
                slot="2023-01-13"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-20">
              <sbb-calendar-day
                slot="2023-01-20"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-27">
              <sbb-calendar-day
                slot="2023-01-27"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Saturday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-07">
              <sbb-calendar-day
                slot="2023-01-07"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-14">
              <sbb-calendar-day
                slot="2023-01-14"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-21">
              <sbb-calendar-day
                slot="2023-01-21"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-28">
              <sbb-calendar-day
                slot="2023-01-28"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Sunday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-01">
              <sbb-calendar-day
                slot="2023-01-01"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-08">
              <sbb-calendar-day
                slot="2023-01-08"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-15">
              <sbb-calendar-day
                slot="2023-01-15"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-22">
              <sbb-calendar-day
                slot="2023-01-22"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-01-29">
              <sbb-calendar-day
                slot="2023-01-29"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="sbb-calendar__day-view sbb-calendar__table-wrapper">
    <div class="sbb-calendar__table-header">
      <span>
        February 2023
      </span>
    </div>
    <table class="sbb-calendar__table">
      <thead>
        <tr>
          <th class="sbb-calendar__table-data">
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Week 5
            </span>
            <span aria-hidden="true">
              5
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Week 6
            </span>
            <span aria-hidden="true">
              6
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Week 7
            </span>
            <span aria-hidden="true">
              7
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Week 8
            </span>
            <span aria-hidden="true">
              8
            </span>
          </th>
          <th class="sbb-calendar__table-header-cell">
            <span class="sbb-screen-reader-only">
              Week 9
            </span>
            <span aria-hidden="true">
              9
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Monday
            </span>
            <span aria-hidden="true">
              M
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-06">
              <sbb-calendar-day
                slot="2023-02-06"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-13">
              <sbb-calendar-day
                slot="2023-02-13"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-20">
              <sbb-calendar-day
                slot="2023-02-20"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-27">
              <sbb-calendar-day
                slot="2023-02-27"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Tuesday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </td>
          <td class="sbb-calendar__table-data">
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-07">
              <sbb-calendar-day
                slot="2023-02-07"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-14">
              <sbb-calendar-day
                slot="2023-02-14"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-21">
              <sbb-calendar-day
                slot="2023-02-21"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-28">
              <sbb-calendar-day
                slot="2023-02-28"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Wednesday
            </span>
            <span aria-hidden="true">
              W
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-01">
              <sbb-calendar-day
                slot="2023-02-01"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-08">
              <sbb-calendar-day
                slot="2023-02-08"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-15">
              <sbb-calendar-day
                slot="2023-02-15"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-22">
              <sbb-calendar-day
                slot="2023-02-22"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Thursday
            </span>
            <span aria-hidden="true">
              T
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-02">
              <sbb-calendar-day
                slot="2023-02-02"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-09">
              <sbb-calendar-day
                slot="2023-02-09"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-16">
              <sbb-calendar-day
                slot="2023-02-16"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-23">
              <sbb-calendar-day
                slot="2023-02-23"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Friday
            </span>
            <span aria-hidden="true">
              F
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-03">
              <sbb-calendar-day
                slot="2023-02-03"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-10">
              <sbb-calendar-day
                slot="2023-02-10"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-17">
              <sbb-calendar-day
                slot="2023-02-17"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-24">
              <sbb-calendar-day
                slot="2023-02-24"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Saturday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-04">
              <sbb-calendar-day
                slot="2023-02-04"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-11">
              <sbb-calendar-day
                slot="2023-02-11"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-18">
              <sbb-calendar-day
                slot="2023-02-18"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-25">
              <sbb-calendar-day
                slot="2023-02-25"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
        <tr>
          <td class="sbb-calendar__table-header-cell-vertical">
            <span class="sbb-screen-reader-only">
              Sunday
            </span>
            <span aria-hidden="true">
              S
            </span>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-05">
              <sbb-calendar-day
                slot="2023-02-05"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-12">
              <sbb-calendar-day
                slot="2023-02-12"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-19">
              <sbb-calendar-day
                slot="2023-02-19"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
          <td class="sbb-calendar__day-cell sbb-calendar__table-data">
            <slot name="2023-02-26">
              <sbb-calendar-day
                slot="2023-02-26"
                tabindex="-1"
              >
              </sbb-calendar-day>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`;
/* end snapshot sbb-calendar enhanced renders vertical wide with week numbers Shadow DOM */

