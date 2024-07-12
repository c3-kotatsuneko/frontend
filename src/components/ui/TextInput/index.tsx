import { ComponentPropsWithRef } from "react";
import styles from "./index.module.css";
import { Input } from "../../../components/ui/Input";

type TextInputProps = {
  label: string;
} & ComponentPropsWithRef<"input">;

export const TextInput = ({ label, ...props }: TextInputProps) => {
  return (
    <label className={styles.label}>
      {label}
      <Input type="text" {...props} />
    </label>
  );
};
