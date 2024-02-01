import { expect, fixture } from '@open-wc/testing';
import type { TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';

import { sbbSpread } from '../core/dom';
import images from '../core/images';
import { testA11yTreeSnapshot } from '../core/testing/a11y-tree-snapshot';

import type { SbbTeaserElement } from './teaser';
import './teaser';

describe('sbb-teaser', () => {
  const createTeaser = (args: Record<string, string>): TemplateResult => {
    return html`<sbb-teaser ${sbbSpread(args)}></sbb-teaser>`;
  };

  const argsAfterCentered = {
    href: 'https://github.com/lyne-design-system/lyne-components',
    alignment: 'after-centered',
    'aria-label': 'SBB teaser',
  };

  const argsAfter = {
    ...argsAfterCentered,
    alignment: 'after',
    'title-level': '2',
  };

  it('renders after centered - DOM', async () => {
    const root: SbbTeaserElement = await fixture(createTeaser(argsAfterCentered));
    await expect(root).dom.to.equalSnapshot();
  });

  it('renders after centered - ShadowDOM', async () => {
    const root: SbbTeaserElement = await fixture(createTeaser(argsAfterCentered));
    await expect(root).shadowDom.to.equalSnapshot();
  });

  it('renders after with title level set - DOM', async () => {
    const root: SbbTeaserElement = await fixture(createTeaser(argsAfter));
    await expect(root).dom.to.equalSnapshot();
  });

  it('renders after with title level set - ShadowDOM', async () => {
    const root: SbbTeaserElement = await fixture(createTeaser(argsAfter));
    await expect(root).shadowDom.to.equalSnapshot();
  });

  it('renders below with projected content - DOM', async () => {
    const root: SbbTeaserElement = await fixture(html`
      <sbb-teaser
        href="https://github.com/lyne-design-system/lyne-components"
        aria-label="SBB teaser"
        alignment="below"
      >
        <img slot="image" src=${images[0]} alt="400x300" />
        <span slot="chip">Chip</span>
        <span slot="title">TITLE</span>
        description
      </sbb-teaser>
    `);
    await expect(root).dom.to.equalSnapshot();
  });

  it('renders below with projected content - ShadowDOM', async () => {
    const root: SbbTeaserElement = await fixture(html`
      <sbb-teaser
        href="https://github.com/lyne-design-system/lyne-components"
        aria-label="SBB teaser"
        alignment="below"
      >
        <img slot="image" src=${images[0]} alt="400x300" />
        <span slot="chip">Chip</span>
        <span slot="title">TITLE</span>
        description
      </sbb-teaser>
    `);
    await expect(root).shadowDom.to.equalSnapshot();
  });

  testA11yTreeSnapshot(createTeaser(argsAfterCentered));
});
