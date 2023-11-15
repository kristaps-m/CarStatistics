import '@testing-library/jest-dom'
import {render, screen, cleanup} from '@testing-library/react';
import Catalog from '../product/Catalog'

afterEach(() => {
  cleanup();
});

test('should render Catalog feature/product', () => {
  render(<Catalog/>);
  const catalogElement = screen.getByTestId('catalog-1');

  expect(catalogElement).toBeInTheDocument();
  expect(catalogElement).toHaveTextContent('Home');
  expect(catalogElement).toHaveTextContent('Catalog');
  expect(catalogElement).toHaveTextContent("Reset");
})
