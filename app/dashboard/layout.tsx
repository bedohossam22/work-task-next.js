'use client';
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton' // Make sure to import this

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        {/* Modified header section with logout button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <LogoutButton />
        </div>
        
        <nav>
          <ul className="space-y-2">
            <li><Link href="/dashboard" className="block p-2 hover:bg-gray-700">Home</Link></li>
            <li><Link href="/dashboard/quizzes" className="block p-2 hover:bg-gray-700">Quizzes</Link></li>
            <li><Link href="/dashboard/announcements" className="block p-2 hover:bg-gray-700">Announcements</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}