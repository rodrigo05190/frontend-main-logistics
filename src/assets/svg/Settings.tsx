interface Props {
  fill?: string
}

const Settings = ({ fill }: Props) => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.4994 13.35C12.0735 13.35 13.3494 12.0741 13.3494 10.5C13.3494 8.92594 12.0735 7.65 10.4994 7.65C8.92536 7.65 7.64941 8.92594 7.64941 10.5C7.64941 12.0741 8.92536 13.35 10.4994 13.35Z"
      stroke={fill || '#fff'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.7413 8.97563L16.6985 6.45756L18.1 4.8L16.2 2.9L14.5515 4.3088L11.9799 3.25125L11.3885 1H9.53195L8.93165 3.28107L6.41919 4.34016L4.8 2.9L2.9 4.8L4.2807 6.49941L3.25387 9.02398L1 9.55V11.45L3.28105 12.0727L4.33996 14.5847L2.9 16.2L4.8 18.1L6.5016 16.7133L8.97715 17.7317L9.55 20H11.45L12.0243 17.7325L14.5423 16.6897C14.9621 16.9897 16.2 18.1 16.2 18.1L18.1 16.2L16.6901 14.5369L17.7332 12.0181L19.9999 11.4283L20 9.55L17.7413 8.97563Z"
      stroke={fill || '#fff'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default Settings
