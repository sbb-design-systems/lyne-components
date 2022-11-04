import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-dialog', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-dialog id="my-dialog" title-content="Title" title-back-button="true" disable-animation>
        Dialog content.
        <div slot="action-group">Action group</div>
      </sbb-dialog>
    `);
    element = await page.find('sbb-dialog');
  });

  it('renders', () => {
    expect(element).toHaveClass('hydrated');
  });

  it('opens the dialog', async () => {
    const dialog = await page.find('sbb-dialog >>> dialog');

    await element.callMethod('present');
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');
  });

  it('closes the dialog', async () => {
    const dialog = await page.find('sbb-dialog >>> dialog');

    await element.callMethod('present');
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');

    await element.callMethod('dismiss');
    await page.waitForChanges();

    expect(dialog).not.toHaveAttribute('open');
  });

  it('closes the dialog on close button click', async () => {
    const dialog = await page.find('sbb-dialog >>> dialog');
    const closeButton = await page.find('sbb-dialog >>> .sbb-dialog__dismiss');

    await element.callMethod('present');
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');

    await closeButton.click();
    await page.waitForChanges();

    expect(dialog).not.toHaveAttribute('open');
  });

  it('closes the dialog on Esc key press', async () => {
    const dialog = await page.find('sbb-dialog >>> dialog');

    await element.callMethod('present');
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');

    await page.keyboard.down('Escape');
    await page.waitForChanges();

    expect(dialog).not.toHaveAttribute('open');
  });

  it('does not have full-screen class', async () => {
    const dialog = await page.find('sbb-dialog >>> dialog');

    await element.callMethod('present');
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');

    await page.waitForChanges();
    expect(element).not.toHaveClass('sbb-dialog--full-screen');
  });

  it('renders in full-scren mode if no title is provided', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-dialog id="my-dialog" title-back-button="true" disable-animation>
        Dialog content.
        <div slot="action-group">Action group</div>
      </sbb-dialog>
    `);
    element = await page.find('sbb-dialog');

    const dialog = await page.find('sbb-dialog >>> dialog');
    await element.callMethod('present');
    await page.waitForChanges();

    expect(dialog).toHaveAttribute('open');

    await page.waitForChanges();
    expect(element).toHaveClass('sbb-dialog--full-screen');
  });
});
