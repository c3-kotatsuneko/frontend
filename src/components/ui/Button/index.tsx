import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./index.module.css";
import clsx from "clsx";

type ButtonProps = {
	children: ReactNode;
	variant?: "contained" | "outlined";
	size?: "sm" | "md";
	color?: "redorange" | "yellow" | "blue" | "green" | "brown";
} & ComponentPropsWithoutRef<"button">;

export const DefaultButton = ({
	children,
	variant = "contained",
	size = "md",
	color = "blue",
	className,
	...props
}: ButtonProps) => {
	return (
		<button
			className={clsx(styles["button-style"], className)}
			data-variant={variant}
			data-size={size}
			data-color={color}
			{...props}
		>
			{children}
		</button>
	);
};
