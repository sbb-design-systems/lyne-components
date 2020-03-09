import { create } from '@storybook/theming/create';

const version = process.env.STORYBOOK_COMPONENTS_VERSION;
let title = `lyne-components`;

if (version) {
  title += `<br>${version}`;
}

export default create({
  base: 'light',
  brandTitle: title
});
