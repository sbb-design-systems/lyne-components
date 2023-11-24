import { csrFixture, ssrHydratedFixture, cleanupFixtures } from '@lit-labs/testing/fixtures.js';
import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { EventSpy } from '../../core/testing';

import { SbbExpansionPanelHeader } from './expansion-panel-header';

const ssrModules = ['./expansion-panel-header.ts'];
for (const fixture of [csrFixture, ssrHydratedFixture]) {
  describe(`sbb-expansion-panel-header rendered with ${fixture.name}`, () => {
    let element: SbbExpansionPanelHeader;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-expansion-panel-header>Header</sbb-expansion-panel-header>`,
        { modules: ssrModules },
      );
    });

    afterEach(() => {
      cleanupFixtures();
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbExpansionPanelHeader);
    });

    it('should emit event on click', async () => {
      const spy = new EventSpy(SbbExpansionPanelHeader.events.toggleExpanded);
      element.click();
      expect(spy.count).to.be.greaterThan(0);
    });

    it('should not emit event on click if disabled', async () => {
      element = await fixture(
        html`<sbb-expansion-panel-header disabled>Header</sbb-expansion-panel-header>`,
        { modules: ssrModules },
      );
      const spy = new EventSpy(SbbExpansionPanelHeader.events.toggleExpanded);
      element.click();
      expect(spy.count).not.to.be.greaterThan(0);
    });
  });
}
