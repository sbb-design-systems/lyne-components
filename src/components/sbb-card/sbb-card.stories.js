import { h } from 'jsx-dom';
import readme from './readme.md';

const wrapperStyle = (context) => {
  if (context.args.negative === true) {
    return 'background-color: var(--sbb-color-white-default);';
  }

  return 'background-color: var(--sbb-color-milk-default);';
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

const negative = {
  control: {
    type: 'boolean',
  },
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

const accessibilityLabel = {
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
  negative,
  href,
  download,
  target,
  rel,
  'accessibility-label': accessibilityLabel,
  name,
  type,
  form,
  value,
};

const basicArgs = {
  size: 'm',
  active: false,
  negative: false,
  href: 'https://github.com/lyne-design-system/lyne-components',
  download: false,
  target: '_blank',
  rel: undefined,
  'accessibility-label': undefined,
  name: undefined,
  type: undefined,
  form: undefined,
  value: undefined,
};

const basicArgsNegative = {
  ...basicArgs,
  negative: true,
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

const basicArgsButtonNegative = {
  ...basicArgsButton,
  negative: true,
};

export const sbbCardLink = Template.bind({});
sbbCardLink.argTypes = basicArgTypes;
sbbCardLink.args = { ...basicArgs };

export const sbbCardLinkNegative = Template.bind({});
sbbCardLinkNegative.argTypes = basicArgTypes;
sbbCardLinkNegative.args = { ...basicArgsNegative };

export const sbbCardButton = Template.bind({});
sbbCardButton.argTypes = basicArgTypes;
sbbCardButton.args = { ...basicArgsButton };

export const sbbCardButtonNegative = Template.bind({});
sbbCardButtonNegative.argTypes = basicArgTypes;
sbbCardButtonNegative.args = { ...basicArgsButtonNegative };

export const sbbCardButtonActive = Template.bind({});
sbbCardButtonActive.argTypes = basicArgTypes;
sbbCardButtonActive.args = { ...basicArgsButton, active: true };

export const sbbCardButtonActiveNegative = Template.bind({});
sbbCardButtonActiveNegative.argTypes = basicArgTypes;
sbbCardButtonActiveNegative.args = { ...basicArgsButtonNegative, active: true };

export const sbbCardWithSbbBadgeLink = TemplateWithBadge.bind({});
sbbCardWithSbbBadgeLink.argTypes = basicArgTypes;
sbbCardWithSbbBadgeLink.args = { ...basicArgs };

export const sbbCardWithSbbBadgeLinkNegative = TemplateWithBadge.bind({});
sbbCardWithSbbBadgeLinkNegative.argTypes = basicArgTypes;
sbbCardWithSbbBadgeLinkNegative.args = { ...basicArgsNegative };

export const sbbCardWithSbbBadgeButton = TemplateWithBadge.bind({});
sbbCardWithSbbBadgeButton.argTypes = basicArgTypes;
sbbCardWithSbbBadgeButton.args = { ...basicArgsButton };

export const sbbCardWithSbbBadgeButtonNegative = TemplateWithBadge.bind({});
sbbCardWithSbbBadgeButtonNegative.argTypes = basicArgTypes;
sbbCardWithSbbBadgeButtonNegative.args = { ...basicArgsButtonNegative };

export const sbbCardWithSbbBadgeLinkActive = TemplateWithBadge.bind({});
sbbCardWithSbbBadgeLinkActive.argTypes = basicArgTypes;
sbbCardWithSbbBadgeLinkActive.args = { ...basicArgs, active: true };

export const sbbCardWithSbbBadgeLinkActiveNegative = TemplateWithBadge.bind({});
sbbCardWithSbbBadgeLinkActiveNegative.argTypes = basicArgTypes;
sbbCardWithSbbBadgeLinkActiveNegative.args = { ...basicArgsNegative, active: true };

export const sbbCardFixedHeight = TemplateFixedHeight.bind({});
sbbCardFixedHeight.argTypes = basicArgTypes;
sbbCardFixedHeight.args = { ...basicArgsButton };

export const sbbCardMultiple = TemplateMultipleCards.bind({});
sbbCardMultiple.argTypes = basicArgTypes;
sbbCardMultiple.args = { ...basicArgs };

export const sbbCardMultipleNegative = TemplateMultipleCards.bind({});
sbbCardMultipleNegative.argTypes = basicArgTypes;
sbbCardMultipleNegative.args = { ...basicArgsNegative };

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
  title: 'components/cards/sbb-card',
};
