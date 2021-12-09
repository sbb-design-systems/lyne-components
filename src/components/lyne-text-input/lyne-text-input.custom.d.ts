export interface InterfaceLyneTextInputAttributes {
  inputAutoCompleteSectionName: 'none' | 'billing' | 'shipping';
  inputAutoCompleteValue: 'additional-name' | 'address-level1' | 'address-level2' | 'address-level3' | 'address-level4' | 'address-line1' | 'address-line2' | 'address-line3' | 'bday' | 'bday-day' | 'bday-month' | 'bday-year' | 'cc-additional-name' | 'cc-csc' | 'cc-exp' | 'cc-exp-month' | 'cc-exp-year' | 'cc-family-name' | 'cc-given-name' | 'cc-name' | 'cc-number' | 'cc-type' | 'country' | 'country-name' | 'current-password' | 'email' | 'family-name' | 'given-name' | 'honorific-prefix' | 'honorific-suffix' | 'impp' | 'language' | 'name' | 'new-password' | 'nickname' | 'off' | 'on' | 'one-time-code' | 'organization' | 'organization-title' | 'photo' | 'postal-code' | 'sex' | 'street-address' | 'tel' | 'tel-area-code' | 'tel-country-code' | 'tel-extension' | 'tel-local' | 'tel-national' | 'transaction-amount' | 'transaction-currency' | 'url' | 'username';
  inputTypeValue: 'email' | 'hidden' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
  inputRole: 'presentation' | 'searchbox' | 'combobox' | 'listbox';
  inputAriaAutocomplete: 'inline' | 'list' | 'both' | 'none';
}
