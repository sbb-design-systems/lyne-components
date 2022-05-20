import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => (
  <lyne-tab-amount>{args.amount}</lyne-tab-amount>
);

export const amount = Template.bind({});

amount.args = {
  amount: '123'
};

amount.documentation = {
  title: 'Lyne Tab Amount'
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story/>
      </div>
    )
  ],
  parameters: {
    backgrounds: {
      disable: true
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'components/tabs/lyne-tab-amount'
};
