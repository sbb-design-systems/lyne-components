import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import {
  describeViewports,
  fixture,
  isVisualRegressionRun,
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
                    .inner-container {
                      display: flex;
                      flex-direction: column;
                      gap: var(--sbb-spacing-fixed-4x);
                    }
                    sbb-title {
                      margin-block-start: 0;
                    }
                    p.lead-text {
                      margin-block: 0;
                    }
                    p.other-content {
                      margin-block-start: var(--sbb-spacing-responsive-s);
                      margin-block-end: 0;
                    }
                  </style>
                  <img
                    slot="image"
                    src=${new URL('./assets/lucerne.png', import.meta.url).href}
                    alt=""
                  />
                  <div class="inner-container">
                    <sbb-breadcrumb-group>
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
                    >
                      Link
                    </sbb-block-link>
                    <sbb-title>Title</sbb-title>
                  </div>
                  <p class="sbb-text-xl lead-text">
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
