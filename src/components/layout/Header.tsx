import { Activity, Megaphone } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Megaphone className="h-6 w-6 text-indigo-600" />
          <span className="text-xl font-bold text-gray-900">WebiGenie</span>
          <span className="hidden md:inline-block text-sm text-gray-500">AI-Powered Outreach to Fill Your Webinar Room</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="px-3 py-1.5 bg-green-100 text-green-700 text-sm rounded-full flex items-center">
            <Activity className="h-4 w-4 mr-1.5" />
            <span className="font-medium">Demo Mode</span>
          </div>
        </div>
      </div>
    </header>
  );
}