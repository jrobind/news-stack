import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../app/components/Loading';

describe('<Loading />', () => {

    it('should render a .loading class', () => {
        const wrapper = shallow(<Loading />);
        
        expect(wrapper.find('.loading')).toHaveLength(1);
    });
    
    it('should render a .container class if passed truthy prop', () => {
        const wrapper = shallow(<Loading addClass={true} />);
        
        expect(wrapper.find('.container')).toHaveLength(1);
    });
    
    it('should not render a .container class if no prop is passed', () => {
        const wrapper = shallow(<Loading />);
        
        expect(wrapper.find('.container')).toHaveLength(0);
    });
    
});