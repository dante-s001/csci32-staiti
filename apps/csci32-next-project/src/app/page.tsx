import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col justify-center mx-auto m-24 bg-gray-200 h-64 w-screen rounded-lg">
      <div className="px-8">
        <div className="text-2xl ">Welcome to my website!</div>
        <div>
          Here are the available pages:
          <ul>
            <li>
              <a className="text-blue-500 underline" href="/button" target="_blank">
                Button Page
              </a>
            </li>
            <li>
              <a className="text-blue-500 underline" href="/input" target="_blank">
                Input Page
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
