module.exports = {
	ci: {
		collect: {
			numberOfRuns: 1,
			startServerCommand: "npm run start",
			url: ["http://localhost:4173/"],
		},
		upload: {
			target: "lhci",
		},
	},
};
