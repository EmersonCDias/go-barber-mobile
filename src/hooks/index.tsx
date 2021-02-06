import React from 'react';

import { AuthProvider } from './AuthHook';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    {children}
  </AuthProvider>
);

export default AppProvider;
