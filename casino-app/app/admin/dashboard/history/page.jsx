"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import './style.css'

function page() {
    const router = useRouter();
    useEffect(() => {
        const isAuthenticated = Cookies.get('admin-auth');
        if (!isAuthenticated) {
          router.push('/admin');
        } else {
        }
      }, [router]);

      const handleLogout = () => {
        Cookies.remove('admin-auth');
        router.push('/admin');
      };


  return (
    <div>
      history
    </div>
  )
}

export default page
