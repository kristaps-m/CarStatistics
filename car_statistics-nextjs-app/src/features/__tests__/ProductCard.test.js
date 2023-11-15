import '@testing-library/jest-dom'
import {render, screen, cleanup} from '@testing-library/react';
import ProductCard from '../product/ProductCard'
import TestRenderer from 'react-test-renderer';

afterEach(() => {
  cleanup();
});

test('should render ProductCard feature/product', () => {
  const product = { "id": 1,
    "name": "Apple",
    "price": 1.10,
    "currency": "EUR",
    "category": "Fruits",
    "description": "Fresh and delicious apples from the local orchard."}

  render(<ProductCard product={product}/>);
  const productCardElement = screen.getByTestId('productCard-1');

  expect(productCardElement).toBeInTheDocument();
  expect(productCardElement).toHaveTextContent('Price: $');
  expect(productCardElement).toHaveTextContent('Category:');
  expect(productCardElement).toHaveTextContent("View");
})

test('maches snapshot', () => {
  const product = { "id": 1,
    "name": "Apple",
    "price": 1.10,
    "currency": "EUR",
    "category": "Fruits",
    "description": "Fresh and delicious apples from the local orchard."}
  const tree = TestRenderer.create(<ProductCard product={product}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
