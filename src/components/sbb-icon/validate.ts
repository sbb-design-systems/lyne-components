const isStr = (val: any): val is string => typeof val === 'string';

export const isValid = (elm: HTMLElement): boolean => {
  if (elm.nodeType === 1) {
    if (elm.nodeName.toLowerCase() === 'script') {
      return false;
    }

    for (let i = 0; i < elm.attributes.length; i++) {
      const val = elm.attributes[i].value;
      if (isStr(val) && val.toLowerCase().indexOf('on') === 0) {
        return false;
      }
    }

    for (let i = 0; i < elm.childNodes.length; i++) {
      if (!isValid(elm.childNodes[i] as any)) {
        return false;
      }
    }
  }
  return true;
};

export const validateContent = (
  svgContent: string,
  sanitize = true,
  colorImmutable = false
): string => {
  const div = document.createElement('div');
  div.innerHTML = svgContent;

  for (let i = div.childNodes.length - 1; i >= 0; i--) {
    if (div.childNodes[i].nodeName.toLowerCase() !== 'svg') {
      div.removeChild(div.childNodes[i]);
    }
  }

  // must only have 1 root element
  const svgElm = div.firstElementChild;

  if (svgElm && svgElm.nodeName.toLowerCase() === 'svg') {
    if (colorImmutable && !svgElm.classList.contains('color-immutable')) {
      svgElm.classList.add('color-immutable');
    }

    // do not sanitize the svg element
    if (sanitize === false) {
      return div.innerHTML;
    }

    // sanitize the svg element, do not allow scripts
    if (isValid(svgElm as any)) {
      return div.innerHTML;
    }
  }
  return '';
};
