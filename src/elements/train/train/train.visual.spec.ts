import { html, nothing, type TemplateResult } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../../core/testing/private.ts';
import type { SbbTrainFormationElement } from '../../train.ts';

import '../../train.ts';

describe(`sbb-train`, () => {
  const cases = { direction: ['left', 'right'], station: [undefined, 'Berne'] };

  const trainFormationWrapper = (
    content: TemplateResult,
    orientation: SbbTrainFormationElement['orientation'] = 'horizontal',
  ): TemplateResult =>
    html`<sbb-train-formation orientation=${orientation}>${content}</sbb-train-formation>`;

  describeViewports({ viewports: ['zero', 'large'] }, () => {
    for (const orientation of [
      'horizontal',
      'vertical',
    ] satisfies SbbTrainFormationElement['orientation'][]) {
      describe(`orientation=${orientation}`, () => {
        describeEach(cases, ({ direction, station }) => {
          let root: HTMLElement;

          beforeEach(async () => {
            root = await visualRegressionFixture(
              trainFormationWrapper(
                html`<sbb-train
                  direction=${direction}
                  station=${station || nothing}
                  direction-label="Direction of travel"
                  style="width:600px;height:600px;"
                ></sbb-train>`,
                orientation,
              ),
            );
          });

          it(
            visualDiffDefault.name,
            visualDiffDefault.with(async (setup) => {
              setup.withSnapshotElement(root);
            }),
          );
        });

        it(
          'display ellipsis with long label',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              trainFormationWrapper(
                html`<sbb-train
                  direction="right"
                  station="Berne"
                  direction-label="Direction of travel"
                  style="width:600px;height:600px;"
                ></sbb-train>`,
                orientation,
              ),
              { maxWidth: '200px' },
            );
          }),
        );
      });
    }
  });
});
