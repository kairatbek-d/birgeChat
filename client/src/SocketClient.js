import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { POST_TYPES } from './redux/actions/postAction'
import { GLOBALTYPES } from './redux/actions/globalTypes'

const SocketClient = () => {
    const auth = useSelector(state => state.auth)
    const socket = useSelector(state => state.socket.socket)
    
    const dispatch = useDispatch()

    // joinUser
    useEffect(() => {
        socket.emit('joinUser', auth.user)
    }, [socket, auth.user])

    // Likes
    useEffect(() => {
        socket.on('likeToClient', newPost =>{
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })

        return () => socket.off('likeToClient')
    },[socket, dispatch])

    useEffect(() => {
        socket.on('unLikeToClient', newPost =>{
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })

        return () => socket.off('unLikeToClient')
    },[socket, dispatch])

    // Comments
    useEffect(() => {
        socket.on('createCommentToClient', newPost =>{
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })

        return () => socket.off('createCommentToClient')
    },[socket, dispatch])

    useEffect(() => {
        socket.on('deleteCommentToClient', newPost =>{
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })

        return () => socket.off('deleteCommentToClient')
    },[socket, dispatch])

    // Follow
    useEffect(() => {
        socket.on('followToClient', newUser =>{
            dispatch({type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})
        })

        return () => socket.off('followToClient')
    },[socket, dispatch, auth])

    useEffect(() => {
        socket.on('unFollowToClient', newUser =>{
            console.log(newUser)
            dispatch({type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})
        })

        return () => socket.off('unFollowToClient')
    },[socket, dispatch, auth])

    return (
        <></>
    )
}

export default SocketClient