import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import DashboardContainer from '../app/containers/DashboardContainer'
import Weatherheader from '../app/components/WeatherHeader';
import Forecast from '../app/components/Forecast';
import UVandPollution from '../app/components/UVandPollution';
import LocalStorageMock from '../testHelpers/mockLocalStorage';
import { apiMockData } from '../testHelpers/mockData';
import storage from '../app/utils/storage';

// mock for localStorage api
global.localStorage = new LocalStorageMock;

const setupLocalStorageWeatherData = () => {
    localStorage.removeItem('placeName');
    localStorage.removeItem('weather');

    localStorage.setItem('placeName', JSON.stringify('Lodz'));
    localStorage.setItem('weather', JSON.stringify(apiMockData));
}

beforeAll(() => {
    setupLocalStorageWeatherData();
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

    it('should alter forecast from 6 day to 5 day', () => {
        const wrapper = mount(
            <MemoryRouter>
                <DashboardContainer />
            </MemoryRouter>
        );

        expect(wrapper.find(Forecast).prop('forecast').length).toEqual(5);
        expect(storage.getStorage('weather').forecast.forecastday.length).toEqual(5);
    });

    it('should update state with weather api data once component mounts', () => {
        setupLocalStorageWeatherData();

        const wrapper = shallow(
            <MemoryRouter>
                <DashboardContainer />
            </MemoryRouter>
        ).find(DashboardContainer).dive();

        const formattedMockData = apiMockData;
        formattedMockData.forecast.forecastday = formattedMockData.forecast.forecastday.slice(1);
       
        expect(wrapper.state('name')).toBe('Lodz');
        expect(wrapper.state('country')).toBe('Poland');
        expect(wrapper.state('lat')).toEqual(51.76);
        expect(wrapper.state('lon')).toEqual(19.46);
        expect(wrapper.state('currentWeather')).toEqual(apiMockData.current);
        expect(wrapper.state('forecast')).toEqual(formattedMockData.forecast);
    });
});
