interface Props {
  fill?: string
}

const Download: React.FC<Props> = ({ fill }) => (
  <svg width="12" height="15" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="&#240;&#159;&#166;&#134; icon &#34;download&#34;">
      <path
        id="Vector"
        d="M1 11.7733H9.08"
        stroke={fill || '#fff'}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Vector_2"
        d="M5.04026 1V9.08M5.04026 9.08L7.39693 6.72333M5.04026 9.08L2.68359 6.72333"
        stroke={fill || '#fff'}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
)

export default Download
