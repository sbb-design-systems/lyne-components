/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-pearl-chain default DOM"] = 
`<sbb-pearl-chain now="2026-09-14T00:00:00">
  <sbb-pearl-chain-node
    departure="2026-09-14T09:00:00"
    type="start"
  >
  </sbb-pearl-chain-node>
  <sbb-pearl-chain-node
    arrival="2026-09-14T11:00:00"
    departure="2026-09-14T11:10:00"
    type="stop"
  >
  </sbb-pearl-chain-node>
  <sbb-pearl-chain-node
    arrival="2026-09-14T14:00:00"
    type="end"
  >
  </sbb-pearl-chain-node>
</sbb-pearl-chain>
`;
/* end snapshot sbb-pearl-chain default DOM */

snapshots["sbb-pearl-chain default Shadow DOM"] = 
`<slot>
</slot>
`;
/* end snapshot sbb-pearl-chain default Shadow DOM */

snapshots["sbb-pearl-chain trip in progress DOM"] = 
`<sbb-pearl-chain now="2026-09-14T12:00:00">
  <sbb-pearl-chain-node
    departure="2026-09-14T09:00:00"
    type="start"
  >
  </sbb-pearl-chain-node>
  <sbb-pearl-chain-node
    arrival="2026-09-14T11:00:00"
    departure="2026-09-14T11:10:00"
    type="stop"
  >
  </sbb-pearl-chain-node>
  <sbb-pearl-chain-node
    arrival="2026-09-14T14:00:00"
    type="end"
  >
  </sbb-pearl-chain-node>
</sbb-pearl-chain>
`;
/* end snapshot sbb-pearl-chain trip in progress DOM */

snapshots["sbb-pearl-chain trip in progress Shadow DOM"] = 
`<slot>
</slot>
`;
/* end snapshot sbb-pearl-chain trip in progress Shadow DOM */

snapshots["sbb-pearl-chain default A11y tree Chrome"] = 
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
/* end snapshot sbb-pearl-chain default A11y tree Chrome */

