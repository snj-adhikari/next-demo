import React from 'react';
import { render, screen } from '@testing-library/react';
import CarCard from './CarCard';
import { Family } from '../interfaces';

// Mock the formatPrice helper so we control its return values in the tests.
jest.mock('../utils/helpers', () => ({
  formatPrice: jest.fn((price: number | undefined) => (price ? '$'+ price.toString() : ''))
}));

describe('CarCard Component', () => {
  const sampleFamilyWithPrice: Family = {
    uuid: 'family-1',
    slug: 'sedan-elite',
    title: 'Sedan Elite',
    familyPrice: {
      min: 15000,
      max: 25000,
    },
    baseVariantImages: ['image1.jpg', 'image2.jpg']
  };

  const sampleFamilyNoPrice: Family = {
    uuid: 'family-2',
    slug: 'convertible-classic',
    title: 'Convertible Classic',
    familyPrice: {
      min: undefined,
      max: undefined,
    },
    baseVariantImages: []  // no images provided
  };

  test('renders price range when prices are available', () => {
    render(<CarCard family={sampleFamilyWithPrice} />);
    
    // Should render family title
    expect(screen.getByText(/Sedan Elite/i)).toBeInTheDocument();
    
    // Should render price with the formatted values
    expect(screen.getByText(/Price:💰/i)).toBeInTheDocument();
    expect(screen.getByText('$15000 - $25000')).toBeInTheDocument();
  });

  test('shows "Contact Dealer" when prices are not available', () => {
    render(<CarCard family={sampleFamilyNoPrice} />);
    
    // Check that price text renders "Contact Dealer"
    expect(screen.getByText(/Price:💰/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact Dealer/i)).toBeInTheDocument();
  });

  test('renders Lightbox when images are provided', () => {
    render(<CarCard family={sampleFamilyWithPrice} />);
    
    // Check if Lightbox thumbnail image is rendered by verifying
    // that an image with the alt text equal to family title is present.
    const image = screen.getByAltText(sampleFamilyWithPrice.title);
    expect(image).toBeInTheDocument();
  });
});