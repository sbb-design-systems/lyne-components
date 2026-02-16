import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.ts';

import { SbbBreadcrumbGroupElement } from './breadcrumb-group.component.ts';

import '../breadcrumb.ts';

describe(`sbb-breadcrumb-group ssr`, () => {
  let root: SbbBreadcrumbGroupElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-breadcrumb-group>
          <sbb-breadcrumb href="#" icon-name="house-small" id="breadcrumb-0"></sbb-breadcrumb>
          <sbb-breadcrumb href="#" id="breadcrumb-1">One</sbb-breadcrumb>
          <sbb-breadcrumb href="#" id="breadcrumb-2">Two</sbb-breadcrumb>
        </sbb-breadcrumb-group>
      `,
      { modules: ['./breadcrumb-group.component.js', '../breadcrumb.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbBreadcrumbGroupElement);
  });
});
