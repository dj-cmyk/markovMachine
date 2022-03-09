const { expect } = require("@jest/globals");
const { exp } = require("prelude-ls");
const { MarkovMachine } = require("./markov")

describe("makeChains function tests", function () {
    let mm;
    let testChains = {
        "machine": ["made", "made"], 
        "made": ["text", "text"], 
        "test": ["the"], 
        "text": ["to", null], 
        "the": ["machine"], 
        "to": ["test"]
    }

    beforeAll(() => {
      mm = new MarkovMachine("machine made text to test the machine made text")
    });
  
    test("makeChains function", function () {
      expect(mm.chains).toBeDefined();
      expect(mm.chains).toMatchObject(testChains);
    });

    test("makeText function", function () {
        let testText = mm.makeText();
        expect(testText).toBeDefined();
        expect(testText).toEqual(expect.any(String));
      });

  });