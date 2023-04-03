import { SbbVisualCheckbox } from './sbb-visual-checkbox';
import { newSpecPage } from '@stencil/core/testing';

describe('sbb-visual-checkbox', () => {
  it('renders unchecked', async () => {
    const { root } = await newSpecPage({
      components: [SbbVisualCheckbox],
      html: '<sbb-visual-checkbox />',
    });

    expect(root).toEqualHtml(`
        <sbb-visual-checkbox>
          <mock:shadow-root>
            <span class="sbb-visual-checkbox">
              <span class="sbb-visual-checkbox__icon">
              </span>
            </span>
          </mock:shadow-root>
        </sbb-visual-checkbox>
      `);
  });

  it('renders checked', async () => {
    const { root } = await newSpecPage({
      components: [SbbVisualCheckbox],
      html: '<sbb-visual-checkbox checked=""/>',
    });

    expect(root).toEqualHtml(`
        <sbb-visual-checkbox checked="">
          <mock:shadow-root>
            <span class="sbb-visual-checkbox">
              <span class="sbb-visual-checkbox__icon">
                <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d='M8 12.3304L10.4615 15L16 9'
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              </span>
            </span>
          </mock:shadow-root>
        </sbb-visual-checkbox>
      `);
  });

  it('renders indeterminate', async () => {
    const { root } = await newSpecPage({
      components: [SbbVisualCheckbox],
      html: '<sbb-visual-checkbox indeterminate=""/>',
    });

    expect(root).toEqualHtml(`
        <sbb-visual-checkbox indeterminate="">
          <mock:shadow-root>
            <span class="sbb-visual-checkbox">
              <span class="sbb-visual-checkbox__icon">
                <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d='M9 12H15'
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              </span>
            </span>
          </mock:shadow-root>
        </sbb-visual-checkbox>
      `);
  });
});
