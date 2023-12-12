import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
  /**
   * 构造树形结构数据
   */
  public handleTree(data: any[], id?: string, parentId?: string, children?: string) {
    const config = {
      id: id || 'id',
      parentId: parentId || 'parentId',
      childrenList: children || 'children',
    };

    const childrenListMap: any = {};
    const nodeIds: any = {}
    const tree = [];

    for (const d of data) {
      const parentId = d[config.parentId];
      if (childrenListMap[parentId] == null) {
        childrenListMap[parentId] = [];
      }
      nodeIds[d[config.id]] = d;
      childrenListMap[parentId].push(d);
    }

    for (const d of data) {
      const parentId = d[config.parentId];
      if (nodeIds[parentId] == null) {
        tree.push(d);
      }
    }

    for (const t of data) {
      adaptToChildrenList(t);
    }

    function adaptToChildrenList(o: any) {
      // 如果o的配置id在childrenListMap中存在不为null的映射关系
      if (childrenListMap[o[config.id]] !== null) {
        // 将o的配置childrenList属性赋值为childrenListMap中o的配置id的映射值
        o[config.childrenList] = childrenListMap[o[config.id]];
      }
      // 如果o的配置childrenList属性存在
      if (o[config.childrenList]) {
        // 对o的配置childrenList属性中的每一个元素c执行以下操作
        for (const c of o[config.childrenList]) {
          // 调用adaptToChildrenList函数对c进行递归操作
          adaptToChildrenList(c);
        }
      }
    }

    return tree
  }
}