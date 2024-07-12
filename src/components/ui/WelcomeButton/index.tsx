import { ComponentPropsWithoutRef, ReactNode } from "react";
import { DefaultButton } from "../Button"
import styles from "./index.module.css";

type WelcomeButtonProps = {
  children: ReactNode;
  color?: "redorange" | "brown";
} & ComponentPropsWithoutRef<"button">;

export const WelcomeButton = ({children, color = "brown", ...props}: WelcomeButtonProps) => {
  return (
    <DefaultButton className={styles.welcomeStyle} variant="contained" color={color} {...props}>{children}</DefaultButton>
  )
}
