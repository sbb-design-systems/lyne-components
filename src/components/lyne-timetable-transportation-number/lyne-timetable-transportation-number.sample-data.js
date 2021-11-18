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
    direction: 'Direction Riederalp West',
    meansOfTransport: {
      picto: lyneIcons.icons['transportation-luftseilbahn-right'],
      text: 'Cable Car'
    },
    product: {
      icon: '',
      text: 'GB 155'
    }
  },
  train: {
    direction: 'Direction Romanshorn',
    meansOfTransport: {
      picto: lyneIcons.icons['transportation-zug-right'],
      text: 'Train'
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
