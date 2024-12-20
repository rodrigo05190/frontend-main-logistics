interface Props {
  fill?: string
}

const LogOut = ({ fill }: Props) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.71369 16.1778H3.48139C3.05276 16.1778 2.64168 16.0001 2.33859 15.6838C2.03551 15.3676 1.86523 14.9386 1.86523 14.4914V2.68642C1.86523 2.23915 2.03551 1.81021 2.33859 1.49394C2.64168 1.17768 3.05276 1 3.48139 1H6.71369"
      stroke={fill || '#fff'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.3701 12.8049L16.4105 8.5889L12.3701 4.37285"
      stroke={fill || '#fff'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.4108 8.58889H6.71387"
      stroke={fill || '#fff'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default LogOut
