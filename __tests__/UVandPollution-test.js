import React from 'react';
import { shallow, mount } from 'enzyme';
import UVandPollution from '../app/components/UVandPollution';
import { apiMockUVData, apiMockPollutionData, apiMockData, errorMessage } from '../testHelpers/mockData';
import LocalStorageMock from '../testHelpers/mockLocalStorage';
import * as uvAndPollutionApi from '../app/utils/api';
import { rejects } from 'assert';

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
    jest.setTimeout(10000);
});

beforeEach(() => {
    uvAndPollutionApi.fetchUVIndex.mockClear();
    uvAndPollutionApi.fetchPollutionIndex.mockClear();
    jest.useFakeTimers();
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
        const promise = uvAndPollutionApi.fetchUVIndex();

        button.simulate('click');

        return promise.then(() => {
            jest.runAllTimers();

            expect(wrapper.state('clicked')).toBe(true);
            expect(wrapper.state('value')).toEqual(50);
            expect(uvAndPollutionApi.fetchUVIndex).toHaveBeenCalled();
            expect(uvAndPollutionApi.fetchUVIndex).toHaveBeenCalledTimes(2);
        });
    });

    it('it should update state UV index value and max value after button click', () => {
        let wrapper = shallow(<UVandPollution {...props.uv}/>);
        const button = wrapper.find('button');
        const promise = uvAndPollutionApi.fetchUVIndex();

        button.simulate('click');
        // testing async action so we need to acccess mock api promise using a .then() and run tests within
        return promise.then(() => {
            jest.runAllTimers();

            expect(wrapper.update().state('index')).toBe(6);
            expect(wrapper.state('value')).toEqual(50);
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
            jest.runAllTimers();

            expect(wrapper.state('index')).toBe(111);
            expect(wrapper.state('value')).toEqual(37);
            expect(Math.round(wrapper.update().state('max'))).toBe(37);
        });
    });

    it('should render message when Pollution index api fetch fails', () => {
        let wrapper = mount(<UVandPollution {...props.pollution}/>);
        const button = wrapper.find('button');

        // edit mock to throw error
        uvAndPollutionApi.fetchPollutionIndex = jest.fn(() => {
            throw new Error();
        });

        button.simulate('click');

        expect(wrapper.state('loading')).toBe(false);
        expect(wrapper.state('value')).toBe(false);
        expect(
            wrapper.find('[data-testid="no-data-message"]')
                .text())
                .toEqual('No data available');
        
    });

    it('should render message when UV index api fetch fails', () => {
        let wrapper = mount(<UVandPollution {...props.uv}/>);
        const button = wrapper.find('button');

        // edit mock to throw error
        uvAndPollutionApi.fetchUVIndex = jest.fn(() => {
            throw new Error();
        });

        button.simulate('click');

        expect(wrapper.state('value')).toBe(false);
        expect(
            wrapper.find('[data-testid="no-data-message"]')
                .text())
                .toEqual('No data available');
        
    });

});