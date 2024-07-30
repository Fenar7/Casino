"use client";
import './dashboard.css';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AdminDashboard() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    time1hour: '',
    time1minute: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));

    console.log(formData)
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await fetch('/api/addTime1', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
  });

  if (response.ok) {
      router.push('/');
  } else {
      console.error('Failed to register user', response);
  }
};

  useEffect(() => {
    const isAuthenticated = Cookies.get('admin-auth');
    if (!isAuthenticated) {
      router.push('/admin');

      
    } else {
      // fetchData();
    }
  }, [router]);

  const handleLogout = () => {
    Cookies.remove('admin-auth');
    router.push('/admin');
  };

  return (
    <>
      <section className="dashboard-container-main container">
        <div className="heading d-flex align-items-center justify-content-between text-center margin-top margin-bottom">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="btnn mt-3">Logout</button>
        </div>

        <form className="d-flex flex-column align-items-center justify-content-center" onSubmit={handleSubmit}>
        <div className="row-main mg-top">
          <div className="form-group custom-select-wrapper">
            <label htmlFor="username">Time1Hour</label>
            <div className="custom-select-container">
              <input type="text" className="form-control custom-select" value={formData.time1hour} onChange={handleChange} name="time1hour"/>
            </div>
          </div>
        </div>
        <div className="row-main mg-bottom">
        <div className="form-group custom-select-wrapper">
            <label htmlFor="password">Time1Minute</label>
            <div className="custom-select-container">
              <input type="text" className="form-control custom-select" value={formData.time1minute} onChange={handleChange} name="time1minute"/>
            </div>
          </div>
        </div>
        <button type="submit userlogin-button">Save</button>
      </form>
      </section>
    </>
  );
}
