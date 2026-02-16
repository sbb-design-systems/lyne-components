import { expect } from '@open-wc/testing';

import { fixture } from '../../core/testing/private.ts';
import {
  buttonIconTestTemplate,
  buttonSpaceIconTestTemplate,
} from '../common/button-test-utils.private.ts';
import './secondary-button-static.component.ts';

describe(`sbb-secondary-button-static`, () => {
  it('should detect icon in sbb-secondary-button-static', async () => {
    const root = await fixture(buttonIconTestTemplate('sbb-secondary-button-static'));
    expect(root).to.match(':state(slotted-icon)');
    expect(root).not.to.match(':state(slotted)');
  });

  it('should detect icon in sbb-secondary-button-static when there is space around icon', async () => {
    const root = await fixture(buttonSpaceIconTestTemplate('sbb-secondary-button-static'));
    expect(root).to.match(':state(slotted-icon)');
    expect(root).not.to.match(':state(slotted)');
  });
});
