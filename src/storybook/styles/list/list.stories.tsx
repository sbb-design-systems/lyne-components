/** @jsx h */
import { Fragment, h, JSX } from 'jsx-dom';
import readme from './readme.md';
import type { Meta, StoryObj } from '@storybook/html';

const ListContent = (): JSX.Element[] => [
  <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</li>,
  <li>
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</p>
    <p>Other paragraph.</p>
  </li>,
  <li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</li>,
];

const UnorderedListTemplate = (): JSX.Element => (
  <Fragment>
    {['xs', 's', 'm', 'l', 'xl'].map((textSize) => [
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
    ])}
  </Fragment>
);

const OrderedListTemplate = (): JSX.Element => (
  <Fragment>
    {['xs', 's', 'm', 'l', 'xl'].map((textSize) => [
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
    ])}
  </Fragment>
);

const StepsTemplate = (): JSX.Element => (
  <Fragment>
    {['xs', 's', 'm', 'l', 'xl'].map((textSize) => [
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
    ])}
  </Fragment>
);

const DescriptionListTemplate = (): JSX.Element => (
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

export const UnorderedList: StoryObj = {
  render: UnorderedListTemplate,
};
export const OrderedList: StoryObj = {
  render: OrderedListTemplate,
};
export const StepList: StoryObj = {
  render: StepsTemplate,
};
export const DescriptionList: StoryObj = {
  render: DescriptionListTemplate,
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ margin: '2rem' }}>
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

export default meta;
