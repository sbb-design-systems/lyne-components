import { SbbSlider } from './sbb-slider';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-slider', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbSlider],
      html: '<sbb-slider />',
    });

    expect(root).toEqualHtml(`
        <sbb-slider>
          <mock:shadow-root>
               <div class="slider__wrapper">
                 <sbb-icon slot="prefix"></sbb-icon>
                 <div class="slider__container" style="--slider-value-fraction: NaN; --slider-step-fraction: 0;">
                   <input class="slider__range-input" max="100" min="0" type="range">
                   <div class="slider__line">
                     <div class="slider__selected-line"></div>
                   </div>
                   <div class="slider__knob"></div>
                 </div>
                 <sbb-icon slot="suffix"></sbb-icon>
               </sbb-form-field>
          </mock:shadow-root>
        </sbb-slider>
      `);
  });
});
