/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-timetable-form renders DOM"] = 
`<form class="sbb-timetable-form">
  <sbb-signet protective-room="ideal">
  </sbb-signet>
  <sbb-timetable-form>
    <sbb-timetable-form-field
      borderless=""
      error-space="none"
      floating-label=""
      size="l"
      width="collapse"
    >
      <label
        for="sbb-form-field-input-0"
        slot="label"
      >
        From
      </label>
      <input
        id="sbb-form-field-input-0"
        name="from"
        type="text"
      >
    </sbb-timetable-form-field>
    <sbb-timetable-form-swap-button
      size="l"
      tabindex="0"
    >
    </sbb-timetable-form-swap-button>
    <sbb-timetable-form-field
      borderless=""
      error-space="none"
      floating-label=""
      size="l"
      width="collapse"
    >
      <label
        for="sbb-form-field-input-1"
        slot="label"
      >
        To
      </label>
      <input
        id="sbb-form-field-input-1"
        name="to"
        type="text"
      >
    </sbb-timetable-form-field>
    <sbb-timetable-form-details>
      <sbb-form-field
        borderless=""
        error-space="none"
        size="l"
        width="collapse"
      >
        <sbb-time-input
          contenteditable="plaintext-only"
          inputmode="numeric"
          placeholder="HH:MM"
          value="13:30"
        >
          13:30
        </sbb-time-input>
      </sbb-form-field>
      <sbb-toggle
        name="departure-arrival"
        size="s"
        style="--sbb-toggle-option-left: 0px; --sbb-toggle-option-right: 43px;"
      >
        <sbb-toggle-option
          checked=""
          tabindex="0"
          value="departure"
        >
          Dep
        </sbb-toggle-option>
        <sbb-toggle-option
          tabindex="-1"
          value="arrival"
        >
          Arr
        </sbb-toggle-option>
      </sbb-toggle>
      <div style="flex-grow: 1;">
      </div>
      <sbb-button
        size="m"
        tabindex="0"
        type="submit"
      >
        Search
      </sbb-button>
    </sbb-timetable-form-details>
  </sbb-timetable-form>
</form>
`;
/* end snapshot sbb-timetable-form renders DOM */

snapshots["sbb-timetable-form renders A11y tree Chrome"] = 
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
/* end snapshot sbb-timetable-form renders A11y tree Chrome */

