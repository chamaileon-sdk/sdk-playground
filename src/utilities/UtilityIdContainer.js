export default function () {
	return new idContainer();
}

class idContainer {
	constructor() {
		this.ids = new Set();
		this.defaultId = 0;
	}

	addId = (id) => {
		if (this.ids.has(id)) throw "Id is already in the container";

		this.ids.add(id);
		this.defaultId++;
	};

	removeId = (id) => {
		if (!this.ids.has(id)) throw "Id is not in the container";

		this.ids.delete(id);
	};

	hasId = (id) => this.ids.has(id);

	getNextId = () => this.defaultId;
}
