import type { Node } from './Node/node';
import type { NodeType } from './Node/nodeType';
import { generateKey } from './generateKey';
import { gun } from './gun';

export class Page {
	path: string;

	constructor(path: string) {
		this.path = path;
	}

	setPath(path: string) {
		this.path = path;
	}

	async getNodes(): Promise<Node[]> {
		return new Promise((resolve) => {
			const nodes: Node[] = [];

			gun
				.get(this.path)
				.map()
				.once((node) => {
					if (node === null) return;

					nodes.push(node);
				})
				.once(() => {
					resolve(nodes);
				});
		});
	}

	subscribeToNodes(callback: (nodes: Node[]) => void) {
		const nodes: Node[] = [];

		gun
			.get(this.path)
			.map()
			.on((node, key) => {
				//handle node deletion
				if (node === null) {
					const idx = nodes.findIndex((n) => n.key === key);
					if (idx !== -1) nodes.splice(idx, 1);
					callback(nodes);

					return;
				}

				//validate node
				if (!node || typeof node !== 'object' || nodes.find((n) => n.key === key)) return;

				nodes.push(node);
				callback(nodes);
			});
	}

	addNode(type: NodeType) {
		const key = generateKey();
		const emptyNode: Node = {
			type,
			key,
			value: ''
		};

		gun.get(this.path).get(key).put(emptyNode);

		return key;
	}

	removeNode(key: string) {
		gun.get(this.path).get(key).put(null);
	}
}
