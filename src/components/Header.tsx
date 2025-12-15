import React from 'react';

interface HeaderProps {
    articleId: string;
    headlineRevealed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ articleId, headlineRevealed }) => {
    return (
        <header style={{
            backgroundColor: '#bb1919', // BBC Red
            color: 'white',
            borderBottom: '1px solid #991414',
            marginBottom: '1.5rem',
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '4rem',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* BBC Logo Block */}
                    <div style={{
                        backgroundColor: 'white',
                        padding: '0 0.5rem',
                        height: '2rem',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <span style={{
                            color: '#bb1919',
                            fontWeight: 900,
                            fontSize: '1.2rem',
                            letterSpacing: '-0.5px'
                        }}>BBC</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '1.4rem' }}>NEWS</span>
                        <span style={{
                            borderLeft: '1px solid rgba(255,255,255,0.3)',
                            height: '1.5rem',
                            margin: '0 0.5rem'
                        }}></span>
                        <span style={{ fontWeight: 400, fontSize: '1.4rem', letterSpacing: '0.5px' }}>REDACTLE</span>
                    </div>
                </div>

                <div style={{
                    fontSize: '0.9rem',
                    opacity: 0.9,
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center'
                }}>
                    <span>#{articleId}</span>
                    <button style={{
                        backgroundColor: 'transparent',
                        border: '1px solid white',
                        fontSize: '0.8rem',
                        padding: '0.4em 0.8em'
                    }}>How to Play</button>
                </div>
            </div>
        </header>
    );
};
