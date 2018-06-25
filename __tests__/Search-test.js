import React from 'react';
import { shallow, mount } from 'enzyme';
import {  createMemoryHistory } from 'history';
import Search from '../app/components/Search';
import * as mapPlacesApi from 'react-places-autocomplete';
import LocalStorageMock from '../testHelpers/mockLocalStorage';
import { geocodeByAddressData, getLatLngData, apiFakeData } from '../testHelpers/fakeData';
import * as getWeather from '../app/utils/api';

// mocks

getWeather.default = jest.fn(() => {
    return new Promise((resolve) => resolve(apiFakeData));
})

// create localStorage mock
global.localStorage = new LocalStorageMock;

// mock async requests in react-places-autocomplete library
mapPlacesApi.geocodeByAddress = jest.fn(() => {
    return new Promise((resolve) => resolve(geocodeByAddressData))
});

mapPlacesApi.getLatLng = jest.fn(() => {
    return new Promise((resolve) => resolve(getLatLngData))
});

// mock for google maps JavaScript api
const setupGoogleMock = () => {
    const google = {
        maps: {
            places: {
                AutocompleteService: () => {},
                PlacesServiceStatus: {
                    INVALID_REQUEST: 'INVALID_REQUEST',
                    NOT_FOUND: 'NOT_FOUND',
                    OK: 'OK',
                    OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
                    REQUEST_DENIED: 'REQUEST_DENIED',
                    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
                    ZERO_RESULTS: 'ZERO_RESULTS',
                },
            },
            Geocoder: () => {},
            GeocoderStatus: {
                ERROR: 'ERROR',
                INVALID_REQUEST: 'INVALID_REQUEST',
                OK: 'OK',
                OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
                REQUEST_DENIED: 'REQUEST_DENIED',
                UNKNOWN_ERROR: 'UNKNOWN_ERROR',
                ZERO_RESULTS: 'ZERO_RESULTS',
            },
        },
    };
    global.window.google = google;
  };
  
beforeAll(() => {
    setupGoogleMock();
});

// tests

describe('<Search />', () => {

    it('should render <PlacesAutocomplete /> component', () => {
        const wrapper = shallow(<Search />);
        expect(wrapper.find(mapPlacesApi.default)).toHaveLength(1);
    });

    it('should render a .container class', () => {
        const wrapper = shallow(<Search />);
        expect(wrapper.find('.container')).toHaveLength(1);
    });

    it('should update state address value when input is updated', () => {
        const wrapper = mount(<Search />);
        const input = wrapper.find('input');

        input.simulate('change', {target: { value: 'London' }});

        expect(wrapper.state('address')).toBe('London');
    });

    it('should update state loading value after input submission', () => {
        const history = createMemoryHistory('/')
        const wrapper = mount(<Search history={history} />);
        const input = wrapper.find('input');

        input.simulate('keyDown', { key: 'Enter' });
        console.log(wrapper.state('loading'))
        expect(wrapper.state('loading')).toBe(true);
    });

});