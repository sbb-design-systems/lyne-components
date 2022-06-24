export class StringSanitizer {
  /**
   * Does a simple sanitization of all elements in an untrusted string
   */
  public static sanitizeDOMString(untrustedString: string | undefined): string | undefined {
    try {
      if (!untrustedString || typeof untrustedString !== 'string' || untrustedString === '') {
        return untrustedString;
      }

      /**
       * Create a document fragment separate from the main DOM,
       * then create a div to do our work in
       */
      const documentFragment: DocumentFragment = document.createDocumentFragment();
      const workingDiv: HTMLDivElement = document.createElement('div');

      documentFragment.appendChild(workingDiv);
      workingDiv.innerHTML = untrustedString;

      for (const blockedTag of this._blockedTags) {
        const getElementsToRemove: NodeListOf<Element> =
          documentFragment.querySelectorAll(blockedTag);
        let elementIndex: number = getElementsToRemove.length - 1;

        for (elementIndex; elementIndex >= 0; elementIndex--) {
          const element: Element = getElementsToRemove[elementIndex];

          if (element.parentNode) {
            element.parentNode.removeChild(element);
          } else {
            documentFragment.removeChild(element);
          }

          /**
           * We still need to sanitize
           * the children of this element
           * as they are left behind
           */
          const childElements: HTMLCollection = element.children;
          const childElementsLength: number = childElements.length;

          for (let childIndex = 0; childIndex < childElementsLength; childIndex++) {
            this._sanitizeElement(childElements[childIndex]);
          }
        }
      }

      /**
       * Go through remaining elements and remove non-allowed attributes
       */
      const dfChildren: HTMLCollection = documentFragment.children;
      const dfChildrenLength: number = dfChildren.length;

      for (let childIndex = 0; childIndex < dfChildrenLength; childIndex++) {
        this._sanitizeElement(dfChildren[childIndex]);
      }

      // Append document fragment to div
      const fragmentDiv: HTMLDivElement = document.createElement('div');

      fragmentDiv.appendChild(documentFragment);

      // First child is always the div we did our work in
      const getInnerDiv: HTMLDivElement = fragmentDiv.querySelector('div');

      return getInnerDiv === null ? fragmentDiv.innerHTML : getInnerDiv.innerHTML;
    } catch (err) {
      console.error(err);

      return '';
    }
  }

  private static _allowedAttributes: string[] = ['class', 'id', 'href', 'src', 'name', 'slot'];

  private static _blockedTags: string[] = [
    'script',
    'style',
    'iframe',
    'meta',
    'link',
    'object',
    'embed',
  ];

  /**
   * Clean up current element based on allowed attributes
   * and then recursively dig down into any child elements to
   * clean those up as well
   */
  private static _sanitizeElement(element: Element): void {
    let parentIndex: number = element.attributes.length - 1;

    for (parentIndex; parentIndex >= 0; parentIndex--) {
      const attribute: Attr = element.attributes.item(parentIndex);
      const attributeName: string = attribute.name;

      // remove non-allowed attribs
      if (!this._allowedAttributes.includes(attributeName.toLowerCase())) {
        element.removeAttribute(attributeName);
      }

      /*
       * clean up any allowed attribs
       * that attempt to do any JS funny-business
       */
      const attributeValue: string = attribute.value;

      /* eslint-disable no-script-url */
      if (attributeValue !== null && attributeValue.toLowerCase().includes('javascript:')) {
        element.removeAttribute(attributeName);
      }
    }

    /**
     * Sanitize any nested children
     */
    const childElements: HTMLCollection = element.children;

    for (let childIndex = 0; childIndex < childElements.length; childIndex++) {
      this._sanitizeElement(childElements[childIndex]);
    }
  }
}
