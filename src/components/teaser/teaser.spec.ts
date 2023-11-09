import { expect, fixture } from '@open-wc/testing';
import { Args } from '@storybook/web-components';
import { TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';

import { sbbSpread } from '../core/dom';
import images from '../core/images';

import type { SbbTeaserElement } from './teaser';
import './teaser';

describe('sbb-teaser', () => {
  const createTeaser = (args: Args): TemplateResult => {
    return html`<sbb-teaser ${sbbSpread(args)}></sbb-teaser>`;
  };

  const argsEndCentered: Args = {
    href: 'https://github.com/lyne-design-system/lyne-components',
    alignment: 'end-centered',
    'aria-label': 'Sbb teaser',
  };

  const argsEndTop: Args = {
    ...argsEndCentered,
    alignment: 'end-top',
    'title-level': '2',
  };

  it('renders end centered - DOM', async () => {
    const root: SbbTeaserElement = await fixture(createTeaser(argsEndCentered));
    expect(root).dom.to.equalSnapshot();
  });

  it('renders end centered - ShadowDOM', async () => {
    const root: SbbTeaserElement = await fixture(createTeaser(argsEndCentered));
    expect(root).shadowDom.to.equalSnapshot();
  });

  it('renders end top with title level set - DOM', async () => {
    const root: SbbTeaserElement = await fixture(createTeaser(argsEndTop));
    expect(root).dom.to.equalSnapshot();
  });

  it('renders end top with title level set - ShadowDOM', async () => {
    const root: SbbTeaserElement = await fixture(createTeaser(argsEndTop));
    expect(root).shadowDom.to.equalSnapshot();
  });

  it('renders bottom with projected content - DOM', async () => {
    const root: SbbTeaserElement = await fixture(html`
      <sbb-teaser
        href="https://github.com/lyne-design-system/lyne-components"
        aria-label="Sbb teaser"
        alignment="bottom"
      >
        <img slot="image" src=${images[0]} alt="400x300" />
        <span slot="chip">Chip</span>
        <span slot="title">TITLE</span>
        <p slot="description">description</p>
      </sbb-teaser>
    `);
    expect(root).dom.to.equalSnapshot();
  });

  it('renders bottom with projected content - ShadowDOM', async () => {
    const root: SbbTeaserElement = await fixture(html`
      <sbb-teaser
        href="https://github.com/lyne-design-system/lyne-components"
        aria-label="Sbb teaser"
        alignment="bottom"
      >
        <img slot="image" src=${images[0]} alt="400x300" />
        <span slot="chip">Chip</span>
        <span slot="title">TITLE</span>
        <p slot="description">description</p>
      </sbb-teaser>
    `);
    expect(root).shadowDom.to.equalSnapshot();
  });

  it('renders static - DOM', async () => {
    const root: SbbTeaserElement = await fixture(createTeaser({ alignment: 'end-centered' }));
    expect(root).dom.to.equalSnapshot();
  });

  it('renders static - ShadowDOM', async () => {
    const root: SbbTeaserElement = await fixture(createTeaser({ alignment: 'end-centered' }));
    expect(root).shadowDom.to.equalSnapshot();
  });
});
