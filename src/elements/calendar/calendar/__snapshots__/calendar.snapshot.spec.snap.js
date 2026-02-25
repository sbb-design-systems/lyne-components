/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-calendar default renders DOM"] = 
`<sbb-calendar
  orientation="horizontal"
  selected="2023-01-20T00:00:00"
>
</sbb-calendar>
`;
/* end snapshot sbb-calendar default renders DOM */

snapshots["sbb-calendar default renders Shadow DOM"] = 
`<div class="sbb-calendar__wrapper">
  <div class="sbb-calendar__controls">
    <sbb-secondary-button
      aria-label="Change to the previous month"
      icon-name="chevron-small-left-small"
      id="sbb-calendar__controls-previous"
      size="m"
      tabindex="0"
    >
    </sbb-secondary-button>
    <div class="sbb-calendar__controls-month">
      <button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__controls-change-date sbb-calendar__date-selection"
        type="button"
      >
        January 2023
        <sbb-icon name="chevron-small-down-small">
        </sbb-icon>
      </button>
      <sbb-screen-reader-only role="status">
        January 2023
      </sbb-screen-reader-only>
    </div>
    <sbb-secondary-button
      aria-label="Change to the next month"
      icon-name="chevron-small-right-small"
      id="sbb-calendar__controls-next"
      size="m"
      tabindex="0"
    >
    </sbb-secondary-button>
  </div>
  <div class="sbb-calendar__table-overflow-break">
    <div class="sbb-calendar__table-container sbb-calendar__table-day-view">
      <table class="sbb-calendar__table">
        <thead class="sbb-calendar__table-header">
          <tr>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Monday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                M
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Tuesday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                T
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Wednesday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                W
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Thursday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                T
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Friday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                F
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Saturday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                S
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Sunday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                S
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="sbb-calendar__table-body">
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
</div>
`;
/* end snapshot sbb-calendar default renders Shadow DOM */

snapshots["sbb-calendar default renders vertical DOM"] = 
`<sbb-calendar
  orientation="vertical"
  selected="2023-01-20T00:00:00"
>
</sbb-calendar>
`;
/* end snapshot sbb-calendar default renders vertical DOM */

snapshots["sbb-calendar default renders vertical Shadow DOM"] = 
`<div class="sbb-calendar__wrapper">
  <div class="sbb-calendar__controls">
    <sbb-secondary-button
      aria-label="Change to the previous month"
      icon-name="chevron-small-left-small"
      id="sbb-calendar__controls-previous"
      size="m"
      tabindex="0"
    >
    </sbb-secondary-button>
    <div class="sbb-calendar__controls-month">
      <button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__controls-change-date sbb-calendar__date-selection"
        type="button"
      >
        January 2023
        <sbb-icon name="chevron-small-down-small">
        </sbb-icon>
      </button>
      <sbb-screen-reader-only role="status">
        January 2023
      </sbb-screen-reader-only>
    </div>
    <sbb-secondary-button
      aria-label="Change to the next month"
      icon-name="chevron-small-right-small"
      id="sbb-calendar__controls-next"
      size="m"
      tabindex="0"
    >
    </sbb-secondary-button>
  </div>
  <div class="sbb-calendar__table-overflow-break">
    <div class="sbb-calendar__table-container sbb-calendar__table-day-view">
      <table class="sbb-calendar__table">
        <tbody class="sbb-calendar__table-body">
          <tr>
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Monday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Tuesday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Wednesday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Thursday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Friday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Saturday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Sunday
              </sbb-screen-reader-only>
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
</div>
`;
/* end snapshot sbb-calendar default renders vertical Shadow DOM */

snapshots["sbb-calendar default renders A11y tree Chrome"] = 
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
/* end snapshot sbb-calendar default renders A11y tree Chrome */

snapshots["sbb-calendar default renders multiple DOM"] = 
`<sbb-calendar
  multiple=""
  orientation="horizontal"
  selected="2023-01-20T00:00:00"
>
</sbb-calendar>
`;
/* end snapshot sbb-calendar default renders multiple DOM */

snapshots["sbb-calendar default renders multiple Shadow DOM"] = 
`<div class="sbb-calendar__wrapper">
  <div class="sbb-calendar__controls">
    <sbb-secondary-button
      aria-label="Change to the previous month"
      icon-name="chevron-small-left-small"
      id="sbb-calendar__controls-previous"
      size="m"
      tabindex="0"
    >
    </sbb-secondary-button>
    <div class="sbb-calendar__controls-month">
      <button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__controls-change-date sbb-calendar__date-selection"
        type="button"
      >
        January 2023
        <sbb-icon name="chevron-small-down-small">
        </sbb-icon>
      </button>
      <sbb-screen-reader-only role="status">
        January 2023
      </sbb-screen-reader-only>
    </div>
    <sbb-secondary-button
      aria-label="Change to the next month"
      icon-name="chevron-small-right-small"
      id="sbb-calendar__controls-next"
      size="m"
      tabindex="0"
    >
    </sbb-secondary-button>
  </div>
  <div class="sbb-calendar__table-overflow-break">
    <div class="sbb-calendar__table-container sbb-calendar__table-day-view">
      <table class="sbb-calendar__table">
        <thead class="sbb-calendar__table-header">
          <tr>
            <th class="sbb-calendar__table-header-cell">
              <button
                aria-label="Monday"
                class="sbb-calendar__header-cell sbb-calendar__weekday"
              >
                M
              </button>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <button
                aria-label="Tuesday"
                class="sbb-calendar__header-cell sbb-calendar__weekday"
              >
                T
              </button>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <button
                aria-label="Wednesday"
                class="sbb-calendar__header-cell sbb-calendar__weekday"
              >
                W
              </button>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <button
                aria-label="Thursday"
                class="sbb-calendar__header-cell sbb-calendar__weekday"
              >
                T
              </button>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <button
                aria-label="Friday"
                class="sbb-calendar__header-cell sbb-calendar__weekday"
              >
                F
              </button>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <button
                aria-label="Saturday"
                class="sbb-calendar__header-cell sbb-calendar__weekday"
              >
                S
              </button>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <button
                aria-label="Sunday"
                class="sbb-calendar__header-cell sbb-calendar__weekday"
              >
                S
              </button>
            </th>
          </tr>
        </thead>
        <tbody class="sbb-calendar__table-body">
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
</div>
`;
/* end snapshot sbb-calendar default renders multiple Shadow DOM */

snapshots["sbb-calendar default renders horizontal wide with week numbers DOM"] = 
`<sbb-calendar
  orientation="horizontal"
  selected="2023-01-20T00:00:00"
  week-numbers=""
  wide=""
>
</sbb-calendar>
`;
/* end snapshot sbb-calendar default renders horizontal wide with week numbers DOM */

snapshots["sbb-calendar default renders horizontal wide with week numbers Shadow DOM"] = 
`<div class="sbb-calendar__wrapper">
  <div class="sbb-calendar__controls">
    <sbb-secondary-button
      aria-label="Change to the previous month"
      icon-name="chevron-small-left-small"
      id="sbb-calendar__controls-previous"
      size="m"
      tabindex="0"
    >
    </sbb-secondary-button>
    <div class="sbb-calendar__controls-month">
      <button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__controls-change-date sbb-calendar__date-selection"
        type="button"
      >
        January 2023
        <sbb-icon name="chevron-small-down-small">
        </sbb-icon>
      </button>
      <button
        aria-label="Choose year and month February 2023"
        class="sbb-calendar__controls-change-date sbb-calendar__date-selection"
        type="button"
      >
        February 2023
        <sbb-icon name="chevron-small-down-small">
        </sbb-icon>
      </button>
      <sbb-screen-reader-only role="status">
        January 2023 February 2023
      </sbb-screen-reader-only>
    </div>
    <sbb-secondary-button
      aria-label="Change to the next month"
      icon-name="chevron-small-right-small"
      id="sbb-calendar__controls-next"
      size="m"
      tabindex="0"
    >
    </sbb-secondary-button>
  </div>
  <div class="sbb-calendar__table-overflow-break">
    <div class="sbb-calendar__table-container sbb-calendar__table-day-view">
      <table class="sbb-calendar__table">
        <thead class="sbb-calendar__table-header">
          <tr>
            <th class="sbb-calendar__table-header-cell">
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Monday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                M
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Tuesday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                T
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Wednesday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                W
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Thursday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                T
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Friday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                F
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Saturday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                S
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Sunday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                S
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="sbb-calendar__table-body">
          <tr>
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 52
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 1
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 2
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 3
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 4
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 5
              </sbb-screen-reader-only>
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
      <table class="sbb-calendar__table">
        <thead class="sbb-calendar__table-header">
          <tr>
            <th class="sbb-calendar__table-header-cell">
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Monday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                M
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Tuesday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                T
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Wednesday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                W
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Thursday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                T
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Friday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                F
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Saturday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                S
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Sunday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                S
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="sbb-calendar__table-body">
          <tr>
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 5
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 6
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 7
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 8
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 9
              </sbb-screen-reader-only>
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
</div>
`;
/* end snapshot sbb-calendar default renders horizontal wide with week numbers Shadow DOM */

snapshots["sbb-calendar default renders vertical wide with week numbers DOM"] = 
`<sbb-calendar
  orientation="vertical"
  selected="2023-01-20T00:00:00"
  week-numbers=""
  wide=""
>
</sbb-calendar>
`;
/* end snapshot sbb-calendar default renders vertical wide with week numbers DOM */

snapshots["sbb-calendar default renders vertical wide with week numbers Shadow DOM"] = 
`<div class="sbb-calendar__wrapper">
  <div class="sbb-calendar__controls">
    <sbb-secondary-button
      aria-label="Change to the previous month"
      icon-name="chevron-small-left-small"
      id="sbb-calendar__controls-previous"
      size="m"
      tabindex="0"
    >
    </sbb-secondary-button>
    <div class="sbb-calendar__controls-month">
      <button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__controls-change-date sbb-calendar__date-selection"
        type="button"
      >
        January 2023
        <sbb-icon name="chevron-small-down-small">
        </sbb-icon>
      </button>
      <button
        aria-label="Choose year and month February 2023"
        class="sbb-calendar__controls-change-date sbb-calendar__date-selection"
        type="button"
      >
        February 2023
        <sbb-icon name="chevron-small-down-small">
        </sbb-icon>
      </button>
      <sbb-screen-reader-only role="status">
        January 2023 February 2023
      </sbb-screen-reader-only>
    </div>
    <sbb-secondary-button
      aria-label="Change to the next month"
      icon-name="chevron-small-right-small"
      id="sbb-calendar__controls-next"
      size="m"
      tabindex="0"
    >
    </sbb-secondary-button>
  </div>
  <div class="sbb-calendar__table-overflow-break">
    <div class="sbb-calendar__table-container sbb-calendar__table-day-view">
      <table class="sbb-calendar__table">
        <thead class="sbb-calendar__table-header">
          <tr>
            <th class="sbb-calendar__table-data">
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 52
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                52
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 1
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                1
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 2
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                2
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 3
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                3
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 4
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                4
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 5
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                5
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="sbb-calendar__table-body">
          <tr>
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Monday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Tuesday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Wednesday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Thursday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Friday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Saturday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Sunday
              </sbb-screen-reader-only>
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
      <table class="sbb-calendar__table">
        <thead class="sbb-calendar__table-header">
          <tr>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 5
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                5
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 6
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                6
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 7
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                7
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 8
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                8
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 9
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                9
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="sbb-calendar__table-body">
          <tr>
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
</div>
`;
/* end snapshot sbb-calendar default renders vertical wide with week numbers Shadow DOM */

snapshots["sbb-calendar enhanced renders DOM"] = 
`<sbb-calendar
  orientation="horizontal"
  selected="2023-01-20T00:00:00"
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
  <div class="sbb-calendar__controls">
    <sbb-secondary-button
      aria-label="Change to the previous month"
      icon-name="chevron-small-left-small"
      id="sbb-calendar__controls-previous"
      size="m"
      tabindex="0"
    >
    </sbb-secondary-button>
    <div class="sbb-calendar__controls-month">
      <button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__controls-change-date sbb-calendar__date-selection"
        type="button"
      >
        January 2023
        <sbb-icon name="chevron-small-down-small">
        </sbb-icon>
      </button>
      <sbb-screen-reader-only role="status">
        January 2023
      </sbb-screen-reader-only>
    </div>
    <sbb-secondary-button
      aria-label="Change to the next month"
      icon-name="chevron-small-right-small"
      id="sbb-calendar__controls-next"
      size="m"
      tabindex="0"
    >
    </sbb-secondary-button>
  </div>
  <div class="sbb-calendar__table-overflow-break">
    <div class="sbb-calendar__table-container sbb-calendar__table-day-view">
      <table class="sbb-calendar__table">
        <thead class="sbb-calendar__table-header">
          <tr>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Monday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                M
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Tuesday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                T
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Wednesday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                W
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Thursday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                T
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Friday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                F
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Saturday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                S
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Sunday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                S
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="sbb-calendar__table-body">
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
</div>
`;
/* end snapshot sbb-calendar enhanced renders Shadow DOM */

snapshots["sbb-calendar enhanced renders vertical DOM"] = 
`<sbb-calendar
  orientation="vertical"
  selected="2023-01-20T00:00:00"
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

snapshots["sbb-calendar enhanced renders A11y tree Chrome"] = 
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
/* end snapshot sbb-calendar enhanced renders A11y tree Chrome */

snapshots["sbb-calendar enhanced renders vertical Shadow DOM"] = 
`<div class="sbb-calendar__wrapper">
  <div class="sbb-calendar__controls">
    <sbb-secondary-button
      aria-label="Change to the previous month"
      icon-name="chevron-small-left-small"
      id="sbb-calendar__controls-previous"
      size="m"
      tabindex="0"
    >
    </sbb-secondary-button>
    <div class="sbb-calendar__controls-month">
      <button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__controls-change-date sbb-calendar__date-selection"
        type="button"
      >
        January 2023
        <sbb-icon name="chevron-small-down-small">
        </sbb-icon>
      </button>
      <sbb-screen-reader-only role="status">
        January 2023
      </sbb-screen-reader-only>
    </div>
    <sbb-secondary-button
      aria-label="Change to the next month"
      icon-name="chevron-small-right-small"
      id="sbb-calendar__controls-next"
      size="m"
      tabindex="0"
    >
    </sbb-secondary-button>
  </div>
  <div class="sbb-calendar__table-overflow-break">
    <div class="sbb-calendar__table-container sbb-calendar__table-day-view">
      <table class="sbb-calendar__table">
        <tbody class="sbb-calendar__table-body">
          <tr>
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Monday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Tuesday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Wednesday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Thursday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Friday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Saturday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Sunday
              </sbb-screen-reader-only>
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
</div>
`;
/* end snapshot sbb-calendar enhanced renders vertical Shadow DOM */

snapshots["sbb-calendar enhanced renders multiple DOM"] = 
`<sbb-calendar
  multiple=""
  orientation="horizontal"
  selected="2023-01-20T00:00:00"
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
  <div class="sbb-calendar__controls">
    <sbb-secondary-button
      aria-label="Change to the previous month"
      icon-name="chevron-small-left-small"
      id="sbb-calendar__controls-previous"
      size="m"
      tabindex="0"
    >
    </sbb-secondary-button>
    <div class="sbb-calendar__controls-month">
      <button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__controls-change-date sbb-calendar__date-selection"
        type="button"
      >
        January 2023
        <sbb-icon name="chevron-small-down-small">
        </sbb-icon>
      </button>
      <sbb-screen-reader-only role="status">
        January 2023
      </sbb-screen-reader-only>
    </div>
    <sbb-secondary-button
      aria-label="Change to the next month"
      icon-name="chevron-small-right-small"
      id="sbb-calendar__controls-next"
      size="m"
      tabindex="0"
    >
    </sbb-secondary-button>
  </div>
  <div class="sbb-calendar__table-overflow-break">
    <div class="sbb-calendar__table-container sbb-calendar__table-day-view">
      <table class="sbb-calendar__table">
        <thead class="sbb-calendar__table-header">
          <tr>
            <th class="sbb-calendar__table-header-cell">
              <button
                aria-label="Monday"
                class="sbb-calendar__header-cell sbb-calendar__weekday"
              >
                M
              </button>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <button
                aria-label="Tuesday"
                class="sbb-calendar__header-cell sbb-calendar__weekday"
              >
                T
              </button>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <button
                aria-label="Wednesday"
                class="sbb-calendar__header-cell sbb-calendar__weekday"
              >
                W
              </button>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <button
                aria-label="Thursday"
                class="sbb-calendar__header-cell sbb-calendar__weekday"
              >
                T
              </button>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <button
                aria-label="Friday"
                class="sbb-calendar__header-cell sbb-calendar__weekday"
              >
                F
              </button>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <button
                aria-label="Saturday"
                class="sbb-calendar__header-cell sbb-calendar__weekday"
              >
                S
              </button>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <button
                aria-label="Sunday"
                class="sbb-calendar__header-cell sbb-calendar__weekday"
              >
                S
              </button>
            </th>
          </tr>
        </thead>
        <tbody class="sbb-calendar__table-body">
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
</div>
`;
/* end snapshot sbb-calendar enhanced renders multiple Shadow DOM */

snapshots["sbb-calendar enhanced renders horizontal wide with week numbers DOM"] = 
`<sbb-calendar
  orientation="horizontal"
  selected="2023-01-20T00:00:00"
  week-numbers=""
  wide=""
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
  <div class="sbb-calendar__controls">
    <sbb-secondary-button
      aria-label="Change to the previous month"
      icon-name="chevron-small-left-small"
      id="sbb-calendar__controls-previous"
      size="m"
      tabindex="0"
    >
    </sbb-secondary-button>
    <div class="sbb-calendar__controls-month">
      <button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__controls-change-date sbb-calendar__date-selection"
        type="button"
      >
        January 2023
        <sbb-icon name="chevron-small-down-small">
        </sbb-icon>
      </button>
      <button
        aria-label="Choose year and month February 2023"
        class="sbb-calendar__controls-change-date sbb-calendar__date-selection"
        type="button"
      >
        February 2023
        <sbb-icon name="chevron-small-down-small">
        </sbb-icon>
      </button>
      <sbb-screen-reader-only role="status">
        January 2023 February 2023
      </sbb-screen-reader-only>
    </div>
    <sbb-secondary-button
      aria-label="Change to the next month"
      icon-name="chevron-small-right-small"
      id="sbb-calendar__controls-next"
      size="m"
      tabindex="0"
    >
    </sbb-secondary-button>
  </div>
  <div class="sbb-calendar__table-overflow-break">
    <div class="sbb-calendar__table-container sbb-calendar__table-day-view">
      <table class="sbb-calendar__table">
        <thead class="sbb-calendar__table-header">
          <tr>
            <th class="sbb-calendar__table-header-cell">
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Monday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                M
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Tuesday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                T
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Wednesday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                W
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Thursday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                T
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Friday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                F
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Saturday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                S
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Sunday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                S
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="sbb-calendar__table-body">
          <tr>
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 52
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 1
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 2
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 3
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 4
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 5
              </sbb-screen-reader-only>
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
      <table class="sbb-calendar__table">
        <thead class="sbb-calendar__table-header">
          <tr>
            <th class="sbb-calendar__table-header-cell">
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Monday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                M
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Tuesday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                T
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Wednesday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                W
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Thursday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                T
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Friday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                F
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Saturday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                S
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Sunday
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                S
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="sbb-calendar__table-body">
          <tr>
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 5
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 6
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 7
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 8
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 9
              </sbb-screen-reader-only>
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
</div>
`;
/* end snapshot sbb-calendar enhanced renders horizontal wide with week numbers Shadow DOM */

snapshots["sbb-calendar enhanced renders vertical wide with week numbers DOM"] = 
`<sbb-calendar
  orientation="vertical"
  selected="2023-01-20T00:00:00"
  week-numbers=""
  wide=""
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
  <div class="sbb-calendar__controls">
    <sbb-secondary-button
      aria-label="Change to the previous month"
      icon-name="chevron-small-left-small"
      id="sbb-calendar__controls-previous"
      size="m"
      tabindex="0"
    >
    </sbb-secondary-button>
    <div class="sbb-calendar__controls-month">
      <button
        aria-label="Choose year and month January 2023"
        class="sbb-calendar__controls-change-date sbb-calendar__date-selection"
        type="button"
      >
        January 2023
        <sbb-icon name="chevron-small-down-small">
        </sbb-icon>
      </button>
      <button
        aria-label="Choose year and month February 2023"
        class="sbb-calendar__controls-change-date sbb-calendar__date-selection"
        type="button"
      >
        February 2023
        <sbb-icon name="chevron-small-down-small">
        </sbb-icon>
      </button>
      <sbb-screen-reader-only role="status">
        January 2023 February 2023
      </sbb-screen-reader-only>
    </div>
    <sbb-secondary-button
      aria-label="Change to the next month"
      icon-name="chevron-small-right-small"
      id="sbb-calendar__controls-next"
      size="m"
      tabindex="0"
    >
    </sbb-secondary-button>
  </div>
  <div class="sbb-calendar__table-overflow-break">
    <div class="sbb-calendar__table-container sbb-calendar__table-day-view">
      <table class="sbb-calendar__table">
        <thead class="sbb-calendar__table-header">
          <tr>
            <th class="sbb-calendar__table-data">
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 52
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                52
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 1
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                1
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 2
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                2
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 3
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                3
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 4
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                4
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 5
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                5
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="sbb-calendar__table-body">
          <tr>
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Monday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Tuesday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Wednesday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Thursday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Friday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Saturday
              </sbb-screen-reader-only>
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
            <td class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Sunday
              </sbb-screen-reader-only>
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
      <table class="sbb-calendar__table">
        <thead class="sbb-calendar__table-header">
          <tr>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 5
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                5
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 6
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                6
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 7
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                7
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 8
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                8
              </span>
            </th>
            <th class="sbb-calendar__table-header-cell">
              <sbb-screen-reader-only>
                Week 9
              </sbb-screen-reader-only>
              <span aria-hidden="true">
                9
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="sbb-calendar__table-body">
          <tr>
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
</div>
`;
/* end snapshot sbb-calendar enhanced renders vertical wide with week numbers Shadow DOM */

