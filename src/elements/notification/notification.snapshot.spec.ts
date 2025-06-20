import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbNotificationElement } from './notification.component.js';
import './notification.component.js';
import '../title.js';

describe(`sbb-notification`, () => {
  describe('renders', () => {
    let element: SbbNotificationElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-notification>
          <p>The quick brown fox jumps over the lazy dog.</p>
        </sbb-notification>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot({ ignoreAttributes: ['style'] });
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with a title', () => {
    let element: SbbNotificationElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-notification>
          <sbb-title level="3">Title</sbb-title>
          <p>The quick brown fox jumps over the lazy dog.</p>
        </sbb-notification>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot({ ignoreAttributes: ['style'] });
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders without the close button', () => {
    let element: SbbNotificationElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-notification readonly>
          <sbb-title level="3">Title</sbb-title>
          <p>The quick brown fox jumps over the lazy dog.</p>
        </sbb-notification>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot({ ignoreAttributes: ['style'] });
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders size s', () => {
    let element: SbbNotificationElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-notification size="s">
          <sbb-title level="3">Title</sbb-title>
          <p>The quick brown fox jumps over the lazy dog.</p>
        </sbb-notification>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot({ ignoreAttributes: ['style'] });
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  testA11yTreeSnapshot(
    html`<sbb-notification>
      <sbb-title level="3">Test title</sbb-title>
      <p>Lorem ipsum ...</p>
    </sbb-notification>`,
  );
});
