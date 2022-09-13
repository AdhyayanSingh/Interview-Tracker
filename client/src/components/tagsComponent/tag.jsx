import React from 'react'
import { Link, withRouter } from 'react-router-dom';


const Topic = ({ data, match }) => {
    const param = match.params.topic;
    return (
        <div>
            {
                data === 'All' ?
                    <div className="tag">
                        <div className={`arrow ${!param ? 'active' : ''}`}>{`->`}</div>
                        <Link to={`/problemset`} className={`link ${!param ? 'active' : ''}`} >All</Link>
                    </div>
                    :
                    <div className="tag">
                        <div className={`arrow ${data === param ? 'active' : ''}`}>{`->`}</div>
                        <Link to={`/problemset/topicwise/${data}`} className={`link ${data === param ? 'active' : ''}`} >{`${data}`}</Link>
                    </div>
            }

        </div>
    )
}

export default withRouter(Topic);