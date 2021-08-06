let bulletproofLineLength = require("bulletproofLineLength");

export default function (doc, size, lineLength = 799) {
	let el = document.createElement("html");
	el.innerHTML = doc;

	let ni = document.createNodeIterator(
		el.getElementsByTagName("body")[0],
		NodeFilter.SHOW_COMMENT,
		() => NodeFilter.FILTER_ACCEPT
	);

	el.querySelector("head").remove();
	el.querySelectorAll("style").forEach((c) => c.remove());

	let out =
		"<!--\nNote: this page only contains some snippets to showcase how each setting works. For the full output see \"HTML Output\" tab \n-->\n\n";

	out += `<span> Size of whole document: ${size} </span>\n\n`;

	el.getElementsByTagName("*").forEach((c) => {
		if (c.style.backgroundImage) {
			out += "<!-- VML background & Presentation role -->\n\n";

			let curNode = ni.nextNode();
			while (curNode && !curNode.nodeValue.match("src="))
				curNode = ni.nextNode();

			if (curNode) {
				out += `<!--${curNode.textContent.replaceAll("\n", " ")}-->\n`;
			}

			let d = c.cloneNode(true);
			d.innerHTML = "\n\t...\n";

			out += d.outerHTML;
		}
	});

	let directiveNode = el.getElementsByTagName("td");
	if (directiveNode.length > 1) {
		directiveNode = directiveNode[0].cloneNode(true);
		directiveNode.removeChild(directiveNode.querySelector("table"));

		out += "\n\n<!-- Templating language -->\n\n";
		out += directiveNode.outerHTML.replace("\n\n", "\n");

		out += "\n\n<!-- Encode URL & Minimal buttons & Hexadecimal colors -->\n\n";

		el.getElementsByTagName("a").forEach((c) => {
			if (c.hasAttribute("class")) {
				out += "<!--[if !mso]><!-- -->\n";
				out += c.outerHTML;
				out += "\n<!--<![endif]-->\n\n";
			} else {
				out += c.outerHTML;
			}
		});
	}

	return bulletproofLineLength(out, lineLength);
}
