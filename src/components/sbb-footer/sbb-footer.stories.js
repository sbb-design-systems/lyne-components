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

const accessibilityTitle = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  variant,
  negative,
  'accessibility-title': accessibilityTitle,
};

const defaultArgs = {
  variant: variant.options[1],
  negative: false,
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

export const footerClockColumns = TemplateClockColumns.bind({});

footerClockColumns.argTypes = defaultArgTypes;
footerClockColumns.args = { ...defaultArgs };

export const footerClockColumnsNegative = TemplateClockColumns.bind({});

footerClockColumnsNegative.argTypes = defaultArgTypes;
footerClockColumnsNegative.args = {
  ...defaultArgs,
  negative: true,
};

export const footerDefault = TemplateDefault.bind({});

footerDefault.argTypes = defaultArgTypes;
footerDefault.args = {
  ...defaultArgs,
  variant: variant.options[0],
};

export const footerDefaultNegative = TemplateDefault.bind({});

footerDefaultNegative.argTypes = defaultArgTypes;
footerDefaultNegative.args = {
  ...defaultArgs,
  variant: variant.options[0],
  negative: true,
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
