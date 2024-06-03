export type NodeType = (typeof NodeType)[keyof typeof NodeType];

export const NodeType = {
	text: 'text',
	title: 'title',
	// breadcrumb: 'breadcrumbs', TODO: Implement breadcrumbs node
	//image: 'image', TODO: Implement image node
	link: 'link'
} as const;
