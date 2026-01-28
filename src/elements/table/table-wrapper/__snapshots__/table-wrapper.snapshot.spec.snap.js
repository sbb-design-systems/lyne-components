/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-table-wrapper renders DOM"] = 
`<sbb-table-wrapper class="sbb-scrollbar-thick-track-visible">
  <table
    aria-label="Table caption"
    class="sbb-table"
  >
    <thead>
      <tr>
        <th>
          Col 1
        </th>
        <th>
          Col 2
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          Data 1
        </td>
        <td>
          Data 2
        </td>
      </tr>
    </tbody>
  </table>
</sbb-table-wrapper>
`;
/* end snapshot sbb-table-wrapper renders DOM */

snapshots["sbb-table-wrapper renders Shadow DOM"] = 
`<slot>
</slot>
`;
/* end snapshot sbb-table-wrapper renders Shadow DOM */

snapshots["sbb-table-wrapper renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "ignored": true,
      "role": "none",
      "children": [
        {
          "ignored": true,
          "role": "none",
          "children": [
            {
              "role": "table",
              "name": "Table caption"
            }
          ]
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-table-wrapper renders A11y tree Chrome */

