import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserSelector } from '../../redux/user/userSelector';
import { toggleSolved } from '../../api/index';
import { fetchUser } from '../../redux/user/userActions';

function Question({ question, user, checked, fetchUser }) {

    let ch = checked === undefined ? false : true;

    const toggleState = async (id) => {
        setState(e => !e);
        try {
            await toggleSolved(id);
            fetchUser();
        } catch (err) {
            alert(err.message);
        }
    };

    const [state, setState] = useState(ch);
    useEffect(() => {
        setState(ch);
    }, [ch]);



    return (
        <tr>
            <td className="col1">{question.index}</td>
            <td className="col2">
                <Link to={`/problemset/problem/${question.index}`} className="question-title">
                    {question.title}
                </Link>
            </td>
            {
                user ?
                    <td
                        className="col3"
                        onClick={(e) => toggleState(question.id)}
                        style={state ? { background: 'rgba(14,173,105,0.39)' } : {}}>
                        {
                            state ? 'Yes' : 'No'
                        }
                    </td>
                    :
                    null
            }
        </tr>
    )
}

const mapStateToProps = (state) => ({
    user: getUserSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
    fetchUser: () => dispatch(fetchUser()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Question));
