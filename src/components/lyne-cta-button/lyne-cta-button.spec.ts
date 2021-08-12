import events from './lyne-cta-button.events';
import { LyneCtaButton } from './lyne-cta-button';
import lyneIcons from 'lyne-icons/dist/icons.json';
import { newSpecPage } from '@stencil/core/testing';

describe('lyne-cta-button', () => {
  it('renders', async () => {
    const {
      root
    } = await newSpecPage({
      components: [LyneCtaButton],
      html: `<lyne-cta-button label="Label" variant="secondary-negative" icon="true">${lyneIcons.icons['arrow-right-small']}</lyne-cta-button>`
    });

    expect(root)
      .toEqualHtml(`
        <lyne-cta-button icon="true" label="Label" variant="secondary-negative">
          <mock:shadow-root>
            <button class="button button--large button--secondary-negative">
              <span class="button__icon">
                <slot></slot>
              </span>
              <span class="button__label">Label</span>
            </button>
          </mock:shadow-root>
          <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" d="m17.8436,12.1382-3.99-3.99196-.7072.70693,3.1366,3.13823H5v1h11.287l-3.1413,3.1555.7086.7056,3.99-4.008.3519-.3535-.3526-.3528z" fill-rule="evenodd"></path>
          </svg>
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
