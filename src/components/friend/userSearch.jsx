import React, { useEffect } from 'react';
import WithSpinner from '../../components/withSpinner/withSpinner';
import { useParams } from 'react-router-dom';
import { fetchObject } from '../../redux/object/objectAction';
import { connect } from 'react-redux';
import { isLoading } from '../../redux/object/objectSelector';
import ObjectActionComponent from './objectActionsComponent';

const UserWithSpinner = WithSpinner(ObjectActionComponent);

function UserSearch({ fetchObject, isLoading }) {

    const { username } = useParams();

    useEffect(() => {
        fetchObject(username);
    }, [fetchObject, username]);

    return (
        <div>
            <UserWithSpinner isLoading={!isLoading} />
        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    fetchObject: (username) => dispatch(fetchObject(username))
});

const mapStateToProps = (state) => ({
    isLoading: isLoading(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);
