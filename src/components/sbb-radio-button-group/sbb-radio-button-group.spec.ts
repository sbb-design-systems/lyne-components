import { SbbRadioButtonGroup } from './sbb-radio-button-group';
import { newSpecPage } from '@stencil/core/testing';
import { SbbRadioButton } from '../sbb-radio-button/sbb-radio-button';

describe('sbb-radio-button-group', () => {
  let component, page;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [SbbRadioButtonGroup, SbbRadioButton],
      html: `<sbb-radio-button-group aria-label="radio-group-name" name="radio-group-name" value="Value two">
              <sbb-radio-button value="Value one">Value one</sbb-radio-button>
              <sbb-radio-button value="Value two">Value two</sbb-radio-button>
              <sbb-radio-button value="Value three" disabled>Value three</sbb-radio-button>
              <sbb-radio-button value="Value four">Value four</sbb-radio-button>
            </sbb-radio-button-group>`,
      supportsShadowDom: true,
    });
    component = page.doc.querySelector('sbb-radio-button-group');
  });

  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [SbbRadioButtonGroup],
      html: '<sbb-radio-button-group />',
    });

    expect(root).toEqualHtml(`
        <sbb-radio-button-group aria-label="sbb-radio-button-group-2-name" role="radiogroup">
          <mock:shadow-root>
          <div class="sbb-radio-group">
            <slot></slot>
          </div>
          </mock:shadow-root>
        </sbb-radio-button-group>
      `);
  });

  it('checks the correct radio based on the value property', async () => {
    const radios = page.root.querySelectorAll('sbb-radio-button');
    await page.waitForChanges();
    expect(radios[1]).toHaveAttribute('checked');

    component.value = 'Value one';
    await page.waitForChanges();
    expect(radios[0]).toHaveAttribute('checked');

    await page.waitForChanges();
    expect(component.value).toBe('Value one');
  });
});
