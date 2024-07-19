import clsx from "clsx";
import type { FC, HTMLAttributes } from "react";
import styles from "./index.module.css";
type Props = HTMLAttributes<HTMLOrSVGElement> & {
	variant?: {
		color?: "blue" | "white";
	};
};

export const HomeIcon: FC<Props> = ({
	className,
	variant: { color } = { color: "" },
	...props
}) => {
	const combineClassName = clsx(
		{
			[styles["home-outline-blue"]]: color === "blue",
			[styles["home-outline-white"]]: color === "white",
		},
		className,
	);
	return (
		<svg className="ionicon" viewBox="0 0 512 512" {...props}>
			<title>home</title>
			<path
				d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
				className={combineClassName}
			/>
			<path
				d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256M400 179V64h-48v69"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
				stroke="currentColor"
				className={combineClassName}
			/>
		</svg>
	);
};
