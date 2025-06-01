import React from 'react';
import { render, screen } from '@testing-library/react';
import PageTemplate from './PageTemplate';
import { Car, PageData } from '../interfaces';

// Mock the PageInfo component
jest.mock('./PageInfo', () => {
  return function MockPageInfo(props: {pageInfo: PageData }) {
    return <div data-testid="mock-page-info">Mock PageInfo: {props.pageInfo?.title ?? ''}</div>;
  };
});

// Mock the CarList component
jest.mock('./CarList', () => {
  return function MockCarList(props: { cars?: Car[] }) {
    return <div data-testid="mock-car-list">Mock CarList: {props.cars?.length ?? 0} cars</div>;
  };
});

describe('PageTemplate Component', () => {
  it('renders PageInfo and CarList components with correct props', () => {
    const mockPageInfo = {
      title: 'Test Page Title',
      content: 'Test Page Content',
    };

    const mockCars = [
      { id: '1', make: 'Toyota', model: 'Camry' },
      { id: '2', make: 'Honda', model: 'Civic' },
    ];

    render(<PageTemplate pageInfo={mockPageInfo} cars={mockCars} />);

    // Check if PageInfo is rendered with the correct title
    const pageInfoElement = screen.getByTestId('mock-page-info');
    expect(pageInfoElement).toBeInTheDocument();
    expect(pageInfoElement).toHaveTextContent('Mock PageInfo: Test Page Title');

    // Check if CarList is rendered with the correct number of cars
    const carListElement = screen.getByTestId('mock-car-list');
    expect(carListElement).toBeInTheDocument();
    expect(carListElement).toHaveTextContent('Mock CarList: 2 cars');
  });

  it('renders PageInfo and CarList components with empty props', () => {
    render(<PageTemplate />);

    // Check if PageInfo is rendered with empty title
    const pageInfoElement = screen.getByTestId('mock-page-info');
    expect(pageInfoElement).toBeInTheDocument();
    expect(pageInfoElement).toHaveTextContent('Mock PageInfo:');

    // Check if CarList is rendered with 0 cars
    const carListElement = screen.getByTestId('mock-car-list');
    expect(carListElement).toBeInTheDocument();
    expect(carListElement).toHaveTextContent('Mock CarList: 0 cars');
  });
});