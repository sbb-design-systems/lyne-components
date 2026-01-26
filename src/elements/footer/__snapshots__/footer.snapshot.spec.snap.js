/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-footer renders DOM"] = 
`<sbb-footer
  accessibility-title="Footer"
  variant="default"
>
</sbb-footer>
`;
/* end snapshot sbb-footer renders DOM */

snapshots["sbb-footer renders Shadow DOM"] = 
`<footer class="sbb-footer">
  <div class="sbb-footer-wrapper">
    <h1 class="sbb-footer__title">
      Footer
    </h1>
    <slot>
    </slot>
  </div>
</footer>
`;
/* end snapshot sbb-footer renders Shadow DOM */

snapshots["sbb-footer renders A11y tree Chrome"] = 
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
          "role": "contentinfo",
          "name": ""
        }
      ]
    }
  ]
}
</p>
`;
/* end snapshot sbb-footer renders A11y tree Chrome */

