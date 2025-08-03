import { useEffect, useState } from 'react'
import { FaGithub } from "react-icons/fa";

import './App.css'


function App() {
  const [profilePic, setProfilePic] = useState()
  const [name, setName] = useState()
  const [bio, setBio] = useState()
  const [followers, setFollowers] = useState(0)
  const [following, setFollowing] = useState(0)
  const [repoLenth, setRepoLenth] = useState(0)
  const [repos, setRepos] = useState([])
  const [laoding, setLaoding] = useState(true)
  const [followBox, setFollowerBox] = useState(false)
  const [followingBox, setFollowingBox] = useState(false)
  const [followerData, setFollowerData] = useState([])
  const [followingData, setFollowingData] = useState([])

  async function getGithubData() {
    try {
      const res = await fetch("https://api.github.com/users/jangrarajat")
      const data = await res.json();
      setName(() => data.name)
      setFollowers(() => data.followers)
      setFollowing(() => data.following)
      setProfilePic(() => data.avatar_url)
      setBio(() => data.bio)
    } catch (error) {
      throw error;
    } finally {
      setLaoding(false)
    }
  }



  async function getFollowData() {
    try {
      const res = await fetch("https://api.github.com/users/jangrarajat/followers")
      const data = await res.json();
      setFollowerData(
        data.map((follow) => (
          <td className='text-start p-2 ' key={follow.id}>
            <div className='flex gap-2 items-center'>
              <img className='h-8 w-8 rounded-full' src={follow.avatar_url} alt="logo" />
              <p className='text-sm'>{follow.login}</p>
            </div>
            <div className='h-[1px] bg-gray-800 w-[96%] mt-2 '></div>
          </td>
        ))
      )

    } catch (error) {
      console.log("follower geting data error", error)
      throw error
    }
  }

  async function getFollowingData() {
    try {
      const res = await fetch("https://api.github.com/users/jangrarajat/following")
      const data = await res.json();
      setFollowingData(
        data.map((follow) => (
          <td className='text-start p-2  ' key={follow.id}>
            <div className='flex gap-2 items-center'>
              <img className='h-8 w-8 rounded-full' src={follow.avatar_url} alt="logo" />
              <p className='text-sm'>{follow.login}</p>
            </div>
            <div className='h-[1px] bg-gray-800 w-[96%] mt-2 '></div>
          </td>
        ))
      )

    } catch (error) {
      console.log("follower geting data error", error)
      throw error
    }
  }

  async function getGitRepo() {
    try {
      const res = await fetch("https://api.github.com/users/jangrarajat/repos")
      const data = await res.json()
      setRepoLenth(() => data.length)


      setRepos(
        data.map((repo) => (

          <tr key={repo.id} className='border-b-2 px-3 border-gray-800 bg-gray-900'>
            <td className='text-start p-2 border border-gray-800'>
              < a href={repo.html_url}
                className='text-blue-400  hover:underline '
              > {repo.full_name}
              </a >
            </td>
            <td className='text-start  hidden md:flex pl-2'>
              {repo.description}
            </td>
          </tr>

        ))
      )



    } catch (error) {
      console.log('error', error)
      throw error
    }
  } () => {

  }

  useEffect(() => {
    getGitRepo()
    getGithubData()
    getFollowData()
    getFollowingData()
  }, [])




  return (
    <>
      {/* profile card section  */}
      {laoding ? (<>
        <div className='w-full h-full fixed bg-transparent flex items-center justify-center '>
          <div className='h-28 w-28 bo rounded-full  border-[10px] border-b-gray-400 animate-spin   '></div>

        </div>
      </>) : (<></>)}


      <div className='bg-gray-900 p-3 px-5 pb-6  md:flex md:items-center'>
        <div className='text-white mt-[40px] justify-center items-center'>
          <img src={profilePic} alt="profilePic" className='w-full rounded-2xl' />
        </div>
        <div className='text-white '>
          <h1 className='font-bold text-5xl text-start mb-3 pl-2'>{name}</h1>
          <p className='text-start pl-3 flex items-center'><a href="https://github.com/jangrarajat" className='underline text-blue-400 flex items-center'> <FaGithub />  jangrarajat</a></p>
          <p className='text-start mb-3  '>
            <span className='ml-3  md:text-2xl '>{followers} </span> <span className='text-gray-400 text-sm cursor-pointer' onClick={() => setFollowerBox(followBox ? false : true)}>Followers</span>
            <span className='ml-3  md:text-2xl '>{following}</span> <span className='text-gray-400 text-sm  cursor-pointer' onClick={() => setFollowingBox(followingBox ? false : true)}>Following</span>
            <span className='ml-3  md:text-2xl '>{repoLenth}</span> <span className='text-gray-400 text-sm ' >Repository</span>
          </p>
          <p className='text-start pl-3 '>{bio}</p>


        </div>



      </div>



      {/* followerBox Section  */}

      {followBox || followingBox ? (
        <>
          <div className='bg-gray-900 flex flex-col justify-center md:flex-row'>
            {followBox ? (<>
              <div className='bg-gray-900 w-full md:w-[40%] '>
                <table className='mb-4 w-[90%] mx-auto rounded-[8px]  text-gray-300'>
                  <thead>
                    <tr className='   w-[300px] bg-gray-950 text-white border-b-gray-800 '>
                      <th className='p-2 border border-gray-800'>followers</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='px-3  bg-gray-900 flex flex-col'>
                      {followerData}
                    </tr>
                  </tbody>
                </table>


              </div>
            </>) : (<></>)}

            {followingBox ? (<>
              <div className='bg-gray-900 w-full md:w-[40%] '>

                <table className='  w-[90%] mx-auto  bg-gray-800 rounded-[8px]  text-gray-300'>
                  <thead >
                    <tr className='   w-[300px] bg-gray-950 text-white  '>
                      <th className='p-2 '>following</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='b px-3  bg-gray-900 flex flex-col '>
                      {followingData}

                    </tr>

                  </tbody>
                </table>
              </div>
            </>) : (<></>)}
          </div>
        </>) : (<></>)}





      {/* Repository table section  */}

      <div className='w-full bg-gray-900 pb-5 '>

        <br />


        <div>
          <table className='border-collapse border border-gray-800  w-[95%] mx-auto   bg-gray-800 rounded-[8px]  text-gray-300'>
            <thead >
              <tr className='   w-[300px] bg-gray-950 text-white border-b-gray-800 '>
                <th className='p-2 border border-gray-800'>Repository</th>
                <th className='text-start  p-2 hidden md:flex'>discraption</th>
              </tr>
            </thead>
            <tbody>
              {repos}
            </tbody>
          </table>
        </div>

      </div>

    </>
  )
}

export default App
