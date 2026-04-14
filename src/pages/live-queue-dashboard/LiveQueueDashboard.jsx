import React from 'react';
import GlobalTopBar from '../../components/live-queue-dashboard/GlobalTopBar';
import Header from '../../components/live-queue-dashboard/Header';
import StatsCard from '../../components/live-queue-dashboard/StatsCard';
import QueueTable from '../../components/live-queue-dashboard/QueueTable';

import { Users, Clock, Headset, CheckCircle2 } from 'lucide-react';

const LiveQueueDashboard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#FAFBFC] font-sans text-gray-900 flex flex-col">
      <GlobalTopBar data={data.header} />
      
      <main className="flex-1 max-w-[1400px] w-full mx-auto p-6 lg:p-8">
        <Header />

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Patients Waiting" 
            value={data.stats.waiting.value} 
            icon={Users} 
            iconBg="bg-blue-50" 
            iconColor="text-blue-500"
            trend={data.stats.waiting.trend}
            trendText={data.stats.waiting.trendText}
            trendUp={data.stats.waiting.trendUp}
          />
          <StatsCard 
            title="Avg. Wait Time" 
            value={data.stats.avgWaitTime.value} 
            icon={Clock} 
            iconBg="bg-orange-50" 
            iconColor="text-orange-500"
            trend={data.stats.avgWaitTime.trend}
            trendText={data.stats.avgWaitTime.trendText}
            trendUp={data.stats.avgWaitTime.trendUp}
          />
          <StatsCard 
            title="Active Interactions" 
            value={data.stats.activeInteractions.value} 
            icon={Headset} 
            iconBg="bg-fuchsia-50" 
            iconColor="text-fuchsia-500"
            detail={data.stats.activeInteractions.detail}
          />
          <StatsCard 
            title="Completed Today" 
            value={data.stats.completedToday.value} 
            icon={CheckCircle2} 
            iconBg="bg-green-50" 
            iconColor="text-green-500"
            detail={data.stats.completedToday.detail}
          />
        </div>

        {/* Main Queue Section */}
        <QueueTable tabs={data.tabs} queueData={data.queueData} />
      </main>
    </div>
  );
};

export default LiveQueueDashboard;
