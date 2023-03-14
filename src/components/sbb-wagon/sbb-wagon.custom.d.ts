export interface InterfaceSbbWagonAttributes {
  type: 'locomotive' | 'closed' | 'wagon';
  occupancy?: 'high' | 'medium' | 'low' | 'unknown';
  blockedPassage: 'previous' | 'next' | 'both' | 'none';
}
