import { NodeType } from './nodeType';

export interface Node {
	type: NodeType;
	key: string;
	value: string;
	order: number;
}
