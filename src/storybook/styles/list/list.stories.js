import { h } from 'jsx-dom';
import readme from './readme.md';

const ListContent = () => [
  <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</li>,
  <li>
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</p>
    <p>Other paragraph.</p>
  </li>,
  <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</li>,
];

const UnorderedListTemplate = () =>
  ['xs', 's', 'm', 'l', 'xl'].map((textSize) => [
    <h3>Text size {textSize}</h3>,
    <ul class={`sbb-list sbb-text-${textSize}`}>
      <ListContent></ListContent>
      <li>
        Nested list
        <ul>
          <ListContent></ListContent>
        </ul>
      </li>
    </ul>,
  ]);

const OrderedListTemplate = () =>
  ['xs', 's', 'm', 'l', 'xl'].map((textSize) => [
    <h3>Text size {textSize}</h3>,
    <ol class={`sbb-list sbb-text-${textSize}`}>
      <ListContent></ListContent>
      <li>
        Nested list
        <ol>
          <ListContent></ListContent>
        </ol>
      </li>
    </ol>,
  ]);

const StepsTemplate = () =>
  ['xs', 's', 'm', 'l', 'xl'].map((textSize) => [
    <h3>Text size {textSize}</h3>,
    <ol class={`sbb-step-list sbb-text-${textSize}`}>
      <ListContent></ListContent>
      <li>
        Nested list
        <ol class="sbb-list">
          <ListContent></ListContent>
        </ol>
      </li>
    </ol>,
  ]);

const DescriptionListTemplate = () => (
  <dl class="sbb-list">
    <dt>Label:</dt>
    <dd>Description of the label.</dd>

    <dt>Longer Label:</dt>
    <dd>Description of the label which is longer than the other one.</dd>

    <dt>A very very very long label:</dt>
    <dd>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
      invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
      justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
      ipsum dolor sit amet.
    </dd>
  </dl>
);

export const UnorderedList = UnorderedListTemplate.bind({});
export const OrderedList = OrderedListTemplate.bind({});
export const StepList = StepsTemplate.bind({});
export const DescriptionList = DescriptionListTemplate.bind({});

export default {
  decorators: [
    (Story) => (
      <div style={'margin: 2rem'}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'styles/list',
};
