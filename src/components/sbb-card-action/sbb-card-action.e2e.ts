import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { sendKeys } from '@web/test-runner-commands';
import { SbbCard } from '../sbb-card/sbb-card';
import { SbbCardAction } from './sbb-card-action';
import { EventSpy, waitForCondition, waitForLitRender } from '../core/testing';
import './sbb-card-action';

// As tests don't work in specs at all (missing :is support in Jest), we moved all tests to e2e.

describe('sbb-card-action', () => {
  let element: SbbCard;

  it('should render an sbb-card-action as a link opening in a new window', async () => {
    element = await fixture(
      html` <sbb-card>
        <sbb-card-action
          href="https://github.com/lyne-design-system/lyne-components"
          target="_blank"
          >Follow me</sbb-card-action
        >
        Content text
      </sbb-card>`,
    );

    expect(element).to.have.attribute('data-has-action');
    expect(element).not.to.have.attribute('data-has-active-action');
    expect(element).to.have.attribute('data-action-role', 'link');

    const cardAction = element.querySelector('sbb-card-action');

    expect(cardAction).dom.to.be.equal(`
      <sbb-card-action href="https://github.com/lyne-design-system/lyne-components" target="_blank" role="link" dir="ltr" tabindex="0" slot="action">
        Follow me
      </sbb-card-action>
    `);
    expect(cardAction).shadowDom.to.be.equal(`
      <a class="sbb-card-action" href="https://github.com/lyne-design-system/lyne-components" target="_blank" rel="external noopener nofollow" role="presentation" tabindex="-1">
        <span class="sbb-card-action__label">
          <slot></slot>
          . Link target opens in new window.
        </span>
      </a>
    `);
  });

  it('should render an sbb-card-action as a button which is active', async () => {
    element = await fixture(
      html`<sbb-card><sbb-card-action active>Click me</sbb-card-action>Content</sbb-card>`,
    );

    expect(element).to.have.attribute('data-has-action');
    expect(element).to.have.attribute('data-has-active-action');
    expect(element).to.have.attribute('data-action-role', 'button');

    const cardAction = element.querySelector('sbb-card-action');

    expect(cardAction).dom.to.be.equal(`
      <sbb-card-action role="button" dir="ltr" tabindex="0" slot="action" active>
        Click me
      </sbb-card-action>
    `);
    expect(cardAction).shadowDom.to.be.equal(`
      <span class="sbb-card-action">
        <span class="sbb-card-action__label">
          <slot></slot>
        </span>
      </span>
    `);
  });

  it('should correctly toggle active state', async () => {
    element = await fixture(
      html`<sbb-card><sbb-card-action>Click me</sbb-card-action>Content</sbb-card>`,
    );
    expect(element).not.to.have.attribute('data-has-active-action');

    element.querySelector('sbb-card-action').setAttribute('active', '');
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-has-active-action');
  });

  it('should remove data properties from host', async () => {
    element = await fixture(
      html`<sbb-card
        ><sbb-card-action active>Click me</sbb-card-action
        ><span><button>Content</button></span></sbb-card
      >`,
    );

    expect(element).to.have.attribute('data-has-action');
    expect(element).to.have.attribute('data-has-active-action');
    expect(element).to.have.attribute('data-action-role', 'button');

    // Remove action from DOM
    element.querySelector('sbb-card-action').remove();
    await waitForLitRender(element);

    expect(element).not.to.have.attribute('data-has-action');
    expect(element).not.to.have.attribute('data-has-active-action');
    expect(element).not.to.have.attribute('data-action-role', 'button');
  });

  it('should detect added button in slotted content to update focusable elements', async () => {
    element = await fixture(
      html`<sbb-card
        ><sbb-card-action>Click me</sbb-card-action
        ><span id="content"><button>Content</button></span></sbb-card
      >`,
    );
    expect(document.querySelector('button')).to.have.attribute('data-card-focusable');

    // Add a second button in content
    document
      .getElementById('content')
      .insertBefore(document.createElement('button'), document.querySelector('button'));

    // Both buttons should be marked as focusable
    await waitForLitRender(element);
    const buttons = document.querySelectorAll('button');
    expect(buttons.length).to.be.equal(2);
    expect(
      Array.from(buttons).every((el) => el.getAttribute('data-card-focusable') !== null),
    ).to.be.equal(true);

    // Remove all buttons
    buttons.forEach((el) => el.remove());
    await waitForLitRender(element);

    // Card should not have marker anymore
    expect(document.querySelectorAll('button').length).to.be.equal(0);
  });

  it('should detect added second element of slot to update focusable elements', async () => {
    element = await fixture(
      html`<sbb-card
        ><sbb-card-action>Click me</sbb-card-action><span id="content"></span
      ></sbb-card>`,
    );

    // Add a button to slot
    document
      .querySelector('sbb-card')
      .insertBefore(document.createElement('button'), document.getElementById('content'));
    await waitForLitRender(element);

    // Button should be marked as focusable
    expect(document.querySelector('button')).to.have.attribute('data-card-focusable');
  });

  it('should detect focusable elements when action was added at later point', async () => {
    element = await fixture(
      html`<sbb-card
        ><span id="content"><button></button></span
      ></sbb-card>`,
    );

    // Add a sbb-card-action
    document.querySelector('sbb-card').appendChild(document.createElement('sbb-card-action'));
    await waitForLitRender(element);

    // Button should be marked as focusable
    expect(document.querySelector('button')).to.have.attribute('data-card-focusable');
  });

  describe('events', () => {
    let action: SbbCardAction;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-card><sbb-card-action id="focus-id">Card</sbb-card-action>Content</sbb-card>`,
      );
      action = document.querySelector('sbb-card-action');
    });

    it('dispatches event on click', async () => {
      await waitForLitRender(element);
      const clickSpy = new EventSpy('click');

      action.click();

      await waitForCondition(() => clickSpy.events.length === 1);
      expect(clickSpy.count).to.be.equal(1);
    });

    it('should dispatch click event on pressing Enter', async () => {
      const clickSpy = new EventSpy('click');
      action.focus();
      await sendKeys({ press: 'Enter' });
      expect(clickSpy.count).to.be.greaterThan(0);
    });

    it('should dispatch click event on pressing Space', async () => {
      const clickSpy = new EventSpy('click');
      action.focus();
      await sendKeys({ press: ' ' });
      expect(clickSpy.count).to.be.greaterThan(0);
    });

    it('should dispatch click event on pressing Enter with href', async () => {
      element.setAttribute('href', 'test');
      await waitForLitRender(element);

      const clickSpy = new EventSpy('click');
      action.focus();
      await sendKeys({ press: 'Enter' });
      expect(clickSpy.count).to.be.greaterThan(0);
    });

    it('should not dispatch click event on pressing Space with href', async () => {
      action.setAttribute('href', 'test');
      await waitForLitRender(element);

      const clickSpy = new EventSpy('click');
      action.focus();
      await sendKeys({ press: ' ' });
      expect(clickSpy.count).not.to.be.greaterThan(0);
    });

    it('should receive focus', async () => {
      action.focus();
      await waitForLitRender(element);

      expect(document.activeElement.id).to.be.equal('focus-id');
    });
  });
});
