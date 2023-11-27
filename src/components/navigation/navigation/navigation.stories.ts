import { withActions } from '@storybook/addon-actions/decorator';
import { expect } from '@storybook/jest';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components';
import isChromatic from 'chromatic';
import { html, TemplateResult } from 'lit';
import { ref } from 'lit/directives/ref.js';

import { waitForComponentsReady } from '../../../storybook/testing/wait-for-components-ready';
import { sbbSpread } from '../../core/dom';
import type { SbbNavigationMarker } from '../navigation-marker';

import { SbbNavigation } from './navigation';
import readme from './readme.md?raw';
import '../navigation-section';
import '../navigation-marker';
import '../navigation-list';
import '../navigation-action';
import '../../button';

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }): Promise<void> => {
  const canvas = within(canvasElement);

  await waitForComponentsReady(
    () => canvas.getByTestId('navigation').shadowRoot?.querySelector('.sbb-navigation'),
  );

  const button = canvas.getByTestId('navigation-trigger');
  await userEvent.click(button);

  await waitFor(() =>
    expect(canvas.getByTestId('navigation').getAttribute('data-state') === 'opened').toBeTruthy(),
  );
};

const playStoryWithSection = async ({ canvasElement }): Promise<void> => {
  await playStory({ canvasElement });
  const canvas = within(canvasElement);

  await waitFor(() =>
    expect(
      canvas.getByTestId('navigation-section').shadowRoot?.querySelector('.sbb-navigation-section'),
    ).toBeTruthy(),
  );
  const actionL = canvas.getByTestId('navigation-section-trigger-1');
  await userEvent.click(actionL);

  await waitFor(() =>
    expect(
      canvas.getByTestId('navigation-section').getAttribute('data-state') === 'opened',
    ).toBeTruthy(),
  );
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Accessibility',
  },
};

const accessibilityCloseLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Accessibility',
  },
};

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
  },
};

const basicArgTypes: ArgTypes = {
  'aria-label': ariaLabel,
  'accessibility-close-label': accessibilityCloseLabel,
  'disable-animation': disableAnimation,
};

const basicArgs: Args = {
  'aria-label': undefined,
  'accessibility-close-label': undefined,
  'disable-animation': isChromatic(),
};

const triggerButton = (id: string): TemplateResult => html`
  <sbb-button
    data-testid="navigation-trigger"
    id=${id}
    variant="secondary"
    size="l"
    icon-name="hamburger-menu-small"
    aria-label="trigger navigation"
    aria-haspopup="true"
  ></sbb-button>
`;

const navigationActionsL = (): TemplateResult => html`
  <sbb-navigation-action id="nav-1" data-testid="navigation-section-trigger-1">
    Tickets & Offers
  </sbb-navigation-action>
  <sbb-navigation-action id="nav-2">Vacations & Recreation</sbb-navigation-action>
  <sbb-navigation-action id="nav-3">Travel information</sbb-navigation-action>
  <sbb-navigation-action id="nav-4" href="https://www.sbb.ch/en/">
    Help & Contact
  </sbb-navigation-action>
`;

const navigationActionsS = (): TemplateResult => html`
  <sbb-navigation-action id="nav-5">Deutsch</sbb-navigation-action>
  <sbb-navigation-action id="nav-6">Français</sbb-navigation-action>
  <sbb-navigation-action id="nav-7" active> Italiano </sbb-navigation-action>
  <sbb-navigation-action id="nav-8">English</sbb-navigation-action>
`;

const navigationList = (label: string): TemplateResult => html`
  <sbb-navigation-list label=${label}>
    <sbb-navigation-action size="m">Label</sbb-navigation-action>
    <sbb-navigation-action size="m">Label</sbb-navigation-action>
    <sbb-navigation-action size="m" href="https://www.sbb.ch/en/"> Label </sbb-navigation-action>
  </sbb-navigation-list>
`;

const actionLabels = (num: number): TemplateResult[] => {
  const labels: TemplateResult[] = [html`<sbb-navigation-action>Label</sbb-navigation-action>`];
  for (let i = 1; i <= num; i++) {
    labels.push(html`<sbb-navigation-action>Label</sbb-navigation-action>`);
  }
  return labels;
};

const onNavigationClose = (dialog: SbbNavigation): void => {
  dialog?.addEventListener('did-close', () => {
    (document.getElementById('nav-marker') as SbbNavigationMarker).reset();
  });
};

const DefaultTemplate = (args: Args): TemplateResult => html`
  ${triggerButton('navigation-trigger-1')}
  <sbb-navigation
    data-testid="navigation"
    id="navigation"
    trigger="navigation-trigger-1"
    ${ref((dialog?: Element) => onNavigationClose(dialog as SbbNavigation))}
    ${sbbSpread(args)}
  >
    <sbb-navigation-marker id="nav-marker">${navigationActionsL()}</sbb-navigation-marker>
    <sbb-navigation-marker size="s">${navigationActionsS()}</sbb-navigation-marker>
  </sbb-navigation>
`;

const LongContentTemplate = (args: Args): TemplateResult => html`
  ${triggerButton('navigation-trigger-1')}
  <sbb-navigation
    data-testid="navigation"
    id="navigation"
    trigger="navigation-trigger-1"
    ${sbbSpread(args)}
  >
    <sbb-navigation-marker>${navigationActionsL()}</sbb-navigation-marker>
    <sbb-navigation-marker size="s">${actionLabels(20)}</sbb-navigation-marker>
  </sbb-navigation>
`;

const WithNavigationSectionTemplate = (args: Args): TemplateResult => html`
  ${triggerButton('navigation-trigger-1')}
  <sbb-navigation
    data-testid="navigation"
    id="navigation"
    trigger="navigation-trigger-1"
    ${ref((dialog?: Element) => onNavigationClose(dialog as SbbNavigation))}
    ${sbbSpread(args)}
  >
    <sbb-navigation-marker id="nav-marker">${navigationActionsL()}</sbb-navigation-marker>
    <sbb-navigation-marker size="s">${navigationActionsS()}</sbb-navigation-marker>

    <sbb-navigation-section
      data-testid="navigation-section"
      trigger="nav-1"
      title-content="Title one"
      ?disable-animation=${args['disable-animation']}
    >
      ${navigationList('Label')} ${navigationList('Label')} ${navigationList('Label')}
      ${navigationList('Label')} ${navigationList('Label')} ${navigationList('Label')}
      <sbb-button size="m" style="width: fit-content"> All Tickets & Offers </sbb-button>
    </sbb-navigation-section>

    <sbb-navigation-section
      trigger="nav-2"
      title-content="Title two"
      ?disable-animation=${args['disable-animation']}
    >
      ${navigationList('Label')} ${navigationList('Label')} ${navigationList('Label')}
      ${navigationList('Label')} ${navigationList('Label')} ${navigationList('Label')}
    </sbb-navigation-section>

    <sbb-navigation-section
      trigger="nav-3"
      title-content="Title three"
      ?disable-animation=${args['disable-animation']}
    >
      ${navigationList('Label')} ${navigationList('Label')} ${navigationList('Label')}
      <sbb-button
        size="m"
        variant="secondary"
        icon-name="circle-information-small"
        style="width: fit-content;"
      >
        Travel Information
      </sbb-button>
    </sbb-navigation-section>
  </sbb-navigation>
`;

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
  play: isChromatic() ? playStory : undefined,
};

export const LongContent: StoryObj = {
  render: LongContentTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
  play: isChromatic() ? playStory : undefined,
};

export const WithNavigationSection: StoryObj = {
  render: WithNavigationSectionTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
  play: isChromatic() ? playStoryWithSection : undefined,
};

const meta: Meta = {
  decorators: [
    (story) => html` <div style="padding: 2rem; height: 100vh;">${story()}</div> `,
    withActions as Decorator,
  ],
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: {
      handles: [
        SbbNavigation.events.willOpen,
        SbbNavigation.events.didOpen,
        SbbNavigation.events.didClose,
        SbbNavigation.events.willClose,
      ],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      story: { inline: false, iframeHeight: '600px' },

      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'components/sbb-navigation/sbb-navigation',
};

export default meta;
