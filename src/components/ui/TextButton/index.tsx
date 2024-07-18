import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./index.module.css";
import clsx from "clsx";

type TextButtonProps = {
	children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

export const TextButton = ({
	children,
	color = "blue",
	className,
	...props
}: TextButtonProps) => {
	return (
		<button
			className={clsx(styles["text-button-style"], className)}
			style={{ fontSize: "12px" }}
			data-color={color}
			{...props}
		>
			{children}
		</button>
	);
};
