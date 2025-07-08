import { create } from 'storybook/theming';

const version = process.env.STORYBOOK_COMPONENTS_VERSION;
let title = `sbb-components`;

if (version) {
  title += `<br>${version}`;
}

export default create({
  base: 'light',
  brandTitle: title,
});
