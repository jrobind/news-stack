import React from 'react';
import { shallow } from 'enzyme';
import Forecast from '../app/components/Forecast';
import ForecastSelect from '../app/components/ForecastSelect';
import { apiFakeData } from '../testHelpers/fakeData';

describe('<Forecast />', () => {

    it('should render a .container class', () => {
        const wrapper = shallow(<Forecast forecast={[apiFakeData.list[0]]} />);
        
        expect(wrapper.find('.container')).toHaveLength(1);
    });

    it('should render a .forecastWrapper class', () => {
        const wrapper = shallow(<Forecast forecast={[apiFakeData.list[0]]} />);
        
        expect(wrapper.find('.forecastWrapper')).toHaveLength(1);
    });

    it('should render current weather conditions', () => {
        const wrapper = shallow(<Forecast forecast={[apiFakeData.list[0]]} />);

        expect(
            wrapper
                .find('.description')
                .childAt(0)
                .text()).toEqual('clear sky');
    });

    // it('should render <ForecastSelect /> component', () => {
    //     const wrapper = shallow(<Forecast forecast={[apiFakeData.list[0]]} />);

    //     expect(wrapper.find(ForecastSelect)).toHaveLength(1);
    // });
});