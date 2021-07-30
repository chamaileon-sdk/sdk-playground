export default function (map, bls) {
	let str = "";

	for (let bl of bls) {
		str += `blockLibraryData.set("${bl.id}", JSON.parse("${JSON.stringify(
			map[bl.id]
		)
			.replaceAll("\\", "\\\\")
			.replaceAll(/"/g, "\\\"")}"));\n`;
	}

	return str;
}
