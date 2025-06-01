import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

const MockHead = ({ children }: { children: React.ReactNode }) => {
    React.Children.forEach(children, child => {
        if (React.isValidElement(child) && child.type === 'title') {
            document.title = (child as React.ReactElement).props.children;
        }
    });
    return <>{children}</>;
};

const mockHead = jest.fn().mockImplementation(MockHead);

jest.mock('next/head', () => {
    const NextHead = (props: { children: React.ReactNode }) => {
        mockHead(props);
        return <>{props.children}</>;
    };
    NextHead.displayName = 'NextHead';
    return NextHead;
});

describe('Layout Component', () => {
    beforeEach(() => {
        // Reset the document title before each test
        document.title = '';
        mockHead.mockClear(); // Clear mock calls before each test
    });

    it('renders children within the layout', () => {
        useRouter.mockReturnValue({
            pathname: '/',
            query: {},
            asPath: '/',
            push: jest.fn(),
            replace: jest.fn(),
            reload: jest.fn(),
            back: jest.fn(),
            prefetch: jest.fn(),
            beforePopState: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn(),
                emit: jest.fn(),
            },
        });

        const testText = 'Hello, Layout!';
        render(<Layout><p>{testText}</p></Layout>);
        expect(screen.getByText(testText)).toBeInTheDocument();
    });

    it('renders the provided title', () => {
        useRouter.mockReturnValue({
            pathname: '/',
            query: {},
            asPath: '/',
            push: jest.fn(),
            replace: jest.fn(),
            reload: jest.fn(),
            back: jest.fn(),
            prefetch: jest.fn(),
            beforePopState: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn(),
                emit: jest.fn(),
            },
        });
        const title = 'Custom Title';
        render(<Layout title={title} />);
        expect(mockHead).toHaveBeenCalledWith(
            expect.objectContaining({
                children: expect.arrayContaining([
                    expect.objectContaining({
                        type: 'title',
                        props: {
                            children: title,
                        },
                    }),
                ]),
            })
        );
    });

    it('renders the default title if no title is provided', () => {
        useRouter.mockReturnValue({
            pathname: '/',
            query: {},
            asPath: '/',
            push: jest.fn(),
            replace: jest.fn(),
            reload: jest.fn(),
            back: jest.fn(),
            prefetch: jest.fn(),
            beforePopState: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn(),
                emit: jest.fn(),
            },
        });
        render(<Layout />);
        expect(mockHead).toHaveBeenCalledWith(
            expect.objectContaining({
                children: expect.arrayContaining([
                    expect.objectContaining({
                        type: 'title',
                        props: {
                            children: 'This is the default title',
                        },
                    }),
                ]),
            })
        );
    });

    it('highlights the current link based on router pathname', () => {
        useRouter.mockReturnValue({
            pathname: '/about',
            query: {},
            asPath: '/about',
            push: jest.fn(),
            replace: jest.fn(),
            reload: jest.fn(),
            back: jest.fn(),
            prefetch: jest.fn(),
            beforePopState: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn(),
                emit: jest.fn(),
            },
        });
        render(<Layout />);
        const aboutLink = screen.getByText('About').closest('a');
        expect(aboutLink).toHaveClass('current');
    });

    it('does not highlight other links when a specific link is active', () => {
        useRouter.mockReturnValue({
            pathname: '/about',
            query: {},
            asPath: '/about',
            push: jest.fn(),
            replace: jest.fn(),
            reload: jest.fn(),
            back: jest.fn(),
            prefetch: jest.fn(),
            beforePopState: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn(),
                emit: jest.fn(),
            },
        });
        render(<Layout />);
        const homeLink = screen.getByText('Home').closest('a');
        expect(homeLink).not.toHaveClass('current');
    });

    it('renders car link with the provided carUri', () => {
        useRouter.mockReturnValue({
            pathname: '/cars',
            query: {},
            asPath: '/cars',
            push: jest.fn(),
            replace: jest.fn(),
            reload: jest.fn(),
            back: jest.fn(),
            prefetch: jest.fn(),
            beforePopState: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn(),
                emit: jest.fn(),
            },
        });
        const carUri = '/custom-cars';
        render(<Layout carUri={carUri} />);
        const carsLink = screen.getByText('Cars').closest('a');
        expect(carsLink).toHaveAttribute('href', carUri);
    });
});