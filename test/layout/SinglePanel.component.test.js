import React from 'react';
import { shallow } from 'enzyme';
import SinglePanel from '../../src/layout/SinglePanel.component';
import log from 'loglevel';

describe('<SinglePanel />', () => {
    let component;

    beforeEach(() => {
        sinon.spy(log, 'warn');

        component = shallow(<SinglePanel />);
    });

    afterEach(() => {
        log.warn.restore();
    });

    it('should render a <main /> as the root', () => {
        expect(component.type()).to.equal('main');
    });

    it('should pass the correct style', () => {
        const expectedStyle = {
            flex: 1,
            display: 'flex',
            flexOrientation: 'row',
            marginTop: '8rem',
            marginLeft: '2rem',
            marginRight: '2rem',
        };

        expect(component.props().style).to.deep.equal(expectedStyle);
    });

    it('should pass the children to the main component', () => {
        const childComponent = <div></div>;
        component = shallow(<SinglePanel>{childComponent}</SinglePanel>);

        expect(component.props().children).to.equal(childComponent);
    });

    it('should only render the first child if more children have been passed', () => {
        const childComponents = [
            <div></div>,
            <div></div>,
        ];
        component = shallow(<SinglePanel>{childComponents}</SinglePanel>);

        expect(component.props().children).to.equal(childComponents[0]);
    });

    it('should log a warning when more than one child has been passed', () => {
        const childComponents = [
            <div></div>,
            <div></div>,
        ];
        component = shallow(<SinglePanel>{childComponents}</SinglePanel>);

        expect(log.warn).to.be.calledWith('You passed multiple children to the <SinglePanel /> component, this is not supported');
    });

    it('should not log any warnings when just a single child was passed', () => {
        const childComponent = <div></div>;
        component = shallow(<SinglePanel>{childComponent}</SinglePanel>);

        expect(log.warn).not.to.be.called;
    });

    it('should pass additonal properties along to the <main /> component', () => {
        component = shallow(<SinglePanel name="John" />);

        expect(component.props().name).to.equal('John');
    });
});
