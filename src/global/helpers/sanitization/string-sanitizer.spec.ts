import { StringSanitizer } from './string-sanitizer';

describe('sanitizeDOMString', () => {
  it('filter onerror', () => {
    expect(
      StringSanitizer.sanitizeDOMString('<img src="x" onerror="alert(document.cookie);">')
    ).toEqual('<img src="x">');
  });

  it('filter onclick', () => {
    expect(
      StringSanitizer.sanitizeDOMString(
        '<button id="myButton" name="myButton" onclick="alert(document.cookie);">harmless button</button>'
      )
    ).toEqual('<button id="myButton" name="myButton">harmless button</button>');
  });

  it('filter <a> href JS', () => {
    expect(
      StringSanitizer.sanitizeDOMString(
        '<a href="javascript:alert(document.cookie)">harmless link</a>'
      )
    ).toEqual('<a>harmless link</a>');
  });

  it('filter <a> href JS + class attribute', () => {
    expect(
      StringSanitizer.sanitizeDOMString(
        '<a class="link" href="Javascript&#58;alert(document.cookie)">harmless link</a>'
      )
    ).toEqual('<a class="link">harmless link</a>');
  });

  it('filter <iframe>', () => {
    expect(
      StringSanitizer.sanitizeDOMString('<iframe src="javascript:alert(document.cookie)"></iframe>')
    ).toEqual('');
  });

  it('filter href + javascript', () => {
    expect(
      StringSanitizer.sanitizeDOMString(
        '<div><button><a href="javascript:alert(document.cookie)">click me</a></button></div>'
      )
    ).toEqual('<div><button><a>click me</a></button></div>');
  });

  it('filter <object>', () => {
    expect(
      StringSanitizer.sanitizeDOMString(
        '<object><img src="x" onerror="alert(document.cookie);"></object>'
      )
    ).toEqual('');
  });

  it('sanitizeDOMString', () => {
    expect(
      StringSanitizer.sanitizeDOMString(
        '<ion-item><ion-label>Hello!</ion-label><ion-button onclick="alert(document.cookie);">Click me</ion-button>'
      )
    ).toEqual(
      '<ion-item><ion-label>Hello!</ion-label><ion-button>Click me</ion-button></ion-item>'
    );
  });
});
