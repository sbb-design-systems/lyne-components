import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbBreadcrumbElement } from './breadcrumb.js';

describe(`sbb-breadcrumb ssr`, () => {
  let root: SbbBreadcrumbElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-breadcrumb id="focus-id" href="#">Test</sbb-breadcrumb>`,
      {
        modules: ['./breadcrumb.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbBreadcrumbElement);
  });
});
