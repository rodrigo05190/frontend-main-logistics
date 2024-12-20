interface Props {
  fill?: string
}

const Trash = ({ fill }: Props) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="&#240;&#159;&#166;&#134; icon &#34;trash&#34;">
      <path
        id="Vector"
        d="M13.5876 7.29333V14.688C13.5876 14.9487 13.3763 15.16 13.1156 15.16H3.04622C2.78554 15.16 2.57422 14.9487 2.57422 14.688V7.29333"
        stroke={fill || '#FFF'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Vector_2"
        d="M6.50781 12.0134V7.29333"
        stroke={fill || '#FFF'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Vector_3"
        d="M9.6543 12.0134V7.29333"
        stroke={fill || '#FFF'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Vector_4"
        d="M15.1601 4.14668H11.2267M11.2267 4.14668V1.472C11.2267 1.21132 11.0154 1 10.7547 1H5.40535C5.14467 1 4.93335 1.21132 4.93335 1.472V4.14668M11.2267 4.14668H4.93335M1 4.14668H4.93335"
        stroke={fill || '#FFF'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
)

export default Trash
