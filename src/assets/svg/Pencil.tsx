interface Props {
  fill?: string
}

const Pencil = ({ fill }: Props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="&#240;&#159;&#166;&#134; icon &#34;edit pencil&#34;">
      <path
        id="Vector"
        d="M10.9905 3.85441L13.8448 1L18.84 5.99521L15.9856 8.84958M10.9905 3.85441L1.29558 13.5492C1.10633 13.7385 1 13.9952 1 14.2628V18.84H5.57719C5.84484 18.84 6.10153 18.7337 6.29079 18.5444L15.9856 8.84958M10.9905 3.85441L15.9856 8.84958"
        stroke={fill || '#FFF'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
)

export default Pencil
