import { SbbTrainFormation } from './sbb-train-formation';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-train-formation', () => {
  it('should render with one train', async () => {
    const { root } = await newSpecPage({
      components: [SbbTrainFormation],
      html: `<sbb-train-formation>
              <sbb-train>
                <sbb-train-wagon></sbb-train-wagon>
              </sbb-train>
            </sbb-train-formation>`,
    });

    expect(root).toEqualHtml(`
        <sbb-train-formation>
          <mock:shadow-root>
            <div class="sbb-train-formation" style="--sbb-train-direction-width: 0px;">
              <div aria-hidden="true" class="sbb-train-formation__sectors">
                 <span class="sbb-train-formation__sector" style="--sbb-train-formation-wagon-count: 1; --sbb-train-formation-wagon-blocked-passage-count: 0;">
                   <span class="sbb-train-formation__sector-sticky-wrapper">
                     Sector
                   </span>
                 </span>
               </div>
               <div class="sbb-train-formation__trains">
                 <span class="sbb-train-formation__single-train">
                   <slot></slot>
                 </span>
               </div>
            </div>
          </mock:shadow-root>
          <sbb-train>
            <sbb-train-wagon></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `);
  });

  it('should render with multiple trains', async () => {
    const { root } = await newSpecPage({
      components: [SbbTrainFormation],
      html: `<sbb-train-formation>
              <sbb-train>
                <sbb-train-wagon></sbb-train-wagon>
              </sbb-train>
              <sbb-train>
                <sbb-train-wagon></sbb-train-wagon>
              </sbb-train>
            </sbb-train-formation>`,
    });

    expect(root).toEqualHtml(`
        <sbb-train-formation>
          <mock:shadow-root>
            <div class="sbb-train-formation" style="--sbb-train-direction-width: 0px;">
              <div aria-hidden="true" class="sbb-train-formation__sectors">
                 <span class="sbb-train-formation__sector" style="--sbb-train-formation-wagon-count: 2; --sbb-train-formation-wagon-blocked-passage-count: 0;">
                   <span class="sbb-train-formation__sector-sticky-wrapper">
                     Sector
                   </span>
                 </span>
               </div>
               <div class="sbb-train-formation__trains">
                <ul aria-label="Trains" class="sbb-train-formation__train-list">
                  <li class="sbb-train-formation__train-list-item">
                    <slot name="train-0"></slot>
                  </li>
                  <li class="sbb-train-formation__train-list-item">
                    <slot name="train-1"></slot>
                  </li>
                </ul>

                 <span class="sbb-train-formation__single-train" hidden>
                   <slot></slot>
                 </span>
               </div>
            </div>
          </mock:shadow-root>
          <sbb-train slot="train-0">
            <sbb-train-wagon></sbb-train-wagon>
          </sbb-train>
          <sbb-train slot="train-1">
            <sbb-train-wagon></sbb-train-wagon>
          </sbb-train>
        </sbb-train-formation>
      `);
  });
});
