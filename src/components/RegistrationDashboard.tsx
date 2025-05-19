import React, { useState } from 'react';
import { BarChart3, PieChart, ArrowUpRight, Users, Clock, Calendar, Award, CheckCircle, ArrowDown, ArrowUp, UserPlus, Mail, MessageSquare, Linkedin, Phone } from 'lucide-react';

const RegistrationDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  
  // Mock registration data based on time range
  const getRegistrationData = () => {
    const baseRegistrations = 265;
    
    switch (timeRange) {
      case '7d': 
        return {
          totalRegistrations: 68,
          emailRegistrations: 42,
          smsRegistrations: 12,
          linkedinRegistrations: 9,
          voiceRegistrations: 5,
          conversionRate: '8.1%',
          growth: '+16%',
          positiveGrowth: true
        };
      case '30d':
        return {
          totalRegistrations: baseRegistrations,
          emailRegistrations: 158,
          smsRegistrations: 52,
          linkedinRegistrations: 31,
          voiceRegistrations: 24,
          conversionRate: '10.2%',
          growth: '+24%',
          positiveGrowth: true
        };
      case '90d':
        return {
          totalRegistrations: 592,
          emailRegistrations: 352,
          smsRegistrations: 108,
          linkedinRegistrations: 82,
          voiceRegistrations: 50,
          conversionRate: '9.7%',
          growth: '-3%',
          positiveGrowth: false
        };
      default:
        return {
          totalRegistrations: baseRegistrations,
          emailRegistrations: 158,
          smsRegistrations: 52,
          linkedinRegistrations: 31,
          voiceRegistrations: 24,
          conversionRate: '10.2%',
          growth: '+24%',
          positiveGrowth: true
        };
    }
  };
  
  const registrationData = getRegistrationData();

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Registration Dashboard</h2>
          <p className="text-gray-500 mt-1">Monitor and optimize your webinar registration campaigns</p>
        </div>
        <div className="mt-3 md:mt-0 flex items-center space-x-2">
          <div className="bg-gray-100 p-1 rounded-md">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 text-sm font-medium rounded ${
                timeRange === '7d' 
                  ? 'bg-white shadow-sm text-indigo-700' 
                  : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              7 days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 text-sm font-medium rounded ${
                timeRange === '30d' 
                  ? 'bg-white shadow-sm text-indigo-700' 
                  : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              30 days
            </button>
            <button
              onClick={() => setTimeRange('90d')}
              className={`px-3 py-1.5 text-sm font-medium rounded ${
                timeRange === '90d' 
                  ? 'bg-white shadow-sm text-indigo-700' 
                  : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              90 days
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Total Registrations</p>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              registrationData.positiveGrowth 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {registrationData.positiveGrowth 
                ? <ArrowUp className="h-3 w-3 mr-1" /> 
                : <ArrowDown className="h-3 w-3 mr-1" />
              }
              {registrationData.growth}
            </span>
          </div>
          <div className="flex items-end">
            <p className="text-2xl font-bold text-gray-900">{registrationData.totalRegistrations}</p>
            <p className="text-sm text-gray-500 ml-2">attendees</p>
          </div>
          <div className="h-10 mt-2">
            <BarChart3 className="h-full w-full text-indigo-200" />
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Conversion Rate</p>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              registrationData.positiveGrowth 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {registrationData.positiveGrowth 
                ? <ArrowUp className="h-3 w-3 mr-1" /> 
                : <ArrowDown className="h-3 w-3 mr-1" />
              }
              {registrationData.growth}
            </span>
          </div>
          <div className="flex items-end">
            <p className="text-2xl font-bold text-gray-900">{registrationData.conversionRate}</p>
            <p className="text-sm text-gray-500 ml-2">avg rate</p>
          </div>
          <div className="h-10 mt-2">
            <BarChart3 className="h-full w-full text-indigo-200" />
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Outreach Sent</p>
          </div>
          <div className="flex items-end">
            <p className="text-2xl font-bold text-gray-900">2,683</p>
            <p className="text-sm text-gray-500 ml-2">contacts</p>
          </div>
          <div className="h-10 mt-2">
            <BarChart3 className="h-full w-full text-indigo-200" />
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">Response Rate</p>
          </div>
          <div className="flex items-end">
            <p className="text-2xl font-bold text-gray-900">28.4%</p>
            <p className="text-sm text-gray-500 ml-2">engaged</p>
          </div>
          <div className="h-10 mt-2">
            <BarChart3 className="h-full w-full text-indigo-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg border shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Registration by Channel</h3>
              <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                View detailed report
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Chart placeholder */}
              <div className="flex items-center justify-center">
                <div className="relative h-48 w-48">
                  <PieChart className="h-48 w-48 text-gray-200" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-sm font-medium text-gray-500">Channel Split</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm">Email</span>
                    </div>
                    <div>
                      <span className="font-medium">{registrationData.emailRegistrations}</span>
                      <span className="text-gray-500 ml-1 text-sm">({Math.round(registrationData.emailRegistrations / registrationData.totalRegistrations * 100)}%)</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">SMS</span>
                    </div>
                    <div>
                      <span className="font-medium">{registrationData.smsRegistrations}</span>
                      <span className="text-gray-500 ml-1 text-sm">({Math.round(registrationData.smsRegistrations / registrationData.totalRegistrations * 100)}%)</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                      <span className="text-sm">LinkedIn</span>
                    </div>
                    <div>
                      <span className="font-medium">{registrationData.linkedinRegistrations}</span>
                      <span className="text-gray-500 ml-1 text-sm">({Math.round(registrationData.linkedinRegistrations / registrationData.totalRegistrations * 100)}%)</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-sm">Voice</span>
                    </div>
                    <div>
                      <span className="font-medium">{registrationData.voiceRegistrations}</span>
                      <span className="text-gray-500 ml-1 text-sm">({Math.round(registrationData.voiceRegistrations / registrationData.totalRegistrations * 100)}%)</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-5 border-t pt-5">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Optimization Opportunity</h4>
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <p className="text-sm text-indigo-700">
                      SMS has the highest conversion rate (19.2%). Consider 
                      re-allocating 15% of your email budget to SMS for an estimated
                      21% increase in conversions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg border shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Webinar Summary</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                On Track
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-lg bg-indigo-100 flex items-center justify-center mr-3">
                  <Calendar className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="text-sm font-medium">June 15, 2025</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-lg bg-indigo-100 flex items-center justify-center mr-3">
                  <Clock className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Time</p>
                  <p className="text-sm font-medium">11:00 AM - 12:00 PM EST</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-lg bg-indigo-100 flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Registration Goal</p>
                  <p className="text-sm font-medium">
                    {registrationData.totalRegistrations} / 400 
                    <span className="text-xs text-gray-500 ml-1">
                      ({Math.round(registrationData.totalRegistrations / 400 * 100)}% complete)
                    </span>
                  </p>
                  <div className="w-48 h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${Math.round(registrationData.totalRegistrations / 400 * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-lg bg-indigo-100 flex items-center justify-center mr-3">
                  <Award className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Expected Attendance</p>
                  <p className="text-sm font-medium">
                    ~{Math.round(registrationData.totalRegistrations * 0.65)} attendees 
                    <span className="text-xs text-gray-500 ml-1">
                      (65% show rate)
                    </span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-5 border-t">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between px-3 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-md text-sm text-indigo-700 font-medium">
                  <span className="flex items-center">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Boost Registrations
                  </span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                
                <button className="w-full flex items-center justify-between px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-700 font-medium">
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    View Registrants
                  </span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg border shadow-sm p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-900">Channel Performance</h3>
              <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                Optimize Automatically
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                      <Mail className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email Campaign</p>
                      <p className="text-xs text-gray-500">5 templates, 2,425 sent</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{Math.round(registrationData.emailRegistrations / 2425 * 100)}% conversion</p>
                    <div className="flex items-center text-xs text-green-600">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      <span>12% above avg</span>
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>6.5/10 effectiveness score</span>
                  <span>$2.80 cost per registration</span>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                      <MessageSquare className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">SMS Campaign</p>
                      <p className="text-xs text-gray-500">3 templates, 430 sent</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{Math.round(registrationData.smsRegistrations / 430 * 100)}% conversion</p>
                    <div className="flex items-center text-xs text-green-600">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      <span>18% above avg</span>
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>8.5/10 effectiveness score</span>
                  <span>$1.90 cost per registration</span>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center mr-3">
                      <Linkedin className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">LinkedIn Campaign</p>
                      <p className="text-xs text-gray-500">225 messages sent</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{Math.round(registrationData.linkedinRegistrations / 225 * 100)}% conversion</p>
                    <div className="flex items-center text-xs text-green-600">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      <span>7% above avg</span>
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-indigo-500 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>7.5/10 effectiveness score</span>
                  <span>$3.40 cost per registration</span>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                      <Phone className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Voice Campaign</p>
                      <p className="text-xs text-gray-500">562 calls placed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{Math.round(registrationData.voiceRegistrations / 562 * 100)}% conversion</p>
                    <div className="flex items-center text-xs text-yellow-600">
                      <span>Average</span>
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-purple-500 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>4.5/10 effectiveness score</span>
                  <span>$5.20 cost per registration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg border shadow-sm p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-5">Optimization Actions</h3>
            
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <p className="text-sm font-medium text-green-900">
                    AI Recommendations Applied
                  </p>
                </div>
                <p className="text-sm text-green-600">
                  3 optimizations deployed, resulting in a 28% increase in conversion rate.
                </p>
              </div>
              
              <div className="border-t pt-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-xs mr-2 mt-0.5 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="text-sm font-medium">Re-allocate budget to SMS</p>
                      <p className="text-xs text-gray-600">
                        Shift 15% of email budget to SMS for higher ROI
                      </p>
                      <button className="mt-1 text-xs font-medium text-indigo-600 hover:text-indigo-800">
                        Apply Now
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-xs mr-2 mt-0.5 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="text-sm font-medium">Optimize email subject lines</p>
                      <p className="text-xs text-gray-600">
                        A/B test new subject lines based on top performers
                      </p>
                      <button className="mt-1 text-xs font-medium text-indigo-600 hover:text-indigo-800">
                        Generate Subjects
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-xs mr-2 mt-0.5 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="text-sm font-medium">Adjust voice call script</p>
                      <p className="text-xs text-gray-600">
                        Focus on industry challenges for better engagement
                      </p>
                      <button className="mt-1 text-xs font-medium text-indigo-600 hover:text-indigo-800">
                        Optimize Script
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 border-t pt-4">
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md text-sm">
                    Apply All Optimizations
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-2">
                    Estimated impact: +18% registrations
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-white rounded-lg border shadow-sm p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Projections</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Current registrations:</p>
                <p className="text-sm font-medium">{registrationData.totalRegistrations}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Projected final total:</p>
                <p className="text-sm font-medium">~450</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Expected attendance:</p>
                <p className="text-sm font-medium">~290 (65%)</p>
              </div>
            </div>
            
            <div className="mt-4 h-32">
              <BarChart3 className="h-full w-full text-indigo-200" />
            </div>
            <p className="text-center text-xs text-gray-500 mt-1">
              Registration trend projection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDashboard;