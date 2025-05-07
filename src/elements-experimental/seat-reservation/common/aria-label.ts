const ARIA_LABELS: Record<string, string> = {
  LIST_ALL_COACHES:
    'List of all coaches with reservable places. You can activate key navigation by pressing key s, then you can navigation by arrow keys between seats of coach.',
  LUGGAGE_AREA: 'Luggage area',
  ENTRY_EXIT: 'Exit/Entrance area',
  COACH_PASSAGE: 'Coach passage',
  SERVICE_WHEELCHAIR_ICON: 'Service info, Wheelchair place',
};

/**
 * Map function that converts the RAW OSDM mock data into SeatReservation
 */
export const getAriaLabel = (ariaLabelKey: string): string => {
  return ARIA_LABELS[ariaLabelKey] ?? null;
};
