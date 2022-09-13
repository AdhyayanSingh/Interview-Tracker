import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
export default function ObjectProblemsetList({ list, index, func }) {

    const loc = useLocation();
    let val = queryString.parse(loc.search);

    const handleClick = () => {
        func(list.name)
    }
    return (
        <tr>
            <td className={`list-index ${val.problemset === list.name ? 'active' : ''}`}>{index}</td>
            <td className={`list-name ${val.problemset === list.name ? 'active' : ''}`} onClick={handleClick}>{list.name}</td>
        </tr>
    )
}
