import { expect } from '@open-wc/testing';

import { fixture } from '../../core/testing/private.js';
import {
  buttonIconTestTemplate,
  buttonSpaceIconTestTemplate,
} from '../common/button-test-utils.private.js';

import './accent-button.component.js';

describe(`sbb-accent-button`, () => {
  it('should detect icon in sbb-accent-button', async () => {
    const root = await fixture(buttonIconTestTemplate('sbb-accent-button'));
    expect(root).to.match(':state(slotted-icon)');
    expect(root).not.to.match(':state(slotted)');
  });

  it('should detect icon in sbb-accent-button when there is space around icon', async () => {
    const root = await fixture(buttonSpaceIconTestTemplate('sbb-accent-button'));
    expect(root).to.match(':state(slotted-icon)');
    expect(root).not.to.match(':state(slotted)');
  });
});
