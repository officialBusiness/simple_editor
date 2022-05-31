import * as rangApi from '../operation/range_api.js';
import * as nodeApi from '../editor_node/node_api.js';

function findOneChildNodeRoot(node){
	let root = node,
			parentNode = node.parentNode;
	while( parentNode.childNodes.length === 1
			&& nodeApi.isNotContainer(parentNode) ){
		root = parentNode;
		parentNode = root.parentNode;
	}
	return root;
}

export function deleteOne(node, offset){
	console.log('node:', node, 'offset:', offset);
	if( node.nodeType === 3 ){
		if( offset > 1 || (offset === 1 && node.length > 1) ){//	正常删除一个字符
			rangApi.setCollapsedRange(node, offset - 1);
			node.deleteData(offset - 1, 1);
		}else if( offset === 1 && node.length === 1 ){//	text 删空
			console.log('快要删空了');
			let oneChildNodeRoot = findOneChildNodeRoot(node);
			console.log(oneChildNodeRoot);
			// nodeApi.removeNode(oneChildNodeRoot);
		}else if( offset === 0 ){//	在 text 头部
			console.log('在 text 头部')
		}else{//	不知道的特殊情况
			console.error('不知道的特殊情况');
		}
	}
}

export function deleteRange(){

}