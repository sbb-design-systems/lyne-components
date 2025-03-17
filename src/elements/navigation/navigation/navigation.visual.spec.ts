import { html, type TemplateResult } from 'lit';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import type { SbbNavigationElement } from './navigation.component.js';

import './navigation.component.js';
import '../navigation-marker.js';
import '../navigation-button.js';
import '../navigation-link.js';

describe(`sbb-navigation`, () => {
  const navigationActions = (): TemplateResult => html`
    <sbb-navigation-button>Button 1</sbb-navigation-button>
    <sbb-navigation-button class="sbb-active">Button 2</sbb-navigation-button>
    <sbb-navigation-link href="#"> Link 3 </sbb-navigation-link>
  `;

  describeViewports({ viewportHeight: 600 }, () => {
    it(
      visualDiffDefault.name,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-navigation id="navigation" trigger="navigation-trigger-1">
              <sbb-navigation-marker id="nav-marker">${navigationActions()}</sbb-navigation-marker>
              <sbb-navigation-marker size="s">${navigationActions()}</sbb-navigation-marker>
            </sbb-navigation>
          `,
          { padding: '0' },
        );
        const navigation =
          setup.snapshotElement.querySelector<SbbNavigationElement>('sbb-navigation')!;
        setup.withSnapshotElement(navigation);
        setup.withPostSetupAction(() => navigation.open());
      }),
    );
  });
});
