import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing.js';
import type { SbbNavigationButtonElement } from '../navigation-button.js';
import { SbbNavigationElement } from '../navigation.js';

import { SbbNavigationSectionElement } from './navigation-section.component.js';

import '../navigation-list.js';
import '../navigation-button.js';

describe(`sbb-navigation-section`, () => {
  let element: SbbNavigationSectionElement, trigger: SbbNavigationButtonElement;

  beforeEach(async () => {
    const root: SbbNavigationElement = await fixture(html`
      <sbb-navigation>
        <sbb-navigation-button id="navigation-section-trigger"></sbb-navigation-button>
        <sbb-navigation-section trigger="navigation-section-trigger">
          <sbb-navigation-list>
            <sbb-navigation-button>Tickets & Offers</sbb-navigation-button>
            <sbb-navigation-button>Vacations & Recreation</sbb-navigation-button>
            <sbb-navigation-button>Travel information</sbb-navigation-button>
            <sbb-navigation-button>Help & Contact</sbb-navigation-button>
          </sbb-navigation-list>
        </sbb-navigation-section>
      </sbb-navigation>
    `);
    element = root.querySelector('sbb-navigation-section')!;
    trigger = root.querySelector('sbb-navigation-button')!;
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen, root);

    // Open surrounding navigation
    root.open();
    await didOpenEventSpy.calledOnce();

    // Start with closed navigation section for all the tests
    element.close();
    await waitForCondition(() => element.getAttribute('data-state') === 'closed');
    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbNavigationSectionElement);
  });

  it('opens the section', async () => {
    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => element.getAttribute('data-state') === 'opened');
    expect(element).to.have.attribute('data-state', 'opened');
  });

  it('closes the section', async () => {
    element.open();
    await waitForLitRender(element);

    await waitForCondition(() => element.getAttribute('data-state') === 'opened');
    expect(element).to.have.attribute('data-state', 'opened');

    element.close();
    await waitForLitRender(element);

    await waitForCondition(() => element.getAttribute('data-state') === 'closed');
    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('opens and closes with non-zero animation duration', async () => {
    element.style.setProperty('--sbb-navigation-section-animation-duration', '1ms');

    element.open();
    await waitForLitRender(element);
    await waitForCondition(() => element.getAttribute('data-state') === 'opened');
    expect(element).to.have.attribute('data-state', 'opened');
    element.close();
    await waitForLitRender(element);

    await waitForCondition(() => element.getAttribute('data-state') === 'closed');
    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('should update trigger connected by id', async () => {
    trigger.id = '';
    await waitForLitRender(element);
    expect(trigger.ariaHasPopup).to.be.null;

    trigger.id = 'navigation-section-trigger';
    await waitForLitRender(element);
    expect(trigger.ariaHasPopup).not.to.be.null;
  });

  it('should accept trigger as HTML Element', async () => {
    trigger.id = '';
    await waitForLitRender(element);
    expect(trigger.ariaHasPopup).to.be.null;

    element.trigger = trigger;
    await waitForLitRender(element);
    expect(trigger.ariaHasPopup).not.to.be.null;
  });

  it('should allow removing the trigger', async () => {
    expect(trigger.ariaHasPopup).not.to.be.null;

    element.trigger = null;
    await waitForLitRender(element);
    expect(trigger.ariaHasPopup).to.be.null;
  });
});
