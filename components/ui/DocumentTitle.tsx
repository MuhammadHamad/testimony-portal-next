'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface DocumentTitleProps {
    title: string; // Prop to receive the title
    children: React.ReactNode; // Prop to receive child components
}

const DocumentTitle: React.FC<DocumentTitleProps> = ({ title, children }) => {
    const pathname = usePathname(); // Get the current path

    useEffect(() => {
        // Set the document title
        document.title = title || 'Default Title';
    }, [title]);

    return <>{children}</>; // Render children
};

export default DocumentTitle;