import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = () => (
  <sbb-map-container>
    <div style="padding: 16px">
      <sbb-form-field placeholder="Ort eingeben..." style="width: 100%">
        <sbb-icon slot="prefix" name="magnifying-glass-small"></sbb-icon>
        <input minLength="2" name="keyword" autoComplete="off" placeholder="Search" />
        <sbb-icon
          slot="suffix"
          name="cross-medium"
          className="custom-search-results__input-clear hidden"
        ></sbb-icon>
      </sbb-form-field>
      <sbb-title level="4">Betriebslage & Störungen</sbb-title>
      <div style="background-color: #F6F6F6; height: 116px; display: flex; align-items: center; justify-content: center; border-radius: 8px; margin-bottom: 16px;">
        <p>Situation 1</p>
      </div>
      <div style="background-color: #F6F6F6; height: 116px; display: flex; align-items: center; justify-content: center; border-radius: 8px; margin-bottom: 16px;">
        <p>Situation 2</p>
      </div>
      <div style="background-color: #F6F6F6; height: 116px; display: flex; align-items: center; justify-content: center; border-radius: 8px; margin-bottom: 16px;">
        <p>Situation 3</p>
      </div>
      <div style="background-color: #F6F6F6; height: 116px; display: flex; align-items: center; justify-content: center; border-radius: 8px; margin-bottom: 16px;">
        <p>Situation 4</p>
      </div>
      <div style="background-color: #F6F6F6; height: 116px; display: flex; align-items: center; justify-content: center; border-radius: 8px; margin-bottom: 16px;">
        <p>Situation 5</p>
      </div>
      <div style="background-color: #F6F6F6; height: 116px; display: flex; align-items: center; justify-content: center; border-radius: 8px; margin-bottom: 16px;">
        <p>Situation 6</p>
      </div>
      <div style="background-color: #F6F6F6; height: 116px; display: flex; align-items: center; justify-content: center; border-radius: 8px; margin-bottom: 16px;">
        <p>Situation 7</p>
      </div>
      <div style="background-color: #F6F6F6; height: 116px; display: flex; align-items: center; justify-content: center; border-radius: 8px; margin-bottom: 16px;">
        <p>Situation 8</p>
      </div>
      <div style="background-color: #F6F6F6; height: 116px; display: flex; align-items: center; justify-content: center; border-radius: 8px; margin-bottom: 16px;">
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
        <sbb-header expanded="" hide-on-scroll="">
          <sbb-header-action icon-name="hamburger-menu-small" expand-from="small">
            Menu
          </sbb-header-action>
          <div class="spacer"></div>
          <sbb-header-action icon-name="magnifying-glass-small">Search</sbb-header-action>
          <sbb-header-action icon-name="user-small">Sign in</sbb-header-action>
          <sbb-header-action
            icon-name="globe-small"
            id="language-menu-trigger"
            className="last-element"
          >
            English
          </sbb-header-action>
          <sbb-menu trigger="language-menu-trigger">
            <sbb-menu-action>Deutsch</sbb-menu-action>
            <sbb-menu-action>Français</sbb-menu-action>
            <sbb-menu-action>Italiano</sbb-menu-action>
            <sbb-menu-action icon-name="tick-small">English</sbb-menu-action>
          </sbb-menu>
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
