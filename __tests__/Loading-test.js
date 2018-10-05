import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../app/components/Loading';

describe('<Loading />', () => {

    it('should render a loading-wrapper data-testid attribute', () => {
        const wrapper = shallow(<Loading />);
        
        expect(wrapper.find('[data-testid="loading-wrapper"]')).toHaveLength(1);
    });
    
    it('should render a loading data-testid attribute', () => {
        const wrapper = shallow(<Loading />);
        
        expect(wrapper.find('[data-testid="loading"]')).toHaveLength(1);
    });
    
});