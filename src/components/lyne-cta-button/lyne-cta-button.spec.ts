import events from './lyne-cta-button.events';
import { LyneCtaButton } from './lyne-cta-button';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-cta-button', () => {
  it('renders', async () => {
    const {root} = await newSpecPage({
      components: [LyneCtaButton],
      html: '<lyne-cta-button label="Label"></lyne-cta-button>'
    });

    expect(root).toEqualHtml(`
      <lyne-cta-button label="Label">
        <mock:shadow-root>
          <button class="button" style="font-size: 1rem;">Label</button>
        </mock:shadow-root>
      </lyne-cta-button>
    `);
  });

  it('Should emit click event on click with no paylod', async () => {
    let page = await newSpecPage({
      components: [LyneCtaButton],
      html: `<lyne-cta-button></lyne-cta-button>`,
      supportsShadowDom: true
    });

    let shadowRoot = page.root.shadowRoot;
    let button = shadowRoot.querySelector('button');
    let buttonSpy = jest.fn();
    page.win.addEventListener(events.click, buttonSpy);
    button.click();
    await page.waitForChanges();
    expect(buttonSpy).toHaveBeenCalled();
    expect(buttonSpy.mock.calls[0][0].detail).toEqual(undefined);
  });

  it('Should emit click event on click with correct payload', async () => {
    let eventId = 'testId';
    let page = await newSpecPage({
      components: [LyneCtaButton],
      html: `<lyne-cta-button event-id="${eventId}"></lyne-cta-button>`,
      supportsShadowDom: true
    });

    let shadowRoot = page.root.shadowRoot;
    let button = shadowRoot.querySelector('button');
    let buttonSpy = jest.fn();
    page.win.addEventListener(events.click, buttonSpy);
    button.click();
    await page.waitForChanges();
    expect(buttonSpy).toHaveBeenCalled();
    expect(buttonSpy.mock.calls[0][0].detail).toEqual(eventId);
  });


});
