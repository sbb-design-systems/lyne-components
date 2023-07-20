import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-file-selector', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-file-selector></sbb-file-selector>');
    element = await page.find('sbb-file-selector');
  });

  it('renders', () => {
    expect(element).toHaveClass('hydrated');
  });

  it('load a file', async () => {
    await page.evaluate(() => {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(new File(['Hello world!'], 'hello.txt', { type: 'text/plain' }));
      const input = document.querySelector('sbb-file-selector').shadowRoot.querySelector('input');
      input.files = dataTransfer.files;
      input.dispatchEvent(new Event('change'));
    });
    await page.waitForChanges();

    expect(await element.getProperty('files')).not.toBeNull();
    expect(
      (await page.find('sbb-file-selector >>> .sbb-file-selector__file-list')).tagName,
    ).toEqual('UL');

    const listItems: E2EElement[] = await page.findAll('sbb-file-selector >>> li');
    expect(listItems.length).toEqual(1);
    expect(listItems[0]).toEqualHtml(`
      <li class="sbb-file-selector__file">
        <span class="sbb-file-selector__file-details">
          <span class="sbb-file-selector__file-name">hello.txt</span>
          <span class="sbb-file-selector__file-size">12 B</span>
        </span>
        <sbb-button aria-label="Remove file" class="hydrated" data-icon-only dir="ltr" icon-name="trash-small"
                    role="button" size="m" tabindex="0" variant="secondary">
        </sbb-button>
      </li>
    `);
  });
});
