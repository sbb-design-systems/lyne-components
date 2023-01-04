import readme from './readme.md';
import { h } from 'jsx-dom';
import isChromatic from 'chromatic/isChromatic';

const variant = {
  control: {
    type: 'inline-radio',
  },
  options: ['default', 'clock-columns'],
};

const negative = {
  control: {
    type: 'boolean',
  },
};

const wide = {
  control: {
    type: 'boolean',
  },
};

const accessibilityTitle = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  variant,
  negative,
  wide,
  'accessibility-title': accessibilityTitle,
};

const defaultArgs = {
  variant: variant.options[1],
  negative: false,
  wide: false,
  'accessibility-title': 'Footer',
};

const TemplateDefault = (args) => (
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

const TemplateClockColumns = ({ ...args }) => (
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
      <sbb-link-list title-level="2" title-content="Newsletter." negative={args.negative}>
        <sbb-link negative={args.negative}>
          Our newsletter regularly informs you of attractive offers from SBB via e-mail.
        </sbb-link>
      </sbb-link-list>
      <sbb-button
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        variant="secondary"
        size="m"
      >
        Subscribe
      </sbb-button>
    </div>
    <sbb-clock
      {...(isChromatic()
        ? { 'initial-time': '01:59:27', paused: true }
        : { 'initial-time': 'now' })}
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

export const FooterClockColumns = TemplateClockColumns.bind({});
FooterClockColumns.argTypes = defaultArgTypes;
FooterClockColumns.args = { ...defaultArgs };

export const FooterClockColumnsNegative = TemplateClockColumns.bind({});
FooterClockColumnsNegative.argTypes = defaultArgTypes;
FooterClockColumnsNegative.args = {
  ...defaultArgs,
  negative: true,
};

export const FooterClockColumnsWide = TemplateClockColumns.bind({});
FooterClockColumnsWide.argTypes = defaultArgTypes;
FooterClockColumnsWide.args = { ...defaultArgs, wide: true };

export const FooterDefault = TemplateDefault.bind({});
FooterDefault.argTypes = defaultArgTypes;
FooterDefault.args = {
  ...defaultArgs,
  variant: variant.options[0],
};

export const FooterDefaultNegative = TemplateDefault.bind({});
FooterDefaultNegative.argTypes = defaultArgTypes;
FooterDefaultNegative.args = {
  ...defaultArgs,
  variant: variant.options[0],
  negative: true,
};

export const FooterDefaultWide = TemplateDefault.bind({});
FooterDefaultWide.argTypes = defaultArgTypes;
FooterDefaultWide.args = {
  ...defaultArgs,
  variant: variant.options[0],
  wide: true,
};

/* ************************************************* */
/* Render storybook section and stories              */
/* ************************************************* */

export default {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'components/sbb-footer',
};
