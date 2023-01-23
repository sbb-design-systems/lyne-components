import { SbbToggle } from './sbb-toggle';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { SbbToggleOption } from '../sbb-toggle-option/sbb-toggle-option';

describe('sbb-toggle', () => {
  let option: HTMLSbbToggleOptionElement, page: SpecPage;

  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbToggle],
      html: '<sbb-toggle />',
    });

    expect(root).toEqualHtml(`
        <sbb-toggle role="radiogroup" size="m">
          <mock:shadow-root>
            <div class="sbb-toggle">
              <slot></slot>
            </div>
          </mock:shadow-root>
        </sbb-toggle>
      `);
  });

  it('selects the corect option', async () => {
    page = await newSpecPage({
      components: [SbbToggle, SbbToggleOption],
      html: `
        <sbb-toggle value="Value one">
          <sbb-toggle-option id="sbb-toggle-option-1" value="Value one">Value one</sbb-toggle-option>
          <sbb-toggle-option id="sbb-toggle-option-2" value="Value two">Value two</sbb-toggle-option>
        </sbb-toggle>
      `,
    });
    option = page.doc.querySelector('#sbb-toggle-option-2');

    await option.select();
    await page.waitForChanges();

    expect(option).toHaveAttribute('checked');
  });
});
