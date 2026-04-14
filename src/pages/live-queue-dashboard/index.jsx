import React, { useState, useEffect } from 'react';
import LiveQueueDashboard from './LiveQueueDashboard';

const LIVE_QUEUE_MOCK_DATA = {
  header: {
    labWait: 4,
    pharmacyWait: 9,
    user: {
      name: 'Eng. Ahmed X',
      role: 'CRM Specialist',
    }
  },
  stats: {
    waiting: { value: 27, trend: '+4', trendText: 'since last hour', trendUp: true },
    avgWaitTime: { value: '18m', trend: '-2m', trendText: 'vs yesterday avg', trendUp: false },
    activeInteractions: { value: 8, detail: '5 Call Center, 3 WhatsApp' },
    completedToday: { value: 142, detail: 'On track for daily target' }
  },
  tabs: [
    { label: 'Live Queue', count: 27, active: true },
    { label: 'OPD Clinics', count: 12, active: false },
    { label: 'Laboratory', count: 4, active: false },
    { label: 'Radiology', count: 5, active: false },
    { label: 'OR Theatre', count: 2, active: false },
    { label: 'Completed', count: 142, active: false }
  ],
  queueData: [
    { 
      id: 1, token: "OPD-042", patientName: "Sarah Jenkins", mrn: "MRN-847291", 
      dept: "Cardiology", provider: "Dr. Ahmed Hassan", 
      source: "Call Center", sourceIcon: "phone", 
      arrival: "10:15 AM", waitTime: "45 mins", waitTimeColor: "red", 
      status: "Waiting", statusType: "warning", 
      actionText: "Call Next", actionType: "primary" 
    },
    { 
      id: 2, token: "LAB-018", patientName: "Mohammed Ali", mrn: "MRN-102934", 
      dept: "Main Laboratory", provider: "Blood Draw Room 2", 
      source: "WhatsApp", sourceIcon: "message", 
      arrival: "10:45 AM", waitTime: "15 mins", waitTimeColor: "yellow", 
      status: "Waiting", statusType: "warning", 
      actionText: "Call Next", actionType: "primary" 
    },
    { 
      id: 3, token: "RAD-005", patientName: "Fatima Noor", mrn: "MRN-552190", 
      dept: "Radiology", provider: "MRI Scan Room", 
      source: "Walk-In", sourceIcon: "walk", 
      arrival: "10:00 AM", waitTime: "-", waitTimeColor: "gray", 
      status: "In Progress", statusType: "info", 
      actionText: "View Details", actionType: "secondary" 
    },
    { 
      id: 4, token: "OPD-043", patientName: "Kareem Youssef", mrn: "MRN-998231", 
      dept: "Orthopedics", provider: "Dr. Samy Tariq", 
      source: "Call Center", sourceIcon: "phone", 
      arrival: "10:55 AM", waitTime: "5 mins", waitTimeColor: "green", 
      status: "Waiting", statusType: "warning", 
      actionText: "Call Next", actionType: "primary" 
    },
    { 
      id: 5, token: "OR-012", patientName: "Omar Farooq", mrn: "MRN-334211", 
      dept: "OR Theatre", provider: "General Surgery - Dr. Kamal", 
      source: "Call Center", sourceIcon: "phone", 
      arrival: "11:30 AM", waitTime: "Scheduled", waitTimeColor: "gray", 
      status: "Pre-Op", statusType: "purple", 
      actionText: "Admit Patient", actionType: "primary" 
    },
    { 
      id: 6, token: "OPD-039", patientName: "Emily Clark", mrn: "MRN-112048", 
      dept: "Pediatrics", provider: "Dr. Mona Kamal", 
      source: "WhatsApp", sourceIcon: "message", 
      arrival: "09:15 AM", waitTime: "-", waitTimeColor: "gray", 
      status: "Completed", statusType: "success", 
      actionText: "View Details", actionType: "secondary" 
    }
  ]
};

const LiveQueueDashboardIndex = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(LIVE_QUEUE_MOCK_DATA);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFBFC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium">Loading live queue...</span>
        </div>
      </div>
    );
  }

  return <LiveQueueDashboard data={data} />;
};

export default LiveQueueDashboardIndex;
