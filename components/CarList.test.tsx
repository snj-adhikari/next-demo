import React from 'react';
import { render, screen } from '@testing-library/react';
import CarList from './CarList';
import { Car } from '../interfaces';
// Optionally, if formatPrice is used in CarCard, you can mock it:
jest.mock('../utils/helpers', () => ({
  formatPrice: jest.fn((price: number | undefined) => (price ? '$' + price.toString() : ''))
}));

// Sample data for testing
const sampleCar: Car = {
    uuid: 'car-1',
    title: 'Car Make One',
    families: [
        {
            uuid: 'family-1',
            slug: 'family-one',
            title: 'Family One',
            familyPrice: {
                min: 10000,
                max: 20000,
            },
            baseVariantImages: ['img1.jpg']
        },
        {
            uuid: 'family-2',
            slug: 'family-two',
            title: 'Family Two',
            familyPrice: {
                min: undefined,
                max: undefined,
            },
            // No images for family two
            baseVariantImages: []
        }
    ],
    slug: 'car-make-one',
    type: '',
    makeableId: 0
};

describe('CarList Component', () => {
  test('renders car make title and family cards with correct price text', () => {
    render(<CarList cars={[sampleCar]} />);
    
    // Verify car make title is rendered
    expect(screen.getByText('Car Make One')).toBeInTheDocument();
    
    // Verify both family titles are rendered
    expect(screen.getByText('Family One')).toBeInTheDocument();
    expect(screen.getByText('Family Two')).toBeInTheDocument();
    
    // Verify the price information for Family One (formatted as $10000 - $20000)
    expect(screen.getByText(/\$10000 - \$20000/)).toBeInTheDocument();
    
    // For Family Two (no prices) check that "Contact Dealer" is rendered instead.
    expect(screen.getByText(/Contact Dealer/i)).toBeInTheDocument();
    
    // Optionally, verify that Lightbox is rendered for Family One (which has images)
    // The Lightbox renders an image with alt text equal to the family title.
    expect(screen.getByAltText('Family One')).toBeInTheDocument();
  });
});