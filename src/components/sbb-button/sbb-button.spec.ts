import { SbbButton } from './sbb-button';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-button', () => {
  it('renders a primary button without icon', async () => {
    const { root } = await newSpecPage({
      components: [SbbButton],
      html: `
        <sbb-button
          variant="primary"
          negative
          size="m"
          type="button"
          disabled
          name="name"
          value="value"
          form="formid"
        >
          Label Text
        </sbb-button>`,
    });

    expect(root).toEqualHtml(`
        <sbb-button
          variant="primary"
          negative
          size="m"
          type="button"
          disabled
          aria-disabled="true"
          name="name"
          value="value"
          form="formid"
          role="button"
          dir="ltr"
        >
          <mock:shadow-root>
            <span class="sbb-button">
              <span class="sbb-button__label"><slot></slot></span>
            </span>
          </mock:shadow-root>
          Label Text
        </sbb-button>
      `);
  });

  it('renders a primary button with slotted icon', async () => {
    const { root } = await newSpecPage({
      components: [SbbButton],
      html: `<sbb-button variant='primary'><sbb-icon slot='icon' name='chevron-small-left-small'></sbb-icon>Label Text</sbb-button>`,
    });

    expect(root).toEqualHtml(`
        <sbb-button size="l" variant="primary" role="button" tabindex="0" dir="ltr">
          <mock:shadow-root>
            <span class="sbb-button">
              <span class="sbb-button__icon">
                <slot name="icon"></slot>
              </span>
              <span class="sbb-button__label"><slot></slot></span>
            </span>
          </mock:shadow-root>
          <sbb-icon slot="icon" name="chevron-small-left-small"></sbb-icon>
          Label Text
        </sbb-button>
      `);
  });

  it('renders a button as a link', async () => {
    const { root } = await newSpecPage({
      components: [SbbButton],
      html: `
        <sbb-button
          href="http://www.sbb.ch"
          target="_blank"
          rel="noopener"
          download
        >
          Label Text
        </sbb-button>`,
    });

    expect(root).toEqualHtml(`
        <sbb-button
          variant="primary"
          size="l"
          href="http://www.sbb.ch"
          target="_blank"
          rel="noopener"
          download
          role="link"
          tabindex="0"
          dir="ltr"
        >
          <mock:shadow-root>
            <a
              class="sbb-button"
              href="http://www.sbb.ch"
              target="_blank"
              rel="noopener"
              download
              role="gridcell"
              tabindex="-1"
             >
              <span class='sbb-button__label'>
                <slot></slot>
                <span class="sbb-button__opens-in-new-window">
                  . Link target opens in new window.
                </span>
              </span>
            </a>
          </mock:shadow-root>
          Label Text
        </sbb-button>
      `);
  });

  it('renders a sbb-button inside an anchor as span element', async () => {
    const { root } = await newSpecPage({
      components: [SbbButton],
      html: `<a href="#"><sbb-button variant='secondary' negative>this is a button</sbb-button></a>`,
    });

    expect(root).toEqualHtml(`
          <sbb-button variant='secondary' negative size='l' is-static dir="ltr">
            <mock:shadow-root>
              <span class='sbb-button'>
                <span class='sbb-button__label'><slot></slot></span>
              </span>
            </mock:shadow-root>
            this is a button
          </sbb-button>
      `);
  });

  it('renders a sbb-button as span element by setting is-static property', async () => {
    const { root } = await newSpecPage({
      components: [SbbButton],
      html: `<sbb-button variant='secondary' is-static>this is a static button</sbb-button>`,
    });

    expect(root).toEqualHtml(`
          <sbb-button variant='secondary' size='l' is-static dir="ltr">
            <mock:shadow-root>
              <span class='sbb-button'>
                <span class='sbb-button__label'><slot></slot></span>
              </span>
            </mock:shadow-root>
            this is a static button
          </sbb-button>
      `);
  });

  it('should detect icon button', async () => {
    const { root } = await newSpecPage({
      components: [SbbButton],
      html: `<sbb-button><sbb-icon name="app-icon-medium"></sbb-icon></sbb-button>`,
    });

    expect(root).toHaveAttribute('data-icon-only');
  });

  it('should detect icon button when there is space around icon', async () => {
    const { root } = await newSpecPage({
      components: [SbbButton],
      html: `<sbb-button> <sbb-icon name="app-icon-medium"></sbb-icon> </sbb-button>`,
    });

    expect(root).toHaveAttribute('data-icon-only');
  });

  it('should render form field button variant when inside of a form field', async () => {
    const { root } = await newSpecPage({
      components: [SbbButton],
      html: `
      <sbb-form-field>
        <input />
        <sbb-button slot="suffix" icon-name="cross-small"/>
      </sbb-form-field>`,
    });

    expect(root).toHaveAttribute('data-icon-small');
  });
});
