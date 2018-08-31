import React from 'react';
import { shallow,  } from 'enzyme';
import Loading from '../app/components/Tooltip';
import Tooltip from '../app/components/Tooltip';

const mockProps = {color: 'red', text: 'test'};

describe('<Tooltip />', () => {

    it('should render a .toolTip class', () => {
        const wrapper = shallow(<Tooltip data={mockProps} />);
        
        expect(wrapper.find('.toolTip')).toHaveLength(1);
    });

    it('should render a .tail class', () => {
        const wrapper = shallow(<Tooltip data={mockProps} />);
        
        expect(wrapper.find('.tail')).toHaveLength(1);
    });
    
    it('should render correct text description', () => {
        const wrapper = shallow(<Loading data={mockProps} />);

        expect(
            wrapper
                .find('.toolTip')
                .childAt(0)
                .text())
                .toEqual('test');
    });
    
});