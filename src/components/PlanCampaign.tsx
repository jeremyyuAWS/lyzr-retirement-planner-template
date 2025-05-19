import React, { useState } from 'react';
import { Calendar, Users, Link, FileUp, Clock, AlertCircle, Check, Info } from 'lucide-react';
import webinarDetails from '@/data/webinar_details.json';

const PlanCampaign: React.FC = () => {
  const [webinarTitle, setWebinarTitle] = useState(webinarDetails.title);
  const [webinarDate, setWebinarDate] = useState(webinarDetails.date);
  const [webinarTime, setWebinarTime] = useState(webinarDetails.time);
  const [webinarLink, setWebinarLink] = useState(webinarDetails.registrationLink);
  const [selectedSegment, setSelectedSegment] = useState(webinarDetails.targetSegment);
  const [csvUploaded, setCsvUploaded] = useState(false);
  const [showTips, setShowTips] = useState(true);

  const handleCsvUpload = () => {
    // Simulate file upload
    setCsvUploaded(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Webinar Campaign Setup</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="webinar-title" className="block text-sm font-medium text-gray-700 mb-1">
                Webinar Title
              </label>
              <input
                id="webinar-title"
                type="text"
                value={webinarTitle}
                onChange={(e) => setWebinarTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter webinar title"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="webinar-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="webinar-date"
                    type="date"
                    value={webinarDate}
                    onChange={(e) => setWebinarDate(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="webinar-time" className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="webinar-time"
                    type="time"
                    value={webinarTime}
                    onChange={(e) => setWebinarTime(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="webinar-link" className="block text-sm font-medium text-gray-700 mb-1">
                Registration Link
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Link className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="webinar-link"
                  type="text"
                  value={webinarLink}
                  onChange={(e) => setWebinarLink(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://example.com/register-webinar"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-md font-medium text-gray-800 mb-3">
              Target Audience
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Audience Segment
                </label>
                <select
                  value={selectedSegment}
                  onChange={(e) => setSelectedSegment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="marketing_directors">Marketing Directors (1,245 contacts)</option>
                  <option value="tech_leaders">Technology Leaders (2,089 contacts)</option>
                  <option value="sales_managers">Sales Managers (1,872 contacts)</option>
                  <option value="hr_professionals">HR Professionals (942 contacts)</option>
                  <option value="finance_executives">Finance Executives (758 contacts)</option>
                </select>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Or upload your own contact list (CSV)
                </p>
                <div className="flex items-center">
                  <button
                    onClick={handleCsvUpload}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FileUp className="h-4 w-4 mr-2" />
                    Upload CSV
                  </button>
                  
                  {csvUploaded && (
                    <div className="ml-4 flex items-center text-sm text-green-600">
                      <Check className="h-4 w-4 mr-1" />
                      <span>contacts.csv uploaded (652 contacts)</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  File should include name, email, phone, company, and title columns
                </p>
              </div>
            </div>
          </div>
          
          {showTips && (
            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">AI-Powered Tip</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      Based on your target audience (Marketing Directors), we recommend:
                    </p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Primary outreach: Email + LinkedIn (83% open rate combined)</li>
                      <li>Secondary channels: SMS reminders day-of (42% attendance boost)</li>
                      <li>Content angle: ROI metrics and case studies perform best for this segment</li>
                    </ul>
                  </div>
                  <div className="mt-2">
                    <button 
                      className="text-xs text-blue-800 hover:text-blue-600"
                      onClick={() => setShowTips(false)}
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-6 flex justify-end">
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Campaign Settings
            </button>
          </div>
        </div>
        
        <div className="mt-6 bg-white rounded-lg border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Channel Effectiveness Prediction</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border rounded-lg p-3 text-center">
              <div className="flex justify-center mb-2">
                <div className="relative w-20 h-5 bg-gray-200 rounded-full">
                  <div className="absolute top-0 left-0 h-full bg-green-500 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-medium">85% effective</p>
            </div>
            
            <div className="border rounded-lg p-3 text-center">
              <div className="flex justify-center mb-2">
                <div className="relative w-20 h-5 bg-gray-200 rounded-full">
                  <div className="absolute top-0 left-0 h-full bg-green-500 rounded-full" style={{width: '72%'}}></div>
                </div>
              </div>
              <p className="text-xs text-gray-500">LinkedIn</p>
              <p className="font-medium">72% effective</p>
            </div>
            
            <div className="border rounded-lg p-3 text-center">
              <div className="flex justify-center mb-2">
                <div className="relative w-20 h-5 bg-gray-200 rounded-full">
                  <div className="absolute top-0 left-0 h-full bg-yellow-500 rounded-full" style={{width: '58%'}}></div>
                </div>
              </div>
              <p className="text-xs text-gray-500">SMS</p>
              <p className="font-medium">58% effective</p>
            </div>
            
            <div className="border rounded-lg p-3 text-center">
              <div className="flex justify-center mb-2">
                <div className="relative w-20 h-5 bg-gray-200 rounded-full">
                  <div className="absolute top-0 left-0 h-full bg-yellow-500 rounded-full" style={{width: '45%'}}></div>
                </div>
              </div>
              <p className="text-xs text-gray-500">Voice</p>
              <p className="font-medium">45% effective</p>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            <p>
              Effectiveness predictions are based on historical campaign data for similar audiences 
              and webinar topics. Channel recommendations are personalized to your specific target segment.
            </p>
          </div>
        </div>
      </div>
      
      <div className="md:col-span-1">
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Campaign Summary</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Webinar</p>
              <p className="font-medium">{webinarTitle}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Date & Time</p>
              <p className="font-medium">{webinarDate} at {webinarTime}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Target Audience</p>
              <p className="font-medium">
                {selectedSegment === 'marketing_directors' ? 'Marketing Directors' : 
                 selectedSegment === 'tech_leaders' ? 'Technology Leaders' : 
                 selectedSegment === 'sales_managers' ? 'Sales Managers' : 
                 selectedSegment === 'hr_professionals' ? 'HR Professionals' : 
                 'Finance Executives'}
              </p>
              <p className="text-sm text-gray-500">
                {csvUploaded ? '652 contacts from CSV' : selectedSegment === 'marketing_directors' ? '1,245 contacts' : 
                 selectedSegment === 'tech_leaders' ? '2,089 contacts' : 
                 selectedSegment === 'sales_managers' ? '1,872 contacts' : 
                 selectedSegment === 'hr_professionals' ? '942 contacts' : 
                 '758 contacts'}
              </p>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Projected Results</p>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Open rate:</span>
                  <span className="font-medium">28-35%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Click-through:</span>
                  <span className="font-medium">12-18%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Registration rate:</span>
                  <span className="font-medium">8-12%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Attendance rate:</span>
                  <span className="font-medium">40-65%</span>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">AI-Recommended Schedule</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-medium mr-2 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Email campaign</p>
                    <p className="text-gray-500">10 days before webinar</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-medium mr-2 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium">LinkedIn outreach</p>
                    <p className="text-gray-500">7 days before webinar</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-medium mr-2 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium">SMS reminder</p>
                    <p className="text-gray-500">1 day before webinar</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-medium mr-2 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Final email reminder</p>
                    <p className="text-gray-500">3 hours before webinar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Ready to launch?</h3>
                <p className="text-sm text-gray-500">
                  Start your outreach campaign
                </p>
              </div>
            </div>
            <div className="mt-5">
              <button
                type="button"
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Launch All Channels
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCampaign;