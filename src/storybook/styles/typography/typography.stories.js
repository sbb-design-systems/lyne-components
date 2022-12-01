import { h } from 'jsx-dom';
import readme from './readme.md';

const text = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`;

const TextTemplate = () =>
  ['xxs', 'xs', 's', 'm', 'l', 'xl'].map((textSize, index, sizes) => [
    <sbb-title level={sizes.length - index}>
      Titel Level {sizes.length - index} / Text size {textSize}
    </sbb-title>,
    <p class={`sbb-text-${textSize}`}>{text}</p>,
  ]);

const TextBoldTemplate = () =>
  ['xxs', 'xs', 's', 'm', 'l', 'xl'].map((textSize, index, sizes) => [
    <sbb-title level={sizes.length - index}>
      Titel Level {sizes.length - index} / Text size {textSize}
    </sbb-title>,
    <p class={`sbb-text-${textSize} sbb-text-bold`}>{text}</p>,
  ]);

export const Text = TextTemplate.bind({});
export const TextBold = TextBoldTemplate.bind({});

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
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
  title: 'styles/typography',
};
