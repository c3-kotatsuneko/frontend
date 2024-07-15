import type { ComponentPropsWithRef, ForwardedRef } from "react";
import styles from "./index.module.css";

type InputProps = {
	forwardRef?: ForwardedRef<HTMLInputElement>;
} & ComponentPropsWithRef<"input">;

export const Input = ({ forwardRef, ...props }: InputProps) => {
	return (
		<input className={styles["input-style"]} ref={forwardRef} {...props} />
	);
};
