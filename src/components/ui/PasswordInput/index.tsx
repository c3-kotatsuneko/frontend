import { ComponentPropsWithRef, useState } from "react";
import { Input } from "../Input"
import { ViewableCheckBox } from "./items/ViewableCheckBox";
import styles from "./index.module.css";

type PasswordInputProps = {
  label: string;
} & Omit<ComponentPropsWithRef<"input">, "type">

export const PasswordInput = ({label, ...props}: PasswordInputProps) => {
  const [viewable, setViewable] = useState(false);

  return (
    <label>
      {label}
      <Input className={styles.passwordInput} type={viewable ? "text" : "password"} {...props} />
      <ViewableCheckBox onCheck={setViewable} />
    </label>
  )
}
