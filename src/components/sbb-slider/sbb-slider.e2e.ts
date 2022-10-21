import { newE2EPage } from '@stencil/core/testing';

describe('sbb-slider', () => {
  let element, page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-slider start-icon="walk-slow-small" end-icon="walk-fast-small" max="500" min="100" value="400"/>
    `);

    element = await page.find('sbb-slider');
    expect(element).toHaveClass('hydrated');
    await page.waitForChanges();

    // NOTE: value at line 22 is not reflected; probably related to bug https://github.com/ionic-team/stencil/issues/2946
    expect(element).toEqualHtml(`
      <sbb-slider class="hydrated" start-icon="walk-slow-small" end-icon="walk-fast-small" max="500" min="100" value="400">
        <mock:shadow-root>
          <div class="sbb-slider__wrapper">
            <slot name="prefix">
              <sbb-icon aria-hidden="true" class="hydrated sbb-icon walk-slow-small" name="walk-slow-small" role="img"></sbb-icon>
            </slot>
            <div class="sbb-slider__container" style="--sbb-slider-value-fraction: 0.75; --sbb-slider-step-fraction: 0.25;">
              <input class="sbb-slider__range-input" max="500" min="100" type="range">
              <div class="sbb-slider__line">
                <div class="sbb-slider__selected-line"></div>
              </div>
              <div class="sbb-slider__knob"></div>
            </div>
            <slot name="suffix">
              <sbb-icon aria-hidden="true" class="hydrated sbb-icon walk-fast-small" name="walk-fast-small" role="img"></sbb-icon>
            </slot>
          </div>
        </mock:shadow-root>
      </sbb-slider>
    `);
  });
});
