import { SbbSlider } from './sbb-slider';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-slider', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbSlider],
      html: '<sbb-slider start-icon="walk-slow-small" end-icon="walk-fast-small" max="500" value="100"/>',
    });

    expect(root).toEqualHtml(`
      <sbb-slider
        role="slider"
        tabindex="0"
        start-icon="walk-slow-small"
        end-icon="walk-fast-small"
        max="500"
        value="100"
        aria-disabled="false"
        aria-readonly="false"
        aria-valuemax="500"
        aria-valuemin="0"
        aria-valuenow="100">
        <mock:shadow-root>
          <div class="sbb-slider__height-container">
            <div class="sbb-slider__wrapper">
              <slot name="prefix">
                <sbb-icon name="walk-slow-small"></sbb-icon>
              </slot>
              <div class="sbb-slider__container" style="--sbb-slider-value-fraction: 0.2;">
                <input class="sbb-slider__range-input" max="500" min="0" tabindex="-1" value="100" type="range">
                <div class="sbb-slider__line">
                  <div class="sbb-slider__selected-line"></div>
                </div>
                <div class="sbb-slider__knob"></div>
              </div>
              <slot name="suffix">
                <sbb-icon name="walk-fast-small"></sbb-icon>
              </slot>
            </div>
          </div>
        </mock:shadow-root>
      </sbb-slider>
    `);
  });

  it('renders with no icons and default min/max', async () => {
    const { root } = await newSpecPage({
      components: [SbbSlider],
      html: '<sbb-slider value="1"/>',
    });

    expect(root).toEqualHtml(`
      <sbb-slider aria-disabled="false" aria-readonly="false" aria-valuemax="100" aria-valuemin="0" aria-valuenow="1" role="slider" tabindex="0" value='1'>
        <mock:shadow-root>
          <div class="sbb-slider__height-container">
            <div class="sbb-slider__wrapper">
              <slot name="prefix"></slot>
                <div class="sbb-slider__container" style="--sbb-slider-value-fraction: 0.01;">
                  <input class="sbb-slider__range-input" max="100" min="0" tabindex="-1" value="1" type="range">
                  <div class="sbb-slider__line">
                    <div class="sbb-slider__selected-line"></div>
                  </div>
                  <div class="sbb-slider__knob"></div>
                </div>
              <slot name="suffix"></slot>
            </div>
          </div>
        </mock:shadow-root>
      </sbb-slidervalue>
    `);
  });
});
