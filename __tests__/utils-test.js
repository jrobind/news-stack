import UVandPollutionClassification from '../app/utils/UVPollutionClassification';
import { apiFakeUVData, apiFakeData } from '../testHelpers/fakeData';
import LocalStorageMock from '../testHelpers/mockLocalStorage';

describe('UVandPollutionClassification', () => {

    it('should return correct rgb and text value for all UV cases', () => {
       const value_1 = UVandPollutionClassification('UV', 2.8);
       const value_2 = UVandPollutionClassification('UV', 2.8);
       const value_3 = UVandPollutionClassification('UV', 2.8);
       const value_4 = UVandPollutionClassification('UV', 2.8);
       const value_5 = UVandPollutionClassification('UV', 2.8);

       expect(value).toMatchObject({color: 'rgba(63, 219, 63, 0.8)', text:'Low' });
    });

});