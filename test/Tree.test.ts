import { expect } from "chai";
import Tree from "../src/Tree/Tree";
import TreeNode from "../src/Tree/TreeNode";

describe("Tree", function () {
  describe("#constructor", function () {
    it("creates root node", function () {
      const tree = new Tree<number>();

      expect(tree.root.parent).to.be.null;
      expect(tree.root.children).to.be.undefined;
      expect(tree.root.data).to.be.undefined;
    });

    it("initializes root data to not empty if data is provided", function () {
      const tree = new Tree<number>(42);

      expect(tree.root.data).to.be.equal(42);
    });
  });

  describe("#insertAtRootEnd()", function () {
    it("inserts under the root as a last child", function () {
      const tree = new Tree<number>(1);
      tree.insertAtRootEnd(23);
      tree.insertAtRootEnd(17);
      tree.insertAtRootEnd(42);

      const childData = Array.from(tree.root.childrenIterator()).map((node) => node.data);
      const expectedChildData = [23, 17, 42];

      const dfsGraphData = Array.from(tree.DFS()).map((node) => node[0].data);
      const expectedDFSGraphData = [1, 23, 17, 42];

      expect(childData).to.be.deep.equal(expectedChildData);
      expect(dfsGraphData).to.be.deep.equal(expectedDFSGraphData);
    });
  });

  describe("#insertAtRootStart()", function () {
    it("inserts under the root as a first child", function () {
      const tree = new Tree<number>(1);
      tree.insertAtRootStart(23);
      tree.insertAtRootStart(17);
      tree.insertAtRootStart(42);

      const childData = Array.from(tree.root.childrenIterator()).map((node) => node.data);
      const expectedChildData = [42, 17, 23];

      const dfsGraphData = Array.from(tree.DFS()).map((node) => node[0].data);
      const expectedDFSGraphData = [1, 42, 17, 23];

      expect(childData).to.be.deep.equal(expectedChildData);
      expect(dfsGraphData).to.be.deep.equal(expectedDFSGraphData);
    });
  });

  describe("#insertAtNodeEnd()", function () {
    it("inserting at the root is equivalent to #insertAtRootEnd()", function () {
      const tree = new Tree<number>(1);
      tree.insertAtNodeEnd(tree.root, 23);
      tree.insertAtNodeEnd(tree.root, 17);
      tree.insertAtNodeEnd(tree.root, 42);

      const childData = Array.from(tree.root.childrenIterator()).map((node) => node.data);
      const expectedChildData = [23, 17, 42];

      const dfsGraphData = Array.from(tree.DFS()).map((node) => node[0].data);
      const expectedDFSGraphData = [1, 23, 17, 42];

      expect(childData).to.be.deep.equal(expectedChildData);
      expect(dfsGraphData).to.be.deep.equal(expectedDFSGraphData);
    });

    it("inserts under a child of root", function () {
      const tree = new Tree<number>(1);

      tree.insertAtNodeEnd(tree.root, 23);
      tree.insertAtNodeEnd(tree.root, 17);
      const child = tree.insertAtNodeEnd(tree.root, 42);

      tree.insertAtNodeEnd(child, 72);
      tree.insertAtNodeEnd(child, 172);

      const childData = Array.from(child.childrenIterator()).map((node) => node.data);
      const expectedChildData = [72, 172];

      const dfsGraphData = Array.from(tree.DFS()).map((node) => node[0].data);
      const expectedDFSGraphData = [1, 23, 17, 42, 72, 172];

      expect(childData).to.be.deep.equal(expectedChildData);
      expect(dfsGraphData).to.be.deep.equal(expectedDFSGraphData);
    });
  });

  describe("#insertAtNodeStart()", function () {
    it("inserting at the root is equivalent to  #insertAtRootStart()", function () {
      const tree = new Tree<number>(1);
      tree.insertAtNodeStart(tree.root, 23);
      tree.insertAtNodeStart(tree.root, 17);
      tree.insertAtNodeStart(tree.root, 42);

      const childData = Array.from(tree.root.childrenIterator()).map((node) => node.data);
      const expectedChildData = [42, 17, 23];

      const dfsGraphData = Array.from(tree.DFS()).map((node) => node[0].data);
      const expectedDFSGraphData = [1, 42, 17, 23];

      expect(childData).to.be.deep.equal(expectedChildData);
      expect(dfsGraphData).to.be.deep.equal(expectedDFSGraphData);
    });

    it("inserts under a child of root", function () {
      const tree = new Tree<number>(1);

      tree.insertAtNodeEnd(tree.root, 23);
      tree.insertAtNodeEnd(tree.root, 17);
      const child = tree.insertAtNodeEnd(tree.root, 42);

      tree.insertAtNodeStart(child, 72);
      tree.insertAtNodeStart(child, 172);

      const childData = Array.from(child.childrenIterator()).map((node) => node.data);
      const expectedChildData = [172, 72];

      const dfsGraphData = Array.from(tree.DFS()).map((node) => node[0].data);
      const expectedDFSGraphData = [1, 23, 17, 42, 172, 72];

      expect(childData).to.be.deep.equal(expectedChildData);
      expect(dfsGraphData).to.be.deep.equal(expectedDFSGraphData);
    });
  });

  describe("#moveAfterNode()", function () {
    it("moves whole subtree on the right side of a leaf node", function () {
      const tree = new Tree<number>(1);

      tree.insertAtNodeEnd(tree.root, 2);
      const node1 = tree.insertAtNodeEnd(tree.root, 3);
      tree.insertAtNodeEnd(tree.root, 8);
      const node2 = tree.insertAtNodeEnd(tree.root, 5);

      const node3 = tree.insertAtNodeEnd(node1, 4);
      tree.insertAtNodeEnd(node2, 6);
      tree.insertAtNodeEnd(node2, 7);

      tree.moveAfterNode(node2, node3);

      const dfsGraphData = Array.from(tree.DFS()).map((node) => node[0].data);
      const expectedDFSGraphData = [1, 2, 3, 4, 5, 6, 7, 8];

      expect(dfsGraphData).to.be.deep.equal(expectedDFSGraphData);
    });
  });

  describe("#moveBeforeNode()", function () {
    it("moves whole subtree on the left side of a leaf node", function () {
      const tree = new Tree<number>(1);

      tree.insertAtNodeEnd(tree.root, 2);
      const node1 = tree.insertAtNodeEnd(tree.root, 3);
      tree.insertAtNodeEnd(tree.root, 8);
      const node2 = tree.insertAtNodeEnd(tree.root, 4);

      const node3 = tree.insertAtNodeEnd(node1, 7);
      tree.insertAtNodeEnd(node2, 5);
      tree.insertAtNodeEnd(node2, 6);

      tree.moveBeforeNode(node2, node3);

      const dfsGraphData = Array.from(tree.DFS()).map((node) => node[0].data);
      const expectedDFSGraphData = [1, 2, 3, 4, 5, 6, 7, 8];

      expect(dfsGraphData).to.be.deep.equal(expectedDFSGraphData);
    });
  });

  describe("#insertAfterNode()", function () {
    it("throws exception when inserting after the root", function () {
      const tree = new Tree<number>(1);

      expect(() => tree.insertAfterNode(tree.root, 23)).to.throw("You cannot insert after the root in a tree, since it has no parent!");
    });

    it("does not throw exception when inserting after a non-root node", function () {
      const tree = new Tree<number>(1);
      const node = tree.insertAtRootEnd(42);

      expect(() => tree.insertAfterNode(node, 23)).not.to.throw();
    });

    it("inserts on the right side of a node", function () {
      const tree = new Tree<number>(1);

      tree.insertAtNodeEnd(tree.root, 2);
      const node1 = tree.insertAtNodeEnd(tree.root, 3);
      tree.insertAtNodeEnd(tree.root, 6);

      const node3 = tree.insertAtNodeEnd(node1, 4);
      tree.insertAfterNode(node3, 5);

      const dfsGraphData = Array.from(tree.DFS()).map((node) => node[0].data);
      const expectedDFSGraphData = [1, 2, 3, 4, 5, 6];

      expect(dfsGraphData).to.be.deep.equal(expectedDFSGraphData);
    });
  });

  describe("#insertBeforeNode()", function () {
    it("throws exception when inserting after the root", function () {
      const tree = new Tree<number>(1);

      expect(() => tree.insertBeforeNode(tree.root, 23)).to.throw("You cannot insert before the root in a tree, since it has no parent!");
    });

    it("does not throw exception when inserting after a non-root node", function () {
      const tree = new Tree<number>(1);
      const node = tree.insertAtRootEnd(42);

      expect(() => tree.insertBeforeNode(node, 23)).not.to.throw();
    });

    it("inserts on the left side of a node", function () {
      const tree = new Tree<number>(1);

      tree.insertAtNodeEnd(tree.root, 2);
      const node1 = tree.insertAtNodeEnd(tree.root, 3);
      tree.insertAtNodeEnd(tree.root, 6);

      const node2 = tree.insertAtNodeEnd(node1, 5);
      tree.insertBeforeNode(node2, 4);

      const dfsGraphData = Array.from(tree.DFS()).map((node) => node[0].data);
      const expectedDFSGraphData = [1, 2, 3, 4, 5, 6];

      expect(dfsGraphData).to.be.deep.equal(expectedDFSGraphData);
    });
  });

  describe("#delete()", function () {
    it("throws expection when deleting the root node", function () {
      const tree = new Tree<number>();

      expect(() => tree.deleteNode(tree.root)).to.throw("You cannot delete the root in a tree.");
    });

    it("deletes subtree under a non-root node", function () {
      const tree = new Tree<number>(1);

      tree.insertAtNodeEnd(tree.root, 2);
      const node1 = tree.insertAtNodeEnd(tree.root, 3);
      tree.insertAtNodeEnd(tree.root, 8);
      const node2 = tree.insertAtNodeEnd(tree.root, 4);

      tree.insertAtNodeEnd(node1, 7);
      tree.insertAtNodeEnd(node2, 5);
      tree.insertAtNodeEnd(node2, 6);

      tree.deleteNode(node2);

      const dfsGraphData = Array.from(tree.DFS()).map((node) => node[0].data);
      const expectedDFSGraphData = [1, 2, 3, 7, 8];

      expect(dfsGraphData).to.be.deep.equal(expectedDFSGraphData);
    });
  });

  describe("#duplicateNode()", function () {
    it("throws exception when duplicating root", function () {
      const tree = new Tree<number>(1);

      expect(() => tree.duplicateNode(tree.root)).to.throw("You cannot duplicate the root in a tree.");
    });

    it("the original and the copy are independent", function () {
      const tree = new Tree<number>(1);

      const node = tree.insertAtRootEnd(2);
      tree.insertAtRootEnd(4);

      const duped = tree.duplicateNode(node);

      expect(node).to.be.not.equal(duped);
    });

    it("duplicates whole subtree", function () {
      const tree = new Tree<number>(1);

      tree.insertAtRootEnd(2);
      const node1 = tree.insertAtRootEnd(3);
      tree.insertAtRootEnd(8);

      const node2 = tree.insertAtNodeEnd(node1, 4);
      tree.insertAtNodeEnd(node1, 7);

      tree.insertAtNodeEnd(node2, 5);
      tree.insertAtNodeEnd(node2, 6);

      tree.duplicateNode(node1);

      const dfsGraphData = Array.from(tree.DFS()).map((node) => node[0].data);
      const expectedDFSGraphData = [1, 2, 3, 4, 5, 6, 7, 3, 4, 5, 6, 7, 8];

      expect(dfsGraphData).to.be.deep.equal(expectedDFSGraphData);
    });
  });
});
