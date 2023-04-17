import { h } from 'jsx-dom';
import readme from './readme.md';

const wrapperStyle = (context) => {
  if (context.args.color === 'white') {
    return 'background-color: var(--sbb-color-milk-default);';
  }

  return 'background-color: var(--sbb-color-white-default);';
};

const ContentText =
  () => `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor blandit odio,
  ut blandit libero cursus vel. Nunc eu congue mauris. Quisque sed facilisis leo. Curabitur malesuada, nibh ac
  blandit vehicula, urna sem scelerisque magna, sed tincidunt neque arcu ac justo.`;

const Content = () => [<sbb-title level="4">Example text</sbb-title>, ContentText()];

const Template = (args) => <sbb-card {...args}>{Content()}</sbb-card>;

const TemplateFixedHeight = (args) => (
  <sbb-card {...args} style="height:250px;">
    {Content()}
  </sbb-card>
);

const TemplateWithBadge = (args) => (
  <sbb-card {...args}>
    <sbb-card-badge slot="badge" appearance="primary" is-discount price="19.99" text="from CHF" />
    {Content()}
  </sbb-card>
);

const TemplateMultipleCards = (args) => (
  <div style="display: flex; gap: 1rem;">
    {TemplateWithBadge(args)}
    {TemplateWithBadge({ ...args, active: true })}
    {TemplateWithBadge(args)}
    {TemplateWithBadge(args)}
  </div>
);

const size = {
  control: {
    type: 'inline-radio',
  },
  options: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
};

const active = {
  control: {
    type: 'boolean',
  },
};

const color = {
  control: {
    type: 'inline-radio',
  },
  options: ['white', 'milk'],
};

const href = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const download = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Link',
  },
};

const target = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const rel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const ariaLabel = {
  control: {
    type: 'text',
  },
};

const name = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const type = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
  table: {
    category: 'Button',
  },
};

const form = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const value = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};
const basicArgTypes = {
  size,
  active,
  color,
  href,
  download,
  target,
  rel,
  'aria-label': ariaLabel,
  name,
  type,
  form,
  value,
};

const basicArgs = {
  size: 'm',
  active: false,
  color: color.options[0],
  href: 'https://github.com/lyne-design-system/lyne-components',
  download: false,
  target: '_blank',
  rel: undefined,
  'aria-label': undefined,
  name: undefined,
  type: undefined,
  form: undefined,
  value: undefined,
};

const basicArgsMilk = {
  ...basicArgs,
  color: color.options[1],
};

const basicArgsButton = {
  ...basicArgs,
  href: undefined,
  download: undefined,
  target: undefined,
  name: 'Button name',
  type: type.options[0],
  form: 'form-name',
  value: 'Value',
};

const basicArgsButtonMilk = {
  ...basicArgsButton,
  color: color.options[1],
};

export const sbbCardLink = Template.bind({});
sbbCardLink.argTypes = basicArgTypes;
sbbCardLink.args = { ...basicArgs };

export const sbbCardLinkMilk = Template.bind({});
sbbCardLinkMilk.argTypes = basicArgTypes;
sbbCardLinkMilk.args = { ...basicArgsMilk };

export const sbbCardButton = Template.bind({});
sbbCardButton.argTypes = basicArgTypes;
sbbCardButton.args = { ...basicArgsButton };

export const sbbCardButtonMilk = Template.bind({});
sbbCardButtonMilk.argTypes = basicArgTypes;
sbbCardButtonMilk.args = { ...basicArgsButtonMilk };

export const sbbCardButtonActive = Template.bind({});
sbbCardButtonActive.argTypes = basicArgTypes;
sbbCardButtonActive.args = { ...basicArgsButton, active: true };

export const sbbCardButtonActiveMilk = Template.bind({});
sbbCardButtonActiveMilk.argTypes = basicArgTypes;
sbbCardButtonActiveMilk.args = { ...basicArgsButtonMilk, active: true };

export const sbbCardWithSbbBadgeLink = TemplateWithBadge.bind({});
sbbCardWithSbbBadgeLink.argTypes = basicArgTypes;
sbbCardWithSbbBadgeLink.args = { ...basicArgs };

export const sbbCardWithSbbBadgeLinkMilk = TemplateWithBadge.bind({});
sbbCardWithSbbBadgeLinkMilk.argTypes = basicArgTypes;
sbbCardWithSbbBadgeLinkMilk.args = { ...basicArgsMilk };

export const sbbCardWithSbbBadgeButton = TemplateWithBadge.bind({});
sbbCardWithSbbBadgeButton.argTypes = basicArgTypes;
sbbCardWithSbbBadgeButton.args = { ...basicArgsButton };

export const sbbCardWithSbbBadgeButtonMilk = TemplateWithBadge.bind({});
sbbCardWithSbbBadgeButtonMilk.argTypes = basicArgTypes;
sbbCardWithSbbBadgeButtonMilk.args = { ...basicArgsButtonMilk };

export const sbbCardWithSbbBadgeLinkActive = TemplateWithBadge.bind({});
sbbCardWithSbbBadgeLinkActive.argTypes = basicArgTypes;
sbbCardWithSbbBadgeLinkActive.args = { ...basicArgs, active: true };

export const sbbCardWithSbbBadgeLinkActiveMilk = TemplateWithBadge.bind({});
sbbCardWithSbbBadgeLinkActiveMilk.argTypes = basicArgTypes;
sbbCardWithSbbBadgeLinkActiveMilk.args = { ...basicArgsMilk, active: true };

export const sbbCardFixedHeight = TemplateFixedHeight.bind({});
sbbCardFixedHeight.argTypes = basicArgTypes;
sbbCardFixedHeight.args = { ...basicArgsButton };

export const sbbCardMultiple = TemplateMultipleCards.bind({});
sbbCardMultiple.argTypes = basicArgTypes;
sbbCardMultiple.args = { ...basicArgs };

export const sbbCardMultipleMilk = TemplateMultipleCards.bind({});
sbbCardMultipleMilk.argTypes = basicArgTypes;
sbbCardMultipleMilk.args = { ...basicArgsMilk };

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)} padding: 2rem`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-card',
};
