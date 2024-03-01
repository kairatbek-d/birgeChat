import React, { useEffect } from 'react'
import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import { useDispatch, useSelector } from 'react-redux'
import LoadIcon from '../../images/loading.gif'
import { useParams } from 'react-router-dom'
import { getProfileUsers } from '../../redux/actions/profileAction'

const Profile = () => {
    const profile = useSelector(state => state.profile)
    const auth = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const { id } = useParams()
    // const [saveTab, setSaveTab] = useState(false)

    useEffect(() => {
        if(profile.ids.every(item => item !== id)){
            dispatch(getProfileUsers({id, auth}))
        }
    },[id, auth, dispatch, profile.ids])

    return (
        <div className="profile">

            <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

            {
                profile.loading
                ? <img className="d-block mx-auto my-4" src={LoadIcon} alt="loading" />
                : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
            }
        </div>
    )
}

export default Profile