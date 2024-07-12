import { ComponentPropsWithRef, ForwardedRef } from "react";
import styles from "./index.module.css";

type InputProps = {
    forwardRef?: ForwardedRef<HTMLInputElement>;
} & ComponentPropsWithRef<"input">;

export const Input = ({forwardRef, ...props}: InputProps) => {
    return (
        <input className={styles.inputStyle} ref={forwardRef} {...props} />
    );
};
