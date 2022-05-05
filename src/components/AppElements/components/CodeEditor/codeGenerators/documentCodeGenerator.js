export default function (document) {
	return (
		"let document = JSON.parse('"
		+ JSON.stringify(document, null, "\t").replaceAll("\\", "\\\\").replaceAll("'", "\\'")
		+ "')"
	);
}
