import React from 'react';
import { deleteComment } from '../../api/index';
import { fetchQuestion } from '../../redux/question/questionAction.js';
import { connect } from 'react-redux';
import { baseURI } from '../../api/index';

import './comment.scss';

function Comment({ comment, user, fetchQuestion, idx }) {

    const onDeleteComment = async () => {
        try {
            await deleteComment(comment._id);
            fetchQuestion(idx);
        } catch (err) {
            alert(err.response.data.message);
        }
    }

    const timeDelta = () => {
        const timeNow = 1 * Date.now();
        let timeDelta = timeNow - (comment?.date);
        timeDelta = Math.floor(timeDelta / 1000);
        let timeStr = ''
        if (timeDelta < 24 * 60 * 60) {
            let h = Math.floor(timeDelta / 3600);
            let m = (Math.floor(timeDelta / 60)) % 60;
            let s = timeDelta % 60;
            if (h > 0) timeStr = `${h}h`;
            else if (m > 0) timeStr = `${m}m`;
            else timeStr = `${s}s`;
        } else {
            let d = Math.floor(timeDelta / (24 * 60 * 60));
            timeStr = `${d}d`;
        }
        return timeStr;
    }

    return (
        <div className="comment-wrapper">
            <div className="comment-header">
                <div className="image">
                    <img className="user-image" src={`${baseURI}/images/user/${comment?.user.photo}`} alt=''></img>
                </div>
                <div className="username">
                    <p className="name">{comment?.user.username}</p>
                </div>
                <div className="time">
                    <p className="comment-date">{timeDelta()}</p>
                </div>
            </div>

            <div className="comment-body">
                <p className="comment-text">{comment?.text}</p>
            </div>
            {
                user?._id === comment?.user?._id ?
                    <div className="remove-button-container">
                        <button className="remove-btn" onClick={onDeleteComment}>Remove</button>
                    </div> :
                    null
            }
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    fetchQuestion: (id) => dispatch(fetchQuestion(id)),
});

export default connect(null, mapDispatchToProps)(Comment);