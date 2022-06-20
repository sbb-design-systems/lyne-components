import {
  SbbColorCharcoalDefault,
  SbbColorWhiteDefault
} from '@sbb-esta/lyne-design-tokens/dist/js/sbb-tokens.mjs';
import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <sbb-logo {...args} />
);

const variants = {
  control: {
    type: 'select'
  },
  options: [
    'default',
    'negative',
    'on-red',
    'black-on-white',
    'white-on-black'
  ]
};

const protectiveRoom = {
  control: {
    type: 'select'
  },
  options: [
    'none',
    'ideal',
    'minimal'
  ]
};

const defaultArgTypes = {
  'protective-room': protectiveRoom,
  'variant': variants
};

const defaultArgs = {
  'protective-room': protectiveRoom.options[0],
  'variant': variants.options[0]
};

export const NoProtectiveRoom = Template.bind({});

NoProtectiveRoom.argTypes = defaultArgTypes;
NoProtectiveRoom.args = JSON.parse(JSON.stringify(defaultArgs));

NoProtectiveRoom.documentation = {
  title: 'No protective room'
};

/* eslint-disable prefer-destructuring */

export const IdealProtectiveRoom = Template.bind({});

IdealProtectiveRoom.argTypes = defaultArgTypes;
IdealProtectiveRoom.args = JSON.parse(JSON.stringify(defaultArgs));
IdealProtectiveRoom.args['protective-room'] = protectiveRoom.options[1];

IdealProtectiveRoom.documentation = {
  title: 'Ideal protective room'
};

export const MinimalProtectiveRoom = Template.bind({});

MinimalProtectiveRoom.argTypes = defaultArgTypes;
MinimalProtectiveRoom.args = JSON.parse(JSON.stringify(defaultArgs));
MinimalProtectiveRoom.args['protective-room'] = protectiveRoom.options[2];

MinimalProtectiveRoom.documentation = {
  title: 'Minimal protective room'
};

export const Negative = Template.bind({});

Negative.argTypes = defaultArgTypes;
Negative.args = JSON.parse(JSON.stringify(defaultArgs));
Negative.args['protective-room'] = protectiveRoom.options[1];
Negative.args.variant = variants.options[1];

Negative.decorators = [
  (Story) => (
    <div style={`background-color: ${SbbColorCharcoalDefault};`}>
      <Story/>
    </div>
  )
];

Negative.documentation = {
  container: {
    styles: {
      'background-color': SbbColorCharcoalDefault
    }
  },
  title: 'Negative'
};

export const OnRed = Template.bind({});

OnRed.argTypes = defaultArgTypes;
OnRed.args = JSON.parse(JSON.stringify(defaultArgs));
OnRed.args['protective-room'] = protectiveRoom.options[1];
OnRed.args.variant = variants.options[2];

OnRed.documentation = {
  title: 'On red'
};

export const BlackOnWhite = Template.bind({});

BlackOnWhite.argTypes = defaultArgTypes;
BlackOnWhite.args = JSON.parse(JSON.stringify(defaultArgs));
BlackOnWhite.args['protective-room'] = protectiveRoom.options[1];
BlackOnWhite.args.variant = variants.options[3];

BlackOnWhite.documentation = {
  title: 'Black on white'
};

export const WhiteOnBlack = Template.bind({});

WhiteOnBlack.argTypes = defaultArgTypes;
WhiteOnBlack.args = JSON.parse(JSON.stringify(defaultArgs));
WhiteOnBlack.args['protective-room'] = protectiveRoom.options[1];
WhiteOnBlack.args.variant = variants.options[4];

WhiteOnBlack.decorators = [
  (Story) => (
    <div style={`background-color: ${SbbColorCharcoalDefault};`}>
      <Story/>
    </div>
  )
];

WhiteOnBlack.documentation = {
  container: {
    styles: {
      'background-color': SbbColorCharcoalDefault
    }
  },
  title: 'White on black'
};

/* eslint-enable prefer-destructuring */

export default {
  decorators: [
    (Story) => (
      <div style='max-width: 300px;'>
        <Story/>
      </div>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'brand elements/SBB Logo'
};
