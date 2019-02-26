import React from 'react';
import { shallow } from 'enzyme';
import UVandPollution from '../app/components/UVandPollution';
import { apiMockUVData, apiMockData } from '../testHelpers/fakeData';
import LocalStorageMock from '../testHelpers/mockLocalStorage';
import * as uvApi from '../app/utils/api';

// props

const props = { title: 'UV', info: 'UV test'};

// mocks

global.localStorage = new LocalStorageMock;

uvApi.fetchUVIndex = jest.fn(() => {
    return new Promise((resolve) => resolve(apiMockUVData));
});

beforeAll(() => {
    localStorage.setItem('weather', JSON.stringify(apiMockData));
});

beforeEach(function() {
    uvApi.fetchUVIndex.mockClear();
});

// tests

describe('<UVandPollution />', () => {

    it('should render a container data-testid attribute', () => {
        const wrapper = shallow(<UVandPollution {...props}/>);
        
        expect(wrapper.find('[data-testid="container"]')).toHaveLength(1);
    });

    it('should render a uv-pollution-wrapper data-testid attribute', () => {
        const wrapper = shallow(<UVandPollution {...props}/>);
        
        expect(wrapper.find('[data-testid="uv-pollution-wrapper"]')).toHaveLength(1);
    });

    it('should render a see-index data-testid attribute by default', () => {
        const wrapper = shallow(<UVandPollution {...props}/>);
        
        expect(wrapper.find('[data-testid="see-index"]')).toHaveLength(1);
    });

    it('should not render a uv-animation-container data-testid attribute by default', () => {
        const wrapper = shallow(<UVandPollution {...props}/>);
        
        expect(wrapper.find('[data-testid="uv-animation-container"]')).toHaveLength(0);
    });

    it('it should call fetchUVIndex after button click', () => {
        const wrapper = shallow(<UVandPollution {...props}/>);
        const button = wrapper.find('button');

        button.simulate('click');

        expect(wrapper.state('clicked')).toBe(true);
        expect(uvApi.fetchUVIndex).toHaveBeenCalled();
        expect(uvApi.fetchUVIndex).toHaveBeenCalledTimes(1);
    });

    it('it should update state UV index value and max value after button click', () => {
        let wrapper = shallow(<UVandPollution {...props}/>);
        const button = wrapper.find('button');
        const promise = uvApi.fetchUVIndex();

        button.simulate('click')
        // testing async action so we need to acccess mock api promise using a .then() and run tests within
        return promise.then(() => {
            expect(wrapper.update().state('index')).toBe(6);
            expect(Math.round(wrapper.update().state('max'))).toBe(50);
        });
    });

});