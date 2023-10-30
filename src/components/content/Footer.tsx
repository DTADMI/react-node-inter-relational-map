import React from 'react';

export const Footer = () => {
    return (
        <>
            <div className="footer-wrapper w-100">
                <div className="tm-container">
                    <span className="tm-text text-xs-center">&copy;{new Date().getFullYear()} Darryl TADMI.</span>
                    <span className="tm-text text-xs-center">&nbsp;All Rights Reserved.</span>
                </div>
            </div>
        </>
    );
};
