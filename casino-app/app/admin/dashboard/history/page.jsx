"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import './style.css';

function HistoryPage() {
    const router = useRouter();
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        const isAuthenticated = Cookies.get('admin-auth');
        if (!isAuthenticated) {
            router.push('/admin');
        } else {
            fetchHistoryData();
        }
    }, [router]);

    const fetchHistoryData = async () => {
        try {
            const response = await fetch('/api/history');
            if (response.ok) {
                const data = await response.json();
                setHistoryData(data);
            } else {
                console.error('Failed to fetch history data');
            }
        } catch (error) {
            console.error('Error fetching history data:', error);
        }
    };

    const handleLogout = () => {
        Cookies.remove('admin-auth');
        router.push('/admin');
    };

    return (
        <>
            <section className="dashboard-container-main container">
                <div className="heading d-flex align-items-center justify-content-between text-center margin-top margin-bottom">
                    <h1>History</h1>
                    <div className="sidebar d-flex align-items-center">
                        <a href="/admin/dashboard/">Dashboard</a>
                        <button onClick={handleLogout} className="btnn">Logout</button>
                    </div>
                </div>

                <div className="history-list">
                    {historyData.length > 0 ? (
                        historyData.map((item, index) => {
                            const formattedDate = new Date(item.date).toISOString().split('T')[0];
                            return (
                                <div key={index} className="history-item">
                                    <h2>Date: {formattedDate}</h2>
                                    <p>Time1: {item.time1number || 'N/A'}</p>
                                    <p>Time2: {item.time2number || 'N/A'}</p>
                                    <p>Time3: {item.time3number || 'N/A'}</p>
                                    <p>Time4: {item.time4number || 'N/A'}</p>
                                </div>
                            );
                        })
                    ) : (
                        <p>No history data available.</p>
                    )}
                </div>
            </section>
        </>
    );
}

export default HistoryPage;
