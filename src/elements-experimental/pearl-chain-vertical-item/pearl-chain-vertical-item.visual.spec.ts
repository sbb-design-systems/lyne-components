import {
  describeViewports,
  visualDiffDefault,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html, type TemplateResult } from 'lit';

import './pearl-chain-vertical-item.component.ts';

describe(`sbb-pearl-chain-vertical-item`, () => {
  const defaultArgs = {
    lineType: 'standard',
    lineColor: 'default',
    bulletType: 'default',
    minHeight: '100',
    hideLine: false,
    bulletSize: 'start-end',
    position: 0,
  };

  const content: TemplateResult = html`
    slot for content
    <div>more</div>
    <div>more</div>
    <div>more</div>
    <div>more</div>
    <div>more</div>
  `;

  describeViewports({ viewports: ['large'] }, () => {
    describe('slot', () => {
      it(
        'right',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-pearl-chain-vertical-item
              .pearlChainVerticalItemAttributes=${defaultArgs}
              disable-animation
            >
              <div
                slot="right"
                style="--sbb-pearl-chain-vertical-right-item-block-start: -10px; --sbb-pearl-chain-vertical-right-item-inline-start: 10px;"
              >
                ${content}
              </div>
            </sbb-pearl-chain-vertical-item>
          `);
        }),
      );

      it(
        'left',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-pearl-chain-vertical-item
              .pearlChainVerticalItemAttributes=${{
                ...defaultArgs,
                lineColor: 'disruption',
                bulletType: 'disruption',
              }}
              disable-animation
            >
              <div slot="left" style="--sbb-pearl-chain-vertical-left-item-inline-end: 10px;">
                slot for content
              </div>
            </sbb-pearl-chain-vertical-item>
          `);
        }),
      );

      it(
        'none',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-pearl-chain-vertical-item
              disable-animation
              .pearlChainVerticalItemAttributes=${defaultArgs}
            ></sbb-pearl-chain-vertical-item>
          `);
        }),
      );

      it(
        'both',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-pearl-chain-vertical-item
              .pearlChainVerticalItemAttributes=${defaultArgs}
              disable-animation
            >
              <div
                slot="right"
                style="--sbb-pearl-chain-vertical-right-item-block-start: -10px; --sbb-pearl-chain-vertical-right-item-inline-start: 10px;"
              >
                ${content}
              </div>
              <div
                slot="left"
                style="--sbb-pearl-chain-vertical-left-item-block-start: -8px; --sbb-pearl-chain-vertical-left-item-inline-end: 10px;"
              >
                19:00
              </div>
            </sbb-pearl-chain-vertical-item>
          `);
        }),
      );
    });

    describe('variants', () => {
      const template = (args: typeof defaultArgs): TemplateResult => html`
        <sbb-pearl-chain-vertical-item .pearlChainVerticalItemAttributes=${args} disable-animation>
          <div
            slot="right"
            style="--sbb-pearl-chain-vertical-right-item-block-start: -10px; --sbb-pearl-chain-vertical-right-item-inline-start: 10px;"
          >
            ${content}
          </div>
        </sbb-pearl-chain-vertical-item>
      `;

      it(
        'charcoal',
        visualDiffDefault.with(async (setup) => {
          const args = { ...defaultArgs, bulletType: 'thick' };
          await setup.withFixture(template(args));
        }),
      );

      it(
        'dotted',
        visualDiffDefault.with(async (setup) => {
          const args = {
            ...defaultArgs,
            lineType: 'dotted',
            lineColor: 'disruption',
            bulletType: 'disruption',
            bulletSize: 'start-end',
          };
          await setup.withFixture(template(args));
        }),
      );

      it(
        'thin pearl',
        visualDiffDefault.with(async (setup) => {
          const args = {
            ...defaultArgs,
            lineType: 'thin',
            lineColor: 'disruption',
            bulletType: 'disruption',
            bulletSize: 'stop',
          };
          await setup.withFixture(template(args));
        }),
      );

      it(
        'thick bullet',
        visualDiffDefault.with(async (setup) => {
          const args = { ...defaultArgs, bulletSize: 'stop' };
          await setup.withFixture(template(args));
        }),
      );

      it(
        'thin bullet',
        visualDiffDefault.with(async (setup) => {
          const args = { ...defaultArgs, bulletType: 'irrelevant', bulletSize: 'stop' };
          await setup.withFixture(template(args));
        }),
      );

      it(
        'crossed bullet',
        visualDiffDefault.with(async (setup) => {
          const args = {
            ...defaultArgs,
            bulletType: 'skipped',
            lineType: 'dotted',
            lineColor: 'disruption',
          };
          await setup.withFixture(template(args));
        }),
      );

      it(
        'position',
        visualDiffDefault.with(async (setup) => {
          const args = { ...defaultArgs, position: 75 };
          await setup.withFixture(template(args));
        }),
      );
    });
  });
});
