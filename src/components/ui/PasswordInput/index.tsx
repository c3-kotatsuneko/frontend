import { type ComponentPropsWithRef, useState } from "react";
import clsx from "clsx";
import { Input } from "../Input";
import { ViewableCheckBox } from "./items/ViewableCheckBox";
import inputStyles from "../Input/index.module.css";
import styles from "./index.module.css";

type PasswordInputProps = {
	label: string;
} & Omit<ComponentPropsWithRef<"input">, "type">;

export const PasswordInput = ({ label, ...props }: PasswordInputProps) => {
	const [viewable, setViewable] = useState(false);

	return (
		<label className={styles["password-label"]}>
			{label}
			<Input
				className={clsx(inputStyles["input-style"], styles["password-input"])}
				type={viewable ? "text" : "password"}
				{...props}
			/>
			<ViewableCheckBox onCheck={setViewable} />
		</label>
	);
};
