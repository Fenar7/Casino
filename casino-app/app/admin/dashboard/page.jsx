"use client";
import './dashboard.css';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AdminDashboard() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    time1number: '',
    time2number: '',
    time3number: '',
    time4number: '',
  });

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
    const response = await fetch('/api/addTime1Number', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (response.ok) {
        router.push('/');
    } else {
        console.error('Failed to add data', response);
    }
  };

  useEffect(() => {
    const isAuthenticated = Cookies.get('admin-auth');
    if (!isAuthenticated) {
      router.push('/admin');
    } else {
      // Fetch data if authenticated
      const fetchData = async () => {
        try {
          const response = await fetch('/api/fetchData'); // Adjust the API endpoint if necessary
          if (response.ok) {
            const data = await response.json();
            console.log('Fetched data:', data);

            // Update formData with the fetched data if needed
            setFormData({
              time1number: data.time1number || '',
              time2number: data.time2number || '',
              time3number: data.time3number || '',
              time4number: data.time4number || '',
            });
          } else {
            console.error('Failed to fetch data', response);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData(); // Call the fetchData function
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
          <div className="sidebar d-flex align-items-center">
          <a href="/admin/dashboard/history">History</a>
          <button onClick={handleLogout} className="btnn">Logout</button>
          </div>
        </div>

        <form className="d-flex flex-column align-items-center justify-content-center" onSubmit={handleSubmit}>
          <div className="row-main mg-top">
            <div className="form-group custom-select-wrapper">
              <label htmlFor="time1number">Time 1 Number 12:00 PM</label>
              <div className="custom-select-container">
                <input type="text" className="form-control custom-select" value={formData.time1number} onChange={handleChange} name="time1number"/>
              </div>
            </div>
          </div>

          <div className="row-main mg-bottom">
            <div className="form-group custom-select-wrapper">
              <label htmlFor="time2number">Time 2 Number 2:00 PM</label>
              <div className="custom-select-container">
                <input type="text" className="form-control custom-select" value={formData.time2number} onChange={handleChange} name="time2number"/>
              </div>
            </div>
          </div>

          <div className="row-main mg-bottom">
            <div className="form-group custom-select-wrapper">
              <label htmlFor="time3number">Time 3 Number 4:00 PM</label>
              <div className="custom-select-container">
                <input type="text" className="form-control custom-select" value={formData.time3number} onChange={handleChange} name="time3number"/>
              </div>
            </div>
          </div>

          <div className="row-main mg-bottom">
            <div className="form-group custom-select-wrapper">
              <label htmlFor="time4number">Time 4 Number 5:00 PM</label>
              <div className="custom-select-container">
                <input type="text" className="form-control custom-select" value={formData.time4number} onChange={handleChange} name="time4number"/>
              </div>
            </div>
          </div>

          <button type="submit" className="userlogin-button">Save</button>
        </form>
      </section>
    </>
  );
}
