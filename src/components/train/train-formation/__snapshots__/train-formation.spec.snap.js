/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots['sbb-train-formation should render with multiple trains'] = `<div
  class="sbb-train-formation"
  style="--sbb-train-direction-width: 800px;"
>
  <div
    aria-hidden="true"
    class="sbb-train-formation__sectors"
  >
    <span
      class="sbb-train-formation__sector"
      style="
                --sbb-train-formation-wagon-count: 2;
                --sbb-train-formation-wagon-blocked-passage-count: 0"
    >
      <span class="sbb-train-formation__sector-sticky-wrapper">
        Sector
      </span>
    </span>
  </div>
  <div class="sbb-train-formation__trains">
    <ul
      aria-label="Trains"
      class="sbb-train-formation__train-list"
    >
      <li class="sbb-train-formation__train-list-item">
        <slot name="train-0">
        </slot>
      </li>
      <li class="sbb-train-formation__train-list-item">
        <slot name="train-1">
        </slot>
      </li>
    </ul>
    <span
      class="sbb-train-formation__single-train"
      hidden=""
    >
      <slot>
      </slot>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-train-formation should render with multiple trains */

snapshots['sbb-train-formation should render with one train'] = `<div
  class="sbb-train-formation"
  style="--sbb-train-direction-width: 800px;"
>
  <div
    aria-hidden="true"
    class="sbb-train-formation__sectors"
  >
    <span
      class="sbb-train-formation__sector"
      style="
                --sbb-train-formation-wagon-count: 1;
                --sbb-train-formation-wagon-blocked-passage-count: 0"
    >
      <span class="sbb-train-formation__sector-sticky-wrapper">
        Sector
      </span>
    </span>
  </div>
  <div class="sbb-train-formation__trains">
    <span class="sbb-train-formation__single-train">
      <slot>
      </slot>
    </span>
  </div>
</div>
`;
/* end snapshot sbb-train-formation should render with one train */
