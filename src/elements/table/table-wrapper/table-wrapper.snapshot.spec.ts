import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.ts';

import type { SbbTableWrapperElement } from './table-wrapper.component.ts';
import './table-wrapper.component.ts';

describe(`sbb-table-wrapper`, () => {
  describe('renders', () => {
    let element: SbbTableWrapperElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-table-wrapper>
          <table class="sbb-table" aria-label="Table caption">
            <thead>
              <tr>
                <th>Col 1</th>
                <th>Col 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Data 1</td>
                <td>Data 2</td>
              </tr>
            </tbody>
          </table>
        </sbb-table-wrapper>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
