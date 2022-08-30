import { h } from 'jsx-dom';
import readme from './readme.md';

/* ************************************************* */
/* Slot templates, used in Storybook template        */
/* ************************************************* */

const TemplateSbbPanelDefault = (args) => <sbb-panel {...args}></sbb-panel>;

const TemplateSbbPanelWithoutLink = (args) => <sbb-panel {...args}></sbb-panel>;

const TemplateSbbPanelSlot = (args) => (
  <sbb-panel {...args}>
    <span slot="text">{args.text}</span>
    <sbb-link slot="link" href={args.href} negative>
      {args.linkText}
    </sbb-link>
  </sbb-panel>
);

export const DefaultSbbPanel = TemplateSbbPanelDefault.bind({});
export const WithoutLinkSbbPanel = TemplateSbbPanelWithoutLink.bind({});
export const PanelSlots = TemplateSbbPanelSlot.bind({});

const defaultArgs = {
  text: 'Rücksichtsvoll mit SBB Green Class',
};

DefaultSbbPanel.args = {
  ...defaultArgs,
  'link-text': 'Mehr erfahren',
  href: 'https://www.sbb.ch',
};

WithoutLinkSbbPanel.args = defaultArgs;

PanelSlots.args = {
  ...defaultArgs,
  linkText: 'Mehr erfahren',
  href: 'https://www.sbb.ch',
};

DefaultSbbPanel.documentation = {
  title: 'SbbPanel, Default',
};

export default {
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-panel (Unfinished)',
};
