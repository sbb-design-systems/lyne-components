import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbPopoverTriggerElement } from './popover-trigger.component.js';
import '../popover.js';
import '../../link.js';

describe(`sbb-popover-trigger ssr`, () => {
  let root: HTMLDivElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <div>
          <sbb-popover-trigger id="popover-trigger"></sbb-popover-trigger>
          <sbb-popover id="popover" trigger="popover-trigger">
            Popover content.
            <sbb-link id="popover-link" sbb-popover-close>Link</sbb-link>
          </sbb-popover>
        </div>
      `,
      { modules: ['./popover-trigger.component.js', '../popover.js', '../../link.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root.querySelector('sbb-popover-trigger'), SbbPopoverTriggerElement);
  });
});
