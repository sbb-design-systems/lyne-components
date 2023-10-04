import { waitForCondition } from '../../global/testing';
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
    const dialog = element.shadowRoot.querySelector('dialog');

    element.open();
    await element.updateComplete;

    expect(
      await waitForCondition(() => element.getAttribute('data-state') === 'opened'),
    ).to.be.equal(true);
    expect(dialog).to.have.attribute('open');
  });

  it('closes the section', async () => {
    const dialog = element.shadowRoot.querySelector('dialog');

    element.open();
    await element.updateComplete;

    expect(
      await waitForCondition(() => element.getAttribute('data-state') === 'opened'),
    ).to.be.equal(true);
    expect(dialog).to.have.attribute('open');

    element.close();
    await element.updateComplete;

    expect(
      await waitForCondition(() => element.getAttribute('data-state') === 'closed'),
    ).to.be.equal(true);
    expect(dialog).not.to.have.attribute('open');
  });
});
