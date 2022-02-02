import { h } from 'jsx-dom';
import readme from './readme.md';
import images from '../../global/images';

const ItemTemplate = (args) => (
  <lyne-teaser-item class='lyne-teaser-item' {...args}>
  </lyne-teaser-item>
);

const Template = (args) => (
  <lyne-teaser-list class='lyne-teaser-list ' {...args}>
    {args.items.map((item) => (
      <ItemTemplate {...item} />
    ))}
  </lyne-teaser-list>
);

export const personalisedTeaserList = Template.bind({});
export const nonPersonalisedTeaserList = Template.bind({});

const imageLoading = {
  control: {
    type: 'inline-radio'
  },
  options: ['eager'],
  table: {
    category: 'Performance'
  }
};

const items = [
  {
    'image-loading': imageLoading.options[0],
    'image-src': images[0],
    'link': 'https://www.sbb.ch',
    'personalised': false,
    'text': 'Mit dem Velo unterwegs',
    'title-text': 'Velo'
  },
  {
    'image-loading': imageLoading.options[0],
    'image-src': images[1],
    'link': 'https://www.sbb.ch',
    'personalised': false,
    'text': 'Skierlebnisse entdecken',
    'title-text': 'Snow`n`Rail'
  },
  {
    'image-loading': imageLoading.options[0],
    'image-src': images[2],
    'link': 'https://www.sbb.ch',
    'personalised': false,
    'text': 'Alles für Ihren Ausflug',
    'title-text': 'Gruppenreisen'
  },
  {
    'image-loading': imageLoading.options[0],
    'image-src': images[3],
    'link': 'https://www.sbb.ch',
    'personalised': false,
    'text': 'Services im Bahnhof',
    'title-text': 'Bahnhof finden'
  },
  {
    'image-loading': imageLoading.options[0],
    'image-src': images[4],
    'link': 'https://www.sbb.ch',
    'personalised': false,
    'text': 'Bequem in die Ferien',
    'title-text': 'Fluggepäck'
  },
  {
    'image-loading': imageLoading.options[0],
    'image-src': images[5],
    'link': 'https://www.sbb.ch',
    'personalised': false,
    'text': 'Spezialangebot',
    'title-text': 'Eidgenössischen Schwingfest'
  }
];

const itemsPersonalised = [
  {
    'image-loading': imageLoading.options[0],
    'image-src': images[0],
    'link': 'https://www.sbb.ch',
    'personalised': true,
    'text': 'Spannende Bücher kaufen',
    'title-text': 'Lesen im Zug'
  },
  {
    'image-loading': imageLoading.options[0],
    'image-src': images[1],
    'link': 'https://www.sbb.ch',
    'personalised': true,
    'text': 'Entspannt reisen',
    'title-text': 'Reisetipps'
  },
  {
    'image-loading': imageLoading.options[0],
    'image-src': images[2],
    'link': 'https://www.sbb.ch',
    'personalised': true,
    'text': 'Rücksichtsvoll unterwegs',
    'title-text': 'SBB Green Class'
  },
  {
    'image-loading': imageLoading.options[0],
    'image-src': images[3],
    'link': 'https://www.sbb.ch',
    'personalised': true,
    'text': 'Alles für den täglichen Bedarf',
    'title-text': 'Coop Pronto'
  }
];

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

nonPersonalisedTeaserList.args = {
  items,
  personalised: false
};

personalisedTeaserList.args = {
  items: itemsPersonalised,
  personalised: true
};

/* ************************************************* */
/* export default                                    */
/* ************************************************* */

export default {
  decorators: [
    (Story) => (
      <div>
        <Story/>
      </div>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'lyne-teaser-list'
};
