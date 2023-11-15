/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="vite/client" />

declare module '*?lit&inline' {
  const src: import('lit').CSSResultGroup;
  export default src;
}

declare namespace JSX {
  type Element = jsxDom.JSX.Element;
  type SbbAccordion = import('./components/sbb-accordion/sbb-accordion').SbbAccordion;
  type SbbActionGroup = import('./components/sbb-action-group/sbb-action-group').SbbActionGroup;
  type SbbAlert = import('./components/sbb-alert/sbb-alert').SbbAlert;
  type SbbAlertGroup = import('./components/sbb-alert-group/sbb-alert-group').SbbAlertGroup;
  type SbbAutocomplete = import('./components/sbb-autocomplete/sbb-autocomplete').SbbAutocomplete;
  type SbbBreadcrumb = import('./components/sbb-breadcrumb/sbb-breadcrumb').SbbBreadcrumb;
  type SbbBreadcrumbGroup =
    import('./components/sbb-breadcrumb-group/sbb-breadcrumb-group').SbbBreadcrumbGroup;
  type SbbButton = import('./components/sbb-button/sbb-button').SbbButton;
  type SbbCalendar = import('./components/sbb-calendar/sbb-calendar').SbbCalendar;
  type SbbCard = import('./components/sbb-card/sbb-card').SbbCard;
  type SbbCardAction = import('./components/sbb-card-action/sbb-card-action').SbbCardAction;
  type SbbCardBadge = import('./components/sbb-card-badge/sbb-card-badge').SbbCardBadge;
  type SbbCheckbox = import('./components/sbb-checkbox/sbb-checkbox').SbbCheckbox;
  type SbbCheckboxGroup =
    import('./components/sbb-checkbox-group/sbb-checkbox-group').SbbCheckboxGroup;
  type SbbChip = import('./components/sbb-chip/sbb-chip').SbbChip;
  type SbbClock = import('./components/sbb-clock/sbb-clock').SbbClock;
  type SbbDatepicker = import('./components/sbb-datepicker/sbb-datepicker').SbbDatepicker;
  type SbbDatepickerNextDay =
    import('./components/sbb-datepicker-next-day/sbb-datepicker-next-day').SbbDatepickerNextDay;
  type SbbDatepickerPreviousDay =
    import('./components/sbb-datepicker-previous-day/sbb-datepicker-previous-day').SbbDatepickerPreviousDay;
  type SbbDatepickerToggle =
    import('./components/sbb-datepicker-toggle/sbb-datepicker-toggle').SbbDatepickerToggle;
  type SbbDialog = import('./components/sbb-dialog/sbb-dialog').SbbDialog;
  type SbbDivider = import('./components/sbb-divider/sbb-divider').SbbDivider;
  type SbbExpansionPanel =
    import('./components/sbb-expansion-panel/sbb-expansion-panel').SbbExpansionPanel;
  type SbbExpansionPanelContent =
    import('./components/sbb-expansion-panel-content/sbb-expansion-panel-content').SbbExpansionPanelContent;
  type SbbExpansionPanelHeader =
    import('./components/sbb-expansion-panel-header/sbb-expansion-panel-header').SbbExpansionPanelHeader;
  type SbbFileSelector = import('./components/sbb-file-selector/sbb-file-selector').SbbFileSelector;
  type SbbFooter = import('./components/sbb-footer/sbb-footer').SbbFooter;
  type SbbFormError = import('./components/sbb-form-error/sbb-form-error').SbbFormError;
  type SbbFormField = import('./components/sbb-form-field/sbb-form-field').SbbFormField;
  type SbbFormFieldClear =
    import('./components/sbb-form-field-clear/sbb-form-field-clear').SbbFormFieldClear;
  type SbbHeader = import('./components/sbb-header/sbb-header').SbbHeader;
  type SbbHeaderAction = import('./components/sbb-header-action/sbb-header-action').SbbHeaderAction;
  type SbbIcon = import('./components/sbb-icon/sbb-icon').SbbIcon;
  type SbbImage = import('./components/sbb-image/sbb-image').SbbImage;
  type SbbJourneyHeader =
    import('./components/sbb-journey-header/sbb-journey-header').SbbJourneyHeader;
  type SbbJourneySummary =
    import('./components/sbb-journey-summary/sbb-journey-summary').SbbJourneySummary;
  type SbbLink = import('./components/sbb-link/sbb-link').SbbLink;
  type SbbLinkList = import('./components/sbb-link-list/sbb-link-list').SbbLinkList;
  type SbbLoadingIndicator =
    import('./components/sbb-loading-indicator/sbb-loading-indicator').SbbLoadingIndicator;
  type SbbLogo = import('./components/sbb-logo/sbb-logo').SbbLogo;
  type SbbMapContainer = import('./components/sbb-map-container/sbb-map-container').SbbMapContainer;
  type SbbMenu = import('./components/sbb-menu/sbb-menu').SbbMenu;
  type SbbMenuAction = import('./components/sbb-menu-action/sbb-menu-action').SbbMenuAction;
  type SbbMessage = import('./components/sbb-message/sbb-message').SbbMessage;
  type SbbNavigation = import('./components/sbb-navigation/sbb-navigation').SbbNavigation;
  type SbbNavigationAction =
    import('./components/sbb-navigation-action/sbb-navigation-action').SbbNavigationAction;
  type SbbNavigationList =
    import('./components/sbb-navigation-list/sbb-navigation-list').SbbNavigationList;
  type SbbNavigationMarker =
    import('./components/sbb-navigation-marker/sbb-navigation-marker').SbbNavigationMarker;
  type SbbNavigationSection =
    import('./components/sbb-navigation-section/sbb-navigation-section').SbbNavigationSection;
  type SbbNotification = import('./components/sbb-notification/sbb-notification').SbbNotification;
  type SbbOptgroup = import('./components/sbb-optgroup/sbb-optgroup').SbbOptgroup;
  type SbbOption = import('./components/sbb-option/sbb-option').SbbOption;
  type SbbPearlChain = import('./components/sbb-pearl-chain/sbb-pearl-chain').SbbPearlChain;
  type SbbPearlChainTime =
    import('./components/sbb-pearl-chain-time/sbb-pearl-chain-time').SbbPearlChainTime;
  type SbbPearlChainVertical =
    import('./components/sbb-pearl-chain-vertical/sbb-pearl-chain-vertical').SbbPearlChainVertical;
  type SbbPearlChainVerticalItem =
    import('./components/sbb-pearl-chain-vertical-item/sbb-pearl-chain-vertical-item').SbbPearlChainVerticalItem;
  type SbbRadioButton = import('./components/sbb-radio-button/sbb-radio-button').SbbRadioButton;
  type SbbRadioButtonGroup =
    import('./components/sbb-radio-button-group/sbb-radio-button-group').SbbRadioButtonGroup;
  type SbbSelect = import('./components/sbb-select/sbb-select').SbbSelect;
  type SbbSelectionPanel =
    import('./components/sbb-selection-panel/sbb-selection-panel').SbbSelectionPanel;
  type SbbSignet = import('./components/sbb-signet/sbb-signet').SbbSignet;
  type SbbSkiplinkList = import('./components/sbb-skiplink-list/sbb-skiplink-list').SbbSkiplinkList;
  type SbbSlider = import('./components/sbb-slider/sbb-slider').SbbSlider;
  type SbbTabGroup = import('./components/sbb-tab-group/sbb-tab-group').SbbTabGroup;
  type SbbTabTitle = import('./components/sbb-tab-title/sbb-tab-title').SbbTabTitle;
  type SbbTag = import('./components/sbb-tag/sbb-tag').SbbTag;
  type SbbTagGroup = import('./components/sbb-tag-group/sbb-tag-group').SbbTagGroup;
  type SbbTeaser = import('./components/sbb-teaser/sbb-teaser').SbbTeaser;
  type SbbTeaserHero = import('./components/sbb-teaser-hero/sbb-teaser-hero').SbbTeaserHero;
  type SbbTimeInput = import('./components/sbb-time-input/sbb-time-input').SbbTimeInput;
  type SbbTimetableBarrierFree =
    import('./components/sbb-timetable-barrier-free/sbb-timetable-barrier-free').SbbTimetableBarrierFree;
  type SbbTimetableDuration =
    import('./components/sbb-timetable-duration/sbb-timetable-duration').SbbTimetableDuration;
  type SbbTimetableOccupancy =
    import('./components/sbb-timetable-occupancy/sbb-timetable-occupancy').SbbTimetableOccupancy;
  type SbbTimetableParkAndRail =
    import('./components/sbb-timetable-park-and-rail/sbb-timetable-park-and-rail').SbbTimetableParkAndRail;
  type SbbTimetableRow = import('./components/sbb-timetable-row/sbb-timetable-row').SbbTimetableRow;
  type SbbTimetableRowColumnHeaders =
    import('./components/sbb-timetable-row-column-headers/sbb-timetable-row-column-headers').SbbTimetableRowColumnHeaders;
  type SbbTimetableRowDayChange =
    import('./components/sbb-timetable-row-day-change/sbb-timetable-row-day-change').SbbTimetableRowDayChange;
  type SbbTimetableRowHeader =
    import('./components/sbb-timetable-row-header/sbb-timetable-row-header').SbbTimetableRowHeader;
  type SbbTimetableTransportationNumber =
    import('./components/sbb-timetable-transportation-number/sbb-timetable-transportation-number').SbbTimetableTransportationNumber;
  type SbbTimetableTransportationTime =
    import('./components/sbb-timetable-transportation-time/sbb-timetable-transportation-time').SbbTimetableTransportationTime;
  type SbbTimetableTravelHints =
    import('./components/sbb-timetable-travel-hints/sbb-timetable-travel-hints').SbbTimetableTravelHints;
  type SbbTitle = import('./components/sbb-title/sbb-title').SbbTitle;
  type SbbToast = import('./components/sbb-toast/sbb-toast').SbbToast;
  type SbbToggle = import('./components/sbb-toggle/sbb-toggle').SbbToggle;
  type SbbToggleCheck = import('./components/sbb-toggle-check/sbb-toggle-check').SbbToggleCheck;
  type SbbToggleOption = import('./components/sbb-toggle-option/sbb-toggle-option').SbbToggleOption;
  type SbbTooltip = import('./components/sbb-tooltip/sbb-tooltip').SbbTooltip;
  type SbbTooltipTrigger =
    import('./components/sbb-tooltip-trigger/sbb-tooltip-trigger').SbbTooltipTrigger;
  type SbbTrain = import('./components/sbb-train/sbb-train').SbbTrain;
  type SbbTrainBlockedPassage =
    import('./components/sbb-train-blocked-passage/sbb-train-blocked-passage').SbbTrainBlockedPassage;
  type SbbTrainFormation =
    import('./components/sbb-train-formation/sbb-train-formation').SbbTrainFormation;
  type SbbTrainWagon = import('./components/sbb-train-wagon/sbb-train-wagon').SbbTrainWagon;
  type SbbVisualCheckbox =
    import('./components/sbb-visual-checkbox/sbb-visual-checkbox').SbbVisualCheckbox;

  interface IntrinsicElements {
    'sbb-accordion': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbAccordion>, SbbAccordion>;
    'sbb-action-group': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbActionGroup>,
      SbbActionGroup
    >;
    'sbb-alert': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbAlert>, SbbAlert>;
    'sbb-alert-group': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbAlertGroup>,
      SbbAlertGroup
    >;
    'sbb-autocomplete': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbAutocomplete>,
      SbbAutocomplete
    >;
    'sbb-breadcrumb': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbBreadcrumb>, SbbBreadcrumb>;
    'sbb-breadcrumb-group': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbBreadcrumbGroup>,
      SbbBreadcrumbGroup
    >;
    'sbb-button': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbButton>, SbbButton>;
    'sbb-calendar': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbCalendar>, SbbCalendar>;
    'sbb-card': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbCard>, SbbCard>;
    'sbb-card-action': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbCardAction>,
      SbbCardAction
    >;
    'sbb-card-badge': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbCardBadge>, SbbCardBadge>;
    'sbb-checkbox': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbCheckbox>, SbbCheckbox>;
    'sbb-checkbox-group': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbCheckboxGroup>,
      SbbCheckboxGroup
    >;
    'sbb-chip': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbChip>, SbbChip>;
    'sbb-clock': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbClock>, SbbClock>;
    'sbb-datepicker': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbDatepicker>, SbbDatepicker>;
    'sbb-datepicker-next-day': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbDatepickerNextDay>,
      SbbDatepickerNextDay
    >;
    'sbb-datepicker-previous-day': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbDatepickerPreviousDay>,
      SbbDatepickerPreviousDay
    >;
    'sbb-datepicker-toggle': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbDatepickerToggle>,
      SbbDatepickerToggle
    >;
    'sbb-dialog': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbDialog>, SbbDialog>;
    'sbb-divider': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbDivider>, SbbDivider>;
    'sbb-expansion-panel': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbExpansionPanel>,
      SbbExpansionPanel
    >;
    'sbb-expansion-panel-content': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbExpansionPanelContent>,
      SbbExpansionPanelContent
    >;
    'sbb-expansion-panel-header': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbExpansionPanelHeader>,
      SbbExpansionPanelHeader
    >;
    'sbb-file-selector': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbFileSelector>,
      SbbFileSelector
    >;
    'sbb-footer': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbFooter>, SbbFooter>;
    'sbb-form-error': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbFormError>, SbbFormError>;
    'sbb-form-field': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbFormField>, SbbFormField>;
    'sbb-form-field-clear': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbFormFieldClear>,
      SbbFormFieldClear
    >;
    'sbb-header': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbHeader>, SbbHeader>;
    'sbb-header-action': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbHeaderAction>,
      SbbHeaderAction
    >;
    'sbb-icon': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbIcon>, SbbIcon>;
    'sbb-image': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbImage>, SbbImage>;
    'sbb-journey-header': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbJourneyHeader>,
      SbbJourneyHeader
    >;
    'sbb-journey-summary': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbJourneySummary>,
      SbbJourneySummary
    >;
    'sbb-link': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbLink>, SbbLink>;
    'sbb-link-list': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbLinkList>, SbbLinkList>;
    'sbb-loading-indicator': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbLoadingIndicator>,
      SbbLoadingIndicator
    >;
    'sbb-logo': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbLogo>, SbbLogo>;
    'sbb-map-container': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbMapContainer>,
      SbbMapContainer
    >;
    'sbb-menu': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbMenu>, SbbMenu>;
    'sbb-menu-action': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbMenuAction>,
      SbbMenuAction
    >;
    'sbb-message': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbMessage>, SbbMessage>;
    'sbb-navigation': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbNavigation>, SbbNavigation>;
    'sbb-navigation-action': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbNavigationAction>,
      SbbNavigationAction
    >;
    'sbb-navigation-list': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbNavigationList>,
      SbbNavigationList
    >;
    'sbb-navigation-marker': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbNavigationMarker>,
      SbbNavigationMarker
    >;
    'sbb-navigation-section': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbNavigationSection>,
      SbbNavigationSection
    >;
    'sbb-notification': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbNotification>,
      SbbNotification
    >;
    'sbb-optgroup': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbOptgroup>, SbbOptgroup>;
    'sbb-option': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbOption>, SbbOption>;
    'sbb-pearl-chain': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbPearlChain>,
      SbbPearlChain
    >;
    'sbb-pearl-chain-time': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbPearlChainTime>,
      SbbPearlChainTime
    >;
    'sbb-pearl-chain-vertical': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbPearlChainVertical>,
      SbbPearlChainVertical
    >;
    'sbb-pearl-chain-vertical-item': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbPearlChainVerticalItem>,
      SbbPearlChainVerticalItem
    >;
    'sbb-radio-button': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbRadioButton>,
      SbbRadioButton
    >;
    'sbb-radio-button-group': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbRadioButtonGroup>,
      SbbRadioButtonGroup
    >;
    'sbb-select': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbSelect>, SbbSelect>;
    'sbb-selection-panel': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbSelectionPanel>,
      SbbSelectionPanel
    >;
    'sbb-signet': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbSignet>, SbbSignet>;
    'sbb-skiplink-list': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbSkiplinkList>,
      SbbSkiplinkList
    >;
    'sbb-slider': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbSlider>, SbbSlider>;
    'sbb-tab-group': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbTabGroup>, SbbTabGroup>;
    'sbb-tab-title': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbTabTitle>, SbbTabTitle>;
    'sbb-tag': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbTag>, SbbTag>;
    'sbb-tag-group': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbTagGroup>, SbbTagGroup>;
    'sbb-teaser': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbTeaser>, SbbTeaser>;
    'sbb-teaser-hero': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbTeaserHero>,
      SbbTeaserHero
    >;
    'sbb-time-input': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbTimeInput>, SbbTimeInput>;
    'sbb-timetable-barrier-free': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbTimetableBarrierFree>,
      SbbTimetableBarrierFree
    >;
    'sbb-timetable-duration': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbTimetableDuration>,
      SbbTimetableDuration
    >;
    'sbb-timetable-occupancy': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbTimetableOccupancy>,
      SbbTimetableOccupancy
    >;
    'sbb-timetable-park-and-rail': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbTimetableParkAndRail>,
      SbbTimetableParkAndRail
    >;
    'sbb-timetable-row': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbTimetableRow>,
      SbbTimetableRow
    >;
    'sbb-timetable-row-column-headers': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbTimetableRowColumnHeaders>,
      SbbTimetableRowColumnHeaders
    >;
    'sbb-timetable-row-day-change': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbTimetableRowDayChange>,
      SbbTimetableRowDayChange
    >;
    'sbb-timetable-row-header': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbTimetableRowHeader>,
      SbbTimetableRowHeader
    >;
    'sbb-timetable-transportation-number': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbTimetableTransportationNumber>,
      SbbTimetableTransportationNumber
    >;
    'sbb-timetable-transportation-time': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbTimetableTransportationTime>,
      SbbTimetableTransportationTime
    >;
    'sbb-timetable-travel-hints': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbTimetableTravelHints>,
      SbbTimetableTravelHints
    >;
    'sbb-title': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbTitle>, SbbTitle>;
    'sbb-toast': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbToast>, SbbToast>;
    'sbb-toggle': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbToggle>, SbbToggle>;
    'sbb-toggle-check': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbToggleCheck>,
      SbbToggleCheck
    >;
    'sbb-toggle-option': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbToggleOption>,
      SbbToggleOption
    >;
    'sbb-tooltip': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbTooltip>, SbbTooltip>;
    'sbb-tooltip-trigger': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbTooltipTrigger>,
      SbbTooltipTrigger
    >;
    'sbb-train': jsxDom.DetailedHTMLProps<jsxDom.HTMLAttributes<SbbTrain>, SbbTrain>;
    'sbb-train-blocked-passage': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbTrainBlockedPassage>,
      SbbTrainBlockedPassage
    >;
    'sbb-train-formation': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbTrainFormation>,
      SbbTrainFormation
    >;
    'sbb-train-wagon': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbTrainWagon>,
      SbbTrainWagon
    >;
    'sbb-visual-checkbox': jsxDom.DetailedHTMLProps<
      jsxDom.HTMLAttributes<SbbVisualCheckbox>,
      SbbVisualCheckbox
    >;
  }
}
