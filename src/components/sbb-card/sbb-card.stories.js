import { h } from 'jsx-dom';
import readme from './readme.md';
import events from './sbb-card.events';

const ContentText =
  () => `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor blandit odio,
  ut blandit libero cursus vel. Nunc eu congue mauris. Quisque sed facilisis leo. Curabitur malesuada, nibh ac
  blandit vehicula, urna sem scelerisque magna, sed tincidunt neque arcu ac justo.`;

const Content = () => [<sbb-title level="4">Example text</sbb-title>, ContentText()];

const Template = (args) => <sbb-card {...args}>{Content()}</sbb-card>;

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

const idValue = {
  control: {
    type: 'text',
  },
};

const accessibilityLabel = {
  control: {
    type: 'text',
  },
};

const accessibilityDescribedby = {
  control: {
    type: 'text',
  },
};

const accessibilityLabelledby = {
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
  href,
  download,
  target,
  rel,
  'id-value': idValue,
  'accessibility-label': accessibilityLabel,
  'accessibility-describedby': accessibilityDescribedby,
  'accessibility-labelledby': accessibilityLabelledby,
  name,
  type,
  form,
  value,
};

const basicArgs = {
  size: 'm',
  active: false,
  href: 'https://github.com/lyne-design-system/lyne-components',
  download: false,
  target: '_blank',
  rel: undefined,
  'id-value': undefined,
  'accessibility-label': 'Card content',
  'accessibility-describedby': undefined,
  'accessibility-labelledby': undefined,
  name: undefined,
  type: undefined,
  form: undefined,
  value: undefined,
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

export const sbbCardLink = Template.bind({});
sbbCardLink.argTypes = basicArgTypes;
sbbCardLink.args = { ...basicArgs };
sbbCardLink.documentation = {
  title: 'Card (link version).',
};

export const sbbCardButton = Template.bind({});
sbbCardButton.argTypes = basicArgTypes;
sbbCardButton.args = { ...basicArgsButton };
sbbCardButton.documentation = {
  title: 'Card (button version).',
};

export const sbbCardButtonActive = Template.bind({});
sbbCardButtonActive.argTypes = basicArgTypes;
sbbCardButtonActive.args = { ...basicArgsButton, active: true };
sbbCardButtonActive.documentation = {
  title: 'Card active (button version).',
};

export const sbbCardWithSbbBadgeLink = TemplateWithBadge.bind({});
sbbCardWithSbbBadgeLink.argTypes = basicArgTypes;
sbbCardWithSbbBadgeLink.args = { ...basicArgs };
sbbCardWithSbbBadgeLink.documentation = {
  title: 'Card with badge (link version - the slot is hidden if sizes are below m).',
};

export const sbbCardWithSbbBadgeButton = TemplateWithBadge.bind({});
sbbCardWithSbbBadgeButton.argTypes = basicArgTypes;
sbbCardWithSbbBadgeButton.args = { ...basicArgsButton };
sbbCardWithSbbBadgeButton.documentation = {
  title: 'Card with badge (button version - the slot is hidden if sizes are below m).',
};

export const sbbCardWithSbbBadgeLinkActive = TemplateWithBadge.bind({});
sbbCardWithSbbBadgeLinkActive.argTypes = basicArgTypes;
sbbCardWithSbbBadgeLinkActive.args = { ...basicArgs, active: true };
sbbCardWithSbbBadgeLinkActive.documentation = {
  title: 'Card active with badge (link version - the slot is hidden if sizes are below m).',
};

export const sbbCardMultiple = TemplateMultipleCards.bind({});
sbbCardMultiple.argTypes = basicArgTypes;
sbbCardMultiple.args = { ...basicArgs };
sbbCardMultiple.documentation = {
  title: 'Multiple cards.',
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
    actions: {
      handles: [events.click],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/cards/sbb-card',
};
