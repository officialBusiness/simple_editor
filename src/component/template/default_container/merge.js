export default function merge( node, beMerged ){
	let 
		{ nodeApi, rangeApi } = this,
		startNode = nodeApi.getEndNode(node),
		endNode = nodeApi.getStartNode(beMerged);

	rangeApi.endNodeRange(node);
	nodeApi.appendChildren(node, beMerged.childNodes);
	nodeApi.removeNode(beMerged);
	if(startNode && startNode.nodeType === Node.TEXT_NODE &&
			endNode && endNode.nodeType === Node.TEXT_NODE){
		console.log('需要合并');
		node.normalize();//	合并前后 text
	}
}