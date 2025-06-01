import React from 'react';
import { render, screen } from '@testing-library/react';
import MyApp from './_app';
import type { AppProps } from 'next/app';

describe('MyApp', () => {
  it('renders the page component with given props', () => {
    // Define a dummy component for testing
    const DummyComponent = () => <div data-testid="dummy">Hello World</div>;
    const appProps: AppProps = {
      Component: DummyComponent,
      pageProps: {}
    };
    
    render(<MyApp {...appProps} />);
    
    expect(screen.getByTestId('dummy')).toHaveTextContent('Hello World');
  });
});