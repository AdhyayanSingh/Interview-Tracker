import React from 'react';
import { Link } from 'react-router-dom';

import './paginate.scss';

export default function Pagination({ items, paginate, page }) {
    const pagenumbers = [];

    for (let i = 1; i <= Math.ceil(items); i++) {
        pagenumbers.push(i);
    }
    return (
        <div className="pages">
            <div className="page">
                Page:
            </div>
            {pagenumbers.map(number => (
                <div key={number} className={`pageitem `}>
                    <Link to='/problemset' className={`link ${page === number ? 'active' : ''}`} onClick={() => paginate(number)}>{number}</Link>{number !== (pagenumbers.length) ? '-' : ''}
                </div>
            ))}
        </div>
    )
}
