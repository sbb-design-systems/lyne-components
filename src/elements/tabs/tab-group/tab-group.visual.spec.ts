import { sendKeys } from '@web/test-runner-commands';
import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  tabKey,
  visualDiffDefault,
  visualDiffFocus,
  visualRegressionFixture,
} from '../../core/testing/private.ts';

import type { SbbTabGroupElement } from './tab-group.component.ts';

import '../tab-group.ts';
import '../tab-label.ts';
import '../tab.ts';
import '../../icon.ts';

const cases = {
  size: ['s', 'l', 'xl'],
  numbersAndIcons: [false, true],
};

describe(`sbb-tab-group`, () => {
  describeViewports({ viewports: ['zero', 'large'] }, () => {
    describeEach(cases, ({ size, numbersAndIcons }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-tab-group size=${size} initial-selected-index="0">
              <sbb-tab-label
                amount=${numbersAndIcons ? 16 : nothing}
                icon-name=${numbersAndIcons ? 'app-icon-small' : nothing}
              >
                Tab title one
              </sbb-tab-label>
              <sbb-tab>
                <article>
                  Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean
                  euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl
                  rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi
                  proin sed libero enim sed faucibus turpis in eu mi bibendum neque egestas congue.
                </article>
              </sbb-tab>

              <sbb-tab-label
                amount=${numbersAndIcons ? 16 : nothing}
                icon-name=${numbersAndIcons ? 'swisspass-small' : nothing}
              >
                Tab title two
              </sbb-tab-label>
              <sbb-tab></sbb-tab>

              <sbb-tab-label
                disabled
                amount=${numbersAndIcons ? 16 : nothing}
                icon-name=${numbersAndIcons ? 'train-small' : nothing}
              >
                Tab title three
              </sbb-tab-label>
              <sbb-tab></sbb-tab>

              <sbb-tab-label
                amount=${numbersAndIcons ? 16 : nothing}
                icon-name=${numbersAndIcons ? 'face-smiling-small' : nothing}
              >
                Tab title four
              </sbb-tab-label>
              <sbb-tab></sbb-tab>
            </sbb-tab-group>
          `);
        }),
      );
    });

    describe('focus', () => {
      let element: SbbTabGroupElement;

      beforeEach(async function () {
        element = await visualRegressionFixture(html`
          <sbb-tab-group initial-selected-index="0">
            <sbb-tab-label amount="16" icon-name="app-icon-small"> Tab title one </sbb-tab-label>
            <sbb-tab>
              <article>
                Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean
                euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl
                rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi
                proin sed libero enim sed faucibus turpis in eu mi bibendum neque egestas congue.
              </article>
            </sbb-tab>

            <sbb-tab-label amount="16" icon-name="swisspass-small"> Tab title two </sbb-tab-label>
            <sbb-tab></sbb-tab>

            <sbb-tab-label disabled amount="16" icon-name="train-small">
              Tab title three
            </sbb-tab-label>
            <sbb-tab></sbb-tab>

            <sbb-tab-label amount="16" icon-name="face-smiling-small">
              Tab title four
            </sbb-tab-label>
            <sbb-tab></sbb-tab>
          </sbb-tab-group>
        `);
      });

      it(
        '',
        visualDiffFocus.with(async (setup) => {
          setup.withSnapshotElement(element);
        }),
      );

      it(
        'focus tab',
        visualDiffDefault.with(async (setup) => {
          setup.withSnapshotElement(element).withPostSetupAction(async () => {
            // Move focus to tab
            setup.snapshotElement.querySelector('sbb-tab-label')!.focus();
            await sendKeys({ press: tabKey });
          });
        }),
      );
    });

    it(
      'respect content margin',
      visualDiffFocus.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-tab-group initial-selected-index="0">
            <sbb-tab-label>Tab title</sbb-tab-label>
            <sbb-tab>
              <article style="margin-block-start: 2rem">
                Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean
                euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl
                rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi
                proin sed libero enim sed faucibus turpis in eu mi bibendum neque egestas congue.
              </article>
            </sbb-tab>
          </sbb-tab-group>
        `);
      }),
    );

    it(
      'nested',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-tab-group size="xl">
            <sbb-tab-label>Tab title</sbb-tab-label>
            <sbb-tab>
              <sbb-tab-group>
                <sbb-tab-label>Tab title</sbb-tab-label>
                <sbb-tab>
                  <article>
                    Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean
                    euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl
                    rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi
                    proin sed libero enim sed faucibus turpis in eu mi bibendum neque egestas
                    congue.
                  </article>
                </sbb-tab>
              </sbb-tab-group>
            </sbb-tab>
          </sbb-tab-group>
        `);
      }),
    );

    describe('fixed height', () => {
      let element: SbbTabGroupElement;

      beforeEach(async function () {
        element = await visualRegressionFixture(html`
          <sbb-tab-group fixed-height style="height: 400px;">
            <sbb-tab-label>Tab title</sbb-tab-label>
            <sbb-tab>
              <article>
                Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean
                euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl
                rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi
                proin sed libero enim sed faucibus turpis in eu mi bibendum neque egestas congue.
                Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean
                euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl
                rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi
                proin sed libero enim sed faucibus turpis in eu mi bibendum neque egestas congue.
                Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean
                euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl
                rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi
                proin sed libero enim sed faucibus turpis in eu mi bibendum neque egestas congue.
              </article>
            </sbb-tab>
          </sbb-tab-group>
        `);
      });

      it(
        '',
        visualDiffDefault.with(async (setup) => {
          setup.withSnapshotElement(element);
        }),
      );

      it(
        'focus',
        visualDiffDefault.with(async (setup) => {
          setup.withSnapshotElement(element).withPostSetupAction(async () => {
            // Move focus to tab
            setup.snapshotElement.querySelector('sbb-tab-label')!.focus();
            await sendKeys({ press: tabKey });
          });
        }),
      );
    });

    it(
      'tab with display flex',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <style>
            sbb-tab.flex-tab {
              display: flex;
            }
          </style>
          <sbb-tab-group>
            <sbb-tab-label>Tab 1</sbb-tab-label>
            <sbb-tab class="flex-tab">
              <article>
                First flex item - Diam maecenas ultricies mi eget mauris pharetra et ultrices neque
                ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae.
              </article>
              <article>
                Second flex item - Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra
                justo nec ultrices dui sapien eget mi.
              </article>
            </sbb-tab>

            <sbb-tab-label>Tab 2</sbb-tab-label>
            <sbb-tab class="flex-tab">
              <article>Should be hidden</article>
            </sbb-tab>
          </sbb-tab-group>
        `);
      }),
    );
  });
});
