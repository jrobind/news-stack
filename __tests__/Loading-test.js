import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../app/components/Loading';

describe('<Loading />', () => {
    
    it('should render a .container class', () => {
        const wrapper = shallow(<Loading />);
        
        expect(wrapper.find('.container')).toHaveLength(1);
    });

    it('should render a .loading class', () => {
        const wrapper = shallow(<Loading />);
        
        expect(wrapper.find('.loading')).toHaveLength(1);
    });
    
});