import '@testing-library/jest-dom'
import {render, screen, cleanup} from '@testing-library/react';
import ProductList from '../product/ProductList'

afterEach(() => {
  cleanup();
});

test('should render ProductList feature/product', () => {
  render(<ProductList/>);
  const productListElement = screen.getByTestId('productList-1');

  expect(productListElement).toBeInTheDocument();
  expect(productListElement).toHaveTextContent('Reset');
})