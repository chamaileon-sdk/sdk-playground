export default function (document) {
	return (
		"let emailDocument = JSON.parse('"
		+ JSON.stringify(document).replaceAll("\\", "\\\\").replaceAll("'", "\\'")
		+ "')"
	);
}
