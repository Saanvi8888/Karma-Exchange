import React, { useState } from 'react';
import { ArrowLeft, Clock, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { tradeAPI } from '../services/api';
import Header from './Header';
import Sidebar from './SideBar';

const CreateTrade = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [form, setForm] = useState({
    title: '',
    description: '',
    offer: '',
    lookingFor: '',
    category: '',
    karmaValue: 25,
    duration: '',
    tags: [],
  });

  const categories = [
    'Programming & Tech Skills',
    'Academic Tutoring',
    'Languages & Communication',
    'Design & Creative Skills',
    'Music & Performing Arts',
    'Fitness, Yoga & Sports',
    'Personal Development',
    'Business & Marketing',
    'Cooking & Baking',
    'Handicrafts & DIY',
    'Photography & Video',
    'Lifestyle & Wellness',
    'Gardening & Sustainability',
    'Home & Practical Skills',
    'Other'
  ];

  const handleChange = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      handleChange('tags', [...form.tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await tradeAPI.createTrade(form);
      if (res.data.success) navigate('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const postMessage = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Header setIsMenuOpen={setIsMenuOpen} />
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      <main className="max-w-3xl mx-auto px-4 py-8 mt-12">
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Create a trade</h1>

        <form onSubmit={submit} className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-medium text-gray-900 mb-4">What are you trading?</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">You offer</label>
                <input
                  type="text"
                  value={form.offer}
                  onChange={e => handleChange('offer', e.target.value)}
                  placeholder="e.g., Guitar lessons, Plumbing help, etc."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">You want</label>
                <input
                  type="text"
                  value={form.lookingFor}
                  onChange={e => handleChange('lookingFor', e.target.value)}
                  placeholder="e.g., Web design, Gardening help, etc."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-medium text-gray-900 mb-4">Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => handleChange('title', e.target.value)}
                  placeholder="Give your trade a clear title"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => handleChange('description', e.target.value)}
                  placeholder="Describe what you're offering in detail..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition resize-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <label className="block text-sm text-gray-600 mb-3">Category</label>
              <select
                value={form.category}
                onChange={e => handleChange('category', e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition"
                required
              >
                <option value="">Select</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <label className="block text-sm text-gray-600 mb-3">Karma value</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={form.karmaValue}
                  onChange={e => handleChange('karmaValue', parseInt(e.target.value))}
                  className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
                />
                <span className="text-lg font-medium text-gray-900 min-w-[3ch]">{form.karmaValue}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <label className="block text-sm text-gray-600 mb-3">Duration</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={form.duration}
                  onChange={e => handleChange('duration', e.target.value)}
                  placeholder="e.g., 2 hours"
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <label className="block text-sm text-gray-600 mb-3">Tags</label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Add tag"
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition"
                  />
                  
                  <div className='p-2 bg-purple-50 border border-purple-100 rounded-full'>
                    <Plus className=' text-gray-700' onClick={addTag}/>
                  </div>
                </div>
                
                {form.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {form.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md text-xs text-gray-700"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleChange('tags', form.tags.filter(t => t !== tag))}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-500 text-white py-3 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Posting...' : 'Post trade'}
          </button>
          
        </form>
      </main>
    </div>
  );
};

export default CreateTrade;