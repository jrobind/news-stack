import React from 'react';
import { shallow, mount } from 'enzyme';
import Search from '../app/components/Search';
import PlacesAutocomplete from 'react-places-autocomplete';

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

describe('<Search />', () => {

    it('should render <PlacesAutocomplete /> component', () => {
        const wrapper = shallow(<Search />);
        expect(wrapper.find(PlacesAutocomplete)).toHaveLength(1);
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
        const wrapper = mount(<Search />);
        const input = wrapper.find('input');

        input.simulate('keyDown', { key: 'Enter' });

        expect(wrapper.state('loading')).toBe(true);
    });

});