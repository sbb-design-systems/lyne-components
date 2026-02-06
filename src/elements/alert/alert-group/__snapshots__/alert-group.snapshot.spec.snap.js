/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-alert-group renders DOM"] = 
`<sbb-alert-group
  accessibility-title="Disruptions"
  accessibility-title-level="3"
  role="status"
>
  <sbb-alert
    animation="all"
    size="m"
  >
    <sbb-title
      level="3"
      negative=""
      slot="title"
      visual-level="5"
    >
      Interruption between Genève and Lausanne
    </sbb-title>
    The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
  </sbb-alert>
</sbb-alert-group>
`;
/* end snapshot sbb-alert-group renders DOM */

snapshots["sbb-alert-group renders Shadow DOM"] = 
`<div class="sbb-alert-group">
  <h3 class="sbb-alert-group__title">
    <slot name="accessibility-title">
      Disruptions
    </slot>
  </h3>
  <slot>
  </slot>
</div>
`;
/* end snapshot sbb-alert-group renders Shadow DOM */

snapshots["sbb-alert-group renders with slotted DOM"] = 
`<sbb-alert-group
  accessibility-title-level="3"
  role="status"
>
  <span slot="accessibility-title">
    Interruptions
  </span>
  <sbb-alert
    animation="all"
    size="m"
  >
    <sbb-title
      level="3"
      negative=""
      slot="title"
      visual-level="5"
    >
      Interruption between Genève and Lausanne
    </sbb-title>
    The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
  </sbb-alert>
</sbb-alert-group>
`;
/* end snapshot sbb-alert-group renders with slotted DOM */

snapshots["sbb-alert-group renders with slotted Shadow DOM"] = 
`<div class="sbb-alert-group">
  <h3 class="sbb-alert-group__title">
    <slot name="accessibility-title">
    </slot>
  </h3>
  <slot>
  </slot>
</div>
`;
/* end snapshot sbb-alert-group renders with slotted Shadow DOM */

snapshots["sbb-alert-group renders A11y tree Chrome"] = 
`<p>
  {
  "role": "generic",
  "name": "Fixture Container",
  "children": [
    {
      "role": "status",
      "name": "",
      "live": "polite",
      "atomic": true,
      "relevant": "additions text"
    }
  ]
}
</p>
`;
/* end snapshot sbb-alert-group renders A11y tree Chrome */

