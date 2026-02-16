import { expect } from '@open-wc/testing';
import { fixture, testA11yTreeSnapshot } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import type {
  LineColor,
  SbbPearlChainVerticalItemElement,
} from './pearl-chain-vertical-item.component.ts';

import './pearl-chain-vertical-item.component.ts';

describe(`sbb-pearl-chain-vertical-item`, () => {
  describe('renders component with charcoal standard line and bullet', () => {
    let element: SbbPearlChainVerticalItemElement;

    beforeEach(async () => {
      element = await fixture<SbbPearlChainVerticalItemElement>(
        html`<sbb-pearl-chain-vertical-item></sbb-pearl-chain-vertical-item>`,
      );
      element.pearlChainVerticalItemAttributes = {
        lineType: 'standard',
        lineColor: 'default',
        bulletType: 'default',
        minHeight: 100,
        hideLine: false,
        bulletSize: 'start-end',
        position: 0,
      };
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders component with red line and bullet', () => {
    let element: SbbPearlChainVerticalItemElement;

    beforeEach(async () => {
      element = await fixture<SbbPearlChainVerticalItemElement>(
        html`<sbb-pearl-chain-vertical-item></sbb-pearl-chain-vertical-item>`,
      );
      element.pearlChainVerticalItemAttributes = {
        lineType: 'standard',
        lineColor: 'disruption',
        bulletType: 'default',
        minHeight: 100,
        hideLine: false,
        bulletSize: 'start-end',
        position: 0,
      };
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders component with left slot', () => {
    let element: SbbPearlChainVerticalItemElement;

    beforeEach(async () => {
      element = await fixture<SbbPearlChainVerticalItemElement>(
        html`<sbb-pearl-chain-vertical-item>
          <div slot="left">content</div>
        </sbb-pearl-chain-vertical-item>`,
      );
      element.pearlChainVerticalItemAttributes = {
        lineType: 'dotted',
        lineColor: 'charcoal' as LineColor,
        bulletType: 'default',
        minHeight: 100,
        bulletSize: 'start-end',
        hideLine: true,
      };
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders component with right slot', () => {
    let element: SbbPearlChainVerticalItemElement;

    beforeEach(async () => {
      element = await fixture<SbbPearlChainVerticalItemElement>(
        html`<sbb-pearl-chain-vertical-item>
          <div slot="right">right content</div>
        </sbb-pearl-chain-vertical-item>`,
      );
      element.pearlChainVerticalItemAttributes = {
        lineType: 'standard',
        lineColor: 'disruption',
        bulletType: 'past',
        minHeight: 100,
        bulletSize: 'start-end',
        hideLine: true,
      };
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders component with both slots', () => {
    let element: SbbPearlChainVerticalItemElement;

    beforeEach(async () => {
      element = await fixture<SbbPearlChainVerticalItemElement>(html`
        <sbb-pearl-chain-vertical-item>
          <div slot="right">right content</div>
          <div slot="left">left content</div>
        </sbb-pearl-chain-vertical-item>
      `);
      element.pearlChainVerticalItemAttributes = {
        lineType: 'standard',
        lineColor: 'disruption',
        bulletType: 'past',
        minHeight: 100,
        bulletSize: 'start-end',
        hideLine: true,
      };
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders a position', () => {
    let element: SbbPearlChainVerticalItemElement;

    beforeEach(async () => {
      element = await fixture<SbbPearlChainVerticalItemElement>(html`
        <sbb-pearl-chain-vertical-item>
          <div slot="right">right content</div>
          <div slot="left">left content</div>
        </sbb-pearl-chain-vertical-item>
      `);
      element.pearlChainVerticalItemAttributes = {
        lineType: 'standard',
        lineColor: 'disruption',
        bulletType: 'default',
        minHeight: 100,
        hideLine: true,
        bulletSize: 'start-end',
        position: 50,
      };
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders a crossed-bullet', () => {
    let element: SbbPearlChainVerticalItemElement;

    beforeEach(async () => {
      element = await fixture<SbbPearlChainVerticalItemElement>(html`
        <sbb-pearl-chain-vertical-item>
          <div slot="right">right content</div>
          <div slot="left">left content</div>
        </sbb-pearl-chain-vertical-item>
      `);
      element.pearlChainVerticalItemAttributes = {
        lineType: 'standard',
        lineColor: 'disruption',
        bulletType: 'skipped',
        minHeight: 100,
        hideLine: true,
        bulletSize: 'start-end',
        position: 0,
      };
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
