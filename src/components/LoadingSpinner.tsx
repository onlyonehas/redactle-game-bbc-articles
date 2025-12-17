import React from 'react';

export const LoadingSpinner: React.FC = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px',
            color: '#666',
            fontSize: '1.2rem'
        }}>
            Loading article...
        </div>
    );
};
