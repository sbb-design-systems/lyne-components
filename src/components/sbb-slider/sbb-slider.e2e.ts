import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

const keyboardPressTimes = async (page: E2EPage, key: string, times = 1): Promise<void> => {
  const input = await page.find('sbb-slider');
  await input.focus();
  for (let i = 0; i < times; i++) {
    await input.press(key);
  }
  await page.waitForChanges();
};

describe('sbb-slider', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-slider start-icon="walk-slow-small" end-icon="walk-fast-small" max="500" min="100" value="400"/>
    `);
    element = await page.find('sbb-slider');
  });

  // NOTE: value at line 37 is not reflected; probably related to bug https://github.com/ionic-team/stencil/issues/2946
  it('renders', async () => {
    expect(element).toHaveClass('hydrated');

    // Wait five seconds in hope the icons will successfully be loaded
    // TODO: Find more reliable solution
    await new Promise((res) => setTimeout(res, 5000));
    await page.waitForChanges();

    expect(element).toEqualHtml(`
      <sbb-slider
        role="slider"
        tabindex="0"
        aria-disabled="false"
        aria-readonly="false"
        aria-valuemax="500"
        aria-valuemin="100"
        aria-valuenow="400"
        class="hydrated"
        start-icon="walk-slow-small"
        end-icon="walk-fast-small"
        max="500"
        min="100"
        value="400">
        <mock:shadow-root>
          <div class="sbb-slider__height-container">
            <div class="sbb-slider__wrapper">
              <slot name="prefix">
                <sbb-icon aria-hidden="true" class="hydrated" data-namespace="default" name="walk-slow-small" role="img"></sbb-icon>
              </slot>
              <div class="sbb-slider__container" style="--sbb-slider-value-fraction: 0.75;">
                <input class="sbb-slider__range-input" max="500" min="100" tabindex="-1" type="range">
                <div class="sbb-slider__line">
                  <div class="sbb-slider__selected-line"></div>
                </div>
                <div class="sbb-slider__knob"></div>
              </div>
              <slot name="suffix">
                <sbb-icon aria-hidden="true" class="hydrated" data-namespace="default" name="walk-fast-small" role="img"></sbb-icon>
              </slot>
            </div>
          </div>
        </mock:shadow-root>
      </sbb-slider>
    `);
  });

  it('should decrease value by two on left arrow keypress', async () => {
    const changeEvent = await element.spyOnEvent('change');
    await keyboardPressTimes(page, 'ArrowLeft', 2);
    expect(changeEvent).toHaveReceivedEvent();
    expect(await element.getProperty('value')).toEqual('398');
    expect(await element.getProperty('valueAsNumber')).toEqual(398);
  });

  it('should decrease value by two on down arrow keypress', async () => {
    const changeEvent = await element.spyOnEvent('change');
    await keyboardPressTimes(page, 'ArrowDown', 2);
    expect(changeEvent).toHaveReceivedEvent();
    expect(await element.getProperty('value')).toEqual('398');
    expect(await element.getProperty('valueAsNumber')).toEqual(398);
  });

  it('should increase value by one on right arrow keypress', async () => {
    const changeEvent = await element.spyOnEvent('change');
    await keyboardPressTimes(page, 'ArrowRight');
    expect(changeEvent).toHaveReceivedEvent();
    expect(await element.getProperty('value')).toEqual('401');
    expect(await element.getProperty('valueAsNumber')).toEqual(401);
  });

  it('should increase value by one on up arrow keypress', async () => {
    const changeEvent = await element.spyOnEvent('change');
    await keyboardPressTimes(page, 'ArrowUp');
    expect(changeEvent).toHaveReceivedEvent();
    expect(await element.getProperty('value')).toEqual('401');
    expect(await element.getProperty('valueAsNumber')).toEqual(401);
  });

  it('should not change value on arrow keypress if disabled', async () => {
    const changeEvent = await element.spyOnEvent('change');
    const slider = await page.find('sbb-slider');
    slider.setAttribute('disabled', '');
    await keyboardPressTimes(page, 'ArrowLeft');
    expect(changeEvent).not.toHaveReceivedEvent();
    await keyboardPressTimes(page, 'ArrowRight');
    expect(changeEvent).not.toHaveReceivedEvent();
    await keyboardPressTimes(page, 'ArrowUp');
    expect(changeEvent).not.toHaveReceivedEvent();
    await keyboardPressTimes(page, 'ArrowDown');
    expect(changeEvent).not.toHaveReceivedEvent();
  });
});
