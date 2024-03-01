import React, { useEffect, useState } from 'react'
import PostThumb from '../PostThumb'

const Posts = ({auth, profile, dispatch, id}) => {
    const [posts, setPosts] = useState([])
    const [result, setResult] = useState(9)

    useEffect(() => {
        profile.posts.forEach(data => {
            if(data._id === id){
                setPosts(data.posts)
                setResult(data.result)
                // setPage(data.page)
            }
        })
    },[profile.posts, id])

    return (
        <div>
            <PostThumb posts={posts} result={result} />
        </div>
    )
}

export default Posts