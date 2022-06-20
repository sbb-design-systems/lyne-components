import {
  SbbColorCharcoalDefault,
  SbbColorWhiteDefault
} from '@sbb-esta/lyne-design-tokens/dist/js/sbb-tokens.mjs';
import { h } from 'jsx-dom';
import readme from './readme.md';

/* ************************************************* */
/* Documentation platform container                  */
/* ************************************************* */

const documentationPlatformContainerStyle = (context) => {
  const variantsOnDarkBg = ['primary-negative'];

  if (variantsOnDarkBg.indexOf(context.args.appearance) === -1) {
    return {};
  }

  return {
    'background-color': SbbColorCharcoalDefault
  };
};

/* ************************************************* */
/* Storybook component wrapper, used in Storybook    */
/* ************************************************* */

const wrapperStyle = (context) => {
  const variantsOnDarkBg = ['primary-negative'];

  if (variantsOnDarkBg.indexOf(context.args.appearance) === -1) {
    return `background-color: ${SbbColorWhiteDefault};`;
  }

  return `background-color: ${SbbColorCharcoalDefault};`;
};

/* ************************************************* */
/* Storybook controls                                */
/* ************************************************* */

const markup = {
  control: {
    type: 'inline-radio'
  },
  options: [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'span'
  ]
};

const appearance = {
  control: {
    type: 'select'
  },
  options: [
    'primary',
    'primary-negative'
  ],
  table: {
    category: 'Appearance'
  }
};

const size = {
  control: {
    type: 'inline-radio'
  },
  options: [
    4,
    5
  ]
};

const defaultArgTypes = {
  appearance,
  markup,
  size
};

const defaultArgs = {
  'appearance': appearance.options[0],
  'destination': 'Loèche-les-Bains',
  'is-round-trip': false,
  'journey-header-id': '',
  'markup': 'h1',
  'origin': 'La Chaux de Fonds',
  'size': 5
};

/* ************************************************* */
/* Storybook template                                */
/* ************************************************* */

const Template = (args) => (
  <sbb-journey-header {...args} />
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- Journey header as h1 ------------------------ */
export const h1 = Template.bind({});

h1.argTypes = defaultArgTypes;
h1.args = JSON.parse(JSON.stringify(defaultArgs));
h1.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'Journey header as h1'
};

/* --- Journey header as h2, h4 style -------------- */
export const h2InH4Style = Template.bind({});

h2InH4Style.argTypes = defaultArgTypes;
h2InH4Style.args = {
  ...defaultArgs,
  markup: 'h2',
  size: 4
};
h2InH4Style.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'Journey header as h2, in h4 style'
};

/* --- Journey header as h2, h4 style, round trip -- */
export const h2InH4StyleRoundTrip = Template.bind({});

h2InH4StyleRoundTrip.argTypes = defaultArgTypes;
h2InH4StyleRoundTrip.args = {
  ...defaultArgs,
  'is-round-trip': true,
  'markup': 'h2',
  'size': 4
};
h2InH4StyleRoundTrip.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'Journey header as h2, in h4 style'
};

/* --- Journey header as h2, h4 style, round trip, short text -- */
export const h2InH4StyleRoundTripShortText = Template.bind({});

h2InH4StyleRoundTripShortText.argTypes = defaultArgTypes;
h2InH4StyleRoundTripShortText.args = {
  ...defaultArgs,
  'destination': 'Thun',
  'is-round-trip': true,
  'markup': 'h2',
  'origin': 'Bern',
  'size': 4
};
h2InH4StyleRoundTripShortText.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'Journey header as h2, in h4 style'
};

/* --- Journey header negative as h1 --------------- */
export const h1Negative = Template.bind({});

h1Negative.argTypes = defaultArgTypes;
h1Negative.args = {
  ...defaultArgs,
  appearance: appearance.options[1]
};
h1Negative.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'Journey header Negative as h1'
};

/* ************************************************* */
/* Render storybook section and stories              */
/* ************************************************* */

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)}padding: 2rem`}>
        <Story/>
      </div>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'components/timetable/sbb-journey-header'
};
