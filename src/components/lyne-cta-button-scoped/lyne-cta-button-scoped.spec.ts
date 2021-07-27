import events from './lyne-cta-button-scoped.events';
import { LyneCtaButtonScoped } from './lyne-cta-button-scoped';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-cta-button-scoped', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneCtaButtonScoped],
      html: '<lyne-cta-button-scoped label="Label"></lyne-cta-button-scoped>'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-cta-button-scoped label="Label">
          <button class="button">
            <span class="label">Label</span>
            <span class="arrow"></span>
          </button>
        </lyne-cta-button-scoped>
      `);
  });

  it('Should emit click event on click with no paylod', async () => {
    const page = await newSpecPage({
      components: [LyneCtaButtonScoped],
      html: '<lyne-cta-button-scoped></lyne-cta-button-scoped>',
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
      components: [LyneCtaButtonScoped],
      html: `<lyne-cta-button-scoped event-id="${eventId}"></lyne-cta-button-scoped>`,
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
