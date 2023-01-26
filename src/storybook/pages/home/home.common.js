import isChromatic from 'chromatic';
import { h } from 'jsx-dom';

export const TimetableInput = () => (
  <section class="timetable-section sbb-grid">
    <div class="grid-reduced-width">
      <div class="timetable-placeholder"></div>
    </div>
  </section>
);

const onNavigationClose = (dialog) => {
  dialog.addEventListener('didClose', () => {
    document.getElementById('nav-marker').reset();
  });
};

export const Navigation = () => (
  <sbb-navigation trigger="hamburger-menu" ref={(dialog) => onNavigationClose(dialog)}>
    <sbb-navigation-marker id="nav-marker">
      <sbb-navigation-action id="nav-1">Tickets & Offers</sbb-navigation-action>
      <sbb-navigation-action id="nav-2">Vacations & Recreation</sbb-navigation-action>
      <sbb-navigation-action id="nav-3">Travel information</sbb-navigation-action>
      <sbb-navigation-action id="nav-4" href="https://www.sbb.ch/en/">
        Help & Contact
      </sbb-navigation-action>
    </sbb-navigation-marker>

    <sbb-navigation-marker size="s">
      <sbb-navigation-action id="nav-5">Deutsch</sbb-navigation-action>
      <sbb-navigation-action id="nav-6">Français</sbb-navigation-action>
      <sbb-navigation-action id="nav-7">Italiano</sbb-navigation-action>
      <sbb-navigation-action id="nav-8" active>
        English
      </sbb-navigation-action>
    </sbb-navigation-marker>

    <sbb-navigation-section title-content="Title one" trigger="nav-1">
      <sbb-navigation-list label="Label">
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
      </sbb-navigation-list>

      <sbb-navigation-list label="Label">
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
      </sbb-navigation-list>

      <sbb-navigation-list label="Label">
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
      </sbb-navigation-list>

      <sbb-navigation-list label="Label">
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
      </sbb-navigation-list>

      <sbb-navigation-list label="Label">
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
      </sbb-navigation-list>

      <sbb-navigation-list label="Label">
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
      </sbb-navigation-list>

      <sbb-button size="m" class="navigation-button">
        All Tickets & Offers
      </sbb-button>
    </sbb-navigation-section>

    <sbb-navigation-section title-content="Title two" trigger="nav-2">
      <sbb-navigation-list label="Label">
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
      </sbb-navigation-list>

      <sbb-navigation-list label="Label">
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
      </sbb-navigation-list>

      <sbb-navigation-list label="Label">
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
      </sbb-navigation-list>

      <sbb-navigation-list label="Label">
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
      </sbb-navigation-list>

      <sbb-navigation-list label="Label">
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
      </sbb-navigation-list>
    </sbb-navigation-section>

    <sbb-navigation-section title-content="Title three" trigger="nav-3">
      <sbb-navigation-list label="Label">
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
      </sbb-navigation-list>

      <sbb-navigation-list label="Label">
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
      </sbb-navigation-list>

      <sbb-navigation-list label="Label">
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
        <sbb-navigation-action>Label</sbb-navigation-action>
      </sbb-navigation-list>

      <sbb-button
        size="m"
        variant="secondary"
        icon-name="circle-information-small"
        class="navigation-button"
      >
        Travel Information
      </sbb-button>
    </sbb-navigation-section>
  </sbb-navigation>
);

export const DailyTicketProduct = () => (
  <sbb-card-product
    appearance="primary"
    accessibility-label="The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography"
    layout="standard"
    href-value="https://github.com/lyne-design-system/lyne-components"
  >
    <sbb-icon name="ticket-route-medium" slot="icon"></sbb-icon>
    <sbb-title slot="title" level="2" visual-level="6">
      Daily ticket
    </sbb-title>
    <div slot="text">
      <span>Valid today</span>
    </div>
    <div slot="action">
      <sbb-button size="m" variant="secondary" static>
        Buy
      </sbb-button>
    </div>
  </sbb-card-product>
);

export const BikeProduct = () => (
  <sbb-card-product
    appearance="primary"
    accessibility-label="The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography"
    layout="standard"
    href-value="https://github.com/lyne-design-system/lyne-components"
  >
    <sbb-icon name="bicycle-medium" slot="icon"></sbb-icon>
    <sbb-title slot="title" level="2" visual-level="6">
      Bike day pass
    </sbb-title>
    <div slot="text">
      <span>Valid today</span>
    </div>
    <div slot="action">
      <sbb-button size="m" variant="secondary" static>
        Buy
      </sbb-button>
    </div>
  </sbb-card-product>
);

export const LiberoProduct = () => (
  <sbb-card-product
    appearance="primary"
    accessibility-label="The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography"
    layout="standard"
    href-value="https://github.com/lyne-design-system/lyne-components"
  >
    <sbb-icon name="ticket-route-medium" slot="icon"></sbb-icon>
    <sbb-title slot="title" level="2" visual-level="6">
      Libero short distance ticket
    </sbb-title>
    <div slot="text">
      <span>Valid today</span>
    </div>
    <div slot="action">
      <sbb-button size="m" variant="secondary" static>
        Buy
      </sbb-button>
    </div>
  </sbb-card-product>
);

export const TeaserHero = () => (
  <section class="sbb-page-spacing">
    <sbb-teaser-hero
      class="teaser-hero"
      link-content="Learn more"
      image-src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg"
      href="https://www.sbb.ch"
    >
      Considerate with SBB Green Class.
    </sbb-teaser-hero>
  </section>
);

export const Footer = (args) => (
  <sbb-footer accessibility-title="Footer" variant="clock-columns" negative={args.negative}>
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

export const wrapperStyle = (context) => {
  if (!context.args.negative) {
    return `background-color: var(--sbb-color-white-default);`;
  }

  return `background-color: var(--sbb-color-charcoal-default);`;
};
