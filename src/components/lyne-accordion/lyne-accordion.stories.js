import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-accordion {...args}>
    <lyne-accordion-item
      event-id='id1'
      first
      heading='Accordion Item 1'
      heading-level='2'
      open={false}
    >
      <p slot='content'>1 Donec sed odio operae, eu vulputate felis rhoncus. Curabitur est gravida et libero vitae dictum. Me non paenitet nullum festiviorem excogitasse ad hoc.</p>
      <p slot='content'>2 Donec sed odio operae, eu vulputate felis rhoncus. Curabitur est gravida et libero vitae dictum. Me non paenitet nullum festiviorem excogitasse ad hoc.</p>
      <p slot='content'>3 Quis aute iure reprehenderit in voluptate velit esse. Ab illo tempore, ab est sed immemorabili. Non equidem invideo, lit aliquet. Nihilne te nocturnum praesidium Palati, nihil urbis vigiliae.</p>
    </lyne-accordion-item>
    <lyne-accordion-item
      event-id='id2'
      heading='Accordion Item 2'
      heading-level='2'
      open={false}
    >
      <p slot='content'>1 Donec sed odio operae, eu vulputate felis rhoncus. Curabitur est gravida et libero vitae dictum. Me non paenitet nullum festiviorem excogitasse ad hoc.</p>
      <p slot='content'>2 Donec sed odio operae, eu vulputate felis rhoncus. Curabitur est gravida et libero vitae dictum. Me non paenitet nullum festiviorem excogitasse ad hoc.</p>
      <p slot='content'>3 Quis aute iure reprehenderit in voluptate velit esse. Ab illo tempore, ab est sed immemorabili. Non equidem invideo, lit aliquet. Nihilne te nocturnum praesidium Palati, nihil urbis vigiliae.</p>
    </lyne-accordion-item>
    <lyne-accordion-item
      event-id='id3'
      heading='Accordion Item 3'
      heading-level='2'
      last
      open={true}
    >
      <p slot='content'>1 Donec sed odio operae, eu vulputate felis rhoncus. Curabitur est gravida et libero vitae dictum. Me non paenitet nullum festiviorem excogitasse ad hoc.</p>
      <p slot='content'>2 Donec sed odio operae, eu vulputate felis rhoncus. Curabitur est gravida et libero vitae dictum. Me non paenitet nullum festiviorem excogitasse ad hoc.</p>
      <p slot='content'>3 Quis aute iure reprehenderit in voluptate velit esse. Ab illo tempore, ab est sed immemorabili. Non equidem invideo, lit aliquet. Nihilne te nocturnum praesidium Palati, nihil urbis vigiliae.</p>
    </lyne-accordion-item>
  </lyne-accordion>
);

export const Accordion = Template.bind({});

export default {
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'lyne-accordion'
};

