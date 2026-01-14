import React, { useState, useEffect } from 'react';
import { Clock, Users, Store, Bell, QrCode, TrendingUp, Calendar, MapPin, CheckCircle, XCircle } from 'lucide-react';

const LineSync = () => {
  const [view, setView] = useState('landing'); // landing, customer, merchant
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [queuePosition, setQueuePosition] = useState(null);
  const [merchantQueues, setMerchantQueues] = useState([
    { id: 1, name: 'Sarah Johnson', service: 'Haircut', joinTime: '2:15 PM', estimatedWait: 25, status: 'waiting' },
    { id: 2, name: 'Mike Chen', service: 'Beard Trim', joinTime: '2:22 PM', estimatedWait: 35, status: 'waiting' },
    { id: 3, name: 'Emma Davis', service: 'Color Treatment', joinTime: '2:30 PM', estimatedWait: 45, status: 'waiting' },
  ]);

  const businesses = [
    { 
      id: 1, 
      name: 'The Weekend Bakery', 
      type: 'Bakery',
      queueLength: 8,
      avgWait: 12,
      location: '123 Main St',
      isOpen: true
    },
    { 
      id: 2, 
      name: 'Modern Barber Shop', 
      type: 'Barber',
      queueLength: 5,
      avgWait: 25,
      location: '456 Oak Ave',
      isOpen: true
    },
    { 
      id: 3, 
      name: 'Community Pharmacy', 
      type: 'Pharmacy',
      queueLength: 3,
      avgWait: 8,
      location: '789 Elm St',
      isOpen: true
    },
  ];

  useEffect(() => {
    if (queuePosition) {
      const timer = setInterval(() => {
        setQueuePosition(prev => ({
          ...prev,
          estimatedWait: Math.max(0, prev.estimatedWait - 1)
        }));
      }, 60000);
      return () => clearInterval(timer);
    }
  }, [queuePosition]);

  const joinQueue = (business) => {
    setQueuePosition({
      business: business.name,
      position: business.queueLength + 1,
      estimatedWait: business.avgWait * (business.queueLength + 1),
      joinTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      queueId: Math.random().toString(36).substr(2, 9)
    });
  };

  const callNext = () => {
    if (merchantQueues.length > 0) {
      const updated = [...merchantQueues];
      updated.shift();
      setMerchantQueues(updated);
    }
  };

  const removeFromQueue = (id) => {
    setMerchantQueues(merchantQueues.filter(q => q.id !== id));
  };

  // Landing Page
  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto p-6">
          {/* Header */}
          <div className="text-center py-12">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-12 h-12 text-indigo-600 mr-3" />
              <h1 className="text-5xl font-bold text-gray-900">LineSync</h1>
            </div>
            <p className="text-xl text-gray-600 mb-8">Virtual Queuing Made Easy</p>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
              Skip the physical line. Join virtually, get live updates, and arrive exactly when it's your turn.
            </p>
          </div>

          {/* Value Propositions */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <QrCode className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Scan to Join</h3>
              <p className="text-gray-600">No app download required. Scan QR code at the door and you're in the queue.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Bell className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Notifications</h3>
              <p className="text-gray-600">Get real-time SMS and browser alerts when it's almost your turn.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <TrendingUp className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Wait Times</h3>
              <p className="text-gray-600">Gemini AI predicts accurate wait times based on historical data.</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setView('customer')}
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition flex items-center"
            >
              <Users className="w-5 h-5 mr-2" />
              Join a Queue
            </button>
            <button
              onClick={() => setView('merchant')}
              className="bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-900 transition flex items-center"
            >
              <Store className="w-5 h-5 mr-2" />
              Merchant Login
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600">70%</div>
              <div className="text-gray-600 mt-2">Local businesses still use paper lists</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600">30%</div>
              <div className="text-gray-600 mt-2">Average revenue increase</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600">50%</div>
              <div className="text-gray-600 mt-2">Reduction in perceived wait time</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Customer View
  if (view === 'customer') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-indigo-600 text-white p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <Clock className="w-8 h-8 mr-2" />
              <h1 className="text-2xl font-bold">LineSync</h1>
            </div>
            <button 
              onClick={() => {
                setView('landing');
                setQueuePosition(null);
              }}
              className="text-sm underline"
            >
              Exit
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6">
          {!queuePosition ? (
            <>
              <h2 className="text-2xl font-bold mb-6">Nearby Businesses</h2>
              <div className="space-y-4">
                {businesses.map(business => (
                  <div key={business.id} className="bg-white rounded-lg p-6 shadow-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{business.name}</h3>
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          {business.location}
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center text-gray-700">
                            <Users className="w-4 h-4 mr-1" />
                            {business.queueLength} in queue
                          </span>
                          <span className="flex items-center text-gray-700">
                            <Clock className="w-4 h-4 mr-1" />
                            ~{business.avgWait} min wait
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => joinQueue(business)}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                      >
                        Join Queue
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="text-center mb-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">You're in Line!</h2>
                <p className="text-gray-600">{queuePosition.business}</p>
              </div>

              <div className="bg-indigo-50 rounded-lg p-6 mb-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-indigo-600 mb-2">
                    #{queuePosition.position}
                  </div>
                  <div className="text-gray-700">Your Position in Queue</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Clock className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <div className="text-2xl font-semibold">{queuePosition.estimatedWait} min</div>
                  <div className="text-sm text-gray-600">Estimated Wait</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Calendar className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <div className="text-2xl font-semibold">{queuePosition.joinTime}</div>
                  <div className="text-sm text-gray-600">Joined At</div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <div className="flex items-start">
                  <Bell className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <strong>Notifications enabled!</strong> We'll alert you via SMS when you're 2 people away from the front.
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Queue ID: {queuePosition.queueId}</p>
                <button
                  onClick={() => setQueuePosition(null)}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Leave Queue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Merchant View
  if (view === 'merchant') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gray-900 text-white p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <Store className="w-8 h-8 mr-2" />
              <div>
                <h1 className="text-2xl font-bold">Merchant Center</h1>
                <p className="text-sm text-gray-300">Modern Barber Shop</p>
              </div>
            </div>
            <button 
              onClick={() => setView('landing')}
              className="text-sm underline"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6">
          {/* Stats Dashboard */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{merchantQueues.length}</div>
                  <div className="text-sm text-gray-600">In Queue</div>
                </div>
                <Users className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">23 min</div>
                  <div className="text-sm text-gray-600">Avg Wait</div>
                </div>
                <Clock className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">42</div>
                  <div className="text-sm text-gray-600">Served Today</div>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">2-4 PM</div>
                  <div className="text-sm text-gray-600">Peak Hours</div>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Queue Management */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Current Queue</h2>
              <button
                onClick={callNext}
                disabled={merchantQueues.length === 0}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Call Next Customer
              </button>
            </div>

            {merchantQueues.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No customers in queue</p>
              </div>
            ) : (
              <div className="space-y-3">
                {merchantQueues.map((customer, index) => (
                  <div 
                    key={customer.id} 
                    className={`border rounded-lg p-4 ${index === 0 ? 'bg-green-50 border-green-300' : 'bg-gray-50'}`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className={`text-2xl font-bold ${index === 0 ? 'text-green-600' : 'text-gray-600'}`}>
                          #{index + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-lg">{customer.name}</div>
                          <div className="text-sm text-gray-600">{customer.service}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Joined</div>
                          <div className="font-medium">{customer.joinTime}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Est. Wait</div>
                          <div className="font-medium">{customer.estimatedWait} min</div>
                        </div>
                        <button
                          onClick={() => removeFromQueue(customer.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <XCircle className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                    {index === 0 && (
                      <div className="mt-3 text-sm text-green-700 font-medium">
                        → NEXT CUSTOMER - SMS notification sent
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* QR Code Section */}
          <div className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 text-white text-center">
            <QrCode className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Customer QR Code</h3>
            <p className="mb-4">Display this at your entrance for customers to scan and join the queue</p>
            <div className="bg-white p-6 rounded-lg inline-block">
              <div className="w-48 h-48 bg-gray-900 rounded flex items-center justify-center">
                <QrCode className="w-32 h-32 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default LineSync;
