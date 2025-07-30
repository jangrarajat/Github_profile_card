import { useEffect, useState } from 'react'
import { FaGithub } from "react-icons/fa";
import './App.css'
import { tr } from 'framer-motion/client';

function App() {
  const [profilePic, setProfilePic] = useState()
  const [name, setName] = useState()
  const [bio, setBio] = useState()
  const [followers, setFollowers] = useState(0)
  const [following, setFollowing] = useState(0)
  const [repoLenth, setRepoLenth] = useState(0)
  const [repos, setRepos] = useState([])



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
            <td className='text-start p-2  '>
              < a href={repo.html_url}
                className='text-blue-400  hover:underline '
              > {repo.full_name}
              </a >
            </td>
            <td className='text-start  hidden md:flex'>
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
  }, [])




  return (
    <>


      <div className='bg-gray-900 p-3 px-5 pb-6 rounded-t-xl md:flex md:items-center'>
        <div className='text-white mt-[40px] justify-center items-center'>
          <img src={profilePic} alt="profilePic" className='w-full rounded-2xl' />
        </div>
        <div className='text-white '>
          <h1 className='font-bold text-5xl text-start mb-3 pl-2'>{name}</h1>
          <p className='text-start pl-3 flex items-center'><a href="https://github.com/jangrarajat" className='underline text-blue-400 flex items-center'> <FaGithub />  jangrarajat</a></p>
          <p className='text-start mb-3  '>
           <span className='ml-3  md:text-2xl '>{followers} </span> <span className='text-gray-400 text-sm'>Followers</span>
           <span className='ml-3  md:text-2xl '>{following}</span> <span  className='text-gray-400 text-sm'>Following</span>
           <span className='ml-3  md:text-2xl '>{repoLenth}</span> <span  className='text-gray-400 text-sm'>Repository</span>
          </p>
          <p className='text-start pl-3 '>{bio}</p>


        </div>



      </div>



      <div className='w-full bg-gray-900 pb-5 rounded-b-xl'>
        <div className='h-[2px] rounded-2 bg-amber-50 mx-20'></div>
        <br />
        <h1 className='text-white text-4xl mb-2'
        >All Repository
          <br className='md:hidden' />

        </h1>

        <div>
          <table className='border-collapse border border-gray-800  w-[95%] mx-auto   bg-gray-800 rounded-[8px]  text-gray-300'>
            <thead >
              <tr className='   w-[300px] bg-gray-950 text-white border-b-gray-800 '>
                <th className='p-2'>Repository</th>
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
