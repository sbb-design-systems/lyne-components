import { assert, expect } from '@open-wc/testing';
import { html } from 'lit';

import type { SbbButtonElement } from '../../button.js';
import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbPopoverElement } from './popover.js';

import '../../button.js';
import '../../link.js';

describe(`sbb-popover ssr`, () => {
  let root: HTMLSpanElement;

  describe('default', () => {
    beforeEach(async () => {
      root = await ssrHydratedFixture(
        html`
          <span>
            <sbb-button id="popover-trigger">Popover trigger</sbb-button>
            <sbb-popover id="popover" trigger="popover-trigger">
              Popover content.
              <sbb-link id="popover-link" href="#" sbb-popover-close>Link</sbb-link>
            </sbb-popover>
            <sbb-block-link href="#" id="interactive-background-element">
              Other interactive element
            </sbb-block-link>
          </span>
        `,
        { modules: ['../../button.js', './popover.js', '../../link.js'] },
      );
    });

    it('renders', () => {
      assert.instanceOf(root.querySelector('sbb-popover'), SbbPopoverElement);
    });

    it('connects trigger correctly', () => {
      root.querySelector<SbbButtonElement>('#popover-trigger')!.click();
      expect(root.querySelector('sbb-popover')!.getAttribute('data-state')).not.to.be.equal(
        'closed',
      );
    });
  });

  describe('hover trigger', () => {
    beforeEach(async () => {
      root = await ssrHydratedFixture(
        html`
          <span>
            <sbb-button id="popover-trigger">Popover trigger</sbb-button>
            <sbb-popover id="popover" trigger="popover-trigger" hover-trigger>
              Popover content.
              <sbb-link id="popover-link" href="#" sbb-popover-close>Link</sbb-link>
            </sbb-popover>
            <sbb-block-link href="#" id="interactive-background-element">
              Other interactive element
            </sbb-block-link>
          </span>
        `,
        { modules: ['../../button.js', './popover.js', '../../link.js'] },
      );
    });

    it('renders', () => {
      assert.instanceOf(root.querySelector('sbb-popover'), SbbPopoverElement);
    });
  });
});
