export default class FolderTree {
	get tree() {
		return this._tree;
	}

	get workspaceFolder() {
		const folderIdPropName = this._folderIdProp;
		const wsFolder = this._tree.find(folder => this._isWorkspaceFolder(folder));
		return wsFolder && wsFolder[folderIdPropName];
	}

	get openFolders() {
		return this._openFolderIds;
	}

	set openFolders(openIds) {
		this._openFolderIds = openIds;
	}

	get activeFolders() {
		return this._activeFolderIds;
	}

	set activeFolders(activeIds) {
		this._activeFolderIds = activeIds;
	}

	constructor(folders, params = {}) {
		this._tree = [];
		this._foldersById = null;
		this._openFolderIds = params.openFolders || [];
		this._activeFolderIds = params.activeFolders || [];
		this._folderIdProp = params.folderIdProp || "_id";
		this._folderParentProp = params.folderParentProp || "folderId";
		this._createFolderMapFrom(folders);
		this._initFolderChildren();
		this._createTree();
		this.closeLeafFolders();
	}

	_createFolderMapFrom(folders) {
		const folderIdPropName = this._folderIdProp;
		const foldersByIdEntries = folders.map(folder => [folder[folderIdPropName], folder]);
		this._foldersById = new Map(foldersByIdEntries);
	}

	_initFolderChildren() {
		this._foldersById.forEach((folder) => {
			folder.children = [];
		});
	}

	_createTree() {
		const tempChildsNoParent = [];
		const folderParentPropName = this._folderParentProp;

		this._foldersById.forEach((folder) => {
			if (this._hasParent(folder)) {
				const parentFolder = this._parentOf(folder);
				parentFolder.children.push(folder);
			} else {
				if (folder[folderParentPropName] === null) {
					this._tree.push(folder);
					return;
				}
				tempChildsNoParent.push(folder);
			}
		});

		// If user has access to the 'real' root folder, add the dangling branches to that folder
		// else: add them outside
		const rootFolderIndex = this.tree.findIndex(folder => folder[folderParentPropName] === null);
		if (rootFolderIndex !== -1) {
			this._tree[rootFolderIndex].children = [...this._tree[rootFolderIndex].children, ...tempChildsNoParent];
		} else {
			this._tree = [...this._tree, ...tempChildsNoParent];
		}
	}

	_isWorkspaceFolder(folder) {
		const folderParentPropName = this._folderParentProp;
		// eslint-disable-next-line eqeqeq
		return !!folder && folder[folderParentPropName] == null;
	}

	_hasParent(folder) {
		const folderParentPropName = this._folderParentProp;
		return this._existsFolderWithId(folder[folderParentPropName]);
	}

	_existsFolderWithId(folderId) {
		return this._foldersById.has(folderId);
	}

	_parentOf(folder) {
		const folderParentPropName = this._folderParentProp;
		return this._folderWithId(folder[folderParentPropName]);
	}

	_folderWithId(folderId) {
		return this._foldersById.get(folderId);
	}

	closeLeafFolders() {
		this._openFolderIds = this._openFolderIds.filter((folderId) => {
			const folder = this._folderWithId(folderId);
			return !this._isLeafFolder(folder);
		});
	}

	_isLeafFolder(folder) {
		return folder.children.length === 0;
	}

	sort() {
		if (this.hasWorkspaceFolder()) {
			const treeWithoutWsFolder = this._tree.filter(folder => !this._isWorkspaceFolder(folder));
			const wsFolder = this._tree.find(folder => this._isWorkspaceFolder(folder));
			treeWithoutWsFolder.sort((folder1, folder2) => this._compareFolders(folder1, folder2));
			this._tree = [wsFolder, ...treeWithoutWsFolder];
		} else {
			this._tree.sort((folder1, folder2) => this._compareFolders(folder1, folder2));
		}

		this._tree.forEach((rootFolder) => {
			this._sortDescendantsOf(rootFolder);
		});
	}

	_compareFolders(folder1, folder2) {
		return folder1.name.localeCompare(folder2.name);
	}

	_sortDescendantsOf(folder) {
		folder.children.sort((folder1, folder2) => this._compareFolders(folder1, folder2));
		folder.children.forEach(child => this._sortDescendantsOf(child));
	}

	openFolder(toOpenId) {
		if (!this._existsFolderWithId(toOpenId)) {
			return;
		}
		const folder = this._folderWithId(toOpenId);
		if (!this._isFolderOpen(folder) && !this._isLeafFolder(folder)) {
			this._openFolderIds.push(toOpenId);
		}
	}

	_isFolderOpen(folder) {
		const folderIdPropName = this._folderIdProp;
		return this._openFolderIds.includes(folder[folderIdPropName]);
	}

	activateFolder(toActivateId) {
		this._activeFolderIds = this._existsFolderWithId(toActivateId) ? [ toActivateId ] : [];
	}

	pathToFolder(destinationId) {
		if (!this._existsFolderWithId(destinationId)) {
			return [];
		}
		const folderIdPropName = this._folderIdProp;
		const pathIdsExcludingDestination = [];
		let currentFolder = this._folderWithId(destinationId);
		while (this._hasParent(currentFolder)) {
			currentFolder = this._parentOf(currentFolder);
			pathIdsExcludingDestination.unshift(currentFolder[folderIdPropName]);
		}
		return pathIdsExcludingDestination;
	}

	isFolderAncestorOf(ancestorId, descendantId) {
		if (!this._existsFolderWithId(ancestorId) || !this._existsFolderWithId(descendantId)) {
			return false;
		}
		const pathToDescendant = this.pathToFolder(descendantId);
		return pathToDescendant.includes(ancestorId);
	}

	hasWorkspaceFolder() {
		return this._tree.some(folder => this._isWorkspaceFolder(folder));
	}

	isWorkspaceFolder(folderId) {
		const folder = this._folderWithId(folderId);
		return this._isWorkspaceFolder(folder);
	}

	levelOfFolder(folderId) {
		return this.pathToFolder(folderId).length;
	}

	depthOfSubtree(folderId) {
		const folder = this._folderWithId(folderId);
		return this._depthOfSubtree(folder);
	}

	_depthOfSubtree(folder) {
		if (this._isLeafFolder(folder)) {
			return 1;
		} else {
			const subtreeDepths = folder.children.map(child => this._depthOfSubtree(child));
			const maxSubtreeDepth = subtreeDepths.reduce((maxDepth, depth) => Math.max(maxDepth, depth));
			return 1 + maxSubtreeDepth;
		}
	}
}
