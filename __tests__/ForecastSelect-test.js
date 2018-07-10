import React from 'react';
import { shallow } from 'enzyme';
import ForecastSelect from '../app/components/ForecastSelect';

describe('<ForecastSelect />', () => {

    it('should render a .timeOfDay class', () => {
        const wrapper = shallow(<ForecastSelect />);

        expect(wrapper.find('.timeOfDay')).toHaveLength(1);
    });

    it('should render "Afternoon" as the default select option', () => {
        const wrapper = shallow(<ForecastSelect />);

        expect(wrapper.state('value')).toEqual('Afternoon');
    });

    // it('should update time of day value when new option is selected', () => {
    //     const wrapper = shallow(<ForecastSelect />);
    //     wrapper.find('select').simulate('change', {target: { value: 'Morning'}});

    //     expect(wrapper.state('value')).toEqual('Morning');
    // });

});