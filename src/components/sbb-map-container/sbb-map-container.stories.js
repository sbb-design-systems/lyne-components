import { h } from 'jsx-dom';
import readme from './readme.md';

const fakeSituationCardStyles =
  'background-color: var(--sbb-color-milk-default); height: 116px; display: flex; align-items: center; justify-content: center; border-radius: 8px; margin-bottom: 16px;';
const Template = () => (
  <sbb-map-container>
    <div style="padding: 16px">
      <sbb-form-field placeholder="Type location..." style="width: 100%">
        <sbb-icon slot="prefix" name="magnifying-glass-small"></sbb-icon>
        <input minLength="2" name="keyword" autoComplete="off" placeholder="Search" />
        <sbb-icon
          slot="suffix"
          name="cross-medium"
          className="custom-search-results__input-clear hidden"
        ></sbb-icon>
      </sbb-form-field>
      <sbb-title level="4">Operations & Disruptions</sbb-title>
      <div style={fakeSituationCardStyles}>
        <p>Situation 1</p>
      </div>
      <div style={fakeSituationCardStyles}>
        <p>Situation 2</p>
      </div>
      <div style={fakeSituationCardStyles}>
        <p>Situation 3</p>
      </div>
      <div style={fakeSituationCardStyles}>
        <p>Situation 4</p>
      </div>
      <div style={fakeSituationCardStyles}>
        <p>Situation 5</p>
      </div>
      <div style={fakeSituationCardStyles}>
        <p>Situation 6</p>
      </div>
      <div style={fakeSituationCardStyles}>
        <p>Situation 7</p>
      </div>
      <div style={fakeSituationCardStyles}>
        <p>Situation 8</p>
      </div>
      <div style={fakeSituationCardStyles}>
        <p>Situation 9</p>
      </div>
    </div>

    <div slot="map" style="height: 100%;">
      <div style="background-color: grey; height: 100%; display: flex; align-items: center; justify-content: center;">
        map
      </div>
    </div>
  </sbb-map-container>
);

export const story1 = Template.bind({});

export default {
  decorators: [
    (Story) => (
      <div>
        <sbb-header expanded hide-on-scroll="">
          <sbb-header-action icon-name="hamburger-menu-small" expand-from="small">
            Menu
          </sbb-header-action>
        </sbb-header>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'sbb-map-container',
};
