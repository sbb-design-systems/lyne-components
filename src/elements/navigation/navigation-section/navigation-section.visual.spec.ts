import { html, nothing, type TemplateResult } from 'lit';

import type { VisualDiffSetupBuilder } from '../../core/testing/private.ts';
import { describeViewports, visualDiffDefault } from '../../core/testing/private.ts';
import type { SbbNavigationElement } from '../navigation.ts';

import './navigation-section.component.ts';
import '../navigation.ts';
import '../navigation-marker.ts';
import '../navigation-list.ts';
import '../navigation-button.ts';
import '../navigation-link.ts';

describe(`sbb-navigation-section`, () => {
  const navigationActions = (): TemplateResult => html`
    <sbb-navigation-button>Button 1</sbb-navigation-button>
    <sbb-navigation-button class="sbb-active" id="nav-2">Button 2</sbb-navigation-button>
    <sbb-navigation-link href="#"> Link 3 </sbb-navigation-link>
  `;

  const navigationList = (slottedLabel?: boolean): TemplateResult => html`
    <sbb-navigation-list label=${!slottedLabel ? 'Label' : nothing}>
      ${slottedLabel ? html`<span slot="label">Slotted label</span>` : nothing}

      <sbb-navigation-button>Button</sbb-navigation-button>
      <sbb-navigation-button>Button</sbb-navigation-button>
      <sbb-navigation-link href="#">Link</sbb-navigation-link>
    </sbb-navigation-list>
  `;

  const template = html`
    <sbb-navigation>
      <sbb-navigation-marker id="nav-marker">${navigationActions()}</sbb-navigation-marker>
      <sbb-navigation-section trigger="nav-2" title-content="Title two">
        ${navigationList(true)} ${navigationList(true)} ${navigationList()} ${navigationList()}
        ${navigationList()} ${navigationList()}
      </sbb-navigation-section>
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
