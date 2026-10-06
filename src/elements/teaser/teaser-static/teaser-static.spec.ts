import { assert, expect } from '@open-wc/testing';
import { html, unsafeStatic } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.ts';

import { SbbTeaserStaticElement } from './teaser-static.component.ts';

import '../../button.ts';
import '../../teaser.ts';

describe(`sbb-teaser-static`, () => {
  let element: SbbTeaserStaticElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-teaser-static>Content</sbb-teaser-static>`);
  });

  it('should render', async () => {
    assert.instanceOf(element, SbbTeaserStaticElement);
  });

  for (const tagName of [
    'sbb-button',
    'sbb-button-link',
    'sbb-secondary-button',
    'sbb-secondary-button-link',
    'sbb-accent-button',
    'sbb-accent-button-link',
    'sbb-transparent-button',
    'sbb-transparent-button-link',
  ]) {
    it(`should assign action slot for ${tagName}`, async () => {
      const tag = unsafeStatic(tagName);
      /* eslint-disable lit/binding-positions */
      element = await fixture(html`<sbb-teaser href="#"><${tag}>Action</${tag}></sbb-teaser>`);
      /* eslint-enable lit/binding-positions */
      const action = element.querySelector(tagName)!;
      expect(action.getAttribute('slot')).to.be.equal('action');
    });
  }
});
