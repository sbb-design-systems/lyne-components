import lyneIcons from 'lyne-icons/dist/icons.json';

export default {
  bus: {
    direction: 'Richtung Bern Wankdorf, Bahnhof',
    meansOfTransport: {
      picto: lyneIcons.icons['transportation-bus-right'],
      text: 'Bus'
    },
    product: {
      icon: '',
      text: 'B 20'
    }
  },
  cableCar: {
    direction: 'Richtung Riederalp West',
    meansOfTransport: {
      picto: lyneIcons.icons['transportation-luftseilbahn-right'],
      text: 'Luftseilbahn'
    },
    product: {
      icon: '',
      text: 'GB 155'
    }
  },
  train: {
    direction: 'Richtung Romanshorn',
    meansOfTransport: {
      picto: lyneIcons.icons['transportation-zug-right'],
      text: 'Zug'
    },
    product: {
      icon: lyneIcons.icons['ic-8'],
      text: 'IC 8'
    }
  },
  tram: {
    direction: 'Richtung Bern Wankdorf, Bahnhof',
    meansOfTransport: {
      picto: lyneIcons.icons['transportation-tram-right'],
      text: 'Tram'
    },
    product: {
      icon: '',
      text: 'T 9'
    }
  }
};
