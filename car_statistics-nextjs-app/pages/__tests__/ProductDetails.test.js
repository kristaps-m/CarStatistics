import '@testing-library/jest-dom'
import {render, screen, cleanup} from '@testing-library/react';
import ProductDetails from "../ProductDetails";

// Mock the next/router module
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

afterEach(() => {
  cleanup();
});

test('should render ProductDetails pages/product', () => {
// Mock the useRouter implementation
  const mockUseRouter = {
    query: {
      productId: '1',
    },
  };
  jest.spyOn(require('next/router'), 'useRouter').mockReturnValue(mockUseRouter);

  render(<ProductDetails/>);
  const productDetailsElement = screen.getByTestId('productDetails-1');

  expect(productDetailsElement).toBeInTheDocument();
})
