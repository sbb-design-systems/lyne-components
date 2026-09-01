import { assert, expect } from '@open-wc/testing';
import { html, unsafeStatic } from 'lit/static-html.js';

import { fixture } from '../core/testing/private.ts';
import { EventSpy, waitForLitRender } from '../core/testing.ts';

import { SbbTeaserElement } from './teaser.component.ts';

import '../teaser.ts';
import '../button.ts';
import '../chip-label.ts';
import '../title.ts';

describe(`sbb-teaser`, () => {
  let element: SbbTeaserElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-teaser id="focus-id" href="#">Content</sbb-teaser>`);
  });

  it('should render', async () => {
    assert.instanceOf(element, SbbTeaserElement);
  });

  it('should receive focus', async () => {
    element.focus();
    await waitForLitRender(element);
    expect(document.activeElement!.id).to.be.equal('focus-id');
  });

  it('dispatches event on click', async () => {
    const clickSpy = new EventSpy('click');

    element.click();
    expect(clickSpy.count).to.be.equal(1);
  });

  describe('slot assignment', () => {
    it('should assign chip slot', async () => {
      element = await fixture(
        html`<sbb-teaser href="#"><sbb-chip-label>Chip</sbb-chip-label></sbb-teaser>`,
      );
      const chip = element.querySelector('sbb-chip-label')!;
      expect(chip.getAttribute('slot')).to.be.equal('chip');
    });

    it('should assign title slot', async () => {
      element = await fixture(
        html`<sbb-teaser href="#"><sbb-title level="2">Title</sbb-title></sbb-teaser>`,
      );
      const title = element.querySelector('sbb-title')!;
      expect(title.getAttribute('slot')).to.be.equal('title');
    });

    it('should not touch elements that are already assigned to a named slot', async () => {
      element = await fixture(
        html`<sbb-teaser href="#">
          <sbb-chip-label slot="image">Chip</sbb-chip-label>
        </sbb-teaser>`,
      );
      // Since the element is already assigned to the "image" slot, it never reaches the
      // default slot and is therefore not reassigned to the "chip" slot.
      const chip = element.querySelector('sbb-chip-label')!;
      expect(chip.getAttribute('slot')).to.be.equal('image');
    });

    it('should only assign the first chip label and title found', async () => {
      element = await fixture(
        html`<sbb-teaser href="#">
          <sbb-chip-label id="first">Chip 1</sbb-chip-label>
          <sbb-chip-label id="second">Chip 2</sbb-chip-label>
          <sbb-title id="first-title" level="2">Title 1</sbb-title>
          <sbb-title id="second-title" level="2">Title 2</sbb-title>
        </sbb-teaser>`,
      );
      const [firstChip, secondChip] = element.querySelectorAll('sbb-chip-label');
      const [firstTitle, secondTitle] = element.querySelectorAll('sbb-title');

      expect(firstChip.getAttribute('slot')).to.be.equal('chip');
      expect(secondChip.hasAttribute('slot')).to.be.false;
      expect(firstTitle.getAttribute('slot')).to.be.equal('title');
      expect(secondTitle.hasAttribute('slot')).to.be.false;
    });

    for (const tagName of [
      'sbb-button-static',
      'sbb-secondary-button-static',
      'sbb-accent-button-static',
      'sbb-transparent-button-static',
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

    it('should not assign action slot for unrelated elements', async () => {
      element = await fixture(
        html`<sbb-teaser href="#"><sbb-mini-button>Mini</sbb-mini-button></sbb-teaser>`,
      );
      const miniButton = element.querySelector('sbb-mini-button')!;
      expect(miniButton.hasAttribute('slot')).to.be.false;
    });
  });
});
