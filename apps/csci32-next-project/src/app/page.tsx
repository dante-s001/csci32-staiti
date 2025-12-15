'use client'

import { useAuth } from '@/hooks/useAuth'
import type { Post } from '@/generated/graphql'
//import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

//query to get the posts from the backend
const GET_POSTS_QUERY = `
  query {
    posts {
      id
      title
      body
      imageUrl
      author {
        name
      }
      comments {
        id
        body
      }
    }
  }
`

//home page component
export default function Home() {
  //get the user info from the auth hook
  const { user } = useAuth()

  //this is used for redirecting the user if they are logged in (which I currently don't want to do)
  //const router = useRouter()

  //
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  //fetch the posts using the query to the api
  //useEffect makes it run only when the component has rendered
  //without useEffect, it would run every time the component renders, potentially causing in infinite loop of requests
  useEffect(() => {
    //define an async function to fetch the posts
    //useEffect doesn't support async functions directly, so it is only defined here and not executed yet
    //it is defined the first of the useEffect parameters
    const fetchPosts = async () => {
      //attempt the fetch using the "try" statement
      try {
        //if this part fails, it will skip to the "catch" statement
        //assign the response of the fetch from the api to the response" variable
        const response = await fetch('http://localhost:4000/api/graphql', {
          //there are many methods, icluding the following:
          //GET: retrieve data (it is not using this because that only takes urls, not body text (which is where the query goes))
          //POST: send data to the server (it is using this because the data it is sending includes a query, which returns the target information)
          //PUT: update existing data
          //PATCH: partially update existing data
          //DELETE: remove existing data
          //the fetch uses the POST method (since it is sending a request)
          method: 'POST',
          //the headers is used to indicate the type of content being sent
          //in this case it is JSON data
          headers: { 'Content-Type': 'application/json' },
          //turn the query into a JSON string
          body: JSON.stringify({ query: GET_POSTS_QUERY }),
        })

        //get the data from the response
        //this uses response.json() to parse the JSON data from the response
        //it then destructures the data object from the parsed JSON so we can use it
        const { data } = await response.json()
        //this statement updates the posts state with the posts information (so react detects a change and re-renders it)
        setPosts(data.posts)

        //if the try statement fails, it will skip to this statement and output an error
      } catch (error) {
        console.error('Failed to fetch posts:', error)
        //"finally" statements always run after the try/catch statements, even if the try failed.
      } finally {
        //this boolean is used later to indicate what should be displayed ("Loading posts" or "No posts yet")
        setLoading(false)
      }
    }

    //call the fetchPosts function defined earlier
    fetchPosts()

    //the empty dependency array is the second parameter of useEffect
    //an empty array means it only runs once the component renders for the first time (does not run on re-renders)
  }, [])

  //will redirect the user to the dashboard if they are logged in (not in use)
  // if (user) {
  //   router.push('/dashboard')
  //   return <div>Loading...</div>
  // }

  //page content
  return (
    <div className="flex flex-col">
      <div className="HEADER flex flex-col justify-center mx-auto bg-gray-300 h-16 w-screen border-b-2 border-gray-500 shadow-md">
        <div className="px-8 flex flex-row items-center content-center justify-between">
          <div className="flex-1"></div>
          <div className="text-2xl flex-1 text-center font-bold">My favorite games</div>
          {user ? (
            <div className="flex-1 flex justify-end items-center gap-4">
              <Link className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" href="/dashboard">
                Account
              </Link>
            </div>
          ) : (
            <div className="flex-1 flex justify-end items-center gap-4">
              <p className="">Please sign in to rate posts:</p>
              <Link className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" href="/welcome">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="mx-auto my-8 bg-gray-200 rounded-lg shadow-md">
        <h2 className="text-xl my-4 mx-4">
          Hello and thank you for visiting my website! My name is Dante, and this was created for my final project as
          part of my web development course.
        </h2>
        <h2 className="text-xl my-4 mx-4">
          Below you will find some of my favorite games. Feel free to take a look, and I hope this makes you want to try
          some of them if you haven&apos;t yet!
        </h2>
      </div>
      <hr className="border-2 mx-4 rounded-lg" />
      <div className="POST CONTENT px-8 py-6 max-w-3xl mx-auto w-full">
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="mb-6 p-4 bg-white rounded shadow">
              {post.imageUrl && (
                <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover rounded mb-4" />
              )}
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-2">{post.body}</p>
              <p className="text-sm text-gray-500">By: {post.author?.name || 'Anonymous'}</p>
              {post.comments && post.comments.length > 0 && (
                <div className="mt-4 pl-4 border-l-2 border-gray-300">
                  <p className="font-semibold text-sm">Comments:</p>
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="mt-2">
                      <p className="text-gray-600">{comment.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
