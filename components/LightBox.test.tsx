import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Lightbox from './LightBox';

const images = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
];
const altText = 'Test Lightbox';

describe('Lightbox Component', () => {
    it('renders without errors', () => {
        render(<Lightbox images={images} alt={altText} />);
        const thumbnail = screen.getByAltText(altText);
        expect(thumbnail).toBeInTheDocument();
    });

    it('opens the lightbox when the thumbnail is clicked', () => {
        render(<Lightbox images={images} alt={altText} />);
        const thumbnail = screen.getByAltText(altText);
        fireEvent.click(thumbnail);
        const closeButton = screen.getByText('×');
        expect(closeButton).toBeInTheDocument();
    });

    it('closes the lightbox when the close button is clicked', () => {
        render(<Lightbox images={images} alt={altText} />);
        const thumbnail = screen.getByAltText(altText);
        fireEvent.click(thumbnail);
        const closeButton = screen.getByText('×');
        fireEvent.click(closeButton);
        expect(screen.queryByText('×')).toBeNull();
    });

    it('displays the correct image in the lightbox', () => {
        render(<Lightbox images={images} alt={altText} />);
        const thumbnail = screen.getByAltText(altText);
        fireEvent.click(thumbnail);
        const lightboxImage = screen.getByTestId('lightbox-image');
        expect(lightboxImage.src).toContain(images[0]);
    });

    it('navigates to the next image when the next button is clicked', () => {
        render(<Lightbox images={images} alt={altText} />);
        const thumbnail = screen.getByAltText(altText);
        fireEvent.click(thumbnail);
        const nextButton = screen.getByText('>');
        fireEvent.click(nextButton);
        const lightboxImage = screen.getByTestId('lightbox-image');
        expect(lightboxImage.src).toContain(images[1]);
    });

    it('navigates to the previous image when the previous button is clicked', () => {
        render(<Lightbox images={images} alt={altText} />);
        const thumbnail = screen.getByAltText(altText);
        fireEvent.click(thumbnail);
        const nextButton = screen.getByText('>');
        fireEvent.click(nextButton);
        const prevButton = screen.getByText('<');
        fireEvent.click(prevButton);
        const lightboxImage = screen.getByTestId('lightbox-image');
        expect(lightboxImage.src).toContain(images[0]);
    });

    it('displays thumbnails when multiple images are present', () => {
        render(<Lightbox images={images} alt={altText} />);
        const thumbnail = screen.getByAltText(altText);
        fireEvent.click(thumbnail);
        const thumbnail1 = screen.getByAltText(`${altText} - Thumbnail 1`);
        expect(thumbnail1).toBeInTheDocument();
        const thumbnail2 = screen.getByAltText(`${altText} - Thumbnail 2`);
        expect(thumbnail2).toBeInTheDocument();
        const thumbnail3 = screen.getByAltText(`${altText} - Thumbnail 3`);
        expect(thumbnail3).toBeInTheDocument();
    });

    it('selects an image when a thumbnail is clicked', () => {
        render(<Lightbox images={images} alt={altText} />);
        const thumbnail = screen.getByAltText(altText);
        fireEvent.click(thumbnail);
        const thumbnail2 = screen.getByAltText(`${altText} - Thumbnail 2`);
        fireEvent.click(thumbnail2);
        const lightboxImage = screen.getByTestId('lightbox-image');
        expect(lightboxImage.src).toContain(images[1]);
    });

    it('hides navigation buttons on first and last images', () => {
        render(<Lightbox images={images} alt={altText} />);
        const thumbnail = screen.getByAltText(altText);
        fireEvent.click(thumbnail);
        const prevButton = screen.getByText('<');
        expect(prevButton).toBeDisabled();
        const nextButton = screen.getByText('>');
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        expect(nextButton).toBeDisabled();
    });

    it('does not render if no images are provided', () => {
        render(<Lightbox images={[]} alt={altText} />);
        expect(screen.queryByAltText(altText)).toBeNull();
    });
});