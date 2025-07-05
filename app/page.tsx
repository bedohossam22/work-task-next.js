import Link from 'next/link'

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Quiz Dashboard</h1>
      <Link href="/login" className="text-blue-500 underline">
        Go to Login
      </Link>
    </main>
  )
}