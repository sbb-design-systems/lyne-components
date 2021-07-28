import events from './lyne-cta-button.events';
import { LyneCtaButton } from './lyne-cta-button';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-cta-button', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneCtaButton],
      html: '<lyne-cta-button label="Label" variant="secondary-negative"></lyne-cta-button>'
    });

    expect(root)
      .toEqualHtml(`
        <lyne-cta-button label="Label" variant="secondary-negative">
          <mock:shadow-root>
            <button class="button button--secondary-negative">
              <span class="button__label">Label</span>
              <span class="button__icon"></span>
            </button>
          </mock:shadow-root>
        </lyne-cta-button>
      `);
  });

  it('Should emit click event on click with no paylod', async () => {
    const page = await newSpecPage({
      components: [LyneCtaButton],
      html: '<lyne-cta-button></lyne-cta-button>',
      supportsShadowDom: true
    });

    const {
      root: {
        shadowRoot
      }
    } = page;

    const button = shadowRoot.querySelector('button');
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
      components: [LyneCtaButton],
      html: `<lyne-cta-button event-id="${eventId}"></lyne-cta-button>`,
      supportsShadowDom: true
    });

    const {
      root: {
        shadowRoot
      }
    } = page;

    const button = shadowRoot.querySelector('button');
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
