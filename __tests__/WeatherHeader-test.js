import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import WeatherHeader from '../app/components/WeatherHeader';
import { apiFakeData } from '../testHelpers/fakeData';

const setup = (props) => {
    return shallow(
        <MemoryRouter>
            <WeatherHeader {...props} />
        </ MemoryRouter>
    ).find(WeatherHeader);
}

// tests

describe('<WeatherHeader />', () => {
    
    it('should render a .container class', () => {
        const { city: { name, country, coord }, list } = apiFakeData;
        const wrapper = setup({ currentWeather: list[0], country, coord, name });

        expect(wrapper.dive().find('.container')).toHaveLength(1);
    });

    it('should render a .placeInfo class', () => {
        const { city: { name, country, coord }, list } = apiFakeData;
        const wrapper = setup({ currentWeather: list[0], country, coord, name });

        expect(wrapper.dive().find('.placeInfo')).toHaveLength(1);
    });

    it('should render a .weatherContent class', () => {
        const { city: { name, country, coord }, list } = apiFakeData;
        const wrapper = setup({ currentWeather: list[0], country, coord, name });

        expect(wrapper.dive().find('.weatherContent')).toHaveLength(1);
    });

    it('should render a .temperature class', () => {
        const { city: { name, country, coord }, list } = apiFakeData;
        const wrapper = setup({ currentWeather: list[0], country, coord, name });

        expect(wrapper.dive().find('.temperature')).toHaveLength(1);
    });

    it('should render correct place name and country code', () => {
        const { city: { name, country, coord }, list } = apiFakeData;
        const wrapper = setup({ currentWeather: list[0], country, coord, name });

        expect(
            wrapper
                .dive()
                .find('.placeInfo')
                .childAt(0)
                .text()).toEqual('London, GB');
    });
    
    it('should render current weather conditions', () => {
        const { city: { name, country, coord }, list } = apiFakeData;
        const wrapper = setup({ currentWeather: list[0], country, coord, name });

        expect(
            wrapper
                .dive()
                .find('.currently')
                .childAt(1)
                .childAt(0)
                .text()).toEqual('clear sky');
    });

    it('should render correct temperature', () => {
        const { city: { name, country, coord }, list } = apiFakeData;
        const wrapper = setup({ currentWeather: list[0], country, coord, name });

        expect(
            wrapper
                .dive()
                .find('.temperature')
                .childAt(1)
                .text()).toEqual('27℃');
    });

});