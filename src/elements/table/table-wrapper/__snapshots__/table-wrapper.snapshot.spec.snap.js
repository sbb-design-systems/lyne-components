/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-table-wrapper renders DOM"] = 
`<sbb-table-wrapper>
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
`<div class="sbb-table-wrapper">
  <slot>
  </slot>
</div>
`;
/* end snapshot sbb-table-wrapper renders Shadow DOM */

snapshots["sbb-table-wrapper renders A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "text",
      "name": "Col 1"
    },
    {
      "role": "text",
      "name": "Col 2"
    },
    {
      "role": "text",
      "name": "Data 1"
    },
    {
      "role": "text",
      "name": "Data 2"
    }
  ]
}
</p>
`;
/* end snapshot sbb-table-wrapper renders A11y tree Chrome */

snapshots["sbb-table-wrapper renders A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "text leaf",
      "name": "Col 1"
    },
    {
      "role": "text leaf",
      "name": "Col 2"
    },
    {
      "role": "text leaf",
      "name": "Data 1"
    },
    {
      "role": "text leaf",
      "name": "Data 2"
    }
  ]
}
</p>
`;
/* end snapshot sbb-table-wrapper renders A11y tree Firefox */

