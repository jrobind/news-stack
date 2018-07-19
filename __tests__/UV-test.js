import React from 'react';
import { shallow } from 'enzyme';
import UV from '../app/components/UV';
import { apiFakeUVData, apiFakeData } from '../testHelpers/fakeData';
import LocalStorageMock from '../testHelpers/mockLocalStorage';
import * as uvApi from '../app/utils/api';
import { doesNotReject } from 'assert';

// mocks

global.localStorage = new LocalStorageMock;

uvApi.fetchUVIndex = jest.fn(() => {
    return new Promise((resolve) => resolve(apiFakeUVData));
});

beforeAll(() => {
    localStorage.setItem('weather', JSON.stringify(apiFakeData));
});

beforeEach(function() {
    uvApi.fetchUVIndex.mockClear();
});

// tests

describe('<UV />', () => {

    it('should render a .container class', () => {
        const wrapper = shallow(<UV />);
        
        expect(wrapper.find('.container')).toHaveLength(1);
    });

    it('should render a .uv class', () => {
        const wrapper = shallow(<UV />);
        
        expect(wrapper.find('.uv')).toHaveLength(1);
    });

    it('should render a .info class', () => {
        const wrapper = shallow(<UV />);
        
        expect(wrapper.find('.info')).toHaveLength(1);
    });

    it('should render a .seeIndex class by default', () => {
        const wrapper = shallow(<UV />);
        
        expect(wrapper.find('.seeIndex')).toHaveLength(1);
    });

    it('should not render a .uvAnimationContainer class by default', () => {
        const wrapper = shallow(<UV />);
        
        expect(wrapper.find('.uvAnimationContainer')).toHaveLength(0);
    });

    it('it should call fetchUVIndex after button click', () => {
        const wrapper = shallow(<UV />);
        const button = wrapper.find('button');

        button.simulate('click');

        expect(wrapper.state('clicked')).toBe(true);
        expect(uvApi.fetchUVIndex).toHaveBeenCalled();
        expect(uvApi.fetchUVIndex).toHaveBeenCalledTimes(1);
    });

    it('it should update state UV index value and max value after button click', () => {
        let wrapper = shallow(<UV />);
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