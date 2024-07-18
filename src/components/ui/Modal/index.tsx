import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from "./index.module.css";
import type { FC, ReactNode } from "react";

type Props = {
	open: boolean;
	children: ReactNode;
	onClose?: () => void;
	onOpen?: () => void;
};

export const Modal: FC<Props> = ({
	children,
	open,
	onClose = () => {},
	onOpen = () => {},
}) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	const handleShowModal = useCallback(() => {
		onOpen();
		dialogRef.current?.showModal();
	}, [onOpen]);

	const handleCloseModal = useCallback(() => {
		onClose();
		dialogRef.current?.close();
	}, [onClose]);

	useEffect(() => {
		if (open) {
			handleShowModal();
		} else {
			handleCloseModal();
		}
	}, [open, handleShowModal, handleCloseModal]);

	const handleKeyUp = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === "Escape") {
				handleCloseModal();
			}
		},
		[handleCloseModal],
	);

	useEffect(() => {
		if (open) {
			document.addEventListener("keyup", handleKeyUp);
		} else {
			document.removeEventListener("keyup", handleKeyUp);
		}
		return () => {
			document.removeEventListener("keyup", handleKeyUp);
		};
	}, [open, handleKeyUp]);

	return createPortal(
		<>
			<dialog
				ref={dialogRef}
				className={styles["modal-content-wrapper"]}
				onKeyDown={(e) => e.key === "Enter" && handleShowModal()}
				tabIndex={-1}
			>
				{children}
			</dialog>
			{open && (
				<button
					type="button"
					className={styles["modal-background"]}
					onClick={handleCloseModal}
					onKeyDown={(e) => e.key === "Enter" && handleCloseModal()}
					aria-label="Close modal"
				/>
			)}
		</>,
		document.body,
	);
};
