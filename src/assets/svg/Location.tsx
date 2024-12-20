interface Props {
  fill?: string
}

const Location = ({ fill }: Props) => (
  <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.4099 15.07L18.3399 11.07C18.0099 9.85 16.8699 9 15.5499 9H14.4699C14.5699 8.83 14.6599 8.66 14.7499 8.49C15.6899 6.68 15.6399 4.55 14.6099 2.8C13.5999 1.09 11.8299 0.05 9.86985 0H9.74986H9.59986C7.65986 0.03 5.90986 1.06 4.90986 2.74C3.85986 4.51 3.79986 6.66 4.74986 8.48C4.83986 8.65 4.92986 8.82 5.02986 8.99H3.94986C2.62986 8.99 1.47986 9.84 1.15986 11.06L0.0898554 15.07C-0.120145 15.87 0.0498554 16.71 0.559855 17.37C1.10986 18.08 1.95986 18.49 2.88986 18.49H16.6199C17.5499 18.49 18.3999 18.08 18.9499 17.37C19.4599 16.71 19.6299 15.87 19.4199 15.07H19.4099ZM6.19986 3.51C6.93986 2.26 8.18986 1.53 9.62986 1.5H9.82985C11.2899 1.54 12.5599 2.29 13.2999 3.55C14.0699 4.85 14.1099 6.44 13.3999 7.79C13.2999 7.98 13.1899 8.18 13.0799 8.38C12.2199 9.91 11.1499 11.31 9.90985 12.55C9.80985 12.65 9.65986 12.65 9.55986 12.55C8.31986 11.31 7.24986 9.91 6.38986 8.38C6.27986 8.18 6.16986 7.99 6.06986 7.8C5.35986 6.44 5.39986 4.84 6.18986 3.52L6.19986 3.51ZM17.7499 16.46C17.4899 16.8 17.0699 17 16.6099 17H2.87986C2.41986 17 2.00986 16.8 1.73986 16.46C1.50986 16.16 1.43986 15.81 1.52986 15.46L2.59986 11.46C2.74986 10.9 3.29986 10.5 3.93986 10.5H5.89986C5.89986 10.5 5.92986 10.5 5.93986 10.5C6.68986 11.62 7.54986 12.66 8.49986 13.62C8.83986 13.96 9.28986 14.13 9.72985 14.13C10.1699 14.13 10.6199 13.96 10.9599 13.62C11.9199 12.66 12.7799 11.61 13.5299 10.49C13.5699 10.49 13.5999 10.51 13.6399 10.51H15.5199C16.1599 10.51 16.7099 10.9 16.8599 11.47L17.9299 15.47C18.0199 15.82 17.9499 16.18 17.7199 16.47L17.7499 16.46Z"
      fill={fill || '#FFF'}
    />
  </svg>
)

export default Location