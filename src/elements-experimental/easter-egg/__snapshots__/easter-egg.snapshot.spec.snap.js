/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-easter-egg closed DOM"] = 
`<sbb-easter-egg
  backdrop="opaque"
  popover="manual"
>
</sbb-easter-egg>
`;
/* end snapshot sbb-easter-egg closed DOM */

snapshots["sbb-easter-egg closed Shadow DOM"] = 
`<div class="sbb-dialog__container">
  <div class="sbb-dialog">
    <div class="sbb-dialog__wrapper">
      <sbb-dialog-title
        level="2"
        visual-level="4"
      >
        Swiss Boa Express.
      </sbb-dialog-title>
      <sbb-dialog-close-button
        size="s"
        tabindex="0"
      >
      </sbb-dialog-close-button>
      <sbb-dialog-content class="sbb-easter-egg__content sbb-scrollbar">
        <div class="sbb-easter-egg__score">
          <span>
            Score: 0
          </span>
          <span>
            Best: 0
          </span>
        </div>
        <div class="sbb-easter-egg__canvas-wrapper">
          <canvas class="sbb-easter-egg__canvas">
          </canvas>
          <div class="sbb-easter-egg__overlay">
            <sbb-button
              class="sbb-easter-egg__button"
              size="m"
              tabindex="0"
            >
              Start
            </sbb-button>
          </div>
        </div>
      </sbb-dialog-content>
    </div>
  </div>
</div>
<span
  aria-live="polite"
  class="sbb-screen-reader-only"
>
</span>
`;
/* end snapshot sbb-easter-egg closed Shadow DOM */

