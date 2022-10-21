import { SbbSlider } from './sbb-slider';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-slider', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbSlider],
      html: '<sbb-slider start-icon="walk-slow-small" end-icon="walk-fast-small" max="500" value="100"/>',
    });

    // The ref(...) function is not executed, so _valueFraction is not evaluated; see e2e tests.
    expect(root).toEqualHtml(`
      <sbb-slider start-icon="walk-slow-small" end-icon="walk-fast-small" max="500" value="100">
        <mock:shadow-root>
          <div class="sbb-slider__wrapper">
            <sbb-icon name="walk-slow-small" slot="prefix"></sbb-icon>
            <div class="sbb-slider__container" style="--sbb-slider-value-fraction: NaN; --sbb-slider-step-fraction: 0;">
              <input class="sbb-slider__range-input" max="500" min="0" value="100" type="range">
              <div class="sbb-slider__line">
                <div class="sbb-slider__selected-line"></div>
              </div>
              <div class="sbb-slider__knob"></div>
            </div>
            <sbb-icon name="walk-fast-small" slot="suffix"></sbb-icon>
          </div>
        </mock:shadow-root>
      </sbb-slider>
    `);
  });
});
