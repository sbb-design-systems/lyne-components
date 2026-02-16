import { expect } from '@open-wc/testing';

import { fixture } from '../../core/testing/private.ts';
import {
  buttonIconTestTemplate,
  buttonSpaceIconTestTemplate,
} from '../common/button-test-utils.private.ts';
import './transparent-button.component.ts';

describe(`sbb-transparent-button`, () => {
  it('should detect icon in sbb-transparent-button', async () => {
    const root = await fixture(buttonIconTestTemplate('sbb-transparent-button'));
    expect(root).to.match(':state(slotted-icon)');
    expect(root).not.to.match(':state(slotted)');
  });

  it('should detect icon in sbb-transparent-button when there is space around icon', async () => {
    const root = await fixture(buttonSpaceIconTestTemplate('sbb-transparent-button'));
    expect(root).to.match(':state(slotted-icon)');
    expect(root).not.to.match(':state(slotted)');
  });
});
