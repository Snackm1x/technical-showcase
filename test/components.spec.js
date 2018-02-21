import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
import { ShoppingListContainer, InputArea, ShoppingList } from '../src/components';
import 'babel-polyfill';


describe('ShoppingListContainer', () => {
    it('should render InputArea and ShoppingList', () => {
        const wrapper = shallow(<ShoppingListContainer />);
        expect(wrapper.containsAllMatchingElements([
            <InputArea />,
            <ShoppingList />
        ])).to.equal(true);
    });

    it('should start with an empty list', () => {
        const wrapper = shallow(<ShoppingListContainer />);
        expect(wrapper.state('items')).to.eql([]);
    });

    it('adds items to the list', () => {
        const wrapper = shallow(<ShoppingListContainer />);
        wrapper.instance().addItem('Apples');
        expect(wrapper.state('items')).to.eql(['Apples']);
    });

    it('passes addItem to InputArea', () => {
        const wrapper = shallow(<ShoppingListContainer />);
        const inputArea = wrapper.find(InputArea);
        const addItem = wrapper.instance().addItem;
        expect(inputArea.prop('onSubmit')).to.eql(addItem);
    });

    it('passes a bound addItem function to InputArea', () => {
        const wrapper = shallow(<ShoppingListContainer />);
        const inputArea = wrapper.find(InputArea);
        inputArea.prop('onSubmit')('Apples');
        expect(wrapper.state('items')).to.eql(['Apples']);
    });

    it('renders the items', () => {
        const wrapper = shallow(<ShoppingListContainer />);
        wrapper.setState({ items: ['Apples', 'Peaches'] });
        expect(wrapper.find('ShoppingList').dive().find('li')).to.have.length(2);
    });
});

describe('InputArea', () => {
    it('should contain an input and a button', () => {
        const wrapper = shallow(<InputArea />);
        expect(wrapper.containsAllMatchingElements([
            <input />,
            <button>Add</button>
        ])).to.equal(true);
    });

    it('should accept input', () => {
        const wrapper = shallow(<InputArea />);
        const input = wrapper.find('input');
        input.simulate('change', { target: { value: 'Peaches' } });
        expect(wrapper.state('text')).to.equal('Peaches');
    });

    it('should call onSubmit when Add is clicked', () => {
        const addItemSpy = spy();
        const wrapper = shallow(<InputArea onSubmit={addItemSpy} />);
        wrapper.setState({ text: 'Pears' });
        const addButton = wrapper.find('button');

        addButton.simulate('click');

        expect(addItemSpy.calledOnce).to.equal(true);
        expect(addItemSpy.calledWith('Pears')).to.equal(true);
    });
});

describe('ShoppingList', () => {
    it('should render zero items', () => {
        const wrapper = shallow(<ShoppingList items={[]} />);
        expect(wrapper.find('li')).to.have.length(0);
    });

    it('should render undefined items', () => {
        const wrapper = shallow(<ShoppingList items={undefined} />);
        expect(wrapper.find('li')).to.have.length(0);
    });

    it('should render some items', () => {
        const items = ['Apples', 'Pears', 'Peaches'];
        const wrapper = shallow(<ShoppingList items={items} />);
        expect(wrapper.find('li')).to.have.length(3);
    });
})