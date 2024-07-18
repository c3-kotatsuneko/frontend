import type { ComponentPropsWithRef } from "react";
import styles from "./index.module.css";
import { Input } from "../Input";

type TextInputProps = {
	label: string;
} & ComponentPropsWithRef<"input">;

export const TextInput = ({ label, ...props }: TextInputProps) => {
	return (
		<label className={styles["text-label"]}>
			{label}
			<Input type="text" {...props} />
		</label>
	);
};
