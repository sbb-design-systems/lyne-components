declare type ServiceAlteration = {
  /** If (partially) cancelled, enduser cancellation info. */
  cancellationInfo?: string;
  /** true: Journey is (partially) cancelled (default=false) */
  cancelled: boolean;
  /**
   * Enduser text, saying whether there is a delay on PTRideLeg (referring to first/last Stop).
   *
   * TODO: discuss if needed
   */
  delayText: string;
  /**
   * true: transport-product change from PTRideLeg to PTRideLeg is reachable
   * (de: Anschluss kann gehalten werden, see Trip::valid);
   * false: de:nicht mehr erreichbare Fahrt
   *
   * TODO: discuss if needed
   */
  reachable: boolean;
  /** true: journey is redirected */
  redirected: boolean;
};

export type Leg = {
  duration: number;
  arrival?: {
    time: string;
  };
  departure?: {
    time: string;
  };
  serviceJourney?: {
    serviceAlteration: ServiceAlteration;
  };
};
export interface InterfacePearlChainAttributes {
  legs: Leg[];
  variant: 'departure' | 'transfer' | 'arrival';
}
