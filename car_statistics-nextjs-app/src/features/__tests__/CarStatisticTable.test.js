import '@testing-library/jest-dom'
import {render, screen, cleanup} from '@testing-library/react';
import CarStatisticTable from '../car-statistic/CarStatisticTable'

afterEach(() => {
  cleanup();
});

test('should render CarStatisticTable feature/car-statistic', () => {
  render(<CarStatisticTable/>);
  const productListElement = screen.getByTestId('carStatisticTable-1');

  expect(productListElement).toBeInTheDocument();
  expect(productListElement).toHaveTextContent('Reset');
})