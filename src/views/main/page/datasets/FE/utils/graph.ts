import { GraphEdge, GraphNode } from '@vue-flow/core';

class UnionFind {
  private readonly parent: { [key: string]: string };
  private readonly size: { [key: string]: number };

  constructor(nodes: GraphNode[]) {
    this.parent = {};
    this.parent = {};
    this.size = {};
    nodes.forEach((node) => {
      this.parent[node.id] = node.id; // 初始化时，每个节点的父节点是它自己
      this.size[node.id] = 1; // 初始时每个节点的树大小为 1
    });
  }

  // 查找节点x的根节点
  find(e: string): string {
    if (this.parent[e] === e) {
      return e;
    }

    // 路径压缩优化
    this.parent[e] = this.find(this.parent[e]);
    return this.parent[e];
  }

  // 更新 union 方法添加按秩合并
  union(x: string, y: string) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX !== rootY) {
      // 将较小的树的根节点连接到较大的树的根节点
      if (this.size[rootX] < this.size[rootY]) {
        this.parent[rootX] = rootY;
        this.size[rootY] += this.size[rootX];
      } else {
        this.parent[rootY] = rootX;
        this.size[rootX] += this.size[rootY];
      }
    }
  }
}

/**
 * 检查图是否是连通且无环的
 * @param {GraphNode[]} nodes - 图的节点们
 * @param {GraphEdge[]} edges - 图的边们
 * @returns {boolean} - 如果图连通且无环返回 true ，否则返回 false
 */
export function isConnectedGraphWithNoLoop(nodes: GraphNode[], edges: GraphEdge[]): boolean {
  const uf = new UnionFind(nodes);

  let edgeCausesLoop: GraphEdge | null = null;

  // 如果两个顶点已经在同一个集合中，则表示添加这条边将形成环
  for (let i = 0; i < edges.length; i += 1) {
    const edge = edges[i];

    if (uf.find(edge.source) !== uf.find(edge.target)) {
      uf.union(edge.source, edge.target);
    } else {
      edgeCausesLoop = edge;
      break;
    }
  }

  // 如果有环，打印输出该环并返回false
  if (edgeCausesLoop) {
    // console.log(`Found loop with edge: ${JSON.stringify(edgeCausesLoop)}`);
    return false;
  }

  // 确认是否所有节点都连接在了一起（即检查是否所有节点都共享同一个根节点）
  const root = uf.find(nodes[0].id);
  return nodes.every((node) => uf.find(node.id) === root);
}
