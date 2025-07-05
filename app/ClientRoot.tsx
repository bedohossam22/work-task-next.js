'use client';

import { store } from '@/store/store';
import { Provider } from 'react-redux';
import { AuthProvider } from '@/context/AuthContext';

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Provider>
  );
}