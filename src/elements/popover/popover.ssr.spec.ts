import { assert, expect } from '@open-wc/testing';
import { html } from 'lit';

import type { SbbButtonElement } from '../button.ts';
import { ssrHydratedFixture } from '../core/testing/private.ts';

import { SbbPopoverElement } from './popover.component.ts';

import '../button.ts';
import '../link.ts';

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
        { modules: ['../button.js', './popover.component.js', '../link.js'] },
      );
    });

    it('renders', () => {
      assert.instanceOf(root.querySelector('sbb-popover'), SbbPopoverElement);
    });

    it('connects trigger correctly', () => {
      root.querySelector<SbbButtonElement>('#popover-trigger')!.click();
      expect(root.querySelector('sbb-popover')!).not.to.match(':state(state-closed)');
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
        { modules: ['../button.js', './popover.component.js', '../link.js'] },
      );
    });

    it('renders', () => {
      assert.instanceOf(root.querySelector('sbb-popover'), SbbPopoverElement);
    });
  });
});
