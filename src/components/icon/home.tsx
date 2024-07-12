export const HomeIcon = ({color = "blue"}: {color?: "blue" | "white"}) => {
  const stroke = color === "blue" ? "#005192" : "#fff"

  return (
    <svg width="24"height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.75 9.9375V21C3.75 21.1989 3.82902 21.3897 3.96967 21.5303C4.11032 21.671 4.30109 21.75 4.5 21.75H9V15.375C9 15.0766 9.11853 14.7905 9.3295 14.5795C9.54048 14.3685 9.82663 14.25 10.125 14.25H13.875C14.1734 14.25 14.4595 14.3685 14.6705 14.5795C14.8815 14.7905 15 15.0766 15 15.375V21.75H19.5C19.6989 21.75 19.8897 21.671 20.0303 21.5303C20.171 21.3897 20.25 21.1989 20.25 21V9.9375" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22.5 11.9999L12.5105 2.43741C12.2761 2.18991 11.7281 2.1871 11.4895 2.43741L1.5 11.9999M18.75 8.39054V2.99991H16.5V6.23429" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
  )
}
