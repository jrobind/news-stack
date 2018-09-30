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
    
    it('should render a container data-testid attribute', () => {
        const { city: { name, country, coord }, list } = apiFakeData;
        const wrapper = setup({ currentWeather: list[0], country, coord, name });

        expect(wrapper.dive().find('[data-testid="container"]')).toHaveLength(1);
    });

    it('should render a place-info data-testid attribute', () => {
        const { city: { name, country, coord }, list } = apiFakeData;
        const wrapper = setup({ currentWeather: list[0], country, coord, name });

        expect(wrapper.dive().find('[data-testid="place-info"]')).toHaveLength(1);
    });

    it('should render a weather-content data-testid attribute', () => {
        const { city: { name, country, coord }, list } = apiFakeData;
        const wrapper = setup({ currentWeather: list[0], country, coord, name });

        expect(wrapper.dive().find('[data-testid="weather-content"]')).toHaveLength(1);
    });

    it('should render a temperature data-testid attribute', () => {
        const { city: { name, country, coord }, list } = apiFakeData;
        const wrapper = setup({ currentWeather: list[0], country, coord, name });

        expect(wrapper.dive().find('[data-testid="temperature"]')).toHaveLength(1);
    });

    it('should render a .humidity class', () => {
        const { city: { name, country, coord }, list } = apiFakeData;
        const wrapper = setup({ currentWeather: list[0], country, coord, name });

        expect(wrapper.dive().find('.humidity')).toHaveLength(1);
    });

    it('should render a .windSpeed class', () => {
        const { city: { name, country, coord }, list } = apiFakeData;
        const wrapper = setup({ currentWeather: list[0], country, coord, name });

        expect(wrapper.dive().find('.windSpeed')).toHaveLength(1);
    });

    it('should render a .coordinates class', () => {
        const { city: { name, country, coord }, list } = apiFakeData;
        const wrapper = setup({ currentWeather: list[0], country, coord, name });

        expect(wrapper.dive().find('.coordinates')).toHaveLength(1);
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
                .text()).toEqual('scattered clouds');
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

    it('should render correct humidity', () => {
        const { city: { name, country, coord }, list } = apiFakeData;
        const wrapper = setup({ currentWeather: list[0], country, coord, name });

        expect(
            wrapper
                .dive()
                .find('.humidity')
                .childAt(1)
                .text()).toEqual('49%');
    });

    it('should render correct wind speed', () => {
        const { city: { name, country, coord }, list } = apiFakeData;
        const wrapper = setup({ currentWeather: list[0], country, coord, name });

        expect(
            wrapper
                .dive()
                .find('.windSpeed')
                .childAt(1)
                .text()).toEqual('4 mph');
    });

    it('should render correct coordinates', () => {
        const { city: { name, country, coord }, list } = apiFakeData;
        const wrapper = setup({ currentWeather: list[0], country, coord, name });

        expect(
            wrapper
                .dive()
                .find('.coordinates')
                .childAt(1)
                .text()).toEqual('LAT: 51.5752');

        expect(
            wrapper
                .dive()
                .find('.coordinates')
                .childAt(2)
                .text()).toEqual('LON: 0.1858');
    });

});