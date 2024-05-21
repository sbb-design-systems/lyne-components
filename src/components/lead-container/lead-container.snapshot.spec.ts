import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import {
  describeViewports,
  fixture,
  isVisualRegressionRun,
  loadAssetAsBase64,
  testA11yTreeSnapshot,
  testVisualDiff,
  visualRegressionFixture,
} from '../core/testing/private.js';

import type { SbbLeadContainerElement } from './lead-container.js';

import '../breadcrumb.js';
import '../image.js';
import '../link/block-link/block-link.js';
import '../title.js';
import './lead-container.js';

const leadImage = await loadAssetAsBase64(import.meta.resolve('./assets/lucerne.png'));

describe(`sbb-lead-container`, () => {
  if (!isVisualRegressionRun()) {
    let element: SbbLeadContainerElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-lead-container>
          <sbb-image slot="image"></sbb-image>
        </sbb-lead-container>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  } else {
    describe('visual-regression', () => {
      let root: HTMLElement;

      describeViewports(() => {
        describe('with sbb-image', () => {
          beforeEach(async function () {
            root = await visualRegressionFixture(
              html`
                <sbb-lead-container>
                  <style>
                    p.other-content {
                      margin-block-end: 0;
                    }
                  </style>
                  <img slot="image" src=${leadImage} alt="" />
                  <sbb-breadcrumb-group class="sbb-lead-container-spacing">
                    <sbb-breadcrumb
                      href="#"
                      icon-name="house-small"
                      id="breadcrumb-0"
                    ></sbb-breadcrumb>
                    <sbb-breadcrumb href="#" id="breadcrumb-1">Level 1</sbb-breadcrumb>
                    <sbb-breadcrumb href="#" id="breadcrumb-1">Level 2</sbb-breadcrumb>
                    <sbb-breadcrumb href="#" id="breadcrumb-1">Level 3</sbb-breadcrumb>
                    <sbb-breadcrumb href="#" id="breadcrumb-1">Level 4</sbb-breadcrumb>
                  </sbb-breadcrumb-group>
                  <sbb-block-link
                    icon-placement="start"
                    icon-name="chevron-small-left-small"
                    size="xs"
                    href="https://www.sbb.ch"
                    class="sbb-lead-container-spacing"
                  >
                    Link
                  </sbb-block-link>
                  <sbb-title class="sbb-lead-container-spacing">Title</sbb-title>
                  <p class="sbb-text-xl sbb-lead-container-lead-text">
                    Lead text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim
                    elit, ultricies in tincidunt quis, mattis eu quam. Nulla sit amet lorem
                    fermentum, molestie nunc ut, hendrerit risus.
                  </p>
                  <p class="sbb-text-m other-content">
                    Other content. Vestibulum rutrum elit et lacus sollicitudin, quis malesuada
                    lorem vehicula. Suspendisse at augue quis tellus vulputate tempor. Vivamus urna
                    velit, varius nec est ac, mollis efficitur lorem. Quisque non nisl eget massa
                    interdum tempus. Praesent vel feugiat metus.
                  </p>
                </sbb-lead-container>
              `,
              this,
              { backgroundColor: `var(--sbb-color-milk)` },
            );
          });

          testVisualDiff(() => root);
        });
      });
    });
  }
});
