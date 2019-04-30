import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import WeatherHeader from '../app/components/WeatherHeader';
import { apiMockData } from '../testHelpers/mockData';

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
        const { location: { name, country, lat, lon }, current } = apiMockData;
        const coord = { lat, lon };
        const wrapper = setup({ currentWeather: current, country, coord, name });

        expect(wrapper.dive().find('[data-testid="container"]')).toHaveLength(1);
    });

    it('should render a place-info data-testid attribute', () => {
        const { location: { name, country, lat, lon }, current } = apiMockData;
        const coord = { lat, lon };
        const wrapper = setup({ currentWeather: current, country, coord, name });

        expect(wrapper.dive().find('[data-testid="place-info"]')).toHaveLength(1);
    });

    it('should render a weather-content data-testid attribute', () => {
        const { location: { name, country, lat, lon }, current } = apiMockData;
        const coord = { lat, lon };
        const wrapper = setup({ currentWeather: current, country, coord, name });

        expect(wrapper.dive().find('[data-testid="weather-content"]')).toHaveLength(1);
    });

    it('should render a temperature data-testid attribute', () => {
        const { location: { name, country, lat, lon }, current } = apiMockData;
        const coord = { lat, lon };
        const wrapper = setup({ currentWeather: current, country, coord, name });

        expect(wrapper.dive().find('[data-testid="temperature"]')).toHaveLength(1);
    });

    // it('should render a humidity data-testid attribute', () => {
    //     const { city: { name, country, coord }, list } = apiMockData;
    //     const wrapper = setup({ currentWeather: list[0], country, coord, name });

    //     expect(wrapper.dive().find('[data-testid="humidity"]')).toHaveLength(1);
    // });

    // it('should render a wind-speed data-testid attribute', () => {
    //     const { city: { name, country, coord }, list } = apiMockData;
    //     const wrapper = setup({ currentWeather: list[0], country, coord, name });

    //     expect(wrapper.dive().find('[data-testid="wind-speed"]')).toHaveLength(1);
    // });

    // it('should render a coordinates data-testid attribute', () => {
    //     const { city: { name, country, coord }, list } = apiMockData;
    //     const wrapper = setup({ currentWeather: list[0], country, coord, name });

    //     expect(wrapper.dive().find('[data-testid="coordinates"]')).toHaveLength(1);
    // });

    // it('should render correct place name and country code', () => {
    //     const { city: { name, country, coord }, list } = apiMockData;
    //     const wrapper = setup({ currentWeather: list[0], country, coord, name });

    //     expect(
    //         wrapper
    //             .dive()
    //             .find('[data-testid="place-info"]')
    //             .childAt(0)
    //             .text()).toEqual('London, GB');
    // });
    
    // it('should render current weather conditions', () => {
    //     const { city: { name, country, coord }, list } = apiMockData;
    //     const wrapper = setup({ currentWeather: list[0], country, coord, name });

    //     expect(
    //         wrapper
    //             .dive()
    //             .find('[data-testid="currently"]')
    //             .childAt(1)
    //             .childAt(0)
    //             .text()).toEqual('scattered clouds');
    // });

    // it('should render correct temperature', () => {
    //     const { city: { name, country, coord }, list } = apiMockData;
    //     const wrapper = setup({ currentWeather: list[0], country, coord, name });

    //     expect(
    //         wrapper
    //             .dive()
    //             .find('[data-testid="temperature"]')
    //             .childAt(1)
    //             .text()).toEqual('27℃');
    // });

    // it('should render correct humidity', () => {
    //     const { city: { name, country, coord }, list } = apiMockData;
    //     const wrapper = setup({ currentWeather: list[0], country, coord, name });

    //     expect(
    //         wrapper
    //             .dive()
    //             .find('[data-testid="humidity"]')
    //             .childAt(1)
    //             .text()).toEqual('49%');
    // });

    // it('should render correct wind speed', () => {
    //     const { city: { name, country, coord }, list } = apiMockData;
    //     const wrapper = setup({ currentWeather: list[0], country, coord, name });

    //     expect(
    //         wrapper
    //             .dive()
    //             .find('[data-testid="wind-speed"]')
    //             .childAt(1)
    //             .text()).toEqual('4 mph');
    // });

    // it('should render correct coordinates', () => {
    //     const { city: { name, country, coord }, list } = apiMockData;
    //     const wrapper = setup({ currentWeather: list[0], country, coord, name });

    //     expect(
    //         wrapper
    //             .dive()
    //             .find('[data-testid="coordinates"]')
    //             .childAt(1)
    //             .text()).toEqual('LAT: 51.5752');

    //     expect(
    //         wrapper
    //             .dive()
    //             .find('[data-testid="coordinates"]')
    //             .childAt(2)
    //             .text()).toEqual('LON: 0.1858');
    // });

});