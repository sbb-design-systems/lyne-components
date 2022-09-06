import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => <sbb-card {...args}>SBB card example text.</sbb-card>;

const TemplateWithBadge = (args) => (
  <sbb-card {...args}>
    SBB card example text.
    <sbb-card-badge slot="badge" appearance="primary" is-discount></sbb-card-badge>
  </sbb-card>
);

const sizeArg = {
  control: {
    type: 'inline-radio',
  },
  options: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
};

const basicArgs = {
  size: 'm',
};

const basicArgTypes = {
  size: sizeArg,
};

export const sbbCard = Template.bind({});

sbbCard.argTypes = basicArgTypes;

sbbCard.args = JSON.parse(JSON.stringify(basicArgs));

sbbCard.documentation = {
  title: 'Card.',
};

export const sbbCardWithSbbBadge = TemplateWithBadge.bind({});

sbbCardWithSbbBadge.argTypes = basicArgTypes;

sbbCardWithSbbBadge.args = JSON.parse(JSON.stringify(basicArgs));

sbbCardWithSbbBadge.documentation = {
  title: 'Card with badge (the slot is hidden whether sizes are below m).',
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem; background: lightgray;'}>
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
  title: 'components/cards/sbb-card',
};
