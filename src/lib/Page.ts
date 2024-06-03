import type { Node } from './Node/node';
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

	async getNode(key: string): Promise<Node> {
		return new Promise((resolve) => {
			gun.get(this.path).get(key).once(resolve);
		});
	}

	async updateNode(key: string, value: Partial<Node>) {
		const node = await this.getNode(key);
		const updated: Node = {
			key: node.key,
			type: node.type,
			value: value?.value ?? ''
		};

		gun.get(this.path).get(key).put(updated);
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

	trackNode(key: string, callback: (node: Node) => void) {
		gun.get(this.path).get(key).on(callback);
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

	addNode(node: Partial<Omit<Node, 'key'>>) {
		const key = generateKey();

		gun
			.get(this.path)
			.get(key)
			.put({ ...node, key });

		return key;
	}

	removeNode(key: string) {
		gun.get(this.path).get(key).put(null);
	}
}
