import React from 'react';
import { shallow } from 'enzyme';
import ForecastSelect from '../app/components/ForecastSelect';
import { getLatLngData } from '../testHelpers/mockData.js';

// mocks

// mock for DOM Element.closest() and Element.getAttribute()
const closest = () => ({ getAttribute() {} });
// mock for updateForecast() function prop
const updateForecastMock = jest.fn((value, id) => ({
    value,
    id
}));

// props
const props = {
    updateForecast: updateForecastMock,
    coord: getLatLngData,
    id: 0
}


beforeEach(function() {
    updateForecastMock.mockClear();
  });

// tests
describe('<ForecastSelect />', () => {

    it('should render a temp-options data-testid attribute', () => {
        const wrapper = shallow(<ForecastSelect {...props} />);

        expect(wrapper.find('[data-testid="temp-options"]')).toHaveLength(1);
    });

    it('should render "Average temperature" as the default select option', () => {
        const wrapper = shallow(<ForecastSelect {...props} />);

        expect(wrapper.state('currentValue')).toEqual('Average temperature');
    });

    it('should update select element temperature type when new option is selected', () => {
        const wrapper = shallow(<ForecastSelect {...props} />);

        wrapper.find('select').simulate('change', {target: { value: 'Maximum temperature', closest }});
        expect(wrapper.state('currentValue')).toEqual('Maximum temperature');

        wrapper.find('select').simulate('change', {target: { value: 'Minimum temperature', closest }});
        expect(wrapper.state('currentValue')).toEqual('Minimum temperature');

        wrapper.find('select').simulate('change', {target: { value: 'Average temperature', closest }});
        expect(wrapper.state('currentValue')).toEqual('Average temperature');
    });

    it('should call updateForecast() when Maximum temperature option is selected', () => {
        const wrapper = shallow(<ForecastSelect {...props} />);

        wrapper.find('select').simulate('change', {target: { value: 'Maximum temperature', closest }});
        expect(updateForecastMock.mock.calls[0][0]).toBe('max-temp');
        expect(updateForecastMock).toHaveBeenCalledTimes(1);
    });

    it('should call updateForecast() when Minimum temperature option is selected', () => {
        const wrapper = shallow(<ForecastSelect {...props} />);

        wrapper.find('select').simulate('change', {target: { value: 'Minimum temperature', closest }});
        expect(updateForecastMock.mock.calls[0][0]).toBe('min-temp');
        expect(updateForecastMock).toHaveBeenCalledTimes(1);
    });

    it('should call updateForecast() when Average temperature option is selected', () => {
        const wrapper = shallow(<ForecastSelect {...props} />);

        wrapper.find('select').simulate('change', {target: { value: 'Average temperature', closest }});
        expect(updateForecastMock.mock.calls[0][0]).toBe('avg-temp');
        expect(updateForecastMock).toHaveBeenCalledTimes(1);
    });
});