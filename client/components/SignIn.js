import React from 'react'
import Input from './Input'
import OAuth from './OAuth'

function SignIn({ view, username, password, email, error, setEmail, setUsername, setPassword, login, register, toggleView }) {
  return (
    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full border border-zinc-700">
      <h2 className="text-white text-3xl mb-8 font-bold">
        {view === 'login' ? 'Sign in' : 'Register'}
      </h2>
      <div className="flex flex-col gap-4">
        {view === 'register' && (
        <Input
            label="Email"
            onChange={((e) => setEmail(e.target.value))}
            id="email"
            type="email"
            value={email}
            />
        )}
        <Input
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            value={username}
        />
        <Input
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            value={password}
        />
        {error && <p className="text-red-500 text-sm px-4 m-auto">{error}</p>}
      </div>
      <button onClick={view === "login" ? login : register} className="bg-blue-600 py-3 text-white rounded-md w-full mt-10 hover:bg-blue-700 transition">
        {view === "login" ? "Login" : "Sign up"}
      </button>
      <OAuth />
      <p className="text-neutral-500 mt-12 text-sm">
        {view === "login" ? "First time using Rate the Meme?" : "Already have an account?"}
        <span onClick={toggleView} className="text-white ml-1 hover:underline cursor-pointer">
          {view === "login" ? "Create an account" : "Login"}
        </span>        
      </p>
    </div>
  )
}

export default SignIn
