interface Props {
  fill?: string
}

const User = ({ fill }: Props) => (
  <svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.49215 4.73712C9.49215 6.53352 8.03521 7.9895 6.23764 7.9895C4.44008 7.9895 2.98314 6.53352 2.98314 4.73712C2.98314 2.94072 4.44008 1.48474 6.23764 1.48474C8.03521 1.48474 9.49215 2.94072 9.49215 4.73712Z"
      stroke={fill || '#fff'}
      strokeWidth="1.4"
      strokeLinecap="square"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.6618 16.6625H0.813477C0.813477 15.8922 0.813477 15.1594 0.813477 14.4958C0.813477 12.6984 2.27057 11.2419 4.06798 11.2419H8.40731C10.2047 11.2419 11.6618 12.6984 11.6618 14.4958C11.6618 15.1594 11.6618 15.8922 11.6618 16.6625Z"
      stroke={fill || '#fff'}
      strokeWidth="1.4"
      strokeLinecap="square"
    />
  </svg>
)

export default User
