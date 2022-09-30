import events from './sbb-button.events';
import { SbbButton } from './sbb-button';
import lyneIcons from 'lyne-icons/dist/icons.json';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-button', () => {
  it('renders a primary button without icon', async () => {
    const { root } = await newSpecPage({
      components: [SbbButton],
      html: `<sbb-button variant='primary'>Label Text</sbb-button>`,
    });

    expect(root).toEqualHtml(`
        <sbb-button size='l' variant='primary'>
          <mock:shadow-root>
            <button class='sbb-button sbb-button--size-l sbb-button--primary' dir="ltr" type="button">
              <span class='sbb-button__label'><slot></slot></span>
            </button>
          </mock:shadow-root>
          Label Text
        </sbb-button>
      `);
  });

  it('renders a primary button with slotted icon', async () => {
    const { root } = await newSpecPage({
      components: [SbbButton],
      html: `<sbb-button variant='primary'><span slot='icon'>${lyneIcons.icons['arrow-right-small']}</span>Label Text</sbb-button>`,
    });

    expect(root).toEqualHtml(`
        <sbb-button size='l' variant='primary'>
          <mock:shadow-root>
            <button class='sbb-button sbb-button--size-l sbb-button--primary' dir="ltr" type="button">
              <span class='sbb-button__icon'>
                <slot name='icon'></slot>
              </span>
              <span class='sbb-button__label'><slot></slot></span>
            </button>
          </mock:shadow-root>
          <span slot='icon'>
            <svg height='24' viewBox='0,0,24,24' width='24' xmlns='http://www.w3.org/2000/svg'>
              <path clip-rule='evenodd' d='m17.8436,12.1382-3.99-3.99196-.7072.70693,3.1366,3.13823H5v1h11.287l-3.1413,3.1555.7086.7056,3.99-4.008.3519-.3535-.3526-.3528z' fill-rule='evenodd'></path>
            </svg>
          </span>
          Label Text
        </sbb-button>
      `);
  });

  it('renders a secondary negative button with icon', async () => {
    const { root } = await newSpecPage({
      components: [SbbButton],
      html: `<sbb-button variant='secondary' negative icon-name='arrow-right-small'>Label Text</sbb-button>`,
    });

    expect(root).toEqualHtml(`
        <sbb-button variant='secondary' negative='' size='l' icon-name='arrow-right-small'>
          <mock:shadow-root>
            <button class='sbb-button sbb-button--size-l sbb-button--secondary sbb-button--negative' dir="ltr" type="button">
              <span class='sbb-button__icon'>
                <slot name='icon'>
                  <sbb-icon name="arrow-right-small"></sbb-icon>
                </slot>
              </span>
              <span class='sbb-button__label'><slot></slot></span>
            </button>
          </mock:shadow-root>
          Label Text
        </sbb-button>
      `);
  });

  it('renders a sbb-button inside an anchor as span element', async () => {
    const { root } = await newSpecPage({
      components: [SbbButton],
      html: `<a href="#"><sbb-button variant='secondary' negative><span slot='icon'>${lyneIcons.icons['arrow-right-small']}</span>this is a button</sbb-button></a>`,
    });

    expect(root).toEqualHtml(`
          <sbb-button variant='secondary' negative='' size='l'>
            <mock:shadow-root>
              <span class='sbb-button sbb-button--size-l sbb-button--secondary sbb-button--negative' dir="ltr">
                <span class='sbb-button__icon'>
                  <slot name='icon'></slot>
                </span>
                <span class='sbb-button__label'><slot></slot></span>
              </span>
            </mock:shadow-root>
            <span slot='icon'>
            <svg height='24' viewBox='0,0,24,24' width='24' xmlns='http://www.w3.org/2000/svg'>
              <path clip-rule='evenodd' d='m17.8436,12.1382-3.99-3.99196-.7072.70693,3.1366,3.13823H5v1h11.287l-3.1413,3.1555.7086.7056,3.99-4.008.3519-.3535-.3526-.3528z' fill-rule='evenodd'></path>
            </svg>
            </span>
            this is a button
          </sbb-button>
      `);
  });

  it('Should emit click event on click with no payload', async () => {
    const page = await newSpecPage({
      components: [SbbButton],
      html: '<sbb-button label="I am a button"></sbb-button>',
      supportsShadowDom: true,
    });

    const {
      root: { shadowRoot },
    } = page;

    const button = shadowRoot.querySelector('button');
    const buttonSpy = jest.fn();

    page.win.addEventListener(events.click, buttonSpy);
    button.click();
    await page.waitForChanges();
    expect(buttonSpy).toHaveBeenCalled();
    expect(buttonSpy.mock.calls[0][0].detail).toEqual(undefined);
  });
});
