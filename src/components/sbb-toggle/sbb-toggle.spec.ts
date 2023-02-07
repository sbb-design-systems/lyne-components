import { SbbToggle } from './sbb-toggle';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { SbbToggleOption } from '../sbb-toggle-option/sbb-toggle-option';

describe('sbb-toggle', () => {
  let option: HTMLSbbToggleOptionElement, page: SpecPage;
  const toggleComponents = [SbbToggle, SbbToggleOption];
  const simpleToggleTemplate = `
      <sbb-toggle>
        <sbb-toggle-option value="Value one">Value one</sbb-toggle-option>
        <sbb-toggle-option value="Value two">Value two</sbb-toggle-option>
      </sbb-toggle>
    `;

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

  describe('value', () => {
    it('should select the correct option by setting value via attribute', async () => {
      page = await newSpecPage({
        components: toggleComponents,
        html: `
          <sbb-toggle value="Value two">
            <sbb-toggle-option value="Value one">Value one</sbb-toggle-option>
            <sbb-toggle-option value="Value two">Value two</sbb-toggle-option>
          </sbb-toggle>
        `,
      });
      option = page.doc.querySelectorAll('sbb-toggle-option')[1];

      await page.waitForChanges();

      expect(option).toHaveAttribute('checked');
    });

    it('should select the correct option by setting value programmatically', async () => {
      page = await newSpecPage({
        components: toggleComponents,
        html: simpleToggleTemplate,
      });
      option = page.doc.querySelectorAll('sbb-toggle-option')[1];
      const toggle = page.doc.querySelector('sbb-toggle');
      toggle.value = 'Value two';

      await page.waitForChanges();

      expect(option).toHaveAttribute('checked');
    });

    it('should update the value of the sbb-toggle when the value of a checked option changes', async () => {
      page = await newSpecPage({
        components: toggleComponents,
        html: simpleToggleTemplate,
      });
      option = page.doc.querySelectorAll('sbb-toggle-option')[0];
      option.value = 'Changed';
      const toggle = page.doc.querySelector('sbb-toggle');

      await page.waitForChanges();

      expect(toggle.value).toBe(option.value);
    });

    it('should not update the value of the sbb-toggle when the value of a unchecked option changes', async () => {
      page = await newSpecPage({
        components: toggleComponents,
        html: simpleToggleTemplate,
      });
      option = page.doc.querySelectorAll('sbb-toggle-option')[1];
      option.value = 'Changed';
      const toggle = page.doc.querySelector('sbb-toggle');

      await page.waitForChanges();

      expect(toggle.value).not.toBe(option.value);
    });
  });

  describe('checked', () => {
    it('should initially have the checked attributes on the first option by default', async () => {
      page = await newSpecPage({
        components: toggleComponents,
        html: simpleToggleTemplate,
      });
      option = page.doc.querySelectorAll('sbb-toggle-option')[0];

      await page.waitForChanges();

      expect(option).toHaveAttribute('checked');
    });

    it('should initially have the checked property set to true on the first option by default', async () => {
      page = await newSpecPage({
        components: toggleComponents,
        html: simpleToggleTemplate,
      });
      option = page.doc.querySelectorAll('sbb-toggle-option')[0];

      await page.waitForChanges();

      expect(option.checked).toBe(true);
    });

    it('should select the correct option by setting checked on the option', async () => {
      page = await newSpecPage({
        components: toggleComponents,
        html: simpleToggleTemplate,
      });
      option = page.doc.querySelectorAll('sbb-toggle-option')[1];
      option.checked = true;

      await page.waitForChanges();

      expect(option).toHaveAttribute('checked');
    });

    it('should select the correct option by setting the checked attribute on the option', async () => {
      page = await newSpecPage({
        components: toggleComponents,
        html: `
        <sbb-toggle>
          <sbb-toggle-option value="Value one">Value one</sbb-toggle-option>
          <sbb-toggle-option value="Value two" checked>Value two</sbb-toggle-option>
        </sbb-toggle>
      `,
      });
      option = page.doc.querySelectorAll('sbb-toggle-option')[1];
      option.checked = true;

      await page.waitForChanges();

      expect(option).toHaveAttribute('checked');
    });

    it('should check first option when unchecking all options', async () => {
      page = await newSpecPage({
        components: toggleComponents,
        html: simpleToggleTemplate,
      });
      option = page.doc.querySelectorAll('sbb-toggle-option')[0];
      option.checked = false;

      await page.waitForChanges();

      expect(option.checked).toBe(true);
    });
  });

  describe('disabled', () => {
    it('should sync disabled state with options', async () => {
      page = await newSpecPage({
        components: toggleComponents,
        html: `
          <sbb-toggle disabled>
            <sbb-toggle-option value="Value one">Value one</sbb-toggle-option>
            <sbb-toggle-option value="Value two">Value two</sbb-toggle-option>
          </sbb-toggle>
        `,
      });
      const options = Array.from(page.doc.querySelectorAll('sbb-toggle-option'));

      await page.waitForChanges();

      options.forEach((option) => expect(option).toHaveAttribute('disabled'));
    });

    it('should prevent disabled option from unsetting disabled', async () => {
      page = await newSpecPage({
        components: toggleComponents,
        html: `
          <sbb-toggle disabled>
            <sbb-toggle-option value="Value one">Value one</sbb-toggle-option>
            <sbb-toggle-option value="Value two">Value two</sbb-toggle-option>
          </sbb-toggle>
        `,
      });
      option = page.doc.querySelectorAll('sbb-toggle-option')[0];
      option.disabled = false;

      await page.waitForChanges();

      expect(option).toHaveAttribute('disabled');
    });

    it('should prevent enabled option from setting disabled', async () => {
      page = await newSpecPage({
        components: toggleComponents,
        html: simpleToggleTemplate,
      });
      option = page.doc.querySelectorAll('sbb-toggle-option')[0];
      option.disabled = true;

      await page.waitForChanges();

      expect(option).not.toHaveAttribute('disabled');
    });
  });
});
