import { create } from '@storybook/theming/create';

const title = 'lyne-components<br>' + process.env.STORYBOOK_COMPONENTS_VERSION;

export default create({
  base: 'light',
  brandTitle: title
});
