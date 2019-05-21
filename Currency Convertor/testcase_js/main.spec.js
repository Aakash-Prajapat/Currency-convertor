const request = new XMLHttpRequest();
describe('Test case for currency calculation', () => {
    
    it('Amount validation pass', () => {
        expect(main.validation(500,1,1)).toEqual(true);
    });

    it('Amount validation fail', () => {
        expect(main.validation(-1,1,10)).toEqual(false);
    });

    it('Source currency validation pass', () => {
       expect(main.validation(500,5,1)).toEqual(true);
    });
    
    it('Source currency validation fail', () => {
        expect(main.validation(500,0,1)).toEqual(false);
    });

    it('Destination currency validation pass', () => {
        expect(main.validation(500,5,10)).toEqual(true);
    });
    
    it('Destination currency validation fail', () => {
        expect(main.validation(500,5,0)).toEqual(false);
    });

    it('currency conversion amount test case', (done) => {
        main.toGetCurrency(5000, 'INR', 'USD').then(function(result){
        expect(result).toEqual(71.8024807958162);
        done();
    })
    });    
});
