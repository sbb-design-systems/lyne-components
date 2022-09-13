import { h } from 'jsx-dom';
import readme from './readme.md';

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
    {TemplateWithBadge(args)}
    {TemplateWithBadge(args)}
    {TemplateWithBadge(args)}
  </div>
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
sbbCard.args = { ...basicArgs };
sbbCard.documentation = {
  title: 'Card.',
};

export const sbbCardWithSbbBadge = TemplateWithBadge.bind({});
sbbCardWithSbbBadge.argTypes = basicArgTypes;
sbbCardWithSbbBadge.args = { ...basicArgs };
sbbCardWithSbbBadge.documentation = {
  title: 'Card with badge (the slot is hidden whether sizes are below m).',
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
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/cards/sbb-card',
};
