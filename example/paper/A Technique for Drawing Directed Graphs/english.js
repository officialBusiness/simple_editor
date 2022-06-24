
export default {
	"blocks":[
		{
			"type":"header",
			"level":"h1",
			"data":"A Technique for Drawing Directed Graphs"
		},
		{
			"type":"paragraph",
			"data":[
				{
					"type":"text",
					"data":"We describe a four-pass algorithm for drawing directed graphs. The first pass finds an optimal rank assignment using a network simplex algorithm. The second pass sets the vertex order within ranks by an iterative heuristic incorporating a novel weight function and local transpositions to reduce crossings. The third pass finds optimal coordinates for nodes by constructing and ranking an auxiliary graph. The fourth pass makes splines to draw edges. The algorithm makes good drawings and runs fast."
				}
			]
		}
	]
}