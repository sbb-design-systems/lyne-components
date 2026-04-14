import { html, nothing, type TemplateResult } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../../core/testing/private.ts';
import type { SbbTrainWagonElement, SbbTrainFormationElement } from '../../train.ts';

import '../../train.ts';

describe(`sbb-train-wagon`, () => {
  const wagonTypeCases = {
    type: [
      'wagon',
      'wagon-end-left',
      'wagon-end-right',
      'couchette',
      'sleeping',
      'restaurant',
      'locomotive',
      'closed',
    ] satisfies SbbTrainWagonElement['type'][],
    view: ['side', 'top'] satisfies SbbTrainFormationElement['view'][],
    active: [false, true],
    forcedColors: [false, true],
  };

  const occupancyCases = [
    'high',
    'medium',
    'low',
    'none',
    null,
  ] satisfies SbbTrainWagonElement['occupancy'][];
  const wagonClassCases = ['1', '2', '1-2', '2-1'] satisfies SbbTrainWagonElement['wagonClass'][];

  const trainFormationWrapper = (
    content: TemplateResult,
    orientation: SbbTrainFormationElement['orientation'] = 'horizontal',
    view: SbbTrainFormationElement['view'] = 'side',
  ): TemplateResult =>
    html`<sbb-train-formation orientation=${orientation} view=${view}
      ><sbb-train>${content}</sbb-train></sbb-train-formation
    >`;

  describeViewports({ viewports: ['zero'] }, () => {
    for (const orientation of [
      'horizontal',
      'vertical',
    ] satisfies SbbTrainFormationElement['orientation'][]) {
      describe(`orientation=${orientation}`, () => {
        describeEach(wagonTypeCases, ({ type, view, forcedColors, active }) => {
          it(
            '',
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(
                trainFormationWrapper(
                  html` ${type === 'sleeping' || type === 'couchette' || type === 'restaurant'
                    ? html`<sbb-train-wagon
                        type=${type}
                        class=${active ? 'sbb-active' : nothing}
                      ></sbb-train-wagon>`
                    : html`<sbb-train-wagon
                        type=${type}
                        occupancy="medium"
                        wagon-class="1"
                        class=${active ? 'sbb-active' : nothing}
                      ></sbb-train-wagon>`}`,
                  orientation,
                  view,
                ),
                { forcedColors },
              );
            }),
          );
        });

        for (const occupancy of occupancyCases) {
          it(
            `occupancy=${occupancy}`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(
                trainFormationWrapper(
                  html` <sbb-train-wagon occupancy=${occupancy || nothing}></sbb-train-wagon> `,
                  orientation,
                ),
              );
            }),
          );
        }

        for (const wagonClass of wagonClassCases) {
          it(
            `class=${wagonClass}`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(
                trainFormationWrapper(
                  html`<sbb-train-wagon wagon-class=${wagonClass}></sbb-train-wagon>`,
                  orientation,
                ),
              );
            }),
          );
        }

        it(
          `one icon`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              trainFormationWrapper(
                html`
                  <sbb-train-wagon wagon-class="2" label="38">
                    <sbb-icon name="sa-bz"></sbb-icon>
                  </sbb-train-wagon>
                `,
                orientation,
              ),
            );
          }),
        );

        it(
          `multiple icons`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              trainFormationWrapper(
                html`
                  <sbb-train-wagon wagon-class="2" label="38">
                    <sbb-icon name="sa-rs"></sbb-icon>
                    <sbb-icon name="sa-nf"></sbb-icon>
                    <sbb-icon name="sa-bz"></sbb-icon>
                  </sbb-train-wagon>
                `,
                orientation,
              ),
            );
          }),
        );

        it(
          `multiple icons without label`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              trainFormationWrapper(
                html`
                  <sbb-train-wagon wagon-class="2">
                    <sbb-icon name="sa-rs"></sbb-icon>
                    <sbb-icon name="sa-nf"></sbb-icon>
                    <sbb-icon name="sa-bz"></sbb-icon>
                  </sbb-train-wagon>
                `,
                orientation,
              ),
            );
          }),
        );
      });
    }
  });
});
