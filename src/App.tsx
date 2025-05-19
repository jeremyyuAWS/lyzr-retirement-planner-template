import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import PlanCampaign from './components/PlanCampaign';
import EmailSMSOutreach from './components/EmailSMSOutreach';
import LinkedInOutreach from './components/LinkedInOutreach';
import VoiceOutreach from './components/VoiceOutreach';
import RegistrationDashboard from './components/RegistrationDashboard';
import Header from './components/layout/Header';
import { Toaster } from './components/ui/toaster';
import ChatModal from './components/ChatModal';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto pt-16 px-4 pb-4">
        <Tabs defaultValue="plan" className="mt-4">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="plan">Plan Campaign</TabsTrigger>
            <TabsTrigger value="email-sms">Email & SMS</TabsTrigger>
            <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
            <TabsTrigger value="voice">Voice Agent</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>
          
          <TabsContent value="plan" className="mt-4">
            <PlanCampaign />
          </TabsContent>
          
          <TabsContent value="email-sms" className="mt-4">
            <EmailSMSOutreach />
          </TabsContent>
          
          <TabsContent value="linkedin" className="mt-4">
            <LinkedInOutreach />
          </TabsContent>
          
          <TabsContent value="voice" className="mt-4">
            <VoiceOutreach />
          </TabsContent>
          
          <TabsContent value="dashboard" className="mt-4">
            <RegistrationDashboard />
          </TabsContent>
        </Tabs>
      </main>
      
      <ChatModal />
      <Toaster />
    </div>
  );
}

export default App;