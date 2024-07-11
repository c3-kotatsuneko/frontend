import { ComponentPropsWithoutRef, ReactNode } from "react";

import styles from "./index.module.css";

type ButtonProps = {
  children: ReactNode;
  variant?: "contained" | "outlined";
  size?: "sm" | "md";
} & ComponentPropsWithoutRef<"button">;

export const Button = ({
  children,
  variant = "contained",
  size = "md",
  ...props}: ButtonProps) => {
  return (
    <button
      className={styles.buttonStyle}
      data-variant={variant}
      data-size={size}
      {...props}>
        {children}
      </button>
  );
};
