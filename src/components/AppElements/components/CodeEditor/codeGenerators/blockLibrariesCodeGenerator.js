export default function (map, bls) {
	let str = "";

	for (const bl of bls) {
		str += `blockLibraryData.set("${bl.id}", JSON.parse('${JSON.stringify(
			map[bl.id],
		).replaceAll("\\", "\\\\")}'));\n`;
	}

	return str;
}
