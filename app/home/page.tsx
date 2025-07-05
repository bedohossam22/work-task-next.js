import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-bold">Home</h1>
      <p>You need to login to access the dashboard</p>
      <Link 
        href="/login"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Go to Login
      </Link>
    </div>
  );
}