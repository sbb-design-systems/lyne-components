/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-image should render DOM"] = 
`<sbb-image
  aspect-ratio="16-9"
  border-radius="default"
  data-loaded=""
  image-src="http://localhost:8001/src/components/clock/assets/sbb_clock_face.svg"
>
</sbb-image>
`;
/* end snapshot sbb-image should render DOM */

snapshots["sbb-image should render Shadow DOM"] = 
`<figure class="sbb-image__figure">
  <div class="sbb-image__wrapper">
    <img
      alt=""
      class="sbb-image__blurred"
      decoding="auto"
      height="562"
      loading="eager"
      src="http://localhost:8001/src/components/clock/assets/sbb_clock_face.svg?blur=100&amp;w=100&amp;h=56"
      width="1000"
    >
    <picture>
      <source
        media="(min-width: 64rem)"
        sizes="1200px"
        srcset="http://localhost:8001/src/components/clock/assets/sbb_clock_face.svg?auto=format%2Ccompress%2Ccs%3Dtinysrgb&amp;w=1200&amp;h=675&amp;q=45 1200w, http://localhost:8001/src/components/clock/assets/sbb_clock_face.svg?auto=format%2Ccompress%2Ccs%3Dtinysrgb&amp;w=2400&amp;h=1350&amp;q=20 2400w"
      >
      <source
        media="(min-width: 37.5rem)"
        sizes="976px"
        srcset="http://localhost:8001/src/components/clock/assets/sbb_clock_face.svg?auto=format%2Ccompress%2Ccs%3Dtinysrgb&amp;w=976&amp;h=549&amp;q=45 976w, http://localhost:8001/src/components/clock/assets/sbb_clock_face.svg?auto=format%2Ccompress%2Ccs%3Dtinysrgb&amp;w=1952&amp;h=1098&amp;q=20 1952w"
      >
      <source
        media="(max-width: 37.4375rem)"
        sizes="320px"
        srcset="http://localhost:8001/src/components/clock/assets/sbb_clock_face.svg?auto=format%2Ccompress%2Ccs%3Dtinysrgb&amp;w=320&amp;h=180&amp;q=45 320w, http://localhost:8001/src/components/clock/assets/sbb_clock_face.svg?auto=format%2Ccompress%2Ccs%3Dtinysrgb&amp;w=640&amp;h=360&amp;q=20 640w"
      >
      <img
        alt=""
        class="sbb-image__img"
        decoding="auto"
        fetchpriority="high"
        height="562"
        loading="eager"
        src="http://localhost:8001/src/components/clock/assets/sbb_clock_face.svg"
        width="1000"
      >
    </picture>
  </div>
</figure>
`;
/* end snapshot sbb-image should render Shadow DOM */

