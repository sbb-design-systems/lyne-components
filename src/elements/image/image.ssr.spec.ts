import { assert, expect } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbImageElement } from './image.component.ts';

import '../image.ts';

describe(`sbb-image ssr`, () => {
  let root: SbbImageElement;
  const url = import.meta.resolve('../core/testing/assets/lucerne.png');

  it('renders', async () => {
    root = await ssrHydratedFixture(html`<sbb-image image-src=${url}></sbb-image>`, {
      modules: ['../image.ts'],
    });
    assert.instanceOf(root, SbbImageElement);
  });

  const urls = [
    { name: 'fully qualified url', url },
    { name: 'local url', url: new URL('../core/testing/assets/lucerne.png', import.meta.url) },
    { name: 'local root url', url: new URL('../core/testing/assets/lucerne.png', import.meta.url) },
  ];
  for (const { name, url } of urls) {
    it(`should work with ${name}`, async () => {
      root = await ssrHydratedFixture(html`<sbb-image image-src=${url.toString()}></sbb-image>`, {
        modules: ['../image.ts'],
      });
      const sources = Array.from(root.shadowRoot!.querySelectorAll('source'));
      expect(sources.length).greaterThan(0);
      for (const source of sources) {
        expect(source.srcset.startsWith(url.toString())).to.be.true;
      }

      // Recovers loading state
      expect(root).to.match(':state(loaded)');
    });
  }
});
