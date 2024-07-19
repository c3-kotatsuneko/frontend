import type { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";
import { DefaultButton } from "../../ui/Button";
import defaultStyles from "../../ui/Button/index.module.css";
import styles from "./index.module.css";

type WelcomeButtonProps = {
	children: ReactNode;
	color?: "redorange" | "brown";
} & ComponentPropsWithoutRef<"button">;

export const WelcomeButton = ({
	children,
	color = "brown",
	...props
}: WelcomeButtonProps) => {
	return (
		<DefaultButton
			className={clsx(defaultStyles["button-style"], styles["welcome-style"])}
			variant="contained"
			color={color}
			{...props}
		>
			{children}
		</DefaultButton>
	);
};
