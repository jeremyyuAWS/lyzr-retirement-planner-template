import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, RefreshCcw, Send, Check, AlertTriangle, ArrowRight, AlertCircle, Smartphone, ChevronDown, ChevronUp } from 'lucide-react';
import outreachTemplates from '@/data/outreach_templates.json';
import { formatDate } from '@/lib/utils';

const EmailSMSOutreach: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'email' | 'sms'>('email');
  const [selectedTemplate, setSelectedTemplate] = useState<string>(outreachTemplates.email[0].id);
  const [customizeMode, setCustomizeMode] = useState(false);
  const [emailSubject, setEmailSubject] = useState(outreachTemplates.email[0].subject);
  const [emailBody, setEmailBody] = useState(outreachTemplates.email[0].body);
  const [smsContent, setSmsContent] = useState(outreachTemplates.sms[0].content);
  const [showResults, setShowResults] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Simulated results for email
  const emailResults = {
    sent: 1245,
    opened: 398,
    clicked: 172,
    registered: 89,
    bounced: 37,
    openRate: "32%",
    clickRate: "43%",
    conversionRate: "7.1%"
  };

  // Simulated results for SMS
  const smsResults = {
    sent: 876,
    delivered: 865,
    clicked: 219,
    registered: 103,
    optedOut: 23,
    deliveryRate: "98.7%",
    clickRate: "25.3%",
    conversionRate: "11.8%"
  };

  // Handle template change
  useEffect(() => {
    if (activeTab === 'email') {
      const template = outreachTemplates.email.find(t => t.id === selectedTemplate);
      if (template) {
        setEmailSubject(template.subject);
        setEmailBody(template.body);
      }
    } else {
      const template = outreachTemplates.sms.find(t => t.id === selectedTemplate);
      if (template) {
        setSmsContent(template.content);
      }
    }
  }, [selectedTemplate, activeTab]);

  // Toggle section expansion
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'email'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('email')}
              >
                <Mail className="h-4 w-4 inline-block mr-2" />
                Email Outreach
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'sms'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('sms')}
              >
                <MessageSquare className="h-4 w-4 inline-block mr-2" />
                SMS Outreach
              </button>
            </div>
          </div>

          {activeTab === 'email' ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Email Campaign</h2>
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
                    onClick={() => setSelectedTemplate(outreachTemplates.email[Math.floor(Math.random() * outreachTemplates.email.length)].id)}
                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
                  >
                    <RefreshCcw className="h-3.5 w-3.5 mr-1" />
                    New Template
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-5">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Template
                    </label>
                    <select
                      value={selectedTemplate}
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      disabled={customizeMode}
                    >
                      {outreachTemplates.email.map(template => (
                        <option key={template.id} value={template.id}>
                          {template.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-3 md:mt-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Check className="h-3.5 w-3.5 mr-1" />
                      AI Optimized
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject Line
                    </label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      disabled={!customizeMode}
                      className={`w-full px-3 py-2 border ${
                        customizeMode ? 'border-gray-300' : 'border-gray-200 bg-gray-100'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Body
                    </label>
                    <textarea
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      disabled={!customizeMode}
                      rows={10}
                      className={`w-full px-3 py-2 border ${
                        customizeMode ? 'border-gray-300' : 'border-gray-200 bg-gray-100'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={sendCampaign}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Campaign
                    </button>
                  </div>
                </div>
              </div>

              {showResults && (
                <div className="animate-fade-in">
                  <h3 className="text-md font-medium text-gray-800 mb-3">
                    Campaign Results
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <div className="bg-white border rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 mb-1">Sent</p>
                      <p className="text-xl font-semibold">{emailResults.sent}</p>
                    </div>
                    <div className="bg-white border rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 mb-1">Opened</p>
                      <p className="text-xl font-semibold">{emailResults.opened}</p>
                      <p className="text-xs text-indigo-600">{emailResults.openRate}</p>
                    </div>
                    <div className="bg-white border rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 mb-1">Clicked</p>
                      <p className="text-xl font-semibold">{emailResults.clicked}</p>
                      <p className="text-xs text-indigo-600">{emailResults.clickRate}</p>
                    </div>
                    <div className="bg-white border rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 mb-1">Registered</p>
                      <p className="text-xl font-semibold text-green-600">{emailResults.registered}</p>
                      <p className="text-xs text-green-600">{emailResults.conversionRate}</p>
                    </div>
                  </div>
                  
                  <div 
                    className="border rounded-md mb-4 overflow-hidden" 
                    onClick={() => toggleSection('emailInsights')}
                  >
                    <div className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer">
                      <h4 className="text-sm font-medium text-gray-700">AI-Generated Insights</h4>
                      {expandedSection === 'emailInsights' ? 
                        <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      }
                    </div>
                    {expandedSection === 'emailInsights' && (
                      <div className="p-4 bg-white">
                        <div className="flex items-start space-x-2 text-sm text-gray-600">
                          <div className="mt-0.5">
                            <AlertCircle className="h-4 w-4 text-indigo-500" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 mb-1">Subject Line Analysis</p>
                            <p>Subject lines containing the word "Exclusive" performed 22% better than average. 
                            Consider A/B testing with more exclusivity-focused subject lines.</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t flex items-start space-x-2 text-sm text-gray-600">
                          <div className="mt-0.5">
                            <AlertCircle className="h-4 w-4 text-indigo-500" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 mb-1">Timing Impact</p>
                            <p>Emails sent between 10-11am had a 34% higher open rate than other times. 
                            Consider scheduling your next campaign during this window.</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t flex items-start space-x-2 text-sm text-gray-600">
                          <div className="mt-0.5">
                            <AlertCircle className="h-4 w-4 text-indigo-500" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 mb-1">Content Optimization</p>
                            <p>Emails with bullet points and shorter paragraphs had 27% higher click-through rates. 
                            Consider reformatting your content to improve readability.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div 
                    className="border rounded-md mb-4 overflow-hidden"
                    onClick={() => toggleSection('emailNext')}
                  >
                    <div className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer">
                      <h4 className="text-sm font-medium text-gray-700">Next Steps</h4>
                      {expandedSection === 'emailNext' ? 
                        <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      }
                    </div>
                    {expandedSection === 'emailNext' && (
                      <div className="p-4 bg-white">
                        <div className="space-y-3 text-sm text-gray-600">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-xs mr-2">
                              1
                            </div>
                            <p>Schedule follow-up email for non-openers in 2 days</p>
                          </div>
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-xs mr-2">
                              2
                            </div>
                            <p>Send "Last chance to register" email 2 days before the webinar</p>
                          </div>
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-xs mr-2">
                              3
                            </div>
                            <p>Schedule confirmation and reminder emails for registered attendees</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          <button
                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                          >
                            Schedule Follow-ups Automatically
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Preview */}
              <div className={`border rounded-lg mt-6 overflow-hidden ${showResults ? 'hidden' : 'block'}`}>
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <h3 className="text-sm font-medium text-gray-700">Email Preview</h3>
                </div>
                <div className="p-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-100 px-4 py-2 border-b">
                      <p className="text-sm">
                        <strong>To:</strong> {{firstName: "John", lastName: "Smith"}.firstName} {{firstName: "John", lastName: "Smith"}.lastName} &lt;johnsmith@example.com&gt;<br />
                        <strong>Subject:</strong> {emailSubject}
                      </p>
                    </div>
                    <div className="p-4 bg-white text-sm">
                      <div dangerouslySetInnerHTML={{
                        __html: emailBody.replace(/\n/g, '<br />').replace(/\{firstName\}/g, 'John').replace(/\{webinarTitle\}/g, 'Advanced Marketing Strategies for 2025')
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">SMS Campaign</h2>
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
                    onClick={() => setSelectedTemplate(outreachTemplates.sms[Math.floor(Math.random() * outreachTemplates.sms.length)].id)}
                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
                  >
                    <RefreshCcw className="h-3.5 w-3.5 mr-1" />
                    New Template
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-5">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SMS Template
                    </label>
                    <select
                      value={selectedTemplate}
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      disabled={customizeMode}
                    >
                      {outreachTemplates.sms.map(template => (
                        <option key={template.id} value={template.id}>
                          {template.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-3 md:mt-0 flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                      <Check className="h-3.5 w-3.5 mr-1" />
                      AI Optimized
                    </span>
                    <span className={`text-xs ${smsContent.length > 160 ? 'text-red-500' : 'text-gray-500'}`}>
                      {smsContent.length}/160 characters
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SMS Content
                    </label>
                    <textarea
                      value={smsContent}
                      onChange={(e) => setSmsContent(e.target.value)}
                      disabled={!customizeMode}
                      rows={4}
                      className={`w-full px-3 py-2 border ${
                        customizeMode ? 'border-gray-300' : 'border-gray-200 bg-gray-100'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                  </div>

                  {smsContent.length > 160 && (
                    <div className="flex items-start space-x-2 text-xs text-red-600">
                      <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                      <p>
                        Message is too long and will be split into multiple SMS, which may affect delivery and readability.
                      </p>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={sendCampaign}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Campaign
                    </button>
                  </div>
                </div>
              </div>

              {showResults && (
                <div className="animate-fade-in">
                  <h3 className="text-md font-medium text-gray-800 mb-3">
                    Campaign Results
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <div className="bg-white border rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 mb-1">Sent</p>
                      <p className="text-xl font-semibold">{smsResults.sent}</p>
                    </div>
                    <div className="bg-white border rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 mb-1">Delivered</p>
                      <p className="text-xl font-semibold">{smsResults.delivered}</p>
                      <p className="text-xs text-indigo-600">{smsResults.deliveryRate}</p>
                    </div>
                    <div className="bg-white border rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 mb-1">Clicked</p>
                      <p className="text-xl font-semibold">{smsResults.clicked}</p>
                      <p className="text-xs text-indigo-600">{smsResults.clickRate}</p>
                    </div>
                    <div className="bg-white border rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 mb-1">Registered</p>
                      <p className="text-xl font-semibold text-green-600">{smsResults.registered}</p>
                      <p className="text-xs text-green-600">{smsResults.conversionRate}</p>
                    </div>
                  </div>
                  
                  <div 
                    className="border rounded-md mb-4 overflow-hidden" 
                    onClick={() => toggleSection('smsInsights')}
                  >
                    <div className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer">
                      <h4 className="text-sm font-medium text-gray-700">AI-Generated Insights</h4>
                      {expandedSection === 'smsInsights' ? 
                        <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      }
                    </div>
                    {expandedSection === 'smsInsights' && (
                      <div className="p-4 bg-white">
                        <div className="flex items-start space-x-2 text-sm text-gray-600">
                          <div className="mt-0.5">
                            <AlertCircle className="h-4 w-4 text-indigo-500" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 mb-1">Timing Impact</p>
                            <p>SMS messages sent between 11:30am-1:30pm saw 42% higher click rates. 
                            Consider targeting lunch breaks for higher engagement.</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t flex items-start space-x-2 text-sm text-gray-600">
                          <div className="mt-0.5">
                            <AlertCircle className="h-4 w-4 text-indigo-500" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 mb-1">Message Length</p>
                            <p>Messages between 100-120 characters performed best with 31% higher click-through. 
                            Your current message is {smsContent.length} characters.</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t flex items-start space-x-2 text-sm text-gray-600">
                          <div className="mt-0.5">
                            <AlertCircle className="h-4 w-4 text-indigo-500" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 mb-1">Response Patterns</p>
                            <p>Common responses include "How do I register?", "Can't make it", and "Please remove me". 
                            Consider adding AI-automated responses for these queries.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div 
                    className="border rounded-md mb-4 overflow-hidden"
                    onClick={() => toggleSection('smsNext')}
                  >
                    <div className="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer">
                      <h4 className="text-sm font-medium text-gray-700">Next Steps</h4>
                      {expandedSection === 'smsNext' ? 
                        <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      }
                    </div>
                    {expandedSection === 'smsNext' && (
                      <div className="p-4 bg-white">
                        <div className="space-y-3 text-sm text-gray-600">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-xs mr-2">
                              1
                            </div>
                            <p>Schedule day-of reminder SMS 3 hours before the webinar</p>
                          </div>
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-xs mr-2">
                              2
                            </div>
                            <p>Set up AI autoresponders for common queries</p>
                          </div>
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-xs mr-2">
                              3
                            </div>
                            <p>Monitor opt-out rates and adjust messaging if necessary</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          <button
                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                          >
                            Schedule Follow-ups Automatically
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Preview */}
              <div className={`border rounded-lg mt-6 overflow-hidden ${showResults ? 'hidden' : 'block'}`}>
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <h3 className="text-sm font-medium text-gray-700">SMS Preview</h3>
                </div>
                <div className="p-4">
                  <div className="max-w-xs mx-auto bg-gray-800 rounded-lg overflow-hidden p-1">
                    <div className="bg-black rounded-lg overflow-hidden">
                      <div className="h-6 bg-gray-800 flex items-center justify-center">
                        <div className="w-20 h-1.5 bg-gray-600 rounded-full"></div>
                      </div>
                      <div className="p-3 bg-gray-100">
                        <div className="flex">
                          <div className="bg-gray-300 px-2 py-1.5 text-xs font-medium rounded-t-lg">
                            Messages
                          </div>
                          <div className="ml-2 bg-gray-200 px-2 py-1.5 text-xs rounded-t-lg">
                            Calls
                          </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-3 mt-1">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <div className="h-6 w-6 rounded-full bg-gray-200"></div>
                              <div className="ml-2 text-xs font-medium">
                                WebiGenie
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">Now</div>
                          </div>
                          <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-xs">
                            {smsContent.replace(/\{firstName\}/g, 'John').replace(/\{webinarTitle\}/g, 'Advanced Marketing Strategies')}
                          </div>
                        </div>
                      </div>
                      <div className="p-2 bg-black flex justify-around">
                        <div className="h-1 w-1 bg-gray-600 rounded-full"></div>
                        <div className="h-1 w-1 bg-gray-600 rounded-full"></div>
                        <div className="h-1 w-1 bg-gray-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Campaign Overview</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <div className="flex items-center">
                <span className={`inline-block h-2.5 w-2.5 rounded-full ${showResults ? 'bg-green-500' : 'bg-yellow-500'} mr-2`}></span>
                <p className="font-medium">{showResults ? 'Active' : 'Ready to send'}</p>
              </div>
            </div>
            
            <div className="pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Channel Strategy</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-indigo-500 mr-2" />
                    <span className="text-sm font-medium">Email Campaign</span>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                    {showResults ? 'Sent' : 'Ready'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 text-indigo-500 mr-2" />
                    <span className="text-sm font-medium">SMS Campaign</span>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                    {showResults ? 'Sent' : 'Ready'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-indigo-500 mr-2" />
                    <span className="text-sm font-medium">Follow-up Email</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                    Scheduled
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 text-indigo-500 mr-2" />
                    <span className="text-sm font-medium">Day-of Reminder</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                    Scheduled
                  </span>
                </div>
              </div>
            </div>
            
            <div className="pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Campaign Timeline</p>
              
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 border-l-2 border-gray-200 border-dashed"></div>
                
                <div className="space-y-4">
                  {/* Timeline items */}
                  <div className="flex items-start ml-3">
                    <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-white -ml-3 z-10">
                      <Mail className="h-3 w-3 text-indigo-600" />
                    </div>
                    <div className="ml-2">
                      <p className="text-xs font-medium">Initial Email Campaign</p>
                      <p className="text-xs text-gray-500">
                        {showResults ? formatDate(new Date()) : 'Not sent yet'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start ml-3">
                    <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-white -ml-3 z-10">
                      <MessageSquare className="h-3 w-3 text-indigo-600" />
                    </div>
                    <div className="ml-2">
                      <p className="text-xs font-medium">SMS Outreach</p>
                      <p className="text-xs text-gray-500">
                        {showResults ? formatDate(new Date()) : 'Not sent yet'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start ml-3">
                    <div className={`h-6 w-6 rounded-full ${showResults ? 'bg-gray-100' : 'bg-indigo-50'} flex items-center justify-center border-2 border-white -ml-3 z-10`}>
                      <Mail className={`h-3 w-3 ${showResults ? 'text-gray-400' : 'text-indigo-400'}`} />
                    </div>
                    <div className="ml-2">
                      <p className={`text-xs font-medium ${showResults ? 'text-gray-500' : 'text-gray-700'}`}>Follow-up Email</p>
                      <p className="text-xs text-gray-500">
                        Scheduled for {new Date(new Date().setDate(new Date().getDate() + 2)).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start ml-3">
                    <div className={`h-6 w-6 rounded-full ${showResults ? 'bg-gray-100' : 'bg-indigo-50'} flex items-center justify-center border-2 border-white -ml-3 z-10`}>
                      <MessageSquare className={`h-3 w-3 ${showResults ? 'text-gray-400' : 'text-indigo-400'}`} />
                    </div>
                    <div className="ml-2">
                      <p className={`text-xs font-medium ${showResults ? 'text-gray-500' : 'text-gray-700'}`}>Final Reminder</p>
                      <p className="text-xs text-gray-500">
                        Scheduled for webinar day
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-white rounded-lg border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h2>
          
          <div className="space-y-3">
            <div className="bg-indigo-50 rounded-lg p-3">
              <div className="flex items-center">
                <ArrowRight className="h-4 w-4 text-indigo-600 mr-2 flex-shrink-0" />
                <p className="text-sm text-indigo-800">
                  <span className="font-medium">A/B test subject lines</span> to optimize open rates
                </p>
              </div>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-3">
              <div className="flex items-center">
                <ArrowRight className="h-4 w-4 text-indigo-600 mr-2 flex-shrink-0" />
                <p className="text-sm text-indigo-800">
                  <span className="font-medium">Use progressive profiling</span> to gather more attendee data
                </p>
              </div>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-3">
              <div className="flex items-center">
                <ArrowRight className="h-4 w-4 text-indigo-600 mr-2 flex-shrink-0" />
                <p className="text-sm text-indigo-800">
                  <span className="font-medium">Combine email + SMS</span> for 37% higher conversion rates
                </p>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                Apply All Recommendations
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSMSOutreach;