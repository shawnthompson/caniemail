function isObject(item) {
	return (
		item &&
		typeof item === "object" &&
		!Array.isArray(item) &&
		item !== null
	);
}

function mergeDeep(target, source) {
	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!target[key]) Object.assign(target, { [key]: {} });
				mergeDeep(target[key], source[key]);
			} else if (Array.isArray(source[key])) {
				// if (!target[key]) Object.assign(target, { [key]: source[key] });
				target[key] = [...(target[key] || []), ...source[key]];
			} else {
				Object.assign(target, { [key]: source[key] });
			}
		}
	}
	return target;
}

function convertFeature(feature) {
	const tests = feature.tests?.map((test) => {
		const r = {};
		for (const atName in test.versions) {
			r[atName] = r[atName] || {};

			for (const browserName in test.versions[atName].browsers) {
				r[atName][browserName] = r[atName][browserName] || {};
				const browser = test.versions[atName].browsers[browserName];
				browserVersion = browser.browser_version;
				r[atName][browserName][browserVersion] = [];
				test.assertions.forEach((assertion) => {
					const at = assertion.results[atName];
					const browser = at.browsers[browserName];
					r[atName] = r[atName] || {};
					r[atName][browserName] = r[atName][browserName] || {};
					r[atName][browserName][browserVersion] =
						r[atName][browserName][browserVersion] || [];
					r[atName][browserName][browserVersion].push(
						browser?.support
					);
				});
			}
		}

		return r;
	});
	const mapped = tests.reduce((curr, next) => mergeDeep(curr, next), {});
	let stats = {};
	for (const atName in mapped) {
		for (const browserName in mapped[atName]) {
			const keys = Object.keys(mapped[atName][browserName]);
			const values = Object.values(mapped[atName][browserName]).flat();
			const ordered = keys.sort((a, b) => parseFloat(a) - parseFloat(b));
			const key =
				keys.length === 1
					? keys[0]
					: `${ordered[0]}-${ordered[ordered.length - 1]}`;
			stats[atName] = stats[atName] || {};
			stats[atName][browserName] = stats[atName][browserName] || {};
			// stats[atName][browserName][key] = values.flat();
			let result = "u";
			if (values.every((v) => v === "y")) {
				result = "y";
			} else if (values.some((v) => v === "y")) {
				result = "a";
			} else if (values.every((v) => v === "n")) {
				result = "n";
			} else if (values.every((v) => v === "na")) {
				result = "na";
			}
			stats[atName][browserName][key] = result;
		}
	}

	return {
		title: feature.title,
		description: feature.description,
		category: feature.techId,
		keywords: feature.keywords,
		last_test_date: feature.date_updated,
		test_results_url: `https://a11ysupport.io/tech/${feature.id}`,
		notes: feature.recommendation,
		stats,
		links: []
			.concat(feature.related_issues, feature.references)
			.filter(Boolean)
			.reduce((acc, curr) => {
				acc[curr.title] = curr.url;
				return acc;
			}, {}),
	};
}

const fs = require("fs");
const paths = [
	__dirname + "/../a11ysupport.io/build/tech/html/",
	__dirname + "/../a11ysupport.io/build/tech/css/",
	__dirname + "/../a11ysupport.io/build/tech/aria/",
	__dirname + "/../a11ysupport.io/build/tech/svg/",
];

paths.forEach((path) => {
	//passsing directoryPath and callback function
	fs.readdir(path, function (err, files) {
		if (err) {
			throw new Error(err);
		}

		files.forEach(function (fileName) {
			fs.readFile(path + fileName, (err, raw) => {
				if (err) {
					throw new Error(err);
				}

				const feature = convertFeature(JSON.parse(raw));
				const hasResults = !Object.values(Object.values(feature.stats))
					.map((i) => Object.values(i))
					.flat()
					.map((i) => Object.keys(i))
					.flat()
					.every((i) => i === "all");

				if (hasResults) {
					fs.writeFileSync(`${__dirname}/_features/${feature.category}-${fileName.split(".")[0]}.md`,
						`---
${JSON.stringify(feature, null, 2)}
---`
					);
				}
			});
		});
	});
});
