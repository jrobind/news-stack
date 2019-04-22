import React from 'react';
import { shallow } from 'enzyme';
import UVandPollution from '../app/components/UVandPollution';
import { apiMockUVData, apiMockPollutionData, apiMockData } from '../testHelpers/mockData';
import LocalStorageMock from '../testHelpers/mockLocalStorage';
import * as uvAndPollutionApi from '../app/utils/api';


// props

const props = { 
    uv: {
        title: 'UV',
        info: 'UV test'
    },
    pollution: {
        title: 'Pollution',
        info: 'Pollution test'
    }
};

// mocks

global.localStorage = new LocalStorageMock;

const setupLocalStorageWeatherData = () => {
    localStorage.setItem('weather', JSON.stringify(apiMockData));
}

uvAndPollutionApi.fetchUVIndex = jest.fn(() => {
    return new Promise((resolve) => resolve(apiMockUVData));
});

uvAndPollutionApi.fetchPollutionIndex = jest.fn(() => {
    return new Promise((resolve) => resolve(apiMockPollutionData));
});

beforeAll(() => {
    setupLocalStorageWeatherData();
});

beforeEach(() => {
    uvAndPollutionApi.fetchUVIndex.mockClear();
    uvAndPollutionApi.fetchPollutionIndex.mockClear();
});

// tests

describe('<UVandPollution />', () => {

    it('should render a container data-testid attribute', () => {
        const wrapper = shallow(<UVandPollution {...props.uv}/>);
        
        expect(wrapper.find('[data-testid="container"]')).toHaveLength(1);
    });

    it('should render a uv-pollution-wrapper data-testid attribute', () => {
        const wrapper = shallow(<UVandPollution {...props.uv}/>);
        
        expect(wrapper.find('[data-testid="uv-pollution-wrapper"]')).toHaveLength(1);
    });

    it('should render a see-index data-testid attribute by default', () => {
        const wrapper = shallow(<UVandPollution {...props.uv}/>);
        
        expect(wrapper.find('[data-testid="see-index"]')).toHaveLength(1);
    });

    it('should not render a uv-animation-container data-testid attribute by default', () => {
        const wrapper = shallow(<UVandPollution {...props.uv}/>);
        
        expect(wrapper.find('[data-testid="uv-animation-container"]')).toHaveLength(0);
    });

    it('it should call fetchUVIndex after button click', () => {
        const wrapper = shallow(<UVandPollution {...props.uv}/>);
        const button = wrapper.find('button');

        button.simulate('click');

        expect(wrapper.state('clicked')).toBe(true);
        expect(uvAndPollutionApi.fetchUVIndex).toHaveBeenCalled();
        expect(uvAndPollutionApi.fetchUVIndex).toHaveBeenCalledTimes(1);
    });

    it('it should update state UV index value and max value after button click', () => {
        let wrapper = shallow(<UVandPollution {...props.uv}/>);
        const button = wrapper.find('button');
        const promise = uvAndPollutionApi.fetchUVIndex();

        button.simulate('click');
        // testing async action so we need to acccess mock api promise using a .then() and run tests within
        return promise.then(() => {
            expect(wrapper.update().state('index')).toBe(6);
            expect(Math.round(wrapper.update().state('max'))).toBe(50);
        });
    });

    it('it should call fetchPollutionIndex after button click', () => {
        const wrapper = shallow(<UVandPollution {...props.pollution}/>);
        const button = wrapper.find('button');
        button.simulate('click');

        expect(wrapper.update().state('clicked')).toBe(true);
        expect(uvAndPollutionApi.fetchPollutionIndex).toHaveBeenCalled();
        expect(uvAndPollutionApi.fetchPollutionIndex).toHaveBeenCalledTimes(1);
    });

    it('it should update state Pollution index value and max value after button click', () => {
        let wrapper = shallow(<UVandPollution {...props.pollution}/>);
        const button = wrapper.find('button');
        const promise = uvAndPollutionApi.fetchPollutionIndex();
        button.simulate('click');

        return promise.then(() => {
            expect(wrapper.state('index')).toBe(111);
            expect(Math.round(wrapper.update().state('max'))).toBe(37);
        });
    });

});