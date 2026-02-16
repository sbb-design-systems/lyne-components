import { assert, expect } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbImageElement } from './image.component.ts';

describe(`sbb-image ssr`, () => {
  let root: SbbImageElement;
  const url = import.meta.resolve('../core/testing/assets/lucerne.png');

  it('renders', async () => {
    root = await ssrHydratedFixture(html`<sbb-image image-src=${url}></sbb-image>`, {
      modules: ['./image.component.js'],
    });
    assert.instanceOf(root, SbbImageElement);
  });

  const urls = [
    { name: 'fully qualified url', url },
    { name: 'local url', url: 'src/core/testing/assets/lucerne.png' },
    { name: 'local root url', url: '/src/core/testing/assets/lucerne.png' },
  ];
  for (const { name, url } of urls) {
    it(`should work with ${name}`, async () => {
      root = await ssrHydratedFixture(html`<sbb-image image-src=${url}></sbb-image>`, {
        modules: ['./image.component.js'],
      });
      const sources = Array.from(root.shadowRoot!.querySelectorAll('source'));
      expect(sources.length).greaterThan(0);
      for (const source of sources) {
        expect(source.srcset.startsWith(url)).to.be.true;
      }
    });
  }
});
