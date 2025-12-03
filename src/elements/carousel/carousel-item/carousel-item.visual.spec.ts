import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.ts';
import { waitForImageReady } from '../../core/testing.ts';

import './carousel-item.component.ts';
import '../../image.ts';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

describe('sbb-carousel-item', () => {
  describeViewports(() => {
    it(
      'default',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-carousel-item>
            <img src=${imageUrl} alt="SBB image" width="200" height="150" />
          </sbb-carousel-item>
        `);

        setup.withPostSetupAction(
          async () => await waitForImageReady(setup.snapshotElement.querySelector('img')!),
        );
      }),
    );
  });
});
