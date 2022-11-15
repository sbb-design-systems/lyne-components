import { SbbFormField } from '../sbb-form-field/sbb-form-field';
import { SbbSlider } from './sbb-slider';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-slider', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbSlider],
      html: '<sbb-slider start-icon="walk-slow-small" end-icon="walk-fast-small" max="500" value="100"/>',
    });

    expect(root).toEqualHtml(`
      <sbb-slider start-icon="walk-slow-small" end-icon="walk-fast-small" max="500" value="100">
        <mock:shadow-root>
          <div class="sbb-slider__height-container">
            <div class="sbb-slider__wrapper">
              <slot name="prefix">
                <sbb-icon name="walk-slow-small"></sbb-icon>
              </slot>
              <div class="sbb-slider__container" style="--sbb-slider-value-fraction: 0.2;">
                <input class="sbb-slider__range-input" max="500" min="0" value="100" type="range">
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

  it('renders in sbb-form-field with data-sbb-form-field attribute', async () => {
    const { root } = await newSpecPage({
      components: [SbbFormField, SbbSlider],
      html: '<sbb-form-field><sbb-slider/></sbb-form-field>',
    });

    expect(root).toEqualHtml(`
      <sbb-form-field class="form-field--error-space-none form-field--size-m">
        <mock:shadow-root>
          <div class="form-field__space-wrapper">
            <div class="form-field__wrapper">
              <slot name="prefix"></slot>
              <div class="form-field__input-container">
                <div class="form-field__input">
                  <slot></slot>
                </div>
              </div>
              <slot name="suffix"></slot>
            </div>
            <div class="form-field__error form-field__error--empty">
              <slot name="error"></slot>
            </div>
          </div>
        </mock:shadow-root>
        <sbb-slider data-sbb-form-field>
          <mock:shadow-root>
            <div class="sbb-slider__height-container">
              <div class="sbb-slider__wrapper">
                <slot name="prefix"></slot>
                <div class="sbb-slider__container" style="--sbb-slider-value-fraction: 0.5;">
                  <input class="sbb-slider__range-input" max="100" min="0" type="range">
                  <div class="sbb-slider__line">
                    <div class="sbb-slider__selected-line"></div>
                  </div>
                  <div class="sbb-slider__knob"></div>
                </div>
                <slot name="suffix"></slot>
              </div>
            </div>
          </mock:shadow-root>
        </sbb-slider>
      </sbb-form-field>
    `);
  });

  it('renders with no icons and default min/max', async () => {
    const { root } = await newSpecPage({
      components: [SbbSlider],
      html: '<sbb-slider value="1"/>',
    });

    expect(root).toEqualHtml(`
      <sbb-slider value='1'>
        <mock:shadow-root>
          <div class="sbb-slider__height-container">
            <div class="sbb-slider__wrapper">
              <slot name="prefix"></slot>
                <div class="sbb-slider__container" style="--sbb-slider-value-fraction: 0.01;">
                  <input class="sbb-slider__range-input" max="100" min="0" value="1" type="range">
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
