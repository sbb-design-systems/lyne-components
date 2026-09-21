/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["inert light DOM should mark inert"] = 
`<div>
  <div
    aria-hidden="true"
    data-sbb-aria-hidden=""
    data-sbb-inert=""
    inert=""
  >
  </div>
  <div
    aria-hidden="true"
    data-sbb-aria-hidden=""
    inert=""
  >
  </div>
  <div
    aria-hidden="true"
    data-sbb-inert=""
    inert=""
  >
  </div>
  <div id="overlay">
  </div>
  <div
    aria-hidden="true"
    data-sbb-aria-hidden=""
    data-sbb-inert=""
    inert=""
  >
    <div id="overlay2">
    </div>
  </div>
</div>
`;
/* end snapshot inert light DOM should mark inert */

snapshots["inert light DOM should remove inert"] = 
`<div>
  <div>
  </div>
  <div inert="">
  </div>
  <div aria-hidden="true">
  </div>
  <div id="overlay">
  </div>
  <div>
    <div id="overlay2">
    </div>
  </div>
</div>
`;
/* end snapshot inert light DOM should remove inert */

snapshots["inert light DOM stacked should mark inert"] = 
`<div>
  <div
    aria-hidden="true"
    data-sbb-aria-hidden=""
    data-sbb-inert=""
    inert=""
  >
  </div>
  <div
    aria-hidden="true"
    data-sbb-aria-hidden=""
    inert=""
  >
  </div>
  <div
    aria-hidden="true"
    data-sbb-inert=""
    inert=""
  >
  </div>
  <div
    aria-hidden="true"
    data-sbb-aria-hidden=""
    data-sbb-inert=""
    id="overlay"
    inert=""
  >
  </div>
  <div>
    <div id="overlay2">
    </div>
  </div>
</div>
`;
/* end snapshot inert light DOM stacked should mark inert */

snapshots["inert light DOM stacked should remove inert level 2"] = 
`<div>
  <div
    aria-hidden="true"
    data-sbb-aria-hidden=""
    data-sbb-inert=""
    inert=""
  >
  </div>
  <div
    aria-hidden="true"
    data-sbb-aria-hidden=""
    inert=""
  >
  </div>
  <div
    aria-hidden="true"
    data-sbb-inert=""
    inert=""
  >
  </div>
  <div id="overlay">
  </div>
  <div
    aria-hidden="true"
    data-sbb-aria-hidden=""
    data-sbb-inert=""
    inert=""
  >
    <div id="overlay2">
    </div>
  </div>
</div>
`;
/* end snapshot inert light DOM stacked should remove inert level 2 */

snapshots["inert light DOM stacked should remove inert level 1"] = 
`<div>
  <div>
  </div>
  <div inert="">
  </div>
  <div aria-hidden="true">
  </div>
  <div id="overlay">
  </div>
  <div>
    <div id="overlay2">
    </div>
  </div>
</div>
`;
/* end snapshot inert light DOM stacked should remove inert level 1 */

snapshots["inert light DOM stacked should handle level skip removal"] = 
`<div>
  <div>
  </div>
  <div inert="">
  </div>
  <div aria-hidden="true">
  </div>
  <div id="overlay">
  </div>
  <div>
    <div id="overlay2">
    </div>
  </div>
</div>
`;
/* end snapshot inert light DOM stacked should handle level skip removal */

snapshots["inert with shadow DOM should mark inert DOM"] = 
`<div>
  <div
    aria-hidden="true"
    data-sbb-aria-hidden=""
    data-sbb-inert=""
    inert=""
  >
  </div>
  <div
    aria-hidden="true"
    data-sbb-aria-hidden=""
    inert=""
  >
  </div>
  <div
    aria-hidden="true"
    data-sbb-inert=""
    inert=""
  >
  </div>
  <shadow-element>
  </shadow-element>
  <div
    aria-hidden="true"
    data-sbb-aria-hidden=""
    data-sbb-inert=""
    inert=""
  >
    <div>
    </div>
  </div>
</div>
`;
/* end snapshot inert with shadow DOM should mark inert DOM */

snapshots["inert with shadow DOM should mark inert Shadow DOM"] = 
`<div
  aria-hidden="true"
  data-sbb-aria-hidden=""
  data-sbb-inert=""
  inert=""
>
</div>
<div>
  <div
    aria-hidden="true"
    data-sbb-aria-hidden=""
    data-sbb-inert=""
    inert=""
  >
    Sibling
  </div>
  <div id="overlay">
  </div>
  <span
    aria-hidden="true"
    data-sbb-aria-hidden=""
    data-sbb-inert=""
    inert=""
  >
    Another sibling
  </span>
</div>
`;
/* end snapshot inert with shadow DOM should mark inert Shadow DOM */

snapshots["inert with shadow DOM should remove inert DOM"] = 
`<div>
  <div>
  </div>
  <div inert="">
  </div>
  <div aria-hidden="true">
  </div>
  <shadow-element>
  </shadow-element>
  <div>
    <div>
    </div>
  </div>
</div>
`;
/* end snapshot inert with shadow DOM should remove inert DOM */

snapshots["inert with shadow DOM should remove inert Shadow DOM"] = 
`<div>
</div>
<div>
  <div>
    Sibling
  </div>
  <div id="overlay">
  </div>
  <span>
    Another sibling
  </span>
</div>
`;
/* end snapshot inert with shadow DOM should remove inert Shadow DOM */

snapshots["inert ignored elements as direct siblings should never mark ignored elements as inert"] = 
`<div>
  <div id="overlay">
  </div>
  <template>
  </template>
</div>
`;
/* end snapshot inert ignored elements as direct siblings should never mark ignored elements as inert */

snapshots["inert ignored elements nested inside a wrapper should carve a path down to the ignored element, inerting its siblings instead"] = 
`<div>
  <div id="overlay">
  </div>
  <div id="wrapper">
    <div class="sbb-overlay-outlet">
      <div id="outlet-content">
      </div>
    </div>
    <div
      aria-hidden="true"
      data-sbb-aria-hidden=""
      data-sbb-inert=""
      id="sibling"
      inert=""
    >
    </div>
  </div>
</div>
`;
/* end snapshot inert ignored elements nested inside a wrapper should carve a path down to the ignored element, inerting its siblings instead */

snapshots["inert ignored elements nested inside a wrapper should fully remove the inert state again on deactivation"] = 
`<div>
  <div id="overlay">
  </div>
  <div id="wrapper">
    <div class="sbb-overlay-outlet">
      <div id="outlet-content">
      </div>
    </div>
    <div id="sibling">
    </div>
  </div>
</div>
`;
/* end snapshot inert ignored elements nested inside a wrapper should fully remove the inert state again on deactivation */

