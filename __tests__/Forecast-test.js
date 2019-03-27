import React from 'react';
import { shallow, mount } from 'enzyme';
import Forecast from '../app/components/Forecast';
import ForecastSelect from '../app/components/ForecastSelect';
import { apiMockData, getLatLngData } from '../testHelpers/mockData.js';
import LocalStorageMock from '../testHelpers/mockLocalStorage';

// mocks

// mock for localStorage api
global.localStorage = new LocalStorageMock;

const setupLocalStorageWeatherData = () => {
    localStorage.setItem(JSON.stringify(apiMockData), 'weather');
}

const clearLocalStorageWeatherData = () => {
    localStorage.removeItem('weather');
}

// mock for DOM Element.closest() and Element.getAttribute()
const closest = () => ({ getAttribute() { return 0 } });
// const closestAvg = () => ({ getAttribute() { return 'Average temperature'} });
// const closestMax = () => ({ getAttribute() { return 'Maximum temperature'} });

// props
const props = {
    forecast: apiMockData.forecast.forecastday,
    coord: getLatLngData
}

beforeEach(() => {
    setupLocalStorageWeatherData();
});

  
afterEach(() => {
    clearLocalStorageWeatherData();
});

// tests
describe('<Forecast />', () => {

    it('should render a container data-testid attribute', () => {
        const wrapper = shallow(<Forecast {...props} />);
        
        expect(wrapper.find('[data-testid="container"]')).toHaveLength(1);
    });

    it('should render a forecast-wrapper data-testid attribute', () => {
        const wrapper = shallow(<Forecast {...props} />);
        
        expect(wrapper.find('[data-testid="forecast-wrapper"]')).toHaveLength(3);
    });

    it('should render current weather conditions', () => {
        const wrapper = shallow(<Forecast {...props} />);
        const forecastOne = wrapper.find('[data-testid="description"]').at(0);
        const forecastTwo = wrapper.find('[data-testid="description"]').at(1);

        expect(forecastOne.text()).toEqual('Partly cloudy');
        expect(forecastTwo.text()).toEqual('Moderate rain at times');
    });

    it('should render correct temperature', () => {
        const wrapper = shallow(<Forecast {...props} />);
        const forecastOne = wrapper.find(
            '[data-testid="forecast-wrapper"] [data-testid="temperature"]'
        ).at(0).find('span').at(0);
        const forecastTwo = wrapper.find(
            '[data-testid="forecast-wrapper"] [data-testid="temperature"]'
        ).at(1).find('span').at(0);
        const forecastThree = wrapper.find(
            '[data-testid="forecast-wrapper"] [data-testid="temperature"]'
        ).at(2).find('span').at(0);

        expect(forecastOne.text()).toEqual('5');
        expect(forecastTwo.text()).toEqual('6');
        expect(forecastThree.text()).toEqual('11');
    });

    it('should render <ForecastSelect /> component for days other than today', () => {
        const wrapper = shallow(<Forecast {...props} />);

        expect(wrapper.find(ForecastSelect)).toHaveLength(3);
    });

    it('should render a new value when temperature is toggled', () => {
        const wrapper = mount(<Forecast {...props} />);
        wrapper.find('select').at(0).simulate('change', {target: { value: 'Minimum temperature', closest }})
        const min = wrapper.find(
            '[data-testid="forecast-wrapper"] [data-testid="temperature"]'
        ).at(0).find('span').at(0);
        

        // .simulate('change', {target: { value: 'Minimum temperature', closest}});
        // const min = wrapper.find('.description').at(1);
        // expect(forecastTwo.text()).toEqual('scattered clouds');
    });
    
});