import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import DashboardContainer from '../app/containers/DashboardContainer'
import Weatherheader from '../app/components/WeatherHeader';
import Forecast from '../app/components/Forecast';
import UVandPollution from '../app/components/UVandPollution';
import LocalStorageMock from '../testHelpers/mockLocalStorage';
import { apiFakeData } from '../testHelpers/fakeData';

// mock for localStorage api
global.localStorage = new LocalStorageMock;

beforeAll(() => {
    localStorage.setItem('placeName', JSON.stringify('London'));
    localStorage.setItem('weather', JSON.stringify(apiFakeData));
});

// tests

describe('<DashboardContainer/>', () => {

    it ('should render <Weatherheader /> component', () => {
        const wrapper = mount(
            <MemoryRouter>
                <DashboardContainer />
            </MemoryRouter>
        );

        expect(wrapper.find(Weatherheader)).toHaveLength(1);
    });

    it ('should render <Forecast /> component', () => {
        const wrapper = mount(
            <MemoryRouter>
                <DashboardContainer />
            </MemoryRouter>
        );

        expect(wrapper.find(Forecast)).toHaveLength(1);
    });

    it ('should render <UVandPollution /> component', () => {
        const wrapper = mount(
            <MemoryRouter>
                <DashboardContainer />
            </MemoryRouter>
        );

        expect(wrapper.find(UVandPollution)).toHaveLength(2);
    });

    it('should render a dashboard-container data-testid attribute', () => {
        const wrapper = mount(
            <MemoryRouter>
                <DashboardContainer />
            </MemoryRouter>
        );

        expect(wrapper.find('[data-testid="dashboard-container"]')).toHaveLength(1);
    });

    it('should update state with weather api data once component mounts', () => {
        const wrapper = shallow(
            <MemoryRouter>
                <DashboardContainer />
            </MemoryRouter>
        ).find(DashboardContainer).dive();
       
        expect(wrapper.state('name')).toBe('London');
        expect(wrapper.state('country')).toBe('GB');
        expect(wrapper.state('coord')).toEqual(apiFakeData.city.coord);
        expect(wrapper.state('forecast')).toEqual([apiFakeData.list[0], apiFakeData.list[1]]);
        expect(wrapper.state('currentWeather')).toEqual(apiFakeData.list[0])
    });
});
