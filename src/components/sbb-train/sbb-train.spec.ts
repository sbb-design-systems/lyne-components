import { SbbTrain } from './sbb-train';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-train', () => {
  it('renders with left indicator', async () => {
    const { root } = await newSpecPage({
      components: [SbbTrain],
      html: '<sbb-train direction-label="Driving direction" station="Bern" direction="left"/>',
    });

    expect(root).toEqualHtml(`
      <sbb-train direction-label="Driving direction" station="Bern" direction="left">
        <mock:shadow-root>
          <div class="sbb-train">
            <div class="sbb-train__sectors">
              <slot />
            </div>
            <div aria-label="Driving direction Bern." class="sbb-train__direction">
              <h3 aria-hidden="true" class="sbb-train__direction-heading">
                <span class="sbb-train__direction-label">Driving direction</span>
                <span class="sbb-train__direction-station">Bern</span>
              </h3>
              <div class="sbb-train__direction-indicator">
                <div class="sbb-train__sticky-wrapper">
                  <sbb-icon class="sbb-train__direction-arrow" name="chevron-small-left-small"></sbb-icon>
                </div>
              </div>
            </div>
          </div>
        </mock:shadow-root>
      </sbb-train>
      `);
  });
  it('renders with right indicator', async () => {
    const { root } = await newSpecPage({
      components: [SbbTrain],
      html: '<sbb-train direction-label="Driving direction" station="Bern" direction="right"/>',
    });

    expect(root).toEqualHtml(`
      <sbb-train direction-label="Driving direction" station="Bern" direction="right">
        <mock:shadow-root>
          <div class="sbb-train">
            <div class="sbb-train__sectors">
              <slot />
            </div>
              <div aria-label="Driving direction Bern." class="sbb-train__direction">
                <h3 aria-hidden="true" class="sbb-train__direction-heading">
                  <span class="sbb-train__direction-label">Driving direction</span>
                  <span class="sbb-train__direction-station">Bern</span>
                </h3>
                <div class="sbb-train__direction-indicator">
                  <div class="sbb-train__sticky-wrapper">
                    <sbb-icon class="sbb-train__direction-arrow" name="chevron-small-right-small"></sbb-icon>
                  </div>
                </div>
              </div>
            </div>
          </mock:shadow-root>
        </sbb-train>
      `);
  });
});
