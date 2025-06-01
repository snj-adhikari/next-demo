import React from 'react';
import { render, screen } from '@testing-library/react';
import PageInfo from './PageInfo';
import { PageData } from '../interfaces';

const mockPageInfo = {
    title: 'Test Title',
    content: 'Test Content',
    uri: '/test-uri',
    id: '1',
    date: '2023-01-01',
    slug: 'test-title',
    excerpt: 'Test excerpt',
};

describe('PageInfo Component', () => {
    it('renders the title and content correctly', () => {
        render(<PageInfo pageInfo={mockPageInfo} />);
        const titleElement = screen.getByText('Test Title');
        const contentElement = screen.getByText('Test Content');

        expect(titleElement).toBeInTheDocument();
        expect(contentElement).toBeInTheDocument();
    });

    it('renders without errors when pageInfo is not provided', () => {
        render(<PageInfo pageInfo={null as PageData} />);
    });

    it('renders empty title and content when pageInfo is empty', () => {
        render(
            <PageInfo
                pageInfo={{
                    title: '',
                    content: '',
                    uri: '',
                    id: '',
                    date: '',
                    slug: '',
                    excerpt: '',
                }}
            />
        );
        const titleElement = screen.getByRole('heading', { level: 1 });

        expect(titleElement).toBeInTheDocument();
    });
});