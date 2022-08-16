export default function searchTree(obj, id) {
	if (obj._id === id) {
		return obj;
	} else if (obj.children) {
		let result = null;
		for (let i = 0; result === null && i < obj.children.length; i++) {
			result = searchTree(obj.children[i], id);
		}
		return result;
	}
	return null;
}
