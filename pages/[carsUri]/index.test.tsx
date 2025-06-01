import React from 'react';
import { render, screen } from '@testing-library/react';
import WithServerSideProps, { getServerSideProps } from './index'; // Adjust the path as needed
import { Car, PageData } from '../../interfaces/index'; // Adjust the path as needed
import '@testing-library/jest-dom';
import { GetServerSidePropsContext } from 'next';

// Mock the Layout and PageTemplate components to simplify testing the main component's logic
// We're focusing on the data flow into WithServerSideProps, not the rendering of its children.
jest.mock('../../components/Layout', () => {
    const MockLayout = ({ children, title }: { children: React.ReactNode; title: string }) => (
      <div data-testid="mock-layout" data-title={title}>
        {children}
      </div>
    );
    MockLayout.displayName = 'MockLayout';
    return MockLayout;
});

jest.mock('../../components/PageTemplate', () => {
    const MockPageTemplate = ({ cars, pageInfo }: { cars: Car[]; pageInfo: PageData }) => (
      <div data-testid="mock-page-template">
        <h2 data-testid="page-template-title">{pageInfo?.title}</h2>
        <div data-testid="page-template-cars">{cars.length} cars</div>
      </div>
    );
    MockPageTemplate.displayName = 'MockPageTemplate';
    return MockPageTemplate;
});

// Mock the sortCarsByFamilies helper since its internal logic is not the focus of this test
jest.mock('../../utils/helpers', () => ({
  sortCarsByFamilies: jest.fn((cars: Car[]) => cars), // Simply return the cars as is for testing
}));

describe('WithServerSideProps', () => {
  const mockPageInfo: PageData = {
    uri: '/mock-cars-for-sale',
    id: '1',
    date: '2023-01-01',
    title: 'Awesome Cars',
    slug: 'awesome-cars',
    excerpt: 'Explore awesome cars',
    content: '<p>Some content</p>',
  };

  const mockCars: Car[] = [
    {
      slug: 'car-1',
      title: 'Car One',
      uuid: 'uuid-1',
      type: 'sedan',
      makeableId: 101,
      families: [],
    },
    {
      slug: 'car-2',
      title: 'Car Two',
      uuid: 'uuid-2',
      type: 'suv',
      makeableId: 102,
      families: [],
    },
  ];

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    // Ensure process.env.NEXT_PUBLIC_BASE_URL is set for getServerSideProps
    process.env.NEXT_PUBLIC_BASE_URL = 'http://localhost:3000';
  });

  // Test the component rendering with provided props
  it('renders correctly with given props', () => {
    render(<WithServerSideProps cars={mockCars} pageInfo={mockPageInfo} carsUri="/test-uri" />);

    expect(screen.getByTestId('mock-layout')).toBeInTheDocument();
    expect(screen.getByTestId('mock-layout')).toHaveAttribute('data-title', 'Awesome Cars | Next.js + TypeScript Example');
    expect(screen.getByTestId('mock-page-template')).toBeInTheDocument();
    expect(screen.getByTestId('page-template-title')).toHaveTextContent('Awesome Cars');
    expect(screen.getByTestId('page-template-cars')).toHaveTextContent('2 cars');
  });

  it('renders with default title if pageInfo title is undefined', () => {
    const pageInfoWithoutTitle = { ...mockPageInfo, title: undefined };
    render(<WithServerSideProps cars={mockCars} pageInfo={pageInfoWithoutTitle} carsUri="/test-uri" />);

    expect(screen.getByTestId('mock-layout')).toHaveAttribute('data-title', 'Cars List | Next.js + TypeScript Example');
  });

  // Test getServerSideProps successful data fetching
  describe('getServerSideProps', () => {
    it('fetches and returns data correctly', async () => {
      // Mock successful fetch responses
      global.fetch = jest.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockCars),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockPageInfo),
        });

      const context = {} as GetServerSidePropsContext; // Mock an empty context for this test

      const result = await getServerSideProps(context);

      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/cars');
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/page');

      expect(result).toEqual({
        props: {
          cars: mockCars,
          pageInfo: mockPageInfo,
          carsUri: mockPageInfo.uri,
        },
      });
    });

    it('returns empty data on fetch failure', async () => {
      // Mock fetch to simulate an error
      global.fetch = jest.fn()
        .mockResolvedValueOnce({
          ok: false, // Simulate a non-OK response for cars
        })
        .mockResolvedValueOnce({
          ok: true, // This fetch might not even be called depending on the error
          json: () => Promise.resolve(mockPageInfo),
        });

      // Spy on console.error to ensure it's called
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const context = {} as GetServerSidePropsContext;
      const result = await getServerSideProps(context);

      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        props: {
          cars: [],
          pageInfo: null,
        },
      });
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching data in getServerSideProps:",
        expect.any(Error)
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching data in getServerSideProps:",
        new Error('Failed to fetch data')
      );

      consoleErrorSpy.mockRestore(); // Restore original console.error
    });

    it('returns empty data on network error', async () => {
      // Mock fetch to throw a network error
      global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network error'));

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const context = {} as GetServerSidePropsContext;
      const result = await getServerSideProps(context);

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        props: {
          cars: [],
          pageInfo: null,
        },
      });
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching data in getServerSideProps:",
        expect.any(Error)
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching data in getServerSideProps:",
        new Error('Network error')
      );

      consoleErrorSpy.mockRestore();
    });

    it('uses default carsUri if pageInfo.uri is null', async () => {
      const pageInfoWithoutUri = { ...mockPageInfo, uri: null };

      global.fetch = jest.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockCars),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(pageInfoWithoutUri),
        });

      const context = {} as GetServerSidePropsContext;
      const result = await getServerSideProps(context);

      expect(result).toEqual({
        props: {
          cars: mockCars,
          pageInfo: pageInfoWithoutUri,
          carsUri: '/cars-for-sale', // Should be the default
        },
      });
    });
  });
});