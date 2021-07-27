import events from './lyne-cta-button-no-shadow.events';
import { LyneCtaButtonNoShadow } from './lyne-cta-button-no-shadow';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-cta-button-no-shadow', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneCtaButtonNoShadow],
      html: '<lyne-cta-button-no-shadow label="Label"></lyne-cta-button-no-shadow>'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-cta-button-no-shadow label="Label">
          <button class="button">
            <span class="label">Label</span>
            <span class="arrow"></span>
          </button>
        </lyne-cta-button-no-shadow>
      `);
  });

  it('Should emit click event on click with no paylod', async () => {
    const page = await newSpecPage({
      components: [LyneCtaButtonNoShadow],
      html: '<lyne-cta-button-no-shadow></lyne-cta-button-no-shadow>',
      supportsShadowDom: false
    });

    const {
      root
    } = page;

    const button = root.querySelector('button');
    const buttonSpy = jest.fn();

    page.win.addEventListener(events.click, buttonSpy);
    button.click();
    await page.waitForChanges();
    expect(buttonSpy)
      .toHaveBeenCalled();
    expect(buttonSpy.mock.calls[0][0].detail)
      .toEqual(undefined);
  });

  it('Should emit click event on click with correct payload', async () => {
    const eventId = 'testId';
    const page = await newSpecPage({
      components: [LyneCtaButtonNoShadow],
      html: `<lyne-cta-button-no-shadow event-id="${eventId}"></lyne-cta-button-no-shadow>`,
      supportsShadowDom: false
    });

    const {
      root
    } = page;

    const button = root.querySelector('button');
    const buttonSpy = jest.fn();

    page.win.addEventListener(events.click, buttonSpy);
    button.click();
    await page.waitForChanges();
    expect(buttonSpy)
      .toHaveBeenCalled();
    expect(buttonSpy.mock.calls[0][0].detail)
      .toEqual(eventId);
  });

});
