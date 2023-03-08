const { MarkovMachine } = require("./markov");

//test null, make sure words at the end have null as one of their 'possible next words' instead of 'undefined'
describe("Test null", function(){

    let mm;
    
    beforeAll(function(){
        mm = new MarkovMachine("This is a test")
    })

    test('test1 dictionary should have null as the only dictionary item', function(){
        let lastWord = mm.dictionary['test'];
        expect(lastWord[0]).toEqual(null);
    });
});



describe("Test 'next words' arrays", function(){

    let mm;
    
    beforeAll(function(){
        mm = new MarkovMachine("the rain in Spain falls mainly on the plain")
    })

    test("test 'the'", function(){
        let nextWords = mm.dictionary['the'];
        expect(nextWords).toContain('rain');
    });

    test("test 'the' again", function(){
        let nextWords = mm.dictionary['the'];
        expect(nextWords).toContain('plain');
    });

    test("test 'in'", function(){
        let nextWords = mm.dictionary['in'];
        expect(nextWords).toContain('Spain');
    });

    test("test 'on'", function(){
        let nextWords = mm.dictionary['on'];
        expect(nextWords).toContain('the');
    });
});



describe("Test making a story", function(){

    let mm;
    
    beforeAll(function(){      

        mm = new MarkovMachine("the rain in Spain falls mainly on the plain")
    })

    test("test 5 words", function(){
        output = mm.makeText(numWords=5);

        console.log("Output test1: ", output);
        let words = output.split(/[ \r\n]+/).filter(c => c !== "");
        expect(words.length).toEqual(5);
    });
    


    test("test 10 words", function(){
        output = mm.makeText(numWords=10);
        
        console.log("Output test2: ", output);
        let words = output.split(/[ \r\n]+/).filter(c => c !== "");
        expect(words.length).toEqual(10);
    });


});