import React from 'react';
import { shallow } from 'enzyme';
import ForecastSelect from '../app/components/ForecastSelect';

// mocks

// mock for DOM Element.closest() and Element.getAttribute()
const closest = () => ({ getAttribute() {} });
// mock for updateForecast() function prop
const updateForecastMock = jest.fn(() => ({
    value: 'Monday', 
    date: '2018-07-11 12:00:00'
}));

beforeEach(function() {
    updateForecastMock.mockClear();
  });

// tests

describe('<ForecastSelect />', () => {

    it('should render a time-of-day data-testid attribute', () => {
        const wrapper = shallow(<ForecastSelect />);

        expect(wrapper.find('[data-testid="time-of-day"]')).toHaveLength(1);
    });

    it('should render "Afternoon" as the default select option', () => {
        const wrapper = shallow(<ForecastSelect />);

        expect(wrapper.state('value')).toEqual('Afternoon');
    });

    it('should update time of day value when new option is selected', () => {
        const wrapper = shallow(<ForecastSelect updateForecast={updateForecastMock} />);
        wrapper.find('select').simulate('change', {target: { value: 'Morning', closest }});

        expect(wrapper.state('value')).toEqual('Morning');
    });

    it('should call updateForecast() when new option is selected', () => {
        const wrapper = shallow(<ForecastSelect updateForecast={updateForecastMock} />);
        wrapper.find('select').simulate('change', {target: { value: 'Morning', closest }});

        expect(updateForecastMock).toHaveBeenCalledTimes(1);
    });

});