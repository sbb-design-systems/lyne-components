import { h } from 'jsx-dom';
import readme from './readme.md';

const TextTemplate = () => (
  <div class="sbb-grid">
    <div style="background:purple;height:20px"></div>
    <div style="background:purple;height:20px"></div>
    <div style="background:purple;height:20px"></div>
    <div style="background:purple;height:20px"></div>
    <div style="background:purple;height:20px"></div>
    <div style="background:purple;height:20px"></div>
    <div style="background:purple;height:20px"></div>
    <div style="background:purple;height:20px"></div>
    <div style="background:purple;height:20px"></div>
    <div style="background:purple;height:20px"></div>
    <div style="background:purple;height:20px"></div>
    <div style="background:purple;height:20px"></div>
    <div style="background:purple;height:20px"></div>
    <div style="background:purple;height:20px"></div>
    <div style="background:purple;height:20px"></div>
    <div style="background:purple;height:20px"></div>
  </div>
);

export const Base = TextTemplate.bind({});

export default {
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'styles/grid',
};
