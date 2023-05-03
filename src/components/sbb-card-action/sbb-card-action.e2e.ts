import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { waitForCondition } from '../../global/helpers/testing/wait-for-condition';

// As tests don't work in specs at all (missing :is support in Jest), we moved all tests to e2e.

describe('sbb-card-action', () => {
  let element: E2EElement, page: E2EPage;

  it('should render an sbb-card-action as a link opening in a new window', async () => {
    page = await newE2EPage();
    await page.setContent(
      `
        <sbb-card>
          <sbb-card-action href="https://github.com/lyne-design-system/lyne-components" target="_blank">Follow me</sbb-card-action>
          Content text
        </sbb-card>`
    );
    const card = await page.find('sbb-card');

    await page.waitForChanges();

    expect(card).toHaveAttribute('data-has-action');
    expect(card).not.toHaveAttribute('data-has-active-action');
    expect(card).toEqualAttribute('data-action-role', 'link');
    expect(await card.find('sbb-card-action')).toEqualHtml(`
      <sbb-card-action href="https://github.com/lyne-design-system/lyne-components" target="_blank" role="link" dir="ltr" tabindex="0" slot="action" class="hydrated">
        <mock:shadow-root>
          <a class="sbb-card-action" href="https://github.com/lyne-design-system/lyne-components" target="_blank" rel="external noopener nofollow" role="presentation" tabindex="-1">
            <span class="sbb-card-action__label">
              <slot></slot>
              . Link target opens in new window.
            </span>
          </a>
        </mock:shadow-root>
        Follow me
      </sbb-card-action>
    `);
  });

  it('should render an sbb-card-action as a button which is active', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<sbb-card><sbb-card-action active>Click me</sbb-card-action>Content</sbb-card>`
    );
    const card = await page.find('sbb-card');
    await page.waitForChanges();

    expect(card).toHaveAttribute('data-has-action');
    expect(card).toHaveAttribute('data-has-active-action');
    expect(card).toEqualAttribute('data-action-role', 'button');
    expect(await card.find('sbb-card-action')).toEqualHtml(`
      <sbb-card-action role="button" dir="ltr" tabindex="0" slot="action" active class="hydrated">
        <mock:shadow-root>
          <span class="sbb-card-action">
            <span class="sbb-card-action__label">
              <slot></slot>
            </span>
          </span>
        </mock:shadow-root>
        Click me
      </sbb-card-action>
    `);
  });

  it('should correctly toggle active state', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<sbb-card><sbb-card-action>Click me</sbb-card-action>Content</sbb-card>`
    );
    const card = await page.find('sbb-card');
    await page.waitForChanges();

    expect(card).not.toHaveAttribute('data-has-active-action');

    (await card.find('sbb-card-action')).setAttribute('active', '');
    await page.waitForChanges();

    expect(card).toHaveAttribute('data-has-active-action');
  });

  it('should remove data properties from host', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<sbb-card><sbb-card-action active>Click me</sbb-card-action><span><button>Content</button></span></sbb-card>`
    );
    const card = await page.find('sbb-card');

    await page.waitForChanges();

    expect(card).toHaveAttribute('data-has-action');
    expect(card).toHaveAttribute('data-has-active-action');
    expect(card).toEqualAttribute('data-action-role', 'button');

    // Remove action from DOM
    await page.evaluate(() => document.querySelector('sbb-card-action').remove());
    await page.waitForChanges();

    expect(card).not.toHaveAttribute('data-has-action');
    expect(card).not.toHaveAttribute('data-has-active-action');
    expect(card).not.toEqualAttribute('data-action-role', 'button');
  });

  it('should detect added button in slotted content to update focusable elements', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<sbb-card><sbb-card-action>Click me</sbb-card-action><span id='content'><button>Content</button></span></sbb-card>`
    );
    await page.waitForChanges();
    expect(await page.find('button')).toHaveAttribute('data-card-focusable');

    // Add a second button in content
    await page.evaluate(() =>
      document
        .getElementById('content')
        .insertBefore(document.createElement('button'), document.querySelector('button'))
    );

    // Both buttons should be marked as focusable
    const buttons = await page.findAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons.every((el) => el.getAttribute('data-card-focusable') !== null)).toBe(true);

    // Remove all buttons
    await page.evaluate(() => document.querySelectorAll('button').forEach((el) => el.remove()));
    await page.waitForChanges();

    // Card should not have marker anymore
    expect((await page.findAll('button')).length).toBe(0);
  });

  it('should detect added second element of slot to update focusable elements', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<sbb-card><sbb-card-action>Click me</sbb-card-action><span id='content'></span></sbb-card>`
    );
    await page.waitForChanges();

    // Add a button to slot
    await page.evaluate(() =>
      document
        .querySelector('sbb-card')
        .insertBefore(document.createElement('button'), document.getElementById('content'))
    );
    await page.waitForChanges();

    // Button should be marked as focusable
    expect(await page.find('button')).toHaveAttribute('data-card-focusable');
  });

  it('should detect focusable elements when action was added at later point', async () => {
    page = await newE2EPage();
    await page.setContent(`<sbb-card><span id='content'><button></button></span></sbb-card>`);
    await page.waitForChanges();

    // Add a sbb-card-action
    await page.evaluate(() =>
      document.querySelector('sbb-card').appendChild(document.createElement('sbb-card-action'))
    );
    await page.waitForChanges();

    // Button should be marked as focusable
    expect(await page.find('button')).toHaveAttribute('data-card-focusable');
  });

  describe('events', () => {
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(
        '<sbb-card><sbb-card-action id="focus-id">Card</sbb-card-action>Content</sbb-card>'
      );

      element = await page.find('sbb-card-action');
    });

    it('dispatches event on click', async () => {
      await page.waitForChanges();
      const changeSpy = await page.spyOnEvent('click');

      await element.click();

      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('should dispatch click event on pressing Enter', async () => {
      const changeSpy = await page.spyOnEvent('click');
      await element.press('Enter');
      expect(changeSpy).toHaveReceivedEvent();
    });

    it('should dispatch click event on pressing Space', async () => {
      const changeSpy = await page.spyOnEvent('click');
      await element.press(' ');
      expect(changeSpy).toHaveReceivedEvent();
    });

    it('should dispatch click event on pressing Enter with href', async () => {
      element.setAttribute('href', 'test');
      await page.waitForChanges();

      const changeSpy = await page.spyOnEvent('click');
      await element.press('Enter');
      expect(changeSpy).toHaveReceivedEvent();
    });

    it('should not dispatch click event on pressing Space with href', async () => {
      element.setAttribute('href', 'test');
      await page.waitForChanges();

      const changeSpy = await page.spyOnEvent('click');
      await element.press(' ');
      expect(changeSpy).not.toHaveReceivedEvent();
    });

    it('should receive focus', async () => {
      await element.focus();
      await page.waitForChanges();

      expect(await page.evaluate(() => document.activeElement.id)).toBe('focus-id');
    });
  });
});
