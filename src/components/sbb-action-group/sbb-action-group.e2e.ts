import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-action-group', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-action-group align="start" orientation="horizontal">
        <sbb-button variant="secondary">Button</sbb-button>
        <sbb-link
          icon-name="chevron-small-left-small"
          icon-placement="start"
          href="https://github.com/lyne-design-system/lyne-components">
          Link
        </sbb-link>
      </sbb-action-group>
    `);
    element = await page.find('sbb-action-group');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  describe('property sync', () => {
    it('should sync default size with sbb-button', async () => {
      await page.waitForChanges();
      const links = await page.findAll('sbb-action-group sbb-button');
      expect(links.every((l) => l.getAttribute('size') === 'l')).toBeTruthy();
    });

    it('should update attributes with negative', async () => {
      element.setAttribute('size', 'm');
      await page.waitForChanges();
      const links = await page.findAll('sbb-action-group sbb-button');
      expect(links.every((l) => l.getAttribute('size') === 'm')).toBeTruthy();
    });

    it('should apply variant block to sbb-link', async () => {
      await page.waitForChanges();
      const links = await page.findAll('sbb-action-group sbb-link');
      expect(links.every((l) => l.getAttribute('variant') === 'block')).toBeTruthy();
    });
  });
});
