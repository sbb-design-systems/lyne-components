/** HimCus interface for mapped icon name and text */
export interface HimCus {
  name: string;
  text: string;
}

/** Boarding icon interface for mapped icon name and text */
export interface Boarding {
  name: string;
  text: string;
}

export interface Price {
  price?: string;
  text?: string;
  isDiscount?: boolean;
}
