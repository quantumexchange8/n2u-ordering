import React from 'react';

const Circle = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <g clipPath="url(#clip0_1_1013)">
            <path d="M8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8C14.6668 4.3181 11.6821 1.33333 8.00016 1.33333C4.31826 1.33333 1.3335 4.3181 1.3335 8C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667Z" stroke="#D6EEFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_1_1013">
                <rect width="16" height="16" fill="white"/>
            </clipPath>
            </defs>
        </svg>
    );
}

const XIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5L15 15" stroke="#A1A1AA" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

export { 
    Circle,
    XIcon,
};