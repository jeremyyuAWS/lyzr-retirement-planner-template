import React, { useState, useRef } from 'react';
import { Phone, RefreshCcw, Play, Pause, Volume2, Check, User, Calendar, Clock, ChevronDown, ChevronUp, BarChart3, AlertCircle } from 'lucide-react';
import outreachTemplates from '@/data/outreach_templates.json';
import leads from '@/data/leads.json';
import { formatDate, formatNumber } from '@/lib/utils';

const VoiceOutreach: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>(outreachTemplates.voice[0].id);
  const [customizeMode, setCustomizeMode] = useState(false);
  const [scriptContent, setScriptContent] = useState(outreachTemplates.voice[0].script);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<string>(leads[0].id);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Simulated results for voice calling
  const voiceResults = {
    callsPlaced: 562,
    connected: 218,
    voicemail: 285,
    registered: 42,
    declined: 11,
    transferredToAgent: 8,
    connectRate: "39%",
    conversionRate: "7.5%",
    callbacks: 23
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
    const template = outreachTemplates.voice.find(t => t.id === templateId);
    if (template) {
      setScriptContent(template.script);
    }
  };

  // Handle audio playback
  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Simulate sending campaign
  const startCampaign = () => {
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
              <Phone className="h-5 w-5 text-indigo-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Voice Outreach Campaign</h2>
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
                {customizeMode ? 'Exit Customize Mode' : 'Customize Script'}
              </button>
              <div className="h-4 border-l border-gray-300"></div>
              <button
                onClick={() => handleTemplateChange(outreachTemplates.voice[Math.floor(Math.random() * outreachTemplates.voice.length)].id)}
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
                  Call Script Template
                </label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={customizeMode}
                >
                  {outreachTemplates.voice.map(template => (
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
                    Conversational and natural flow
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Call Script
                </label>
                <textarea
                  value={scriptContent}
                  onChange={(e) => setScriptContent(e.target.value)}
                  disabled={!customizeMode}
                  rows={15}
                  className={`w-full px-3 py-2 border ${
                    customizeMode ? 'border-gray-300' : 'border-gray-200 bg-gray-100'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm`}
                />
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voice Preview
                </label>
                <div className="bg-gray-50 rounded-lg p-4 flex items-center">
                  <button
                    onClick={togglePlayback}
                    className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 focus:outline-none"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                  <div className="ml-3 flex-1">
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: isPlaying ? '45%' : '0%', transition: 'width 0.3s ease' }}></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">{isPlaying ? '0:27' : '0:00'}</span>
                      <span className="text-xs text-gray-500">1:15</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <Volume2 className="h-5 w-5 text-gray-400" />
                  </div>

                  {/* Hidden audio element */}
                  <audio 
                    ref={audioRef} 
                    src="https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-1.mp3"
                    onEnded={() => setIsPlaying(false)}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  AI voice simulation will use natural tone and pacing in production
                </p>
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Test Contact
                </label>
                <select
                  value={selectedLead}
                  onChange={(e) => setSelectedLead(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {leads.map(lead => (
                    <option key={lead.id} value={lead.id}>
                      {lead.firstName} {lead.lastName} - {lead.phone || 'No phone'}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{currentLead.firstName} {currentLead.lastName}</h3>
                    <p className="text-xs text-gray-500">{currentLead.title} at {currentLead.company}</p>
                    <p className="text-xs text-gray-500">{currentLead.phone || 'No phone available'}</p>
                  </div>
                </div>
                
                <div className="border-t pt-3 mt-3">
                  <p className="text-xs text-gray-500 mb-1">Best Time to Call</p>
                  <div className="flex items-center text-sm text-gray-700">
                    <Calendar className="h-4 w-4 text-gray-500 mr-1.5" />
                    <span>Tuesday - Thursday</span>
                    <div className="h-3 border-l border-gray-300 mx-2"></div>
                    <Clock className="h-4 w-4 text-gray-500 mr-1.5" />
                    <span>10am - 2pm ({currentLead.timezone || 'EST'})</span>
                  </div>
                </div>
                
                <div className="border-t pt-3 mt-3">
                  <p className="text-xs text-gray-500 mb-1">Call Guidance</p>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <span>Use {currentLead.interests} as conversation starter</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      <span>Mention {currentLead.industry} industry challenges</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                      <span>Emphasize networking with peers</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-800 mb-3">AI-Suggested Call Flow</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-medium mr-2 mt-0.5 flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-700">Introduction</p>
                      <p className="text-xs text-gray-500">
                        Brief introduction with name and purpose of call
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-medium mr-2 mt-0.5 flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-700">Pattern Interrupt</p>
                      <p className="text-xs text-gray-500">
                        Industry-specific challenge or statistic
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-medium mr-2 mt-0.5 flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-700">Webinar Value Proposition</p>
                      <p className="text-xs text-gray-500">
                        3 key benefits tailored to their role/industry
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-medium mr-2 mt-0.5 flex-shrink-0">
                      4
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-700">Soft Call to Action</p>
                      <p className="text-xs text-gray-500">
                        Send registration link via email or text
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  onClick={startCampaign}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Start Voice Campaign
                </button>
              </div>
            </div>
          </div>

          {showResults && (
            <div className="border-t border-gray-200 pt-5 mt-5 animate-fade-in">
              <h3 className="text-md font-medium text-gray-800 mb-4">
                Campaign Results
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-white border rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">Calls Placed</p>
                  <p className="text-xl font-semibold">{voiceResults.callsPlaced}</p>
                </div>
                <div className="bg-white border rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">Connected</p>
                  <p className="text-xl font-semibold">{voiceResults.connected}</p>
                  <p className="text-xs text-indigo-600">{voiceResults.connectRate}</p>
                </div>
                <div className="bg-white border rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">Voicemail</p>
                  <p className="text-xl font-semibold">{voiceResults.voicemail}</p>
                </div>
                <div className="bg-white border rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">Registered</p>
                  <p className="text-xl font-semibold text-green-600">{voiceResults.registered}</p>
                  <p className="text-xs text-green-600">{voiceResults.conversionRate}</p>
                </div>
              </div>
              
              <div 
                className="border rounded-md mb-4 overflow-hidden cursor-pointer" 
                onClick={() => toggleSection('voiceInsights')}
              >
                <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <h4 className="text-sm font-medium text-gray-700">AI-Generated Insights</h4>
                  {expandedSection === 'voiceInsights' ? 
                    <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  }
                </div>
                {expandedSection === 'voiceInsights' && (
                  <div className="p-4 bg-white">
                    <div className="space-y-4 text-sm">
                      <div className="flex items-start">
                        <AlertCircle className="h-4 w-4 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900 mb-1">Optimal Call Times</p>
                          <p className="text-gray-700">Calls made between 10:00-11:30am had a 48% connection rate vs. 34% at other times. Consider focusing your calling windows.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <AlertCircle className="h-4 w-4 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900 mb-1">Script Effectiveness</p>
                          <p className="text-gray-700">The direct value proposition approach (Template B) resulted in 34% higher registration rates than the problem-solution approach. Consider standardizing on this template.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <AlertCircle className="h-4 w-4 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900 mb-1">Voicemail Strategy</p>
                          <p className="text-gray-700">30-second voicemails generated a 12% callback rate, while longer messages saw only 4% callbacks. Consider keeping voicemails concise and ending with a specific reason to call back.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div 
                className="border rounded-md overflow-hidden cursor-pointer"
                onClick={() => toggleSection('callAnalytics')}
              >
                <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <h4 className="text-sm font-medium text-gray-700">Call Analytics</h4>
                  {expandedSection === 'callAnalytics' ? 
                    <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  }
                </div>
                {expandedSection === 'callAnalytics' && (
                  <div className="p-4 bg-white">
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Call Outcomes</h5>
                        <div className="flex flex-wrap gap-2">
                          <div className="px-3 py-1.5 bg-blue-50 text-blue-800 rounded-md text-xs flex items-center">
                            <span className="font-medium mr-1">{voiceResults.registered}</span> Registered
                          </div>
                          <div className="px-3 py-1.5 bg-yellow-50 text-yellow-800 rounded-md text-xs flex items-center">
                            <span className="font-medium mr-1">{voiceResults.callbacks}</span> Requested Callback
                          </div>
                          <div className="px-3 py-1.5 bg-green-50 text-green-800 rounded-md text-xs flex items-center">
                            <span className="font-medium mr-1">{voiceResults.transferredToAgent}</span> Transferred to Agent
                          </div>
                          <div className="px-3 py-1.5 bg-red-50 text-red-800 rounded-md text-xs flex items-center">
                            <span className="font-medium mr-1">{voiceResults.declined}</span> Declined
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-3 border-t">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Call Duration</h5>
                        <div className="flex justify-center">
                          <div className="w-full max-w-xs">
                            <BarChart3 className="h-32 w-full text-indigo-400" />
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0-30s</span>
                          <span>30-60s</span>
                          <span>1-2m</span>
                          <span>2-3m</span>
                          <span>3m+</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          Average call duration: 1m 47s
                        </p>
                      </div>
                      
                      <div className="pt-3 border-t">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Common Objections</h5>
                        <div className="space-y-1 text-xs text-gray-600">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                            <span>"Send me more information" (42%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                            <span>"I'm busy right now" (37%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                            <span>"Already have a solution" (15%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-gray-500 mr-2"></div>
                            <span>Other (6%)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Voice Campaign Setup</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Voice Selection
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                defaultValue="neutral-professional"
              >
                <option value="neutral-professional">Neutral Professional</option>
                <option value="friendly-casual">Friendly Casual</option>
                <option value="authoritative-expert">Authoritative Expert</option>
                <option value="energetic-upbeat">Energetic Upbeat</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                This voice will be used for all outreach calls
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Call Schedule
              </label>
              <div className="bg-gray-50 rounded-md p-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Start Date</p>
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">End Date</p>
                    <input
                      type="date"
                      defaultValue={new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0]}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-1">Calling Hours</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <input
                        type="time"
                        defaultValue="09:00"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <span className="mx-2 text-sm">to</span>
                      <input
                        type="time"
                        defaultValue="17:00"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex items-center">
                      <select 
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        defaultValue="recipient"
                      >
                        <option value="recipient">Recipient Timezone</option>
                        <option value="est">EST</option>
                        <option value="cst">CST</option>
                        <option value="mst">MST</option>
                        <option value="pst">PST</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={true}
                  className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
                <span>Leave voicemail if no answer</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Call Retry Strategy
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                defaultValue="3-day"
              >
                <option value="same-day">Same day (3 hours later)</option>
                <option value="next-day">Next business day</option>
                <option value="3-day">3 business days later</option>
                <option value="no-retry">No retry</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                This applies to calls that aren't answered
              </p>
            </div>
            
            <div className="border-t pt-4 mt-2">
              <p className="text-sm font-medium text-gray-800 mb-2">Target Volume</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Call capacity:</span>
                <span className="text-sm font-medium">120 calls/hour</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-gray-600">Total contacts:</span>
                <span className="text-sm font-medium">562 contacts</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-gray-600">Estimated duration:</span>
                <span className="text-sm font-medium">~5 hours</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-white rounded-lg border shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Call Performance</h2>
          
          {showResults ? (
            <div className="space-y-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium text-green-800">Engagement Rate</p>
                  <p className="text-sm font-bold text-green-800">76%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '76%' }}></div>
                </div>
                <p className="text-xs text-green-700 mt-1">
                  24% above industry average for cold calls
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="border rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Call Connection Rates</p>
                  <div className="flex justify-between items-baseline">
                    <p className="text-lg font-medium">{voiceResults.connectRate}</p>
                    <p className="text-xs text-green-600">+15% vs. avg</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Average Call Time</p>
                  <div className="flex justify-between items-baseline">
                    <p className="text-lg font-medium">1m 47s</p>
                    <p className="text-xs text-green-600">Optimal</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-2">
                <p className="text-sm font-medium text-gray-800 mb-2">Key Learnings</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center mr-2 mt-0.5">
                      <Check className="h-3 w-3 text-indigo-600" />
                    </div>
                    <p>Mentioning "industry peers attending" increased engagement by 23%</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center mr-2 mt-0.5">
                      <Check className="h-3 w-3 text-indigo-600" />
                    </div>
                    <p>Questions about current challenges drove 28% longer conversations</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center mr-2 mt-0.5">
                      <Check className="h-3 w-3 text-indigo-600" />
                    </div>
                    <p>Offering to text the registration link increased conversions by 34%</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500">
                Performance metrics will appear here after campaign launch
              </p>
            </div>
          )}
          
          <div className="mt-4 flex justify-between items-center">
            <button
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View Call Recordings
            </button>
            <button
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Download Call Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceOutreach;