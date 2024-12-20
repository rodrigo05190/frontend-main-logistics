interface Props {
  fill?: string
}

const Block = ({ fill }: Props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Block 1">
      <g id="Group">
        <path
          id="Vector"
          d="M12 22C6.486 22 2 17.514 2 12C2 6.486 6.486 2 12 2C17.514 2 22 6.486 22 12C22 17.514 17.514 22 12 22ZM12 4C7.589 4 4 7.589 4 12C4 16.411 7.589 20 12 20C16.411 20 20 16.411 20 12C20 7.589 16.411 4 12 4Z"
          fill={fill || '#FFF'}
        />
      </g>
      <g id="Group_2">
        <path
          id="Vector_2"
          d="M17.2932 5.29241L5.29297 17.2926L6.70717 18.7068L18.7074 6.70661L17.2932 5.29241Z"
          fill={fill || '#FFF'}
        />
      </g>
    </g>
  </svg>
)

export default Block
