import React from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'

const UserPage = () => {
  return (
    <>
    <UserHeader/>
    <UserPost likes={1200} replies={481} postImg='/post1.png' postTitle={"let's talk about threads."}/>
    <UserPost likes={451} replies={43} postImg='/post2.png' postTitle={"Its's a post of mine"}/>
    <UserPost likes={777} replies={876} postImg='/post3.png' postTitle={"I love coding."}/>
    <UserPost likes={233} replies={677}  postTitle={"No caption..."}/>
   
    </>
  )
}

export default UserPage