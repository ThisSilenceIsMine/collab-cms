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
			order: node.order,
			value: value?.value ?? ''
		};

		gun.get(this.path).get(key).put(updated);
	}

	async getNodes(): Promise<Node[]> {
		const nodes: Node[] = [];

		await new Promise<void>((resolve) => {
			const timeout = setTimeout(() => {
				resolve();
			}, 500); // Set an appropriate timeout duration

			gun
				.get(this.path)
				.map()
				.once((node) => {
					if (node === null) return;

					nodes.push(node);
				})
				.once(() => {
					clearTimeout(timeout);
					resolve();
				});
		});

		nodes.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
		return nodes;
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
				// Handle node deletion
				if (node === null) {
					const idx = nodes.findIndex((n) => n.key === key);
					if (idx !== -1) nodes.splice(idx, 1);
					callback([...nodes].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
					return;
				}

				// Validate and update node
				const existingIndex = nodes.findIndex((n) => n.key === key);
				if (existingIndex !== -1) {
					nodes[existingIndex] = node;
				} else {
					nodes.push(node);
				}

				callback([...nodes].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
			});
	}

	async addNode(node: Partial<Omit<Node, 'key' | 'order'>>) {
		console.log('Adding node', node);
		const key = generateKey();

		const nodes = await this.getNodes();

		console.log({ nodes });
		const order = nodes.length;

		console.log('Adding node', { ...node, key, order });

		gun
			.get(this.path)
			.get(key)
			.put({ ...node, key, order });

		return key;
	}

	async removeNode(key: string) {
		gun.get(this.path).get(key).put(null);

		const nodes = await this.getNodes();
		const updatedNodes = nodes.filter((node) => node.key !== key);

		// Recalculate the order field for each remaining node
		for (let i = 0; i < updatedNodes.length; i++) {
			updatedNodes[i].order = i;

			gun.get(this.path).get(updatedNodes[i].key).put(updatedNodes[i]);
		}
	}
}
