import {
  describeViewports,
  visualDiffDefault,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import '@sbb-esta/lyne-elements/icon.js';
import '@sbb-esta/lyne-elements/timetable-occupancy.js';
import { html } from 'lit';

import './pearl-chain-vertical.component.ts';
import '../pearl-chain-vertical-item.ts';

describe(`sbb-pearl-chain-vertical`, () => {
  const defaultArgs = {
    lineType: 'standard',
    lineColor: 'default',
    bulletType: 'default',
    minHeight: '100',
    hideLine: false,
    bulletSize: 'start-end',
    position: 0,
  };

  describeViewports({ viewports: ['large'] }, () => {
    it(
      'connection',
      visualDiffDefault.with(async (setup) => {
        const args = {
          ...defaultArgs,
          lineColor: 'disruption',
          hideLine: true,
          bulletSize: 'stop',
        };
        await setup.withFixture(html`
          <sbb-pearl-chain-vertical>
            <sbb-pearl-chain-vertical-item .pearlChainVerticalItemAttributes=${defaultArgs}>
              <div
                slot="right"
                style="--sbb-pearl-chain-vertical-right-item-block-start: -8px; --sbb-pearl-chain-vertical-right-item-inline-start: 10px;"
              >
                <div style="display: flex; flex-direction: row; justify-content: space-between;">
                  <div>Station</div>
                  <div>Pl. 12</div>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: space-between;">
                  <div>
                    <sbb-icon role="img" name="train-small" aria-hidden="true"></sbb-icon>
                    <sbb-icon role="img" name="ir-27" aria-hidden="true"></sbb-icon>
                    <div>Direction Station</div>
                  </div>
                  <span>
                    <sbb-timetable-occupancy
                      first-class-occupancy="high"
                      second-class-occupancy="high"
                    ></sbb-timetable-occupancy>
                  </span>
                </div>
              </div>
              <div
                slot="left"
                style="--sbb-pearl-chain-vertical-left-item-block-start: -8px; --sbb-pearl-chain-vertical-left-item-inline-end: 10px;"
              >
                19:00
              </div>
            </sbb-pearl-chain-vertical-item>
            <sbb-pearl-chain-vertical-item .pearlChainVerticalItemAttributes=${args}>
              <div
                slot="right"
                style="
                  --sbb-pearl-chain-vertical-right-item-block-start: -20px;
                  --sbb-pearl-chain-vertical-right-item-inline-start: 10px;
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                "
              >
                <div>Station</div>
                <div>Pl. 12</div>
              </div>
              <div
                slot="left"
                style="--sbb-pearl-chain-vertical-left-item-block-start: -20px; --sbb-pearl-chain-vertical-left-item-inline-end: 10px;"
              >
                20:00
              </div>
            </sbb-pearl-chain-vertical-item>
          </sbb-pearl-chain-vertical>
        `);
      }),
    );

    it(
      'third level',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-pearl-chain-vertical>
            <sbb-pearl-chain-vertical-item
              .pearlChainVerticalItemAttributes=${{
                lineType: 'thin',
                lineColor: 'past',
                minHeight: 39,
                hideLine: false,
                bulletSize: 'stop',
              }}
            >
              <div
                slot="left"
                style="--sbb-pearl-chain-vertical-left-item-block-start: 15px; --sbb-pearl-chain-vertical-left-item-inline-end: 10px;"
              >
                10:31
              </div>
            </sbb-pearl-chain-vertical-item>
            <sbb-pearl-chain-vertical-item .pearlChainVerticalItemAttributes=${defaultArgs}>
              <div
                slot="right"
                style="--sbb-pearl-chain-vertical-right-item-block-start: -10px; --sbb-pearl-chain-vertical-right-item-inline-start: 10px;"
              >
                <div style="display: flex; flex-direction: row; gap: 100px;">
                  <div>Station</div>
                  <div>Pl. 12</div>
                </div>
                <div style="padding-bottom: 5px; padding-top: 5px;">
                  <span>
                    <sbb-timetable-occupancy
                      first-class-occupancy="high"
                      second-class-occupancy="high"
                    ></sbb-timetable-occupancy>
                  </span>
                </div>
              </div>
              <div
                slot="left"
                style="--sbb-pearl-chain-vertical-left-item-block-start: -10px; --sbb-pearl-chain-vertical-left-item-inline-end: 10px;"
              >
                <div class="sbb-text--bold">19:00</div>
                <div style="margin-top: 40px;">10:31</div>
              </div>
            </sbb-pearl-chain-vertical-item>
            <sbb-pearl-chain-vertical-item
              .pearlChainVerticalItemAttributes=${{
                lineType: 'standard',
                lineColor: 'default',
                minHeight: 89,
                hideLine: false,
                bulletType: 'default',
                bulletSize: 'stop',
              }}
            >
              <div
                slot="right"
                style="--sbb-pearl-chain-vertical-right-item-block-start: -10px; --sbb-pearl-chain-vertical-right-item-inline-start: 10px;"
              >
                <div style="display: flex; flex-direction: row; gap: 100px;">
                  <div>Station</div>
                  <div>Pl. 12</div>
                </div>
                <div style="padding-bottom: 5px; padding-top: 5px;">
                  <span>
                    <sbb-timetable-occupancy
                      first-class-occupancy="high"
                      second-class-occupancy="high"
                    ></sbb-timetable-occupancy>
                  </span>
                </div>
              </div>
              <div
                slot="left"
                style="--sbb-pearl-chain-vertical-left-item-block-start: -10px; --sbb-pearl-chain-vertical-left-item-inline-end: 10px;"
              >
                <div class="sbb-text--bold">19:00</div>
                <div style="margin-top: 40px;">10:31</div>
              </div>
            </sbb-pearl-chain-vertical-item>
            <sbb-pearl-chain-vertical-item
              .pearlChainVerticalItemAttributes=${{
                lineType: 'thin',
                lineColor: 'past',
                minHeight: 89,
                hideLine: false,
                bulletType: 'default',
                bulletSize: 'start-end',
              }}
            >
              <div
                slot="right"
                style="--sbb-pearl-chain-vertical-right-item-block-start: -10px; --sbb-pearl-chain-vertical-right-item-inline-start: 10px;"
              >
                <div style="display: flex; flex-direction: row; gap: 100px;">
                  <div>Station</div>
                  <div>Pl. 12</div>
                </div>
              </div>

              <div
                slot="left"
                style="--sbb-pearl-chain-vertical-left-item-block-start: -10px; --sbb-pearl-chain-vertical-left-item-inline-end: 10px;"
              >
                <div class="sbb-text--bold">19:00</div>
                <div style="margin-top: 40px;">10:31</div>
              </div>
            </sbb-pearl-chain-vertical-item>
            <sbb-pearl-chain-vertical-item
              .pearlChainVerticalItemAttributes=${{
                lineType: 'thin',
                lineColor: 'past',
                minHeight: 39,
                hideLine: false,
                bulletSize: 'stop',
                bulletType: 'irrelevant',
              }}
            >
              <div
                slot="right"
                style="--sbb-pearl-chain-vertical-right-item-block-start: -10px; --sbb-pearl-chain-vertical-right-item-inline-start: 10px;"
              >
                <div style="display: flex; flex-direction: row; gap: 100px;">
                  <div>Station</div>
                  <div>Pl. 12</div>
                </div>
              </div>
              <div
                slot="left"
                style="--sbb-pearl-chain-vertical-left-item-block-start: -10px; --sbb-pearl-chain-vertical-left-item-inline-end: 10px;"
              >
                <div class="sbb-text--bold">19:00</div>
              </div>
            </sbb-pearl-chain-vertical-item>
          </sbb-pearl-chain-vertical>
        `);
      }),
    );

    it(
      'timetable change',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-pearl-chain-vertical>
            <sbb-pearl-chain-vertical-item
              .pearlChainVerticalItemAttributes=${{
                lineType: 'dotted',
                lineColor: 'walk',
                bulletType: 'thick',
                minHeight: 122,
                hideLine: false,
                bulletSize: 'stop',
                position: 0,
              }}
            >
              <div
                slot="right"
                style="--sbb-pearl-chain-vertical-right-item-block-start: -10px; --sbb-pearl-chain-vertical-right-item-inline-start: 10px;"
              >
                <div style="display: flex; flex-direction: row; gap: 100px;">
                  <div>09:45</div>
                  <div>Pl. 12</div>
                </div>
                <div style="padding-bottom: 5px;">
                  <span style="font-size: 12px;">Footpath</span>
                </div>
                <div>
                  <div
                    style="display: flex; flex-direction: row; align-items: center; gap: 130px; font-size: 12px;"
                  >
                    <div style="display: flex; flex-direction: row; align-items: center;">
                      <div>
                        <sbb-icon role="img" name="walk-small" aria-hidden="true"></sbb-icon>
                      </div>
                      <div>5'</div>
                    </div>
                    <div style="font-size: 12px;">150 m</div>
                  </div>
                </div>
                <span style="font-size: 12px;">Departure</span>
              </div>
            </sbb-pearl-chain-vertical-item>
            <sbb-pearl-chain-vertical-item
              .pearlChainVerticalItemAttributes=${{
                lineType: 'dotted',
                lineColor: 'walk',
                bulletType: 'standard',
                minHeight: 100,
                hideLine: true,
                bulletSize: 'start-end',
                position: 0,
              }}
            >
              <div
                slot="right"
                style="--sbb-pearl-chain-vertical-right-item-block-start: -10px; --sbb-pearl-chain-vertical-right-item-inline-start: 10px;"
              >
                <div style="display: flex; flex-direction: row; gap: 100px;" class="sbb-text--bold">
                  <div>09:45</div>
                  <div>Pl. 12</div>
                </div>
              </div>
            </sbb-pearl-chain-vertical-item>
          </sbb-pearl-chain-vertical>
        `);
      }),
    );
  });
});
