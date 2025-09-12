import { expect } from '@open-wc/testing';
import { html } from 'lit';

import { fixture } from '../testing/private.js';

import { addToListAttribute, removeFromListAttribute } from './set-or-remove-attribute.js';

describe('set-or-remove-attribute', () => {
  it('addToListAttribute', async () => {
    const element = await fixture(html`<div></div>`);

    addToListAttribute(element, 'aria-describedby', 'id-one');
    expect(element).to.have.attribute('aria-describedby').contains('id-one');

    addToListAttribute(element, 'aria-describedby', 'id-two');
    expect(element).to.have.attribute('aria-describedby').contains('id-one');
    expect(element).to.have.attribute('aria-describedby').contains('id-two');

    addToListAttribute(element, 'aria-describedby', 'id-three id-four');
    expect(element).to.have.attribute('aria-describedby').contains('id-one');
    expect(element).to.have.attribute('aria-describedby').contains('id-two');
    expect(element).to.have.attribute('aria-describedby').contains('id-three');
    expect(element).to.have.attribute('aria-describedby').contains('id-four');
  });

  it('removeFromListAttribute', async () => {
    const element = await fixture(html` <div aria-describedby="id-one id-two"></div> `);

    removeFromListAttribute(element, 'aria-describedby', 'id-one');
    expect(element).to.have.attribute('aria-describedby').not.contains('id-one');
    expect(element).to.have.attribute('aria-describedby').contains('id-two');

    removeFromListAttribute(element, 'aria-describedby', 'id-two');
    expect(element).not.to.have.attribute('aria-describedby');
  });
});
