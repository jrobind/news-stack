import UVandPollutionClassification from '../app/utils/UVPollutionClassification';

describe('UVandPollutionClassification', () => {

    it('should return correct rgb and text value for all UV cases', () => {
       const value_1 = UVandPollutionClassification('UV', 2.8);
       const value_2 = UVandPollutionClassification('UV', 3.5);
       const value_3 = UVandPollutionClassification('UV', 6.2);
       const value_4 = UVandPollutionClassification('UV', 9);
       const value_5 = UVandPollutionClassification('UV', 11.4);

       expect(value_1).toMatchObject({color: 'rgba(63, 219, 63, 1)', text:'Low' });
       expect(value_2).toMatchObject({color: 'rgba(255, 191, 0, 1)', text: 'Moderate'});
       expect(value_3).toMatchObject({color: 'rgba(233, 105, 44, 1)', text: 'High'});
       expect(value_4).toMatchObject({color: 'rgba(229, 0, 0, 1)', text: 'Very high'});
       expect(value_5).toMatchObject({color: 'rgba(153, 0, 0, 1)', text: 'Extreme'});
    });

    it('should return correct rgb and text value for all Pollution index cases', () => {
       const value_1 = UVandPollutionClassification('Pollution', 35);
       const value_2 = UVandPollutionClassification('Pollution', 70);
       const value_3 = UVandPollutionClassification('Pollution', 135);
       const value_4 = UVandPollutionClassification('Pollution', 187);
       const value_5 = UVandPollutionClassification('Pollution', 245);

       expect(value_1).toMatchObject({color: 'rgba(63, 219, 63, 1)', text:'Excellent' });
       expect(value_2).toMatchObject({color: 'rgba(255, 191, 0, 1)', text: 'Good'});
       expect(value_3).toMatchObject({color: 'rgba(233, 105, 44, 1)', text: 'High'});
       expect(value_4).toMatchObject({color: 'rgba(229, 0, 0, 1)', text: 'Very high'});
       expect(value_5).toMatchObject({color: 'rgba(153, 0, 0, 1)', text: 'Extreme'});
    });

});