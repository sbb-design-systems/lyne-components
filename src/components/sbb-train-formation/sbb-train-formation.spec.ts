import { SbbTrainFormation } from './sbb-train-formation';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-train-formation', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbTrainFormation],
      html: '<sbb-train-formation />',
    });

    expect(root).toEqualHtml(`
        <sbb-train-formation>
          <mock:shadow-root>
            <div class="sbb-train-formation" style="--sbb-train-direction-width: 0px;">
              <div aria-hidden="true" class="sbb-train-formation__sectors"></div>
               <div class="sbb-train-formation__trains">
                 <span class="sbb-train-formation__single-train" hidden>
                   <slot></slot>
                 </span>
               </div>
            </div>
          </mock:shadow-root>
        </sbb-train-formation>
      `);
  });
});
