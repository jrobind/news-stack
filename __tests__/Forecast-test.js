import React from 'react';
import { shallow } from 'enzyme';
import Forecast from '../app/components/Forecast';
import ForecastSelect from '../app/components/ForecastSelect';
import { apiFakeData } from '../testHelpers/fakeData';

describe('<Forecast />', () => {

    it('should render a .container class', () => {
        const wrapper = shallow(<Forecast forecast={apiFakeData.list} />);
        
        expect(wrapper.find('.container')).toHaveLength(1);
    });

    it('should render a .forecastWrapper class', () => {
        const wrapper = shallow(<Forecast forecast={apiFakeData.list} />);
        
        expect(wrapper.find('.forecastWrapper')).toHaveLength(2);
    });

    it('should render current weather conditions', () => {
        const wrapper = shallow(<Forecast forecast={apiFakeData.list} />);
        const forecastOne = wrapper.find('.description').at(0);
        const forecastTwo = wrapper.find('.description').at(1);

        expect(forecastOne.text()).toEqual('clear sky');
        expect(forecastTwo.text()).toEqual('scattered clouds');
    });

    it('should render correct temperature', () => {
        const wrapper = shallow(<Forecast forecast={apiFakeData.list} />);
        const forecastOne = wrapper.find('.temperature').at(0);
        const forecastTwo = wrapper.find('.temperature').at(1);

        expect(forecastOne.text()).toEqual('27℃');
        expect(forecastTwo.text()).toEqual('37℃');
    });

    it('should render <ForecastSelect /> component for days other than today', () => {
        const wrapper = shallow(<Forecast forecast={apiFakeData.list} />);

        expect(wrapper.find(ForecastSelect)).toHaveLength(1);
    });
    
});