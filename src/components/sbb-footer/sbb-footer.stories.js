import { SbbColorCharcoalDefault, SbbColorWhiteDefault } from '@sbb-esta/lyne-design-tokens';
import { h } from 'jsx-dom';
import readme from './readme.md';
import isChromatic from 'chromatic';

/* ************************************************* */
/* Documentation platform container                  */
/* ************************************************* */

const documentationPlatformContainerStyle = (context) => {
  const variantsOnDarkBg = ['primary-negative'];

  if (variantsOnDarkBg.indexOf(context.args.appearance) === -1) {
    return {};
  }

  return {
    'background-color': SbbColorCharcoalDefault,
  };
};

/* ************************************************* */
/* Storybook component wrapper, used in Storybook    */
/* ************************************************* */
const wrapperStyle = (context) => {
  if (context.args.negative) {
    return `background-color: ${SbbColorCharcoalDefault};`;
  }

  return `background-color: ${SbbColorWhiteDefault};`;
};

/* ************************************************* */
/* Storybook controls                                */
/* ************************************************* */

const negative = {
  control: {
    type: 'boolean',
  },
};

const variant = {
  control: {
    type: 'select',
  },
  options: ['default', 'clock-columns'],
  table: {
    category: 'Variant',
  },
};

const defaultArgTypes = {
  negative,
  variant,
};

const defaultArgs = {
  'accessibility-title': 'Footer',
  negative: false,
  variant: variant.options[1],
};

/* ************************************************* */
/* Storybook template                                */
/* ************************************************* */

const TemplateDefault = (args) => (
  <sbb-footer {...args}>
    <sbb-link-list horizontal-from="large">
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        text-size="xs"
      >
        Refunds
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        text-size="xs"
      >
        Lost property office
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        text-size="xs"
      >
        Complaints
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        text-size="xs"
      >
        Praise
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        text-size="xs"
      >
        Report property damage
      </sbb-link>
    </sbb-link-list>
  </sbb-footer>
);

const Template = (args) => (
  <sbb-footer accessibility-title="Footer" {...args}>
    <div class="sbb-link-list-button-group">
      <sbb-link-list title-level="2" title-content="Help &amp; Contact.">
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          text-size="s"
        >
          Refunds
        </sbb-link>
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          text-size="s"
        >
          Lost property office
        </sbb-link>
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          text-size="s"
        >
          Complaints
        </sbb-link>
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          text-size="s"
        >
          Praise
        </sbb-link>
        <sbb-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          text-size="s"
        >
          Report property damage
        </sbb-link>
      </sbb-link-list>
      <sbb-button
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        variant="primary"
      >
        All help topics
      </sbb-button>
    </div>
    <sbb-link-list title-level="2" title-content="More SBB.">
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        text-size="s"
      >
        Jobs & careers
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        text-size="s"
      >
        Rail traffic information
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        text-size="s"
      >
        SBB News
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        text-size="s"
      >
        SBB Community
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        text-size="s"
      >
        Company
      </sbb-link>
    </sbb-link-list>
    <div class="sbb-link-list-button-group">
      <sbb-link-list title-level="2" title-content="Newsletter.">
        <sbb-link text-size="s" variant="block">
          Our newsletter regularly informs you of attractive offers from SBB via e-mail.
        </sbb-link>
      </sbb-link-list>
      <sbb-button
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        variant="secondary"
      >
        Subscribe
      </sbb-button>
    </div>
    <sbb-clock {...args.sbbClock}></sbb-clock>
    <sbb-divider />
    <sbb-link-list horizontal-from="large">
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        text-size="xs"
      >
        Refunds
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        text-size="xs"
      >
        Lost property office
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        text-size="xs"
      >
        Complaints
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        text-size="xs"
      >
        Praise
      </sbb-link>
      <sbb-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        text-size="xs"
      >
        Report property damage
      </sbb-link>
    </sbb-link-list>
  </sbb-footer>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- Footer ------------------------ */
export const footer = Template.bind({});

footer.argTypes = defaultArgTypes;
footer.args = JSON.parse(JSON.stringify(defaultArgs));
footer.documentation = {
  container: {
    styles: (context) => documentationPlatformContainerStyle(context),
  },
  title: 'Footer (clock-column)',
};

/* --- Footer (default)------------------------ */
export const footerDefault = TemplateDefault.bind({});

footerDefault.argTypes = defaultArgTypes;
footerDefault.args = {
  ...defaultArgs,
  variant: variant.options[0],
};
footerDefault.documentation = {
  container: {
    styles: (context) => documentationPlatformContainerStyle(context),
  },
  title: 'Footer (default/no layout)',
};

/* --- Footer negative --------------- */
export const footerNegative = Template.bind({});

footerNegative.argTypes = defaultArgTypes;
footerNegative.args = {
  ...defaultArgs,
  negative: true,
};
footerNegative.documentation = {
  container: {
    styles: (context) => documentationPlatformContainerStyle(context),
  },
  title: 'Footer Negative (clock-column)',
};

/* --- Footer negative --------------- */
export const footerDefaultNegative = TemplateDefault.bind({});

footerDefaultNegative.argTypes = defaultArgTypes;
footerDefaultNegative.args = {
  ...defaultArgs,
  negative: true,
  variant: variant.options[0],
};
footerDefaultNegative.documentation = {
  container: {
    styles: (context) => documentationPlatformContainerStyle(context),
  },
  title: 'Footer Negative (default/no layout)',
};

/**
 * Stop the clock for Chromatic visual regression tests
 * and set time to given time
 */
if (isChromatic()) {
  footer.args.sbbClock = {
    'initial-time': '01:59:27',
    paused: true,
  };
  footerNegative.args.sbbClock = {
    'initial-time': '01:59:27',
    paused: true,
  };
} else {
  footer.args.sbbClock = {
    'initial-time': 'now',
    paused: false,
  };
  footerNegative.args.sbbClock = {
    'initial-time': 'now',
    paused: false,
  };
}

/* ************************************************* */
/* Render storybook section and stories              */
/* ************************************************* */

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)}`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'components/sbb-footer',
};
