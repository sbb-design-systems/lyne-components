import { isRTL } from './dir';

describe('rtl: dir', () => {
  describe('with host element', () => {
    let spyDoc: jest.SpyInstance;
    let mockElement: HTMLElement;

    beforeEach(() => {
      spyDoc = jest.spyOn(document, 'getElementById');
      mockElement = document.createElement('div');
      mockElement.id = 'id';
    });

    it('should return true with hostEl.dir set to rtl', () => {
      mockElement.dir = 'rtl';
      spyDoc.mockReturnValue(mockElement);
      expect(isRTL(document.getElementById('id')))
        .toBe(true);
    });

    it('should return false with hostEl.dir set to ltr', () => {
      mockElement.dir = 'ltr';
      spyDoc.mockReturnValue(mockElement);
      expect(isRTL(document.getElementById('id')))
        .toBe(false);
    });

    it('should return true with hostEl.dir set to null and direction set to rtl', () => {
      mockElement.dir = '';
      spyDoc.mockReturnValue(mockElement);
      jest.spyOn(window, 'getComputedStyle')
        .mockReturnValue({
          getPropertyValue: jest.fn()
            .mockReturnValue('rtl')
        } as any as CSSStyleDeclaration);

      expect(isRTL(document.getElementById('id')))
        .toBe(true);
    });

    it('should return false with hostEl.dir set to null and direction set to ltr', () => {
      mockElement.dir = '';
      spyDoc.mockReturnValue(mockElement);
      jest.spyOn(window, 'getComputedStyle')
        .mockReturnValue({
          getPropertyValue: jest.fn()
            .mockReturnValue('ltr')
        } as any as CSSStyleDeclaration);

      expect(isRTL(document.getElementById('id')))
        .toBe(false);
    });

  });

  describe('without host element', () => {
    it('should return true', () => {
      global.document.dir = 'rtl';
      expect(isRTL())
        .toBe(true);
    });

    it('should return false', () => {
      global.document.dir = 'ltr';
      expect(isRTL())
        .toBe(false);
    });
  });
});
