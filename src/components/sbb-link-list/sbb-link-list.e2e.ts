import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-link-list', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-link-list title-level="2">
        <span slot="title">Help &amp; Contact</span>
        <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html'>Rückerstattungen</sbb-link>
        <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html'>Fundbüro</sbb-link>
        <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html'>Beschwerden</sbb-link>
        <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html'>Lob aussprechen</sbb-link>
        <sbb-link href='https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html'>Sachbeschädigung melden</sbb-link>
      </sbb-link-list>
    `);
    element = await page.find('sbb-link-list');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  describe('property sync', () => {
    it('should sync properties/attributes with sbb-link', async () => {
      await page.waitForChanges();
      const links = await page.findAll('sbb-link-list sbb-link');
      expect(
        links.every(
          (l) =>
            l.getAttribute('size') === 's' &&
            l.getAttribute('variant') === 'block' &&
            l.getAttribute('negative') === null,
        ),
      ).toBeTruthy();
    });

    it('should update attributes with size m', async () => {
      element.setAttribute('size', 'm');
      await page.waitForChanges();
      const links = await page.findAll('sbb-link-list sbb-link');
      expect(links.every((l) => l.getAttribute('size') === 'm')).toBeTruthy();
    });

    it('should update attributes with negative', async () => {
      element.setAttribute('negative', '');
      await page.waitForChanges();
      const links = await page.findAll('sbb-link-list sbb-link');
      expect(links.every((l) => l.getAttribute('negative') === '')).toBeTruthy();
    });
  });
});
