import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { testA11yTreeSnapshot } from '../../core/testing/a11y-tree-snapshot';
import type { SbbFormFieldElement } from '../../form-field';

import type { SbbDatepickerToggleElement } from './datepicker-toggle';

import '../datepicker';
import './datepicker-toggle';

describe('sbb-datepicker-toggle', () => {
  it('renders', async () => {
    const page = await fixture(html`<sbb-datepicker-toggle></sbb-datepicker-toggle>`);

    expect(page).dom.to.equal(`<sbb-datepicker-toggle slot="prefix"></sbb-datepicker-toggle>`);
    await expect(page).shadowDom.to.equalSnapshot();
  });

  describe('renders in form-field', () => {
    it('renders in form-field', async () => {
      const page: SbbFormFieldElement = await fixture(html`
        <sbb-form-field>
          <sbb-datepicker-toggle></sbb-datepicker-toggle>
          <sbb-datepicker></sbb-datepicker>
          <input />
        </sbb-form-field>
      `);
      const element: SbbDatepickerToggleElement =
        page.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;
      expect(element).dom.to.be.equal(
        `<sbb-datepicker-toggle slot="prefix"></sbb-datepicker-toggle>`,
      );
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    it('renders in disabled form-field', async () => {
      const page: SbbFormFieldElement = await fixture(html`
        <sbb-form-field>
          <sbb-datepicker-toggle></sbb-datepicker-toggle>
          <sbb-datepicker></sbb-datepicker>
          <input disabled />
        </sbb-form-field>
      `);
      const element: SbbDatepickerToggleElement =
        page.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;
      expect(element).dom.to.be.equal(
        `<sbb-datepicker-toggle slot="prefix"></sbb-datepicker-toggle>`,
      );
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    it('renders in form-field with calendar parameters', async () => {
      const page = await fixture(html`
        <sbb-form-field>
          <sbb-datepicker-toggle></sbb-datepicker-toggle>
          <sbb-datepicker wide></sbb-datepicker>
          <input min="1600000000" max="1700000000" />
        </sbb-form-field>
      `);
      const element: SbbDatepickerToggleElement =
        page.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;
      expect(element).dom.to.be.equal(
        `<sbb-datepicker-toggle slot="prefix"></sbb-datepicker-toggle>`,
      );
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  testA11yTreeSnapshot(html`<sbb-datepicker-toggle></sbb-datepicker-toggle>`);
});
