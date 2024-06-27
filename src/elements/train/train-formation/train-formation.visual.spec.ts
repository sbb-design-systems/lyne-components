import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import '../train.js';
import '../train-wagon.js';
import '../train-blocked-passage.js';
import './train-formation.js';

describe(`sbb-train-formation`, () => {
  const hideWagonLabelCases = [false, true];

  const train1 = html`<sbb-train
    direction-label="Direction of travel"
    station="Bern"
    direction="left"
  >
    <sbb-train-wagon type="locomotive" sector="A"></sbb-train-wagon>
    <sbb-train-wagon type="closed" sector="A"></sbb-train-wagon>
    <sbb-train-blocked-passage></sbb-train-blocked-passage>
    <sbb-train-wagon
      type="wagon"
      label="38"
      occupancy="low"
      blocked-passage="previous"
      wagon-class="1"
      sector="A"
    >
      <sbb-icon name="sa-rs"></sbb-icon>
      <sbb-icon name="sa-nf"></sbb-icon>
      <sbb-icon name="sa-bz"></sbb-icon>
      <sbb-icon name="sa-bz"></sbb-icon>
    </sbb-train-wagon>
    <sbb-train-wagon type="wagon" label="39" occupancy="none" wagon-class="1" sector="B">
      <sbb-icon name="sa-nf"></sbb-icon>
    </sbb-train-wagon>
    <sbb-train-wagon type="wagon" label="40" occupancy="high" wagon-class="2" sector="B">
      <sbb-icon name="sa-wr"></sbb-icon>
      <sbb-icon name="sa-rs"></sbb-icon>
    </sbb-train-wagon>
    <sbb-train-wagon type="wagon" label="41" occupancy="medium" wagon-class="2" sector="B">
      <sbb-icon name="sa-nf"></sbb-icon>
    </sbb-train-wagon>
    <sbb-train-wagon
      type="wagon"
      label="42"
      occupancy="low"
      wagon-class="2"
      blocked-passage="next"
      sector="C"
    >
      <sbb-icon name="sa-nf"></sbb-icon>
    </sbb-train-wagon>
    <sbb-train-blocked-passage></sbb-train-blocked-passage>
    <sbb-train-wagon
      type="wagon"
      label="43"
      occupancy="low"
      wagon-class="2"
      blocked-passage="both"
      sector="C"
    >
      <sbb-icon name="sa-abteilkinderwagen"></sbb-icon>
      <sbb-icon name="sa-nf"></sbb-icon>
    </sbb-train-wagon>
    <sbb-train-blocked-passage></sbb-train-blocked-passage>
    <sbb-train-wagon
      blocked-passage="previous"
      type="wagon"
      label="44"
      occupancy="low"
      wagon-class="2"
      sector="C"
    >
      <sbb-icon name="sa-nf"></sbb-icon>
      <sbb-icon name="sa-fz"></sbb-icon>
    </sbb-train-wagon>
    <sbb-train-wagon
      type="wagon"
      label="45"
      occupancy="low"
      wagon-class="2"
      sector="D"
    ></sbb-train-wagon>
    <sbb-train-wagon
      type="wagon"
      label="46"
      occupancy="low"
      wagon-class="2"
      sector="D"
    ></sbb-train-wagon>
    <sbb-train-wagon
      type="wagon"
      label="47"
      occupancy="low"
      wagon-class="2"
      sector="D"
    ></sbb-train-wagon>
  </sbb-train>`;

  describeViewports({ viewports: ['zero', 'medium', 'ultra'] }, () => {
    describe('multiple trains', () => {
      for (const hideWagonLabel of hideWagonLabelCases) {
        it(
          `hide-wagon-label=${hideWagonLabel}`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              html`<sbb-train-formation ?hide-wagon-label=${hideWagonLabel}>
                ${train1}
                <sbb-train direction-label="Direction of travel" station="Luzern" direction="left">
                  <sbb-train-wagon type="locomotive" sector="E"></sbb-train-wagon>
                  <sbb-train-wagon type="closed" label="49" sector="E"></sbb-train-wagon>
                  <sbb-train-blocked-passage></sbb-train-blocked-passage>
                  <sbb-train-wagon
                    type="wagon"
                    label="50"
                    occupancy="low"
                    wagon-class="2"
                    blocked-passage="previous"
                    sector="E"
                  ></sbb-train-wagon>
                  <sbb-train-wagon
                    type="wagon"
                    label="51"
                    occupancy="low"
                    wagon-class="2"
                    sector="F"
                  ></sbb-train-wagon>
                  <sbb-train-wagon
                    type="wagon"
                    label="52"
                    occupancy="low"
                    wagon-class="2"
                    sector="F"
                  ></sbb-train-wagon>
                  <sbb-train-wagon
                    type="wagon"
                    label="53"
                    occupancy="low"
                    wagon-class="2"
                    sector="F"
                  ></sbb-train-wagon>
                  <sbb-train-wagon
                    type="wagon"
                    label="54"
                    occupancy="low"
                    wagon-class="2"
                    sector="G"
                  ></sbb-train-wagon>
                  <sbb-train-wagon
                    type="wagon"
                    label="55"
                    occupancy="low"
                    wagon-class="2"
                    sector="G"
                  ></sbb-train-wagon>
                  <sbb-train-wagon
                    type="wagon"
                    label="56"
                    occupancy="low"
                    wagon-class="2"
                    sector="G"
                  ></sbb-train-wagon>
                  <sbb-train-wagon
                    type="wagon"
                    label="57"
                    occupancy="low"
                    wagon-class="2"
                    sector="H"
                  ></sbb-train-wagon>
                  <sbb-train-wagon
                    type="wagon"
                    label="58"
                    occupancy="low"
                    wagon-class="2"
                    sector="H"
                  ></sbb-train-wagon>
                  <sbb-train-wagon
                    type="wagon"
                    label="59"
                    occupancy="low"
                    wagon-class="2"
                    sector="H"
                  ></sbb-train-wagon>
                </sbb-train>
              </sbb-train-formation>`,
            );
          }),
        );
      }
    });

    it(
      `single train`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`<sbb-train-formation>${train1}</sbb-train-formation>`);
      }),
    );
  });
});
