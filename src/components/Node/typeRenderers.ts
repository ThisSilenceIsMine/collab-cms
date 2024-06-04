import { NodeType } from '../../lib/Node/nodeType';

const editComponents = import.meta.glob<
	true,
	string,
	{ default: ConstructorOfATypedSvelteComponent }
>('./**/Edit.svelte', { eager: true });

const viewComponents = import.meta.glob<
	true,
	string,
	{ default: ConstructorOfATypedSvelteComponent }
>('./**/Render.svelte', { eager: true });

const nodeTypes = Object.keys(NodeType);

type TypeRenderer = {
	edit: ConstructorOfATypedSvelteComponent;
	view: ConstructorOfATypedSvelteComponent;
};

export const typeRenderers: Record<NodeType, TypeRenderer> = nodeTypes.reduce(
	(acc, type) => {
		const edit = Object.entries(editComponents).find(([key]) =>
			key.toLowerCase().includes(type.toLowerCase())
		)?.[1]?.default;

		const view = Object.entries(viewComponents).find(([key]) =>
			key.toLowerCase().includes(type.toLowerCase())
		)?.[1]?.default;
		return { ...acc, [type]: { edit, view } };
	},
	{} as Record<NodeType, TypeRenderer>
);

export const getTypeEdit = (type: NodeType) => typeRenderers[type].edit;

export const getTypeView = (type: NodeType) => typeRenderers[type].view;
