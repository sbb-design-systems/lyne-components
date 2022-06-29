import { h } from 'jsx-dom';
import readme from './readme.md';

/* ************************************************* */
/* Slot templates, used in Storybook template        */
/* ************************************************* */

/* --- text slot ----------------------------------- */

const sbbTextArgs = {
  text: 'Rücksichtsvoll mit SBB Green Class',
};

const SlotSbbTextTemplate = (args) => <p slot="text">{args.text}</p>;

/* --- link slot ----------------------------------- */

const sbbLinkArgs = {
  href: 'https://www.sbb.ch/',
  text: 'Mehr erfahren',
};

const SlotSbbLinkTemplate = (args) => (
  <sbb-link
    slot="link"
    href-value={args.href}
    icon="chevron-small-right-small"
    icon-flip=""
    icon-placement="end"
    id-value=""
    text={args.text}
    text-size="m"
    variant="block-negative"
  >
    <span slot="icon">
      <svg width="24" height="24" viewBox="0,0,24,24" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="m10.6776,7.74045,3.949,3.90395.3597.3557-.3597.3555-3.95,3.904-.70297-.7112L13.5639,12,9.97459,8.4516l.70301-.71115z"
        ></path>
      </svg>
    </span>
  </sbb-link>
);

const TemplateSbbPanelDefault = (args) => (
  <sbb-panel {...args}>
    <SlotSbbTextTemplate {...sbbTextArgs} />
    <SlotSbbLinkTemplate {...sbbLinkArgs} />
  </sbb-panel>
);

export const DefaultSbbPanel = TemplateSbbPanelDefault.bind({});

DefaultSbbPanel.documentation = {
  title: 'LynePanel, Default',
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
