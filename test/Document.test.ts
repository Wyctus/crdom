import { expect } from "chai";
import Document from "../src/Document/Document";

describe("Document", function () {
  describe("#constructor()", function () {
    it("sets name correctly", function () {
      const name = "My First Document";
      const document = new Document<string>(name, (c: string) => c);

      expect(document.name).to.be.equal(name);
    });
  });

  describe("#getBlockById()", function () {
    it("returns the correct block", function () {
      const document = new Document<string>("My First Document", (c: string) => c);

      const content = "First block";
      const documentId = document.insertBlockAtRootEnd({ content: content });
      const node = document.getBlockById(documentId);

      expect(node.data?.content).to.be.equal(content);
    });
  });

  describe("#insertBlockAtRootEnd()", function () {
    it("adds block under the root", function () {
      const document = new Document<string>("My First Document", (c: string) => c);
      const content = "First block";
      document.insertBlockAtRootEnd({ content: content });

      const blocks = Array.from(document.blockIterator());

      expect(blocks.length).to.be.equal(1);
      expect(blocks[0].content).to.be.equal(content);
    });

    it("adds block at the very end", function () {
      const document = new Document<string>("My First Document", (c: string) => c);

      const content1 = "First block";
      const content2 = "Second block";
      document.insertBlockAtRootEnd({ content: content1 });
      document.insertBlockAtRootEnd({ content: content2 });

      const blocks = Array.from(document.blockIterator());

      expect(blocks.length).to.be.equal(2);
      expect(blocks.map((b) => b.content)).to.be.deep.equal([content1, content2]);
    });
  });

  describe("#insertBlockAtRootStart()", function () {
    it("adds block under the root", function () {
      const document = new Document<string>("My First Document", (c: string) => c);
      const content = "First block";
      document.insertBlockAtRootStart({ content: content });

      const blocks = Array.from(document.blockIterator());

      expect(blocks.length).to.be.equal(1);
      expect(blocks[0].content).to.be.equal(content);
    });

    it("adds block at the start", function () {
      const document = new Document<string>("My First Document", (c: string) => c);

      const content1 = "First block";
      const content2 = "Second block";
      document.insertBlockAtRootStart({ content: content1 });
      document.insertBlockAtRootStart({ content: content2 });

      const blocks = Array.from(document.blockIterator());

      expect(blocks.length).to.be.equal(2);
      expect(blocks.map((b) => b.content)).to.be.deep.equal([content2, content1]);
    });
  });

  describe("#insertSubblockAtBlockEnd()", function () {
    it("inserts subblock under the block", function () {
      const document = new Document<string>("My First Document", (c: string) => c);

      const content1 = "First block";
      const content2 = "First subblock";
      const blockId = document.insertBlockAtRootStart({ content: content1 });
      document.insertSubblockAtBlockEnd(blockId, { content: content2 });

      const node = document.getBlockById(blockId);
      const children = Array.from(node.childrenIterator());

      expect(children.length).to.be.equal(1);
      expect(children.map((c) => c.data?.content)).to.be.deep.equal([content2]);
    });

    it("inserts subblock at the very end", function () {
      const document = new Document<string>("My First Document", (c: string) => c);

      const content1 = "First block";
      const content2 = "First subblock";
      const content3 = "Second subblock";
      const blockId = document.insertBlockAtRootStart({ content: content1 });
      document.insertSubblockAtBlockEnd(blockId, { content: content2 });
      document.insertSubblockAtBlockEnd(blockId, { content: content3 });

      const node = document.getBlockById(blockId);
      const children = Array.from(node.childrenIterator());

      expect(children.length).to.be.equal(2);
      expect(children.map((c) => c.data?.content)).to.be.deep.equal([content2, content3]);
    });
  });

  describe("#insertSubblockAtBlockStart()", function () {
    it("inserts subblock under the block", function () {
      const document = new Document<string>("My First Document", (c: string) => c);

      const content1 = "First block";
      const content2 = "First subblock";
      const blockId = document.insertBlockAtRootStart({ content: content1 });
      document.insertSubblockAtBlockStart(blockId, { content: content2 });

      const node = document.getBlockById(blockId);
      const children = Array.from(node.childrenIterator());

      expect(children.length).to.be.equal(1);
      expect(children.map((c) => c.data?.content)).to.be.deep.equal([content2]);
    });

    it("inserts subblock at the start", function () {
      const document = new Document<string>("My First Document", (c: string) => c);

      const content1 = "First block";
      const content2 = "First subblock";
      const content3 = "Second subblock";
      const blockId = document.insertBlockAtRootStart({ content: content1 });
      document.insertSubblockAtBlockStart(blockId, { content: content2 });
      document.insertSubblockAtBlockStart(blockId, { content: content3 });

      const node = document.getBlockById(blockId);
      const children = Array.from(node.childrenIterator());

      expect(children.length).to.be.equal(2);
      expect(children.map((c) => c.data?.content)).to.be.deep.equal([content3, content2]);
    });
  });

  describe("#insertBlockBeforeBlock()", function () {
    it("inserts before the block", function () {
      const document = new Document<string>("My First Document", (c: string) => c);

      const content1 = "First block";
      const content2 = "Second block";
      const blockId = document.insertBlockAtRootStart({ content: content1 });
      document.insertBlockBeforeBlock(blockId, { content: content2 });

      const children = Array.from(document.blockIterator());

      expect(children.length).to.be.equal(2);
      expect(children.map((c) => c.content)).to.be.deep.equal([content2, content1]);
    });
  });

  describe("#insertBlockAfterBlock()", function () {
    it("inserts after the block", function () {
      const document = new Document<string>("My First Document", (c: string) => c);

      const content1 = "First block";
      const content2 = "Second block";
      const blockId = document.insertBlockAtRootStart({ content: content1 });
      document.insertBlockAfterBlock(blockId, { content: content2 });

      const children = Array.from(document.blockIterator());

      expect(children.length).to.be.equal(2);
      expect(children.map((c) => c.content)).to.be.deep.equal([content1, content2]);
    });
  });

  describe("#moveBlockAfterBlock()", function () {
    it("moves block after a sibling", function () {
      const document = new Document<string>("My First Document", (c: string) => c);

      const content1 = "First block";
      const content2 = "Second block";
      const content3 = "Third block";
      const id1 = document.insertBlockAtRootEnd({ content: content1 });
      document.insertBlockAtRootEnd({ content: content2 });
      const id2 = document.insertBlockAtRootEnd({ content: content3 });

      document.moveBlockAfterBlock(id1, id2);

      const children = Array.from(document.blockIterator());

      expect(children.map((c) => c.content)).to.be.deep.equal([content2, content3, content1]);
    });
  });

  describe("#moveBlockBeforeBlock()", function () {
    it("moves block before a sibling", function () {
      const document = new Document<string>("My First Document", (c: string) => c);

      const content1 = "First block";
      const content2 = "Second block";
      const content3 = "Third block";
      const id1 = document.insertBlockAtRootEnd({ content: content1 });
      document.insertBlockAtRootEnd({ content: content2 });
      const id2 = document.insertBlockAtRootEnd({ content: content3 });

      document.moveBlockBeforeBlock(id2, id1);

      const children = Array.from(document.blockIterator());

      expect(children.map((c) => c.content)).to.be.deep.equal([content3, content1, content2]);
    });
  });

  describe("#toMarkup()", function () {
    it("converts document consisting of singleline blocks", function () {
      const document = new Document<string>("My First Document", (c: string) => c);

      const content1 = "First block";
      const content2 = "Second block";
      const content3 = "Third block";
      const content4 = "First subblock";
      const content5 = "Second subblock";
      const content6 = "Third subblock";

      document.insertBlockAtRootEnd({ content: content1 });
      const id1 = document.insertBlockAtRootEnd({ content: content2 });
      const id2 = document.insertBlockAtRootEnd({ content: content3 });

      document.insertSubblockAtBlockEnd(id1, { content: content4 });
      document.insertSubblockAtBlockEnd(id1, { content: content5 });
      document.insertSubblockAtBlockEnd(id2, { content: content6 });

      const expectedString: string = `My First Document
  First block
  Second block
    First subblock
    Second subblock
  Third block
    Third subblock
`;

      expect(document.toMarkup()).to.be.equal(expectedString);
    });

    it("converts document consisting of multiline blocks", function () {
      const document = new Document<string>("My First Document", (c: string) => c);

      const content1 = "First block";
      const content2 = "Second block\nis a little too long, so\nit spans multiple lines";
      const content3 = "Third block";
      const content4 = "First subblock";
      const content5 = "Second subblock";
      const content6 = "Third subblock";

      document.insertBlockAtRootEnd({ content: content1 });
      const id1 = document.insertBlockAtRootEnd({ content: content2 });
      const id2 = document.insertBlockAtRootEnd({ content: content3 });

      document.insertSubblockAtBlockEnd(id1, { content: content4 });
      document.insertSubblockAtBlockEnd(id1, { content: content5 });
      document.insertSubblockAtBlockEnd(id2, { content: content6 });

      const expectedString: string = `My First Document
  First block
  Second block
  is a little too long, so
  it spans multiple lines
    First subblock
    Second subblock
  Third block
    Third subblock
`;

      expect(document.toMarkup()).to.be.equal(expectedString);
    });
  });
});
