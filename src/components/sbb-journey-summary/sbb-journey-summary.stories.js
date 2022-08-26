import { h } from 'jsx-dom';

const Template = () => <sbb-journey-summary />;

export const summary = Template.bind({});
summary.args = {};

/* ************************************************* */
/* Render storybook section and stories              */
/* ************************************************* */

export default {
  decorators: [(Story) => <Story />],
  title: 'components/timetable/sbb-journey-summary (Unfinished)',
};
