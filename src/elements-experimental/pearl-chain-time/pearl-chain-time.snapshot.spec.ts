import { expect } from '@open-wc/testing';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import type { PtRideLeg } from '../core/timetable.ts';

import type { SbbPearlChainTimeElement } from './pearl-chain-time.component.ts';
import './pearl-chain-time.component.ts';

const now = '2022-08-16T15:00:00Z';

describe(`sbb-pearl-chain-time`, () => {
  let element: SbbPearlChainTimeElement;

  describe('renders with time', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-pearl-chain-time
          departure-time="2022-08-16T12:00:00"
          arrival-time="2022-08-16T15:00:00"
          .now=${now}
          .legs=${[
            {
              __typename: 'PTRideLeg',
            } as PtRideLeg,
          ]}
        >
        </sbb-pearl-chain-time>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with departure walk', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-pearl-chain-time
          departure-time="2022-08-16T12:00:00"
          arrival-time="2022-08-16T15:00:00"
          departure-walk="10"
          .now=${now}
          .legs=${[
            {
              __typename: 'PTRideLeg',
            } as PtRideLeg,
          ]}
        >
        </sbb-pearl-chain-time>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with arrival walk', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-pearl-chain-time
          departure-time="2022-08-16T12:00:00"
          arrival-time="2022-08-16T15:00:00"
          arrival-walk="10"
          .now=${now}
          .legs=${[
            {
              __typename: 'PTRideLeg',
            } as PtRideLeg,
          ]}
        >
        </sbb-pearl-chain-time>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with departure and arrival walk', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-pearl-chain-time
          departure-time="2022-08-16T12:00:00"
          arrival-time="2022-08-16T15:00:00"
          departure-walk="20"
          arrival-walk="10"
          .now=${now}
          .legs=${[
            {
              __typename: 'PTRideLeg',
            } as PtRideLeg,
          ]}
        >
        </sbb-pearl-chain-time>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
