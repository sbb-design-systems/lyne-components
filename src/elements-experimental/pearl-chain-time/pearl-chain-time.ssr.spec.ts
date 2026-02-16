import { assert } from '@open-wc/testing';
import { ssrHydratedFixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import { SbbPearlChainTimeElement } from './pearl-chain-time.component.ts';

const now = '2022-08-16T15:00:00Z';

describe(`sbb-pearl-chain-time ssr`, () => {
  let root: SbbPearlChainTimeElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture<SbbPearlChainTimeElement>(
      html`
        <sbb-pearl-chain-time
          departure-time="2022-08-16T12:00:00"
          arrival-time="2022-08-16T15:00:00"
          now=${now}
        >
        </sbb-pearl-chain-time>
      `,
      { modules: ['./pearl-chain-time.component.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbPearlChainTimeElement);
  });
});
