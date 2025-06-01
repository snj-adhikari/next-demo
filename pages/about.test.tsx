import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutPage from './about.page';

// Mock the Layout component
jest.mock('../components/Layout', () => ({
  __esModule: true,
  default: ({ children, title }: { children: React.ReactNode; title: string }) => (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  ),
}));

describe('AboutPage', () => {
  it('renders the about page with title and link', () => {
    render(<AboutPage />);

    // Check if the title is rendered
    expect(screen.getByText('About | Next.js + TypeScript Example')).toBeInTheDocument();

    // Check if the paragraph is rendered
    expect(screen.getByText('This is the about page of Drive.com.au')).toBeInTheDocument();

    // Check if the link is rendered and has the correct href
    const linkElement = screen.getByRole('link', { name: 'Go home' });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');
  });
});