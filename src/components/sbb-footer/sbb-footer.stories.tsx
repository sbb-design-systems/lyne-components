/** @jsx h */
import readme from './readme.md';
import { h, JSX } from 'jsx-dom';
import isChromatic from 'chromatic/isChromatic';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/html';
import type { InputType } from '@storybook/types';

const variant: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['default', 'clock-columns'],
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const expanded: InputType = {
  control: {
    type: 'boolean',
  },
};

const accessibilityTitle: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  variant,
  negative,
  expanded,
  'accessibility-title': accessibilityTitle,
};

const defaultArgs: Args = {
  variant: variant.options[1],
  negative: false,
  expanded: false,
  'accessibility-title': 'Footer',
};

const TemplateDefault = (args): JSX.Element => (
  <sbb-footer {...args}>
    <sbb-link-list horizontal-from="large" negative={args.negative}>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        negative={args.negative}
      >
        Refunds
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        negative={args.negative}
      >
        Lost property office
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        negative={args.negative}
      >
        Complaints
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        negative={args.negative}
      >
        Praise
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        negative={args.negative}
      >
        Report property damage
      </sbb-link>
    </sbb-link-list>
  </sbb-footer>
);

const TemplateClockColumns = ({ ...args }): JSX.Element => (
  <sbb-footer {...args}>
    <div class="sbb-link-list-button-group">
      <sbb-link-list title-level="2" title-content="Help &amp; Contact." negative={args.negative}>
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          negative={args.negative}
        >
          Refunds
        </sbb-link>
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          negative={args.negative}
        >
          Lost property office
        </sbb-link>
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          negative={args.negative}
        >
          Complaints
        </sbb-link>
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          negative={args.negative}
        >
          Praise
        </sbb-link>
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          negative={args.negative}
        >
          Report property damage
        </sbb-link>
      </sbb-link-list>
      <sbb-button
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        variant="primary"
        size="m"
      >
        All help topics
      </sbb-button>
    </div>
    <sbb-link-list title-level="2" title-content="More SBB." negative={args.negative}>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        negative={args.negative}
      >
        Jobs & careers
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        negative={args.negative}
      >
        Rail traffic information
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        negative={args.negative}
      >
        SBB News
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        negative={args.negative}
      >
        SBB Community
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        negative={args.negative}
      >
        Company
      </sbb-link>
    </sbb-link-list>
    <div class="sbb-link-list-button-group">
      <span>
        <sbb-title
          level="2"
          visual-level="5"
          negative={args.negative}
          style={{ margin: '0 0 var(--sbb-spacing-fixed-3x)' }}
        >
          Newsletter.
        </sbb-title>
        <p style={{ margin: '0' }}>
          Our newsletter regularly informs you of attractive offers from SBB via e-mail.
        </p>
      </span>
      <sbb-button
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        variant="secondary"
        size="m"
      >
        Subscribe
      </sbb-button>
    </div>
    <sbb-clock
      {...(isChromatic() ? { 'data-now': new Date('2023-01-24T02:59:27+01:00').valueOf() } : {})}
    ></sbb-clock>
    <sbb-divider negative={args.negative} />
    <sbb-link-list horizontal-from="large" negative={args.negative}>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        negative={args.negative}
      >
        Refunds
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        negative={args.negative}
      >
        Lost property office
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        negative={args.negative}
      >
        Complaints
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        negative={args.negative}
      >
        Praise
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        negative={args.negative}
      >
        Report property damage
      </sbb-link>
    </sbb-link-list>
  </sbb-footer>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

export const FooterClockColumns: StoryObj = {
  render: TemplateClockColumns,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const FooterClockColumnsNegative: StoryObj = {
  render: TemplateClockColumns,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    negative: true,
  },
};

export const FooterClockColumnsExpanded: StoryObj = {
  render: TemplateClockColumns,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, expanded: true },
};

export const FooterDefault: StoryObj = {
  render: TemplateDefault,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[0],
  },
};

export const FooterDefaultNegative: StoryObj = {
  render: TemplateDefault,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[0],
    negative: true,
  },
};

export const FooterDefaultExpanded: StoryObj = {
  render: TemplateDefault,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    variant: variant.options[0],
    expanded: true,
  },
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'components/sbb-footer',
};

export default meta;
