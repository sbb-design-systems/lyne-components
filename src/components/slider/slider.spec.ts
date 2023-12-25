import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../core/testing';

import './slider';

describe('sbb-slider', () => {
  it('renders', async () => {
    const root = await fixture(
      html`<sbb-slider
        start-icon="walk-slow-small"
        end-icon="walk-fast-small"
        max="500"
        value="100"
      ></sbb-slider>`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(`
      <sbb-slider
        role="slider"
        tabindex="0"
        start-icon="walk-slow-small"
        end-icon="walk-fast-small"
        max="500"
        value="100"
        name=''
        aria-disabled="false"
        aria-readonly="false"
        aria-valuemax="500"
        aria-valuemin="0"
        aria-valuenow="100">
      </sbb-slider>
    `);

    expect(root).shadowDom.to.be.equal(`
      <div class="sbb-slider__height-container">
        <div class="sbb-slider__wrapper">
          <slot name="prefix">
            <sbb-icon aria-hidden="true" data-namespace="default" name="walk-slow-small" role="img">
          </slot>
          <div class="sbb-slider__container" style="--sbb-slider-value-fraction:0.2;">
            <input class="sbb-slider__range-input" max="500" min="0" tabindex="-1" value="100" valueasnumber="100" type="range">
            <div class="sbb-slider__line">
              <div class="sbb-slider__selected-line"></div>
            </div>
            <div class="sbb-slider__knob"></div>
          </div>
          <slot name="suffix">
            <sbb-icon aria-hidden="true" data-namespace="default" name="walk-fast-small" role="img">
          </slot>
        </div>
      </div>
    `);
  });

  it('renders with no icons and default min/max', async () => {
    const root = await fixture(html`<sbb-slider value="1"></sbb-slider>`);

    expect(root).dom.to.be.equal(`
      <sbb-slider aria-disabled="false" aria-readonly="false" aria-valuemax="100" aria-valuemin="0" aria-valuenow="1" role="slider" tabindex="0" value='1' name=''></sbb-slider>
    `);

    expect(root).shadowDom.to.be.equal(`
      <div class="sbb-slider__height-container">
        <div class="sbb-slider__wrapper">
          <slot name="prefix"></slot>
            <div class="sbb-slider__container" style="--sbb-slider-value-fraction:0.01;">
              <input class="sbb-slider__range-input" max="100" min="0" tabindex="-1" value="1" valueasnumber="1" type="range">
              <div class="sbb-slider__line">
                <div class="sbb-slider__selected-line"></div>
              </div>
              <div class="sbb-slider__knob"></div>
            </div>
          <slot name="suffix"></slot>
        </div>
      </div>
    `);
  });
});
