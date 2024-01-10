import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbNavigationListElement } from './navigation-list';
import '../navigation-action';

describe('sbb-navigation-list', () => {
  let element: SbbNavigationListElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-navigation-list>
        <sbb-navigation-action>Label</sbb-navigation-action>
      </sbb-navigation-list>
    `);
  });

  it('renders', () => {
    assert.instanceOf(element, SbbNavigationListElement);
  });

  it('automatic list generation', () => {
    const list = element.shadowRoot!.querySelector('ul');
    expect(list?.className).to.be.equal('sbb-navigation-list__content');

    const listItem = list?.querySelector('li');
    expect(listItem).to.have.class('sbb-navigation-list__action');
  });

  it('force size on children elements', () => {
    const action = element.querySelector('sbb-navigation-action');
    expect(action).to.have.attribute('size', 'm');
  });
});
