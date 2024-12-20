interface Props {
  fill?: string
  rotate?: number
}

const Arrow = ({ fill, rotate }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="14"
    viewBox="0 0 8 14"
    fill="none"
    transform={`rotate(${rotate || 0})`}
  >
    <path
      d="M7.08 1L1 7.08L7.08 13.16"
      stroke={fill || '#FFF'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default Arrow
