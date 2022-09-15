import { h } from 'jsx-dom';
import readme from './readme.md';

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tortor enim, dictum at vestibulum
    vel, convallis vel tellus. Nunc sed nulla vestibulum, elementum felis quis, convallis velit. Sed
    molestie nunc vitae risus rutrum fermentum. Donec dictum ullamcorper nulla sit amet dignissim.
    Nam ipsum odio, faucibus quis lectus ut, suscipit sollicitudin eros. Fusce dignissim lorem id
    quam fermentum, at feugiat dolor auctor. Duis posuere non tellus vel aliquet. Suspendisse
    consectetur odio nulla, nec imperdiet libero placerat id. Donec mollis varius aliquam. Sed
    faucibus euismod risus ac rhoncus. Maecenas pulvinar odio quis neque pulvinar rutrum. Ut sodales
    commodo fermentum. Proin in orci enim. Nullam augue nibh, cursus eget vestibulum at, ullamcorper
    ut tortor. Sed eget augue ac odio accumsan fermentum. Morbi volutpat lectus vitae urna mattis
    elementum. Nam pharetra, erat a varius porta, quam lacus venenatis libero, at pretium arcu velit
    vel lectus.`;

const shadow = {
  control: {
    type: 'boolean',
  },
};

const basicArgTypes = {
  shadow,
};

const basicArgs = {
  shadow: true,
};

const Template = (args) => [
  <sbb-header {...args}>
    <sbb-header-action
      icon="hamburger-menu-small"
      href="https://lyne-icons.netlify.app/icons/hamburger-menu-small.svg"
    >
      Test
    </sbb-header-action>
  </sbb-header>,
  <div style="height: 60vh">{text}</div>,
  <div style="height: 60vh">{text}</div>,
];

const TemplateActions = (args) => [
  <sbb-header {...args}>
    <sbb-header-action class="test">
      <span slot="icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4 4H20V6H4V4ZM4 18H20V20H4V18ZM20 11H4V13H20V11Z"
            fill="black"
          />
        </svg>
      </span>
      Menu
    </sbb-header-action>
    <sbb-header-action>
      <span slot="icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.16699 10.5C4.16699 7.46298 6.62903 5 9.66699 5C12.705 5 15.167 7.46298 15.167 10.5C15.167 13.5381 12.7051 16 9.66699 16C6.62891 16 4.16699 13.5381 4.16699 10.5ZM9.66699 3C5.52423 3 2.16699 6.35865 2.16699 10.5C2.16699 14.6426 5.52434 18 9.66699 18C11.3669 18 12.9345 17.4347 14.1922 16.4818L20.3492 21.7593L21.6508 20.2407L15.6161 15.0681C16.5887 13.8032 17.167 12.2192 17.167 10.5C17.167 6.35865 13.8098 3 9.66699 3Z"
            fill="black"
          />
        </svg>
      </span>
      Suchen
    </sbb-header-action>
    <sbb-header-action>
      <span slot="icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.5 7.5C10.5 5.96908 11.5344 5 12.5 5C13.4656 5 14.5 5.96908 14.5 7.5C14.5 9.03092 13.4656 10 12.5 10C11.5344 10 10.5 9.03092 10.5 7.5ZM12.5 3C10.1516 3 8.5 5.16492 8.5 7.5C8.5 8.33369 8.71053 9.14569 9.08814 9.84522C7.85262 10.6722 6.92654 11.9814 6.28392 13.3533C5.44378 15.1469 5 17.2274 5 19.0003V20.0003H6H19H20V19.0003C20 17.2177 19.5553 15.1344 18.7137 13.3414C18.0711 11.9722 17.1457 10.6679 15.9122 9.84467C16.2896 9.14526 16.5 8.33347 16.5 7.5C16.5 5.16492 14.8484 3 12.5 3ZM14.5646 11.3633C13.9754 11.7638 13.2757 12 12.5 12C11.7243 12 11.0246 11.7638 10.4354 11.3633C9.5237 11.8789 8.71424 12.8799 8.09508 14.2017C7.53377 15.4 7.18008 16.7582 7.05302 18.0003H17.9474C17.8205 16.7512 17.4658 15.3898 16.9033 14.1912C16.284 12.8718 15.475 11.8754 14.5646 11.3633Z"
            fill="black"
          />
        </svg>
      </span>
      Anmelden
    </sbb-header-action>
    <sbb-header-action>
      <span slot="icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.5 12C19.5 7.582 15.918 4 11.5 4C7.082 4 3.5 7.582 3.5 12C3.5 16.418 7.082 20 11.5 20C15.918 20 19.5 16.418 19.5 12Z"
            stroke="black"
            stroke-width="2"
          />
          <path
            d="M10 19.4998C8.77764 17.6984 8 15.0088 8 12.0003C8 8.99071 8.77764 6.30111 10 4.49976"
            stroke="black"
            stroke-width="2"
          />
          <path
            d="M13 4.49976C14.2228 6.30011 15 8.99071 15 11.9993C15 15.0088 14.2228 17.6974 13 19.4998"
            stroke="black"
            stroke-width="2"
          />
          <path d="M4 9.49976L19 9.49976" stroke="black" stroke-width="2" />
          <path d="M19 14.4998L4 14.4998" stroke="black" stroke-width="2" />
        </svg>
      </span>
      Deutsch
    </sbb-header-action>
  </sbb-header>,
  <div style="height: 60vh">{text}</div>,
  <div style="height: 60vh">{text}</div>,
  <div style="height: 60vh">{text}</div>,
];

export const header = Template.bind({});
header.args = JSON.parse(JSON.stringify(basicArgs));
header.argTypes = basicArgTypes;

header.documentation = {
  title: 'Header',
};

export const headerAction = TemplateActions.bind({});
headerAction.args = JSON.parse(JSON.stringify(basicArgs));
headerAction.argTypes = basicArgTypes;

headerAction.documentation = {
  title: 'Header with actions',
};

export default {
  decorators: [
    (Story) => (
      <div>
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
  },
  title: 'components/header/sbb-header',
};
