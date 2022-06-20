
export default function initParagraphAndHeader(editor){
	let
		selected = document.getElementById('paragraphAndHeaderSelected'),
		selection = document.getElementById('paragraphAndHeaderSelection'),
		selections = selection.getElementsByClassName('selection');
	console.log('selections:', selections);
	for( let i = selections.length - 1; i >= 0; i-- ){
		console.log(`selections[${i}]:`, selections[i])
		selections[i].onmousedown = ()=>{
			let type = getBlockType(selections[i]);
			console.log(type);
			// console.log('selections[i]:', selections[i]);
		}
	}

	function getBlockType(dom){
		let type = dom.innerText;
		switch (type){
			case 'h1':
			case 'h2':
			case 'h3':
				editor.transformBlock(type);
				break;
			case '正文':
				editor.transformBlock('paragraph');
				break;
		}
		console.log('type:', type);
	}

}