import { store } from '@/store/store';
import { Provider } from 'react-redux';
import ClientRoot from './ClientRoot';
import './globals.css'; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientRoot>
          {children}
        </ClientRoot>
      </body>
    </html>
  );
}