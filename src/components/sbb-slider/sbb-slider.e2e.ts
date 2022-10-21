import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-slider with no step', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-slider start-icon="walk-slow-small" end-icon="walk-fast-small" max="500" min="100" value="400"/>
    `);
    element = await page.find('sbb-slider');
  });

  it('renders', async () => {
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

  it('should decrease value by four unit clicking on start icon', async () => {
    const sbbSliderChange = await page.spyOnEvent('sbbChange');
    const startIcon = await page.find('sbb-slider >>> [name="walk-slow-small"]');
    startIcon.triggerEvent('click');
    startIcon.triggerEvent('click');
    startIcon.triggerEvent('click');
    startIcon.triggerEvent('click');
    await page.waitForChanges();
    expect(sbbSliderChange).toHaveReceivedEventDetail({
      max: 500,
      min: 100,
      value: 396,
    });
  });

  it('should increase value by three unit clicking on end icon', async () => {
    const sbbSliderChange = await page.spyOnEvent('sbbChange');
    const startIcon = await page.find('sbb-slider >>> [name="walk-fast-small"]');
    startIcon.triggerEvent('click');
    startIcon.triggerEvent('click');
    startIcon.triggerEvent('click');
    await page.waitForChanges();
    expect(sbbSliderChange).toHaveReceivedEventDetail({
      max: 500,
      min: 100,
      value: 403,
    });
  });

  it('should decrease value by two on left arrow keypress', async () => {
    const sbbSliderChange = await page.spyOnEvent('sbbChange');
    const input = await page.find('sbb-slider >>> input');
    await input.focus();
    await input.press('ArrowLeft');
    await input.press('ArrowLeft');
    await page.waitForChanges();
    expect(sbbSliderChange).toHaveReceivedEventDetail({
      max: 500,
      min: 100,
      value: 398,
    });
  });

  it('should increase value by one on right arrow keypress', async () => {
    const sbbSliderChange = await page.spyOnEvent('sbbChange');
    const input = await page.find('sbb-slider >>> input');
    await input.focus();
    await input.press('ArrowRight');
    await page.waitForChanges();
    expect(sbbSliderChange).toHaveReceivedEventDetail({
      max: 500,
      min: 100,
      value: 401,
    });
  });
});

describe('sbb-slider with step and no default value', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-slider start-icon="walk-slow-small" end-icon="walk-fast-small" max="1000" step="100"/>
    `);
    element = await page.find('sbb-slider');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
    await page.waitForChanges();

    // NOTE: value at line 22 is not reflected; probably related to bug https://github.com/ionic-team/stencil/issues/2946
    expect(element).toEqualHtml(`
      <sbb-slider class="hydrated" start-icon="walk-slow-small" end-icon="walk-fast-small" max="1000" step="100">
        <mock:shadow-root>
          <div class="sbb-slider__wrapper">
            <slot name="prefix">
              <sbb-icon aria-hidden="true" class="hydrated sbb-icon walk-slow-small" name="walk-slow-small" role="img"></sbb-icon>
            </slot>
            <div class="sbb-slider__container" style="--sbb-slider-value-fraction: 0.5; --sbb-slider-step-fraction: 0.1;">
              <input class="sbb-slider__range-input" max="1000" step="100" min="0" type="range">
              <div class="sbb-slider__line sbb-slider__line--stepped">
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

  it('should decrease value by four step clicking on start icon', async () => {
    const sbbSliderChange = await page.spyOnEvent('sbbChange');
    const startIcon = await page.find('sbb-slider >>> [name="walk-slow-small"]');
    startIcon.triggerEvent('click');
    startIcon.triggerEvent('click');
    startIcon.triggerEvent('click');
    startIcon.triggerEvent('click');
    await page.waitForChanges();
    expect(sbbSliderChange).toHaveReceivedEventDetail({
      max: 1000,
      min: 0,
      value: 100,
    });
  });

  it('should increase value by three step clicking on end icon', async () => {
    const sbbSliderChange = await page.spyOnEvent('sbbChange');
    const startIcon = await page.find('sbb-slider >>> [name="walk-fast-small"]');
    startIcon.triggerEvent('click');
    startIcon.triggerEvent('click');
    startIcon.triggerEvent('click');
    await page.waitForChanges();
    expect(sbbSliderChange).toHaveReceivedEventDetail({
      max: 1000,
      min: 0,
      value: 800,
    });
  });

  it('should decrease value by two step on left arrow keypress', async () => {
    const sbbSliderChange = await page.spyOnEvent('sbbChange');
    const input = await page.find('sbb-slider >>> input');
    await input.focus();
    await input.press('ArrowLeft');
    await input.press('ArrowLeft');
    await page.waitForChanges();
    expect(sbbSliderChange).toHaveReceivedEventDetail({
      max: 1000,
      min: 0,
      value: 300,
    });
  });

  it('should increase value by one step on right arrow keypress', async () => {
    const sbbSliderChange = await page.spyOnEvent('sbbChange');
    const input = await page.find('sbb-slider >>> input');
    await input.focus();
    await input.press('ArrowRight');
    await page.waitForChanges();
    expect(sbbSliderChange).toHaveReceivedEventDetail({
      max: 1000,
      min: 0,
      value: 600,
    });
  });
});
