"use client"
import Dashboard from '@/components/dashboard/Dashboard'
import { useAuth } from '@/context/Authontext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import NotFound from '../not-found';

const DashboardPage = () => {
  const { userData } = useAuth();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const roles = userData?.userData?.roles?.map((item) => item.id);
    if (!roles || !roles.includes(4)) {
      router.push("/login");
    } else {
      setIsVerified(true); // Permitir que el componente se renderice
    }
  }, [userData, router]);

  if (!isVerified) {
    return (NotFound())// Mostrar nada mientras se verifica
  }

  return (
    <Dashboard/>
  )
}

export default DashboardPage