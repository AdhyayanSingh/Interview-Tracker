import React from 'react';

const ObjectProblemsetListItem = ({ list }) => {
    return (
        <div className="list-item-wrapper">
            <p className="playlist-name">{list?.name}</p>
            <table>
                <tbody>
                    {
                        list?.list.map((item, i) =>
                            <tr>
                                <td className="list-item-index">{i + 1}</td>
                                <td className="list-item"><a href={item.link} target="_blank" rel="noreferrer" className="list-item-title">{item.title}</a></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ObjectProblemsetListItem;
