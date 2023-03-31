import React from 'react';
import AuthProvider from './context/AuthContext';
import AppNav from './screens/AppNav';
import { StatusBar } from 'expo-status-bar';
export default function App() {
  return (

    <AuthProvider>
      <StatusBar style="auto"/>
      <AppNav />
    </AuthProvider>
  );
}