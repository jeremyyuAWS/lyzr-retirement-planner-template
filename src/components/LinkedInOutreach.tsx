import React, { useState } from 'react';
import { Linkedin, RefreshCcw, Send, Check, User, Mail, MessageSquare, Zap, ChevronDown, ChevronUp, Users } from 'lucide-react';
import outreachTemplates from '@/data/outreach_templates.json';
import leads from '@/data/leads.json';

const LinkedInOutreach: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>(outreachTemplates.linkedin[0].id);
  const [customizeMode, setCustomizeMode] = useState(false);
  const [messageContent, setMessageContent] = useState(outreachTemplates.linkedin[0].content);
  const [connectionNote, setConnectionNote] = useState(outreachTemplates.linkedin[0].connectionNote);
  const [showResults, setShowResults] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<string>(leads[0].id);

  // Simulated results for LinkedIn
  const linkedInResults = {
    invitesSent: 225,
    connected: 154,
    messaged: 138,
    responded: 52,
    registered: 31,
    connectionRate: "68%",
    responseRate: "38%",
    conversionRate: "13.7%"
  };

  // Toggle section expansion
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Handle template change
  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = outreachTemplates.linkedin.find(t => t.id === templateId);
    if (template) {
      setMessageContent(template.content);
      setConnectionNote(template.connectionNote || '');
    }
  };

  // Simulate sending campaign
  const sendCampaign = () => {
    // Show loading state
    setShowResults(false);
    
    // Simulate processing time
    setTimeout(() => {
      setShowResults(true);
    }, 1500);
  };

  // Get the current lead
  const currentLead = leads.find(l => l.id === selectedLead) || leads[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Linkedin className="h-5 w-5 text-[#0A66C2] mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">LinkedIn Outreach Campaign</h2>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setCustomizeMode(!customizeMode)}
                className={`text-sm font-medium ${
                  customizeMode
                    ? 'text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {customizeMode ? 'Exit Customize Mode' : 'Customize Template'}
              </button>
              <div className="h-4 border-l border-gray-300"></div>
              <button
                onClick={() => handleTemplateChange(outreachTemplates.linkedin[Math.floor(Math.random() * outreachTemplates.linkedin.length)].id)}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
              >
                <RefreshCcw className="h-3.5 w-3.5 mr-1" />
                New Template
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Contact
                </label>
                <select
                  value={selectedLead}
                  onChange={(e) => setSelectedLead(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {leads.map(lead => (
                    <option key={lead.id} value={lead.id}>
                      {lead.firstName} {lead.lastName} - {lead.title} at {lead.company}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{currentLead.firstName} {currentLead.lastName}</h3>
                    <p className="text-xs text-gray-500">{currentLead.title} at {currentLead.company}</p>
                    <p className="text-xs text-gray-500">{currentLead.location}</p>
                  </div>
                </div>
                
                <div className="border-t pt-3 mt-3">
                  <p className="text-xs text-gray-500 mb-1">Insights</p>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-xs text-gray-700">Active on LinkedIn in past 30 days</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      <p className="text-xs text-gray-700">Viewed content about {currentLead.interests}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></div>
                      <p className="text-xs text-gray-700">Common connections: {currentLead.mutualConnections}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Outreach Template
                </label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={customizeMode}
                >
                  {outreachTemplates.linkedin.map(template => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
                <div className="mt-2 flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Check className="h-3.5 w-3.5 mr-1" />
                    AI Optimized
                  </span>
                  <span className="ml-2 text-xs text-gray-500">
                    Based on {currentLead.title} persona
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Connection Request Note (300 char max)
                </label>
                <textarea
                  value={connectionNote}
                  onChange={(e) => setConnectionNote(e.target.value)}
                  disabled={!customizeMode}
                  rows={2}
                  maxLength={300}
                  className={`w-full px-3 py-2 border ${
                    customizeMode ? 'border-gray-300' : 'border-gray-200 bg-gray-100'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm`}
                />
                <div className="flex justify-end text-xs text-gray-500 mt-1">
                  {connectionNote.length}/300
                </div>
              </div>
              
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Follow-up Message After Connection
                </label>
                <textarea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  disabled={!customizeMode}
                  rows={5}
                  className={`w-full px-3 py-2 border ${
                    customizeMode ? 'border-gray-300' : 'border-gray-200 bg-gray-100'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm`}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-5 mt-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md font-medium text-gray-800">Campaign Targeting</h3>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Total targeted:</span>
                <span className="font-medium">225 leads</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="border rounded-lg p-3">
                <h4 className="text-xs text-gray-500 mb-1">Company Size</h4>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input
                      id="size-small"
                      type="checkbox"
                      checked={true}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <label htmlFor="size-small" className="ml-2 text-sm text-gray-700">
                      Small (1-100)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="size-medium"
                      type="checkbox"
                      checked={true}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <label htmlFor="size-medium" className="ml-2 text-sm text-gray-700">
                      Medium (101-1000)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="size-large"
                      type="checkbox"
                      checked={false}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <label htmlFor="size-large" className="ml-2 text-sm text-gray-700">
                      Large (1000+)
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-3">
                <h4 className="text-xs text-gray-500 mb-1">Job Titles</h4>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input
                      id="title-marketing"
                      type="checkbox"
                      checked={true}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <label htmlFor="title-marketing" className="ml-2 text-sm text-gray-700">
                      Marketing Directors
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="title-sales"
                      type="checkbox"
                      checked={true}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <label htmlFor="title-sales" className="ml-2 text-sm text-gray-700">
                      Sales Managers
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="title-cmo"
                      type="checkbox"
                      checked={true}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <label htmlFor="title-cmo" className="ml-2 text-sm text-gray-700">
                      CMO/VP Marketing
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-3">
                <h4 className="text-xs text-gray-500 mb-1">Location</h4>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input
                      id="location-us"
                      type="checkbox"
                      checked={true}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <label htmlFor="location-us" className="ml-2 text-sm text-gray-700">
                      United States
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="location-canada"
                      type="checkbox"
                      checked={true}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <label htmlFor="location-canada" className="ml-2 text-sm text-gray-700">
                      Canada
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="location-uk"
                      type="checkbox"
                      checked={false}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <label htmlFor="location-uk" className="ml-2 text-sm text-gray-700">
                      United Kingdom
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={sendCampaign}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Send className="h-4 w-4 mr-2" />
                Launch LinkedIn Campaign
              </button>
            </div>
          </div>
          
          {showResults && (
            <div className="border-t border-gray-200 pt-5 mt-5 animate-fade-in">
              <h3 className="text-md font-medium text-gray-800 mb-4">
                Campaign Results
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-white border rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">Invites Sent</p>
                  <p className="text-xl font-semibold">{linkedInResults.invitesSent}</p>
                </div>
                <div className="bg-white border rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">Connected</p>
                  <p className="text-xl font-semibold">{linkedInResults.connected}</p>
                  <p className="text-xs text-indigo-600">{linkedInResults.connectionRate}</p>
                </div>
                <div className="bg-white border rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">Responded</p>
                  <p className="text-xl font-semibold">{linkedInResults.responded}</p>
                  <p className="text-xs text-indigo-600">{linkedInResults.responseRate}</p>
                </div>
                <div className="bg-white border rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">Registered</p>
                  <p className="text-xl font-semibold text-green-600">{linkedInResults.registered}</p>
                  <p className="text-xs text-green-600">{linkedInResults.conversionRate}</p>
                </div>
              </div>
              
              <div 
                className="border rounded-md mb-4 overflow-hidden cursor-pointer" 
                onClick={() => toggleSection('linkedinInsights')}
              >
                <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <h4 className="text-sm font-medium text-gray-700">AI-Generated Insights</h4>
                  {expandedSection === 'linkedinInsights' ? 
                    <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  }
                </div>
                {expandedSection === 'linkedinInsights' && (
                  <div className="p-4 bg-white">
                    <div className="space-y-4 text-sm">
                      <div className="flex items-start">
                        <Zap className="h-4 w-4 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900 mb-1">Title-Based Performance</p>
                          <p className="text-gray-700">Marketing Directors had the highest connection rate (74%) while Sales Managers showed the best conversion to registration (15.2%). Consider creating separate message templates for each title.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Zap className="h-4 w-4 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900 mb-1">Content Effectiveness</p>
                          <p className="text-gray-700">Messages mentioning "industry peers" or "exclusive insight" had 31% higher response rates. Messages over 800 characters had 23% lower response rates than shorter ones.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Zap className="h-4 w-4 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900 mb-1">Connection Note Impact</p>
                          <p className="text-gray-700">Connection requests with personalized notes referencing shared groups had a 79% acceptance rate vs. 42% for generic notes. Consider refining your connection request templates.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className={`mt-6 ${showResults ? 'hidden' : 'block'}`}>
            <h3 className="text-md font-medium text-gray-800 mb-3">
              LinkedIn Message Preview
            </h3>
            
            <div className="border rounded-lg overflow-hidden max-w-lg">
              <div className="bg-gray-100 px-4 py-3 flex items-center border-b">
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">
                    {currentLead.firstName} {currentLead.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{currentLead.title} at {currentLead.company}</p>
                </div>
              </div>
              
              <div className="p-4 bg-white">
                <div className="mb-4">
                  <div className="bg-indigo-100 rounded-lg p-3">
                    <p className="text-sm text-gray-800">
                      {connectionNote.replace(/\{firstName\}/g, currentLead.firstName)
                        .replace(/\{webinarTitle\}/g, 'Advanced Marketing Strategies for 2025')
                        .replace(/\{company\}/g, currentLead.company)}
                    </p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-xs text-gray-500 mb-2">After connection is accepted:</p>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-gray-800">
                      {messageContent.replace(/\{firstName\}/g, currentLead.firstName)
                        .replace(/\{webinarTitle\}/g, 'Advanced Marketing Strategies for 2025')
                        .replace(/\{company\}/g, currentLead.company)
                        .replace(/\{industry\}/g, currentLead.industry)
                        .replace(/\{interests\}/g, currentLead.interests)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">LinkedIn Strategy</h2>
          
          <div className="space-y-4">
            <div className="pt-2">
              <p className="text-sm font-medium text-gray-800 mb-3">AI-Generated Approach</p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-xs mr-2 mt-0.5 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="text-sm font-medium">Connection Request</p>
                    <p className="text-xs text-gray-600">Personalized note referencing mutual interests or connections</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-xs mr-2 mt-0.5 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="text-sm font-medium">Engagement Warming</p>
                    <p className="text-xs text-gray-600">Like or comment on prospect's recent activity</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-xs mr-2 mt-0.5 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="text-sm font-medium">Webinar Invitation</p>
                    <p className="text-xs text-gray-600">Value-focused message 2-3 days after connection</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-xs mr-2 mt-0.5 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <p className="text-sm font-medium">Follow-up Sequence</p>
                    <p className="text-xs text-gray-600">Automated responses based on engagement patterns</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4 mt-2">
              <p className="text-sm font-medium text-gray-800 mb-2">Multi-channel Integration</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <Linkedin className="h-4 w-4 text-indigo-600" />
                    </div>
                    <span className="text-sm">LinkedIn</span>
                  </div>
                  <span className="text-sm font-medium">Primary</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Mail className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm">Email</span>
                  </div>
                  <span className="text-sm font-medium">Secondary</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <MessageSquare className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm">SMS</span>
                  </div>
                  <span className="text-sm font-medium">Reminder</span>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4 mt-2">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-800">Lead Segments</p>
                <span className="text-xs px-2.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-full font-medium">
                  225 Total
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-indigo-500 mr-2" />
                    <span className="text-sm">Marketing Directors</span>
                  </div>
                  <span className="text-sm">98 leads</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-indigo-500 mr-2" />
                    <span className="text-sm">Sales Managers</span>
                  </div>
                  <span className="text-sm">76 leads</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-indigo-500 mr-2" />
                    <span className="text-sm">CMO/VP Marketing</span>
                  </div>
                  <span className="text-sm">51 leads</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-white rounded-lg border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h2>
          
          {showResults ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Connection Rate by Title</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Marketing Directors</span>
                      <span className="font-medium">74%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '74%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Sales Managers</span>
                      <span className="font-medium">64%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '64%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>CMO/VP Marketing</span>
                      <span className="font-medium">52%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '52%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-3 border-t">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Registration Rate by Industry</h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Technology</span>
                      <span className="font-medium">18.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '18.2%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Marketing Services</span>
                      <span className="font-medium">15.7%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '15.7%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Financial Services</span>
                      <span className="font-medium">10.3%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '10.3%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500">
                Results will appear here after campaign launch
              </p>
            </div>
          )}
          
          <button
            className="mt-4 w-full text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View Detailed Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkedInOutreach;