import React, { useState, useEffect } from 'react';
import { Leaf, Calendar, BarChart3, MessageSquare, TrendingDown, AlertTriangle, CheckCircle, MapPin, Home, Filter } from 'lucide-react';
import { fetchGibs, runCompare, submitContact } from './api/api';

function App() {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'results', 'analysis'
  const [selectedForest, setSelectedForest] = useState(null);
  const [beforeDate, setBeforeDate] = useState('');
  const [afterDate, setAfterDate] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  // New states for real API integration
  const [beforeImageUrl, setBeforeImageUrl] = useState(null);
  const [afterImageUrl, setAfterImageUrl] = useState(null);
  const [loadingImages, setLoadingImages] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // All 18 Kenyan forests
  const forests = [
    { id: 1, name: 'Mau Forest Complex', area: '400,000 ha', location: 'Rift Valley', region: 'Rift Valley' },
    { id: 2, name: 'Aberdare Forest', area: '76,619 ha', location: 'Central Kenya', region: 'Central' },
    { id: 3, name: 'Kakamega Forest', area: '23,000 ha', location: 'Western Kenya', region: 'Western' },
    { id: 4, name: 'Mount Kenya Forest', area: '71,759 ha', location: 'Central Kenya', region: 'Central' },
    { id: 5, name: 'Arabuko-Sokoke Forest', area: '41,600 ha', location: 'Coastal Kenya', region: 'Coast' },
    { id: 6, name: 'Karura Forest', area: '1,063 ha', location: 'Nairobi', region: 'Nairobi' },
    { id: 7, name: 'Ngong Hills (Ngong Forest)', area: '2,324 ha', location: 'Nairobi', region: 'Nairobi' },
    { id: 8, name: 'Chyulu Hills', area: '47,100 ha', location: 'Eastern Kenya', region: 'Eastern' },
    { id: 9, name: 'Mount Elgon Forest', area: '16,916 ha', location: 'Western Kenya', region: 'Western' },
    { id: 10, name: 'Shimba Hills', area: '25,300 ha', location: 'Coastal Kenya', region: 'Coast' },
    { id: 11, name: 'Ngare Ndare Forest', area: '5,400 ha', location: 'Central Kenya', region: 'Central' },
    { id: 12, name: 'Loita Forest', area: '33,000 ha', location: 'Rift Valley', region: 'Rift Valley' },
    { id: 13, name: 'Cherangani Hills Forest', area: '112,000 ha', location: 'Rift Valley', region: 'Rift Valley' },
    { id: 14, name: 'Nandi Forests', area: '20,000 ha', location: 'Rift Valley', region: 'Rift Valley' },
    { id: 15, name: 'Kereita Forest', area: '3,500 ha', location: 'Central Kenya', region: 'Central' },
    { id: 16, name: 'Eburu Forest', area: '3,600 ha', location: 'Rift Valley', region: 'Rift Valley' },
    { id: 17, name: 'Ololua Forest', area: '140 ha', location: 'Nairobi', region: 'Nairobi' },
    { id: 18, name: 'Kaya Kinondo', area: '30 ha', location: 'Coastal Kenya', region: 'Coast' },
  ];

  const regions = ['All Regions', 'Nairobi', 'Central', 'Rift Valley', 'Western', 'Eastern', 'Coast', 'North Eastern', 'Nyanza'];

  const filteredForests = selectedRegion === 'All Regions'
    ? forests
    : forests.filter(forest => forest.region === selectedRegion);

  // Simulate visitor tracking
  useEffect(() => {
    const count = Math.floor(Math.random() * 5000) + 1500;
    setVisitorCount(count);
  }, []);

  // Load satellite images when dates change
  useEffect(() => {
    if (beforeDate && afterDate && selectedForest) {
      loadSatelliteImages();
    }
  }, [beforeDate, afterDate, selectedForest]);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setCurrentPage('results');
  };

  const loadSatelliteImages = async () => {
    if (!beforeDate || !afterDate || !selectedForest) return;

    setLoadingImages(true);
    setBeforeImageUrl(null);
    setAfterImageUrl(null);

    try {
      // Convert YYYY-MM to YYYY-MM-01 (first day of month)
      const beforeFullDate = `${beforeDate}-01`;
      const afterFullDate = `${afterDate}-01`;
      
      const beforeResp = await fetchGibs(selectedForest.name, beforeFullDate);
      const afterResp = await fetchGibs(selectedForest.name, afterFullDate);

      // Detect content type from response
      const beforeContentType = beforeResp.headers['content-type'] || 'image/jpeg';
      const afterContentType = afterResp.headers['content-type'] || 'image/jpeg';

      const beforeBlob = new Blob([beforeResp.data], { type: beforeContentType });
      const afterBlob = new Blob([afterResp.data], { type: afterContentType });

      setBeforeImageUrl(URL.createObjectURL(beforeBlob));
      setAfterImageUrl(URL.createObjectURL(afterBlob));
    } catch (error) {
      console.error('Failed to load satellite images:', error);
      alert('Failed to load satellite images. Please try different dates.');
    } finally {
      setLoadingImages(false);
    }
  };

  const handleAnalyze = async () => {
    if (!beforeDate || !afterDate || !selectedForest) {
      alert('Please select both dates first');
      return;
    }

    setAnalyzing(true);
    setAnalysisResult(null);

    try {
      // Convert YYYY-MM to YYYY-MM-01 (first day of month)
      const beforeFullDate = `${beforeDate}-01`;
      const afterFullDate = `${afterDate}-01`;
      
      const result = await runCompare({
        forest: selectedForest.name,
        beforeDate: beforeFullDate,
        afterDate: afterFullDate
      });

      setAnalysisResult(result.data);
      setShowAnalysis(true);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Failed to analyze forest. Please check your dates and try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleForestSelect = (forest) => {
    setSelectedForest(forest);
    setCurrentPage('analysis');
    setShowAnalysis(false);
    setBeforeDate('');
    setAfterDate('');
    setBeforeImageUrl(null);
    setAfterImageUrl(null);
    setAnalysisResult(null);
  };

  const handleBackToResults = () => {
    setSelectedForest(null);
    setCurrentPage('results');
    setShowAnalysis(false);
  };

  const handleBackToHome = () => {
    setCurrentPage('landing');
    setSelectedForest(null);
    setSelectedRegion('');
    setShowAnalysis(false);
  };

  const handleContactSubmit = async () => {
    // Validation
    if (!contactName || !contactEmail || !contactMessage) {
      alert('Please fill in all fields');
      return;
    }

    if (contactMessage.length < 10) {
      alert('Please provide a message with at least 10 characters');
      return;
    }

    try {
      const response = await submitContact({
        name: contactName,
        email: contactEmail,
        message: contactMessage
      });

      alert(response.data.message || 'Thank you for reaching out! We will get back to you soon.');
      setShowContact(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      const errorMessage = error.response?.data?.details || 'Failed to send message. Please try again.';
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 text-white relative overflow-x-hidden overflow-y-auto flex flex-col">
      {/* Forest Background Overlay */}
      <div className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M50 10 L55 30 L75 30 L58 42 L65 62 L50 50 L35 62 L42 42 L25 30 L45 30 Z\" fill=\"%23fff\"/%3E%3C/svg%3E')" }}></div>

      {/* Header */}
      <header className="relative z-10 bg-green-950 bg-opacity-60 backdrop-blur-sm border-b border-green-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleBackToHome}>
            <Leaf className="w-8 h-8 text-green-400" />
            <div>
              <h1 className="text-2xl font-bold">Kenya Forest Monitor</h1>
              <p className="text-xs text-green-300">Real-time Satellite Analysis System</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="text-right">
              <p className="text-green-300">Total Visitors</p>
              <p className="text-xl font-bold">{visitorCount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex-grow">
        {/* LANDING PAGE */}
        {currentPage === 'landing' && (
          <div className="min-h-[calc(100vh-80px)] flex flex-col">
            {/* Hero Section */}
            <div className="flex-grow flex items-center justify-center px-6 py-16">
              <div className="max-w-4xl text-center">
                <div className="mb-8">
                  <h2 className="text-5xl font-bold mb-4 leading-tight">Monitor Kenya's Forest Heritage</h2>
                  <p className="text-xl text-green-200 mb-6">
                    Track deforestation patterns using advanced satellite imagery and AI analysis
                  </p>
                  <p className="text-green-300 max-w-2xl mx-auto">
                    Our platform provides real-time monitoring of Kenya's precious forests. Select a region below to view detailed satellite comparisons and receive AI-powered insights on forest health and degradation levels.
                  </p>
                </div>

                {/* Region Filter */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-6 text-green-300">Select a Region to Begin</h3>
                  <div className="flex flex-wrap gap-4 justify-center">
                    {regions.map(region => (
                      <button
                        key={region}
                        onClick={() => handleRegionSelect(region)}
                        className="px-8 py-4 rounded-xl font-semibold transition bg-green-950 bg-opacity-60 text-white hover:bg-green-600 border-2 border-green-700 hover:border-green-500 hover:scale-105 backdrop-blur-sm"
                      >
                        {region}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div className="grid md:grid-cols-3 gap-6 mt-16">
                  <div className="bg-green-950 bg-opacity-60 backdrop-blur-md border border-green-700 rounded-xl p-6">
                    <MapPin className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h4 className="font-bold text-lg mb-2">18 Forests</h4>
                    <p className="text-sm text-green-200">Comprehensive coverage of major Kenyan forests across all regions</p>
                  </div>
                  <div className="bg-green-950 bg-opacity-60 backdrop-blur-md border border-green-700 rounded-xl p-6">
                    <BarChart3 className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h4 className="font-bold text-lg mb-2">AI Analysis</h4>
                    <p className="text-sm text-green-200">Advanced algorithms detect degradation and provide actionable insights</p>
                  </div>
                  <div className="bg-green-950 bg-opacity-60 backdrop-blur-md border border-green-700 rounded-xl p-6">
                    <Calendar className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h4 className="font-bold text-lg mb-2">Time Comparison</h4>
                    <p className="text-sm text-green-200">Compare satellite imagery across different time periods</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* RESULTS PAGE */}
        {currentPage === 'results' && (
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 pb-4 min-h-[calc(100vh-160px)]">
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center gap-2 text-green-300">
              <button onClick={handleBackToHome} className="hover:text-white flex items-center gap-1">
                <Home className="w-4 h-4" />
                Home
              </button>
              <span>/</span>
              <span className="text-white font-semibold">{selectedRegion}</span>
            </div>

            {/* Active Filter with Change Option */}
            <div className="mb-8 bg-green-950 bg-opacity-60 backdrop-blur-md border border-green-700 rounded-xl p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <Filter className="w-6 h-6 text-green-400" />
                  <div>
                    <p className="text-sm text-green-300">Viewing forests in</p>
                    <p className="text-2xl font-bold">{selectedRegion}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {regions.filter(r => r !== selectedRegion).map(region => (
                    <button
                      key={region}
                      onClick={() => handleRegionSelect(region)}
                      className="px-4 py-2 rounded-lg text-sm font-semibold transition bg-green-900 bg-opacity-40 text-green-300 hover:bg-green-600 hover:text-white border border-green-700"
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold">
                {filteredForests.length} Forest{filteredForests.length !== 1 ? 's' : ''} Found
              </h2>
              <p className="text-green-300">Click on any forest to view detailed analysis</p>
            </div>

            {/* Forest Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredForests.map(forest => (
                <div
                  key={forest.id}
                  onClick={() => handleForestSelect(forest)}
                  className="bg-green-950 bg-opacity-60 backdrop-blur-md border border-green-700 rounded-xl p-6 hover:bg-opacity-80 hover:border-green-500 transition cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <MapPin className="w-6 h-6 text-green-400 group-hover:text-green-300" />
                    <span className="text-xs bg-green-600 bg-opacity-50 px-2 py-1 rounded">{forest.area}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-green-300 transition">{forest.name}</h3>
                  <p className="text-sm text-green-300">{forest.location}</p>
                </div>
              ))}
            </div>

            {filteredForests.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-green-300 mb-4">No forests found in this region</p>
                <button
                  onClick={() => handleRegionSelect('All Regions')}
                  className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
                >
                  View All Forests
                </button>
              </div>
            )}
          </div>
        )}

        {/* ANALYSIS PAGE */}
        {currentPage === 'analysis' && selectedForest && (
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 pb-4 min-h-[calc(100vh-160px)]">
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center gap-2 text-green-300">
              <button onClick={handleBackToHome} className="hover:text-white flex items-center gap-1">
                <Home className="w-4 h-4" />
                Home
              </button>
              <span>/</span>
              <button onClick={handleBackToResults} className="hover:text-white">
                {selectedRegion}
              </button>
              <span>/</span>
              <span className="text-white font-semibold">{selectedForest.name}</span>
            </div>

            {/* Forest Analysis Dashboard */}
            <div className="bg-green-950 bg-opacity-60 backdrop-blur-md border border-green-700 rounded-xl p-8 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-1">{selectedForest.name}</h2>
                  <p className="text-green-300">{selectedForest.location} • {selectedForest.area}</p>
                </div>
                <BarChart3 className="w-12 h-12 text-green-400" />
              </div>

              {/* Date Selection */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-green-300">Before Date</label>
                  <input
                    type="month"
                    value={beforeDate}
                    onChange={(e) => setBeforeDate(e.target.value)}
                    className="w-full bg-green-900 bg-opacity-40 border border-green-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-green-300">After Date</label>
                  <input
                    type="month"
                    value={afterDate}
                    onChange={(e) => setAfterDate(e.target.value)}
                    className="w-full bg-green-900 bg-opacity-40 border border-green-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                  />
                </div>
              </div>

              {/* Image Comparison */}
              {beforeDate && afterDate && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4">Satellite Image Comparison</h3>
                  {loadingImages && (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-green-300">Loading NASA satellite imagery...</p>
                    </div>
                  )}
                  {!loadingImages && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="relative">
                        <div className="bg-green-900 bg-opacity-30 border-2 border-green-600 rounded-lg h-48 md:h-64 flex items-center justify-center overflow-hidden">
                          {beforeImageUrl ? (
                            <img
                              src={beforeImageUrl}
                              alt="Before satellite image"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-center">
                              <Calendar className="w-12 h-12 text-green-400 mx-auto mb-2" />
                              <p className="text-sm text-green-300">Before: {beforeDate}</p>
                              <p className="text-xs text-green-400 mt-2">Select dates to load imagery</p>
                            </div>
                          )}
                        </div>
                        <div className="absolute top-3 left-3 bg-blue-600 bg-opacity-90 px-3 py-1 rounded text-sm font-semibold">
                          BEFORE
                        </div>
                      </div>
                      <div className="relative">
                        <div className="bg-green-900 bg-opacity-30 border-2 border-red-600 rounded-lg h-48 md:h-64 flex items-center justify-center overflow-hidden">
                          {afterImageUrl ? (
                            <img
                              src={afterImageUrl}
                              alt="After satellite image"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-center">
                              <Calendar className="w-12 h-12 text-red-400 mx-auto mb-2" />
                              <p className="text-sm text-green-300">After: {afterDate}</p>
                              <p className="text-xs text-green-400 mt-2">Select dates to load imagery</p>
                            </div>
                          )}
                        </div>
                        <div className="absolute top-3 left-3 bg-red-600 bg-opacity-90 px-3 py-1 rounded text-sm font-semibold">
                          AFTER
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Analyze Button */}
              {beforeDate && afterDate && (
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-3"
                >
                  {analyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="w-5 h-5" />
                      Analyze Forest Degradation
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Analysis Results */}
            {showAnalysis && analysisResult && (
              <div className="bg-green-950 bg-opacity-60 backdrop-blur-md border border-green-700 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <BarChart3 className="w-7 h-7 text-green-400" />
                  AI Analysis Results
                </h3>

                {/* Degradation Level */}
                <div className={`${analysisResult.lossPct > 20 ? 'bg-red-900 border-red-600' :
                  analysisResult.lossPct > 10 ? 'bg-yellow-900 border-yellow-600' :
                    'bg-green-900 border-green-600'
                  } bg-opacity-30 border rounded-lg p-6 mb-6`}>
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className={`w-8 h-8 ${analysisResult.lossPct > 20 ? 'text-red-400' :
                      analysisResult.lossPct > 10 ? 'text-yellow-400' :
                        'text-green-400'
                      }`} />
                    <div>
                      <h4 className="text-xl font-bold">
                        Degradation Level: {
                          analysisResult.lossPct > 20 ? 'HIGH' :
                            analysisResult.lossPct > 10 ? 'MEDIUM' :
                              'LOW'
                        }
                      </h4>
                      <p className={`${analysisResult.lossPct > 20 ? 'text-red-300' :
                        analysisResult.lossPct > 10 ? 'text-yellow-300' :
                          'text-green-300'
                        }`}>
                        Estimated {analysisResult.lossPct.toFixed(2)}% forest cover loss detected
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-green-950 bg-opacity-60 rounded-full h-4 mt-4">
                    <div className={`h-4 rounded-full ${analysisResult.lossPct > 20 ? 'bg-red-500' :
                      analysisResult.lossPct > 10 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`} style={{ width: `${Math.min(100, analysisResult.lossPct)}%` }}></div>
                  </div>
                </div>

                {/* Change Detection Map */}
                {analysisResult.changeMap && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold mb-3 text-green-300">Change Detection Map:</h4>
                    <div className="bg-green-900 bg-opacity-20 p-4 rounded-lg">
                      <img
                        src={`data:image/png;base64,${analysisResult.changeMap}`}
                        alt="Change detection map"
                        className="w-full rounded-lg"
                      />
                      <p className="text-sm text-green-300 mt-2">Darker areas indicate vegetation loss</p>
                    </div>
                  </div>
                )}

                {/* Before/After Images */}
                {(analysisResult.before || analysisResult.after) && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold mb-3 text-green-300">Satellite Imagery Comparison:</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {analysisResult.before && (
                        <div>
                          <p className="text-sm text-green-300 mb-2">Before: {beforeDate}</p>
                          <img
                            src={`data:image/jpeg;base64,${analysisResult.before}`}
                            alt="Before"
                            className="w-full rounded-lg"
                          />
                        </div>
                      )}
                      {analysisResult.after && (
                        <div>
                          <p className="text-sm text-green-300 mb-2">After: {afterDate}</p>
                          <img
                            src={`data:image/jpeg;base64,${analysisResult.after}`}
                            alt="After"
                            className="w-full rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                <div>
                  <h4 className="text-lg font-bold mb-3 text-green-300">Recommendations:</h4>
                  <div className="space-y-3">
                    {analysisResult.lossPct > 15 && (
                      <div className="flex items-start gap-3 bg-blue-900 bg-opacity-20 p-4 rounded-lg border border-blue-700">
                        <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                        <div>
                          <p className="font-semibold">Immediate Intervention Required</p>
                          <p className="text-sm text-green-200">Deploy forest rangers to identified hotspot areas to prevent further illegal logging</p>
                        </div>
                      </div>
                    )}
                    {analysisResult.lossPct > 5 && (
                      <div className="flex items-start gap-3 bg-blue-900 bg-opacity-20 p-4 rounded-lg border border-blue-700">
                        <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                        <div>
                          <p className="font-semibold">Reforestation Program</p>
                          <p className="text-sm text-green-200">Initiate tree planting initiatives focusing on indigenous species to restore degraded areas</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-3 bg-blue-900 bg-opacity-20 p-4 rounded-lg border border-blue-700">
                      <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div>
                        <p className="font-semibold">Community Engagement</p>
                        <p className="text-sm text-green-200">Establish community forest management programs and alternative livelihood initiatives</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer - Shows on all pages */}
        <footer className="relative z-10 bg-green-950 bg-opacity-70 backdrop-blur-sm border-t border-green-700 py-6 mt-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-green-300 text-sm">
              © 2024 Kenya Forest Monitor. All rights reserved.
            </p>
            <button
              onClick={() => setShowContact(true)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg transition font-semibold"
            >
              <MessageSquare className="w-4 h-4" />
              Contact Us
            </button>
          </div>
        </footer>

        {/* Contact Modal */}
        {showContact && (
          <div className="fixed inset-0 bg-green-950 bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-green-900 to-emerald-900 border border-green-600 rounded-xl p-8 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Contact Us</h3>
                <button onClick={() => setShowContact(false)} className="text-green-300 hover:text-white text-2xl">×</button>
              </div>
              <p className="text-green-200 mb-6 text-sm">Have questions or feedback? We'd love to hear from you!</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-green-300">Your Name</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-green-900 bg-opacity-40 border border-green-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-green-300">Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-green-900 bg-opacity-40 border border-green-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-green-300">Message</label>
                  <textarea
                    rows="4"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Tell us what's on your mind..."
                    className="w-full bg-green-900 bg-opacity-40 border border-green-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
                  ></textarea>
                </div>
                <button
                  onClick={handleContactSubmit}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;