import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Avatar from '../Avatar'
import { getProfileUsers } from '../../redux/actions/profileAction'
import EditProfile from './EditProfile'
import FollowBtn from '../FollowBtn'

const Info = () => {
    const { id } = useParams()
    const auth = useSelector(state => state.auth)
    const profile = useSelector(state => state.profile)
    const dispatch = useDispatch()

    const [userData, setUserData] = useState([])
    const [onEdit, setOnEdit] = useState(false)

    useEffect(() => {
        if(id === auth.user._id) {
            setUserData([auth.user])
        } else {
            dispatch(getProfileUsers({users: profile.users, id, auth}))
            const newData = profile.users.filter(user => user._id === id)
            setUserData(newData)
        }

    }, [id, auth, dispatch, profile.users])

    return (
        <>
            {
                userData.map(user => (
                    <div className="info_container" key={user._id}>
                        <Avatar src={user.avatar} size="supper-avatar" />

                        <div className="info_content">
                            <div className="info_content_title">
                                <h2>{user.username}</h2>
                                {
                                    user._id === auth.user._id
                                    ? <button className="btn btn-outline-info"
                                    onClick={() => setOnEdit(true)}>
                                        Edit Profile
                                    </button>
                                    : <FollowBtn />
                                }
                            </div>

                            <div className="follow_btn">
                                <span className="mr-4">
                                    {user.followers.length} Followers
                                </span>
                                <span>
                                    {user.following.length} Following
                                </span>
                            </div>

                            <h6>{user.fullname} <span className="text-danger">{user.mobile}</span></h6>
                            <p className="m-0" >{user.address}</p>
                            <h6 className="m-0">{user.email}</h6>
                            <a href={user.website} target="_blank" rel="noreferrer">
                                {user.website}
                            </a>
                            <p>{user.story}</p>
                        
                            {
                                onEdit && <EditProfile setOnEdit={setOnEdit} />
                            }
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default Info