import { html, type TemplateResult } from 'lit';

import type { VisualDiffSetupBuilder } from '../../core/testing/private.ts';
import { describeViewports, visualDiffDefault } from '../../core/testing/private.ts';

import type { SbbNavigationElement } from './navigation.component.ts';

import './navigation.component.ts';
import '../navigation-marker.ts';
import '../navigation-button.ts';
import '../navigation-link.ts';

describe(`sbb-navigation`, () => {
  const navigationActions = (): TemplateResult => html`
    <sbb-navigation-button>Button 1</sbb-navigation-button>
    <sbb-navigation-button class="sbb-active">Button 2</sbb-navigation-button>
    <sbb-navigation-link href="#"> Link 3 </sbb-navigation-link>
  `;

  const template = html`
    <sbb-navigation id="navigation" trigger="navigation-trigger-1">
      <sbb-navigation-marker id="nav-marker">${navigationActions()}</sbb-navigation-marker>
      <sbb-navigation-marker size="s">${navigationActions()}</sbb-navigation-marker>
    </sbb-navigation>
  `;

  function openNavigation(setup: VisualDiffSetupBuilder): void {
    const navigation = setup.snapshotElement.querySelector<SbbNavigationElement>('sbb-navigation')!;
    setup.withSnapshotElement(navigation);
    setup.withPostSetupAction(() => navigation.open());
  }

  describeViewports({ viewportHeight: 600 }, () => {
    it(
      visualDiffDefault.name,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template, { padding: '0' });
        openNavigation(setup);
      }),
    );
  });

  describeViewports({ viewports: ['large'], viewportHeight: 600 }, () => {
    it(
      'darkMode=true',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template, { padding: '0', darkMode: true });
        openNavigation(setup);
      }),
    );

    it(
      'forcedColors=true',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template, { padding: '0', forcedColors: true });
        openNavigation(setup);
      }),
    );
  });
});
