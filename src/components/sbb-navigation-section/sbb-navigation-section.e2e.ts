import { waitForCondition, waitForLitRender } from '../../global/testing';
import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { SbbNavigationSection } from './sbb-navigation-section';
import '../sbb-navigation';
import '../sbb-navigation-list';
import '../sbb-navigation-action';

describe('sbb-navigation-section', () => {
  let element: SbbNavigationSection;

  beforeEach(async () => {
    await fixture(html`
      <sbb-navigation disable-animation>
        <sbb-navigation-section disable-animation>
          <sbb-navigation-list>
            <sbb-navigation-action>Tickets & Offers</sbb-navigation-action>
            <sbb-navigation-action>Vacations & Recreation</sbb-navigation-action>
            <sbb-navigation-action>Travel information</sbb-navigation-action>
            <sbb-navigation-action>Help & Contact</sbb-navigation-action>
          </sbb-navigation-list>
        </sbb-navigation-section>
      </sbb-navigation>
    `);
    element = document.querySelector('sbb-navigation-section');
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbNavigationSection);
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
});
