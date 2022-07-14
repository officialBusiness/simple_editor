
export default function initParagraphAndHeader(editorEnglish, editorChinese){
	let
		selected = document.getElementById('paragraphAndHeaderSelected'),
		selection = document.getElementById('paragraphAndHeaderSelection'),
		selections = selection.getElementsByClassName('selection');
	// console.log('selections:', selections);
	for( let i = selections.length - 1; i >= 0; i-- ){
		// console.log(`selections[${i}]:`, selections[i]);
		selections[i].onmousedown = ()=>{
			getBlockType(selections[i]);
		}
	}

	function getBlockType(dom){

		let editor = window.editor,
				type = dom.innerText,
				oldBlock = editor.nodeApi.getContainer( editor.range.startContainer ),
				preBlock = oldBlock.previousSibling,
				block;
		console.log(editor);
		switch (type){
			case 'h1':
			case 'h2':
			case 'h3':
			case 'h4':
				block = editor.getComponentDom({
					type: 'header',
					level: type,
				});
				break;
			case '正文':
				block = editor.getComponentDom({
					type: 'paragraph',
					level: type,
				});
				break;
		}
		editor.nodeApi.appendChildren(block, oldBlock.childNodes);
		if( preBlock ){
			editor.editorDom.appendChild(block);
		}else{
			editor.nodeApi.insertAfter(block, preBlock);
		}
		editor.editorDom.removeChild(oldBlock);
	}
}