export default function mergeNode( merge, beMerged ){
	// console.log('merge:', merge);
	// console.log('beMerged:', beMerged);
	let 
		{ nodeApi, rangeApi } = this,
		startNode = nodeApi.getEndNode(merge),
		endNode = nodeApi.getStartNode(beMerged);

	rangeApi.endNodeRange(merge);
	nodeApi.appendChildren(merge, beMerged.childNodes);
	nodeApi.removeNode(beMerged);
	if(startNode && startNode.nodeType === Node.TEXT_NODE &&
			endNode && endNode.nodeType === Node.TEXT_NODE){
		console.log('存在需要合并的 text');
		merge.normalize();//	合并前后 text
	}
}