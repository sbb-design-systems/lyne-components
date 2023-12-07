import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import '../navigation-action';
import { waitForLitRender } from '../../core/testing';

import { SbbNavigationMarkerElement } from './navigation-marker';
import '.';

describe('sbb-navigation-marker', () => {
  let element: SbbNavigationMarkerElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-navigation-marker size="l">
        <sbb-navigation-action id="nav-1" size="s">Tickets & Offers</sbb-navigation-action>
        <sbb-navigation-action id="nav-2">Vacations & Recreation</sbb-navigation-action>
        <sbb-navigation-action id="nav-3">Travel information</sbb-navigation-action>
        <sbb-navigation-action id="nav-4">Help & Contact</sbb-navigation-action>
      </sbb-navigation-marker>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbNavigationMarkerElement);
  });

  it('selects action on click', async () => {
    const firstAction = element.querySelector('sbb-navigation-action#nav-1') as HTMLElement;
    const secondAction = element.querySelector('sbb-navigation-action#nav-2') as HTMLElement;

    secondAction.click();
    await waitForLitRender(element);

    expect(secondAction).to.have.attribute('active');
    expect(firstAction).not.to.have.attribute('active');

    firstAction.click();
    await waitForLitRender(element);

    expect(firstAction).to.have.attribute('active');
    expect(secondAction).not.to.have.attribute('active');
  });

  it('automatic list generation', () => {
    const list = element.shadowRoot.querySelector('ul');
    expect(list.className).to.be.equal('sbb-navigation-marker');

    const listItem = list.querySelector('li');
    expect(listItem).to.have.class('sbb-navigation-marker__action');
  });

  it('force size on children elements', () => {
    const firstAction = element.querySelector('sbb-navigation-action#nav-1');
    expect(firstAction).to.have.attribute('size', 'l');
  });
});
