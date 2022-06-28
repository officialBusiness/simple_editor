
export default {
	"blocks":[
		{
			"type":"header",
			"level":"h1",
			"data":"一种绘制有向图的技术"
		},
		{
			"type":"paragraph",
			"data":[
				{
					"type":"text",
					"data":"我们描述了一个绘制有向图的四步算法。第一步使用网络单纯形算法找到最优秩分配。第二步通过引入新的权重函数和局部变换来减少交叉，通过迭代启发式方法来确定秩内顶点的顺序。第三步通过构造辅助图并对其进行排序来找到节点的最佳坐标。第四道工序制作样条来绘制边缘。该算法绘图效果好，运行速度快。"
				}
			]
		}
	]
}