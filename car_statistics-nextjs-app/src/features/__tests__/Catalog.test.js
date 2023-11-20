import '@testing-library/jest-dom'
import {render, screen, cleanup} from '@testing-library/react';
import Catalog from '../car-statistic/Catalog'

afterEach(() => {
  cleanup();
});

test('should render Catalog feature/car-statistic', () => {
  render(<Catalog/>);
  const catalogElement = screen.getByTestId('catalog-1');

  expect(catalogElement).toBeInTheDocument();
  expect(catalogElement).toHaveTextContent('Home');
  expect(catalogElement).toHaveTextContent('Car day graph');
  expect(catalogElement).toHaveTextContent("Car statistics table");
})
