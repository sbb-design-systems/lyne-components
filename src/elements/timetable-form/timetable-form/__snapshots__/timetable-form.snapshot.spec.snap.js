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
      <div>
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
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "image",
      "name": "Logo"
    },
    {
      "role": "text",
      "name": "​"
    },
    {
      "role": "text",
      "name": "From"
    },
    {
      "role": "textbox",
      "name": "From"
    },
    {
      "role": "button",
      "name": "Swap from and to"
    },
    {
      "role": "text",
      "name": "​"
    },
    {
      "role": "text",
      "name": "To"
    },
    {
      "role": "textbox",
      "name": "To"
    },
    {
      "role": "text",
      "name": "​"
    },
    {
      "role": "textbox",
      "name": "HH:MM",
      "value": "13:30"
    },
    {
      "role": "radio",
      "name": "Dep",
      "checked": true
    },
    {
      "role": "radio",
      "name": "Arr",
      "checked": false
    },
    {
      "role": "button",
      "name": "Search"
    }
  ]
}
</p>
`;
/* end snapshot sbb-timetable-form renders A11y tree Chrome */

snapshots["sbb-timetable-form renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "diagram",
      "name": "Logo"
    },
    {
      "role": "statictext",
      "name": "​"
    },
    {
      "role": "text leaf",
      "name": "From"
    },
    {
      "role": "textbox",
      "name": "From"
    },
    {
      "role": "button",
      "name": "Swap from and to"
    },
    {
      "role": "statictext",
      "name": "​"
    },
    {
      "role": "text leaf",
      "name": "To"
    },
    {
      "role": "textbox",
      "name": "To"
    },
    {
      "role": "statictext",
      "name": "​"
    },
    {
      "role": "textbox",
      "name": "",
      "value": "13:30"
    },
    {
      "role": "radio",
      "name": "Dep",
      "checked": true
    },
    {
      "role": "radio",
      "name": "Arr"
    },
    {
      "role": "button",
      "name": "Search"
    }
  ]
}
</p>
`;
/* end snapshot sbb-timetable-form renders A11y tree Firefox */

