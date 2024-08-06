const filesToDownload = [
	{
		blob: new URL("../../public/marker/marker_file.pdf", import.meta.url).href,
		filename: "marker_file.pdf",
	},
];

const downloadBlob = (blob: string, filename: string) => {
	const link = document.createElement("a");
	link.href = blob;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

export const handleDownload = () => {
	for (const file of filesToDownload) {
		fetch(file.blob)
			.then((res) => res.blob())
			.then((blob) => {
				const url = URL.createObjectURL(blob);
				downloadBlob(url, file.filename);
			})
			.catch((err) => console.error("Failed to download pdf", err));
	}
};
