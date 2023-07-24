import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import events from './sbb-file-selector.events';

async function addFilesToComponentInput(page: E2EPage, numberOfFiles: number): Promise<void> {
  await page.evaluate((numberOfFiles: number): void => {
    const dataTransfer = new DataTransfer();
    for (let i = 0; i < numberOfFiles; i++) {
      dataTransfer.items.add(
        new File([`Hello world - ${i}`], `hello${i}.txt`, {
          type: 'text/plain',
          lastModified: new Date(i).getMilliseconds(),
        }),
      );
    }
    const input = document.querySelector('sbb-file-selector').shadowRoot.querySelector('input');
    input.files = dataTransfer.files;
    input.dispatchEvent(new Event('change'));
  }, numberOfFiles);
}

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

  it('loads a file, the deletes it', async () => {
    const fileChangedSpy = await page.spyOnEvent(events.fileChangedEvent);
    await addFilesToComponentInput(page, 1);
    await page.waitForChanges();

    expect(fileChangedSpy).toHaveReceivedEventTimes(1);
    expect(await element.getProperty('files')).not.toBeNull();

    const listItems: E2EElement = await page.find('sbb-file-selector >>> ul');
    expect(listItems).toEqualHtml(`
      <ul class="sbb-file-selector__file-list" role='list'>
        <li class="sbb-file-selector__file">
          <span class="sbb-file-selector__file-details">
            <span class="sbb-file-selector__file-name">hello0.txt</span>
            <span class="sbb-file-selector__file-size">15 B</span>
          </span>
          <sbb-button aria-label="Remove file" class="hydrated" data-icon-only dir="ltr" icon-name="trash-small"
                      role="button" size="m" tabindex="0" variant="secondary">
          </sbb-button>
        </li>
      </ul>
    `);

    const button = await page.find('sbb-file-selector >>> sbb-button[icon-name="trash-small"]');
    expect(button).not.toBeNull();
    await button.click();
    await page.waitForChanges();
    expect(fileChangedSpy).toHaveReceivedEventTimes(2);
    expect((await page.findAll('sbb-file-selector >>> li')).length).toEqual(0);
  });

  it('loads more than one file in multiple mode', async () => {
    const fileChangedSpy = await page.spyOnEvent(events.fileChangedEvent);
    await element.setProperty('multiple', true);
    await page.waitForChanges();
    await addFilesToComponentInput(page, 2);
    await page.waitForChanges();
    expect(fileChangedSpy).toHaveReceivedEvent();

    const listItems: E2EElement[] = await page.findAll('sbb-file-selector >>> li');
    expect(listItems.length).toEqual(2);
    expect(
      (await page.findAll('sbb-file-selector >>> .sbb-file-selector__file-details')).length,
    ).toEqual(2);
    expect(
      (await page.findAll('sbb-file-selector >>> .sbb-file-selector__file-name'))[0],
    ).toEqualText('hello0.txt');
    expect(
      (await page.findAll('sbb-file-selector >>> .sbb-file-selector__file-name'))[1],
    ).toEqualText('hello1.txt');
    expect(
      (await page.findAll('sbb-file-selector >>> .sbb-file-selector__file-size'))[0],
    ).toEqualText('15 B');
    expect(
      (await page.findAll('sbb-file-selector >>> .sbb-file-selector__file-size'))[1],
    ).toEqualText('15 B');
  });

  it('loads files in multiple persistent mode', async () => {
    const fileChangedSpy = await page.spyOnEvent(events.fileChangedEvent);
    await element.setProperty('multiple', true);
    await element.setProperty('multipleMode', 'persistent');
    await page.waitForChanges();
    await addFilesToComponentInput(page, 1);
    await page.waitForChanges();
    expect(fileChangedSpy).toHaveReceivedEventTimes(1);

    expect(await element.getProperty('files')).not.toBeNull();
    expect((await page.findAll('sbb-file-selector >>> li')).length).toEqual(1);
    expect(
      (await page.findAll('sbb-file-selector >>> .sbb-file-selector__file-details')).length,
    ).toEqual(1);
    expect(
      (await page.findAll('sbb-file-selector >>> .sbb-file-selector__file-name'))[0],
    ).toEqualText('hello0.txt');
    expect(
      (await page.findAll('sbb-file-selector >>> .sbb-file-selector__file-size'))[0],
    ).toEqualText('15 B');

    await page.evaluate((longContent: string) => {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(
        new File([`Hello world - 0`], `hello0.txt`, {
          type: 'text/plain',
          lastModified: new Date(0).getMilliseconds(),
        }),
      );
      dataTransfer.items.add(new File([longContent], 'third.txt', { type: 'text/plain' }));
      const input = document.querySelector('sbb-file-selector').shadowRoot.querySelector('input');
      input.files = dataTransfer.files;
      input.dispatchEvent(new Event('change'));
    }, 'Lorem ipsum dolor sit amet. '.repeat(100));
    await page.waitForChanges();
    expect(fileChangedSpy).toHaveReceivedEventTimes(2);
    expect((await page.findAll('sbb-file-selector >>> li')).length).toEqual(2);
    expect(
      (await page.findAll('sbb-file-selector >>> .sbb-file-selector__file-name'))[0],
    ).toEqualText('third.txt');
    expect(
      (await page.findAll('sbb-file-selector >>> .sbb-file-selector__file-size'))[0],
    ).toEqualText('3 kB');
    expect(
      (await page.findAll('sbb-file-selector >>> .sbb-file-selector__file-name'))[1],
    ).toEqualText('hello0.txt');
    expect(
      (await page.findAll('sbb-file-selector >>> .sbb-file-selector__file-size'))[1],
    ).toEqualText('15 B');
  });
});
