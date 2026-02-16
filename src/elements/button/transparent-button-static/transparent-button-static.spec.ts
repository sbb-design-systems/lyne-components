import { expect } from '@open-wc/testing';

import { fixture } from '../../core/testing/private.ts';
import {
  buttonIconTestTemplate,
  buttonSpaceIconTestTemplate,
} from '../common/button-test-utils.private.ts';
import './transparent-button-static.component.ts';

describe(`sbb-transparent-button-static`, () => {
  it('should detect icon in sbb-transparent-button-static', async () => {
    const root = await fixture(buttonIconTestTemplate('sbb-transparent-button-static'));
    expect(root).to.match(':state(slotted-icon)');
    expect(root).not.to.match(':state(slotted)');
  });

  it('should detect icon in sbb-transparent-button-static when there is space around icon', async () => {
    const root = await fixture(buttonSpaceIconTestTemplate('sbb-transparent-button-static'));
    expect(root).to.match(':state(slotted-icon)');
    expect(root).not.to.match(':state(slotted)');
  });
});
