import { expect } from "chai";
import DoubleLinkedList from "../src/DoubleLinkedList/DoubleLinkedList";
import DoubleLinkedListNode from "../src/DoubleLinkedList/DoubleLinkedListNode";

describe("DoubleLinkedList", function () {
  describe("#constructor()", function () {
    it("initializes to empty if no data is provided", function () {
      const list = new DoubleLinkedList<number>();

      expect(list.size).to.be.equal(0);
      expect(list.head).to.be.null;
      expect(list.tail).to.be.null;
    });

    it("initializes to not empty if data is provided", function () {
      const list = new DoubleLinkedList<number>(2);

      expect(list.size).to.be.equal(1);
      expect(list.head).to.be.not.null;
      expect(list.tail).to.be.not.null;
    });
  });

  describe("#insertAtTail()", function () {
    it("adds elements to the end", function () {
      const list = new DoubleLinkedList<number>();

      const expectedElements = [2, -7, 42, 23];

      expectedElements.forEach((element) => list.insertAtTail(element));
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });

    it("adds elements after the initial element", function () {
      const list = new DoubleLinkedList<number>(72);

      const expectedElements = [2, -7, 42, 23];

      expectedElements.forEach((element) => list.insertAtTail(element));
      // The Array.from() works because the DoubleLinkedList implements the iterator
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal([72, ...expectedElements]);
      expect(list.size).to.be.equal(expectedElements.length + 1);
    });
  });

  describe("#insertAtHead()", function () {
    it("adds elements to the beginning", function () {
      const list = new DoubleLinkedList<number>();

      const expectedElements = [2, -7, 42, 23];

      expectedElements.forEach((element) => list.insertAtHead(element));
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements.reverse());
      expect(list.size).to.be.equal(expectedElements.length);
    });

    it("adds elements before the initial element", function () {
      const list = new DoubleLinkedList<number>(72);

      const expectedElements = [2, -7, 42, 23];

      expectedElements.forEach((element) => list.insertAtHead(element));
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal([...expectedElements.reverse(), 72]);
      expect(list.size).to.be.equal(expectedElements.length + 1);
    });
  });

  describe("#reverse()", function () {
    it("reverses the list", function () {
      const list = new DoubleLinkedList<number>();

      const expectedElements = [2, -7, 42, 23];

      expectedElements.forEach((element) => list.insertAtTail(element));
      list.reverse();
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements.reverse());
      expect(list.size).to.be.equal(expectedElements.length);
    });
  });

  describe("#clear()", function () {
    it("empties the list", function () {
      const list = new DoubleLinkedList<number>();

      const expectedElements = [2, -7, 42, 23];

      expectedElements.forEach((element) => list.insertAtTail(element));
      list.clear();

      expect(list.size).to.be.equal(0);
      expect(list.head).to.be.null;
      expect(list.tail).to.be.null;
    });
  });

  describe("#insertAfter()", function () {
    it("inserts in the middle after an element", function () {
      const list = new DoubleLinkedList<number>();

      list.insertAtTail(2);
      list.insertAtTail(-7);
      const reference = list.insertAtTail(42);
      list.insertAtTail(23);

      list.insertAfter(reference, -117);

      const expectedElements = [2, -7, 42, -117, 23];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });

    it("inserts after the tail", function () {
      const list = new DoubleLinkedList<number>(42);

      list.insertAfter(list.tail as DoubleLinkedListNode<number>, -117);

      const expectedElements = [42, -117];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });
  });

  describe("#insertBefore()", function () {
    it("inserts in the middle before an element", function () {
      const list = new DoubleLinkedList<number>();

      list.insertAtTail(2);
      list.insertAtTail(-7);
      const reference = list.insertAtTail(42);
      list.insertAtTail(23);
      list.insertBefore(reference, -117);

      const expectedElements = [2, -7, -117, 42, 23];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });

    it("inserts before the head", function () {
      const list = new DoubleLinkedList<number>(42);

      list.insertBefore(list.head as DoubleLinkedListNode<number>, -117);

      const expectedElements = [-117, 42];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });
  });

  describe("#delete()", function () {
    it("removes element from the middle", function () {
      const list = new DoubleLinkedList<number>();

      list.insertAtTail(2);
      list.insertAtTail(-7);
      const toBeDeleted = list.insertAtTail(42);
      list.insertAtTail(23);

      list.delete(toBeDeleted);

      const expectedElements = [2, -7, 23];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });

    it("removes element from the beginning", function () {
      const list = new DoubleLinkedList<number>();

      list.insertAtTail(2);
      list.insertAtTail(-7);
      list.insertAtTail(42);
      list.insertAtTail(23);

      list.delete(list.head as DoubleLinkedListNode<number>);

      const expectedElements = [-7, 42, 23];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });

    it("removes element from the end", function () {
      const list = new DoubleLinkedList<number>();

      list.insertAtTail(2);
      list.insertAtTail(-7);
      list.insertAtTail(42);
      list.insertAtTail(23);

      list.delete(list.tail as DoubleLinkedListNode<number>);

      const expectedElements = [2, -7, 42];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });
  });

  describe("#swap()", function () {
    it("swaps two elements in the middle", function () {
      const list = new DoubleLinkedList<number>();

      list.insertAtTail(2);
      const node1 = list.insertAtTail(-7);
      list.insertAtTail(42);
      const node2 = list.insertAtTail(23);
      list.insertAtTail(72);

      list.swap(node1, node2);

      const expectedElements = [2, 23, 42, -7, 72];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });

    it("swaps the head with an element", function () {
      const list = new DoubleLinkedList<number>();

      const node1 = list.insertAtTail(2);
      list.insertAtTail(-7);
      list.insertAtTail(42);
      const node2 = list.insertAtTail(23);
      list.insertAtTail(72);

      list.swap(node1, node2);

      const expectedElements = [23, -7, 42, 2, 72];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });

    it("swaps an element with the head", function () {
      const list = new DoubleLinkedList<number>();

      const node1 = list.insertAtTail(2);
      list.insertAtTail(-7);
      list.insertAtTail(42);
      const node2 = list.insertAtTail(23);
      list.insertAtTail(72);

      list.swap(node2, node1);

      const expectedElements = [23, -7, 42, 2, 72];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });

    it("swaps an element with the tail", function () {
      const list = new DoubleLinkedList<number>();

      list.insertAtTail(2);
      const node1 = list.insertAtTail(-7);
      list.insertAtTail(42);
      list.insertAtTail(23);
      const node2 = list.insertAtTail(72);

      list.swap(node1, node2);

      const expectedElements = [2, 72, 42, 23, -7];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });

    it("swaps the tail with an element", function () {
      const list = new DoubleLinkedList<number>();

      list.insertAtTail(2);
      const node1 = list.insertAtTail(-7);
      list.insertAtTail(42);
      list.insertAtTail(23);
      const node2 = list.insertAtTail(72);

      list.swap(node2, node1);

      const expectedElements = [2, 72, 42, 23, -7];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });

    it("swaps the head with the tail", function () {
      const list = new DoubleLinkedList<number>();

      const node1 = list.insertAtTail(2);
      list.insertAtTail(-7);
      list.insertAtTail(42);
      list.insertAtTail(23);
      const node2 = list.insertAtTail(72);

      list.swap(node1, node2);

      const expectedElements = [72, -7, 42, 23, 2];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });

    it("swaps the tail with the head", function () {
      const list = new DoubleLinkedList<number>();

      const node1 = list.insertAtTail(2);
      list.insertAtTail(-7);
      list.insertAtTail(42);
      list.insertAtTail(23);
      const node2 = list.insertAtTail(72);

      list.swap(node2, node1);

      const expectedElements = [72, -7, 42, 23, 2];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });
  });

  describe("#moveBefore()", function () {
    it("moves middle element in front of another middle element", function () {
      const list = new DoubleLinkedList<number>();

      list.insertAtTail(2);
      const node1 = list.insertAtTail(-7);
      list.insertAtTail(42);
      const node2 = list.insertAtTail(23);
      list.insertAtTail(72);

      list.moveBefore(node2, node1);

      const expectedElements = [2, 23, -7, 42, 72];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });

    it("moves middle element in front of the head", function () {
      const list = new DoubleLinkedList<number>();

      const node1 = list.insertAtTail(2);
      list.insertAtTail(-7);
      list.insertAtTail(42);
      const node2 = list.insertAtTail(23);
      list.insertAtTail(72);

      list.moveBefore(node2, node1);

      const expectedElements = [23, 2, -7, 42, 72];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });

    it("moves tail in front of middle element", function () {
      const list = new DoubleLinkedList<number>();

      list.insertAtTail(2);
      const node1 = list.insertAtTail(-7);
      list.insertAtTail(42);
      list.insertAtTail(23);
      const node2 = list.insertAtTail(72);

      list.moveBefore(node2, node1);

      const expectedElements = [2, 72, -7, 42, 23];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });

    it("moves tail in front of head", function () {
      const list = new DoubleLinkedList<number>();

      const node1 = list.insertAtTail(2);
      list.insertAtTail(-7);
      list.insertAtTail(42);
      list.insertAtTail(23);
      const node2 = list.insertAtTail(72);

      list.moveBefore(node2, node1);

      const expectedElements = [72, 2, -7, 42, 23];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });

    it("moving an element in front of itself", function () {
      const list = new DoubleLinkedList<number>();

      list.insertAtTail(2);
      list.insertAtTail(-7);
      const node = list.insertAtTail(42);
      list.insertAtTail(23);
      list.insertAtTail(72);

      list.moveBefore(node, node);

      const expectedElements = [2, -7, 42, 23, 72];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });
  });

  describe("moveAfter()", function () {
    it("moves middle element after another middle element", function () {
      const list = new DoubleLinkedList<number>();

      list.insertAtTail(2);
      const node1 = list.insertAtTail(-7);
      list.insertAtTail(42);
      const node2 = list.insertAtTail(23);
      list.insertAtTail(72);

      list.moveAfter(node1, node2);

      const expectedElements = [2, 42, 23, -7, 72];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });

    it("moves middle element after the tail", function () {
      const list = new DoubleLinkedList<number>();

      list.insertAtTail(2);
      const node1 = list.insertAtTail(-7);
      list.insertAtTail(42);
      list.insertAtTail(23);
      const node2 = list.insertAtTail(72);

      list.moveAfter(node1, node2);

      const expectedElements = [2, 42, 23, 72, -7];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });

    it("moves head after middle element", function () {
      const list = new DoubleLinkedList<number>();

      const node1 = list.insertAtTail(2);
      list.insertAtTail(-7);
      list.insertAtTail(42);
      const node2 = list.insertAtTail(23);
      list.insertAtTail(72);

      list.moveAfter(node1, node2);

      const expectedElements = [-7, 42, 23, 2, 72];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });

    it("moves head after tail", function () {
      const list = new DoubleLinkedList<number>();

      const node1 = list.insertAtTail(2);
      list.insertAtTail(-7);
      list.insertAtTail(42);
      list.insertAtTail(23);
      const node2 = list.insertAtTail(72);

      list.moveAfter(node1, node2);

      const expectedElements = [-7, 42, 23, 72, 2];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });

    it("moving an element after itself", function () {
      const list = new DoubleLinkedList<number>();

      list.insertAtTail(2);
      list.insertAtTail(-7);
      const node = list.insertAtTail(42);
      list.insertAtTail(23);
      list.insertAtTail(72);

      list.moveAfter(node, node);

      const expectedElements = [2, -7, 42, 23, 72];
      const elements = Array.from(list).map((value) => value?.data);

      expect(elements).to.be.deep.equal(expectedElements);
      expect(list.size).to.be.equal(expectedElements.length);
    });
  });
});
