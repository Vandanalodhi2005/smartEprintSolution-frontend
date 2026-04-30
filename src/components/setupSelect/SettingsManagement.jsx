import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const SettingsManagement = ({ showLogo, setShowLogo, showHeader, setShowHeader, allowModelSearch, setAllowModelSearch, showInstallationFailed, setShowInstallationFailed, showCompleteSetup, setShowCompleteSetup, adminStatus }) => {

    // No fetching or POST logic here; all handled in App.jsx
  return (
    <>
      <Helmet>
        <title>Setup Settings Management | Admin Dashboard</title>
      </Helmet>
      
      <div className="max-w-2xl mx-auto mt-12 p-8 md:p-10 bg-white rounded-3xl shadow-2xl border border-gray-100">
        <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                <i className="fa-solid fa-gears text-2xl"></i>
            </div>
            <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900">Setup Flow Settings</h2>
                <p className="text-gray-500 font-medium">Configure visibility and behavior of the printer setup guide</p>
            </div>
        </div>

        <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-blue-50/50 transition-colors border border-transparent hover:border-blue-100 group">
                <div className="flex flex-col">
                    <label htmlFor="toggle-header" className="text-lg font-bold text-gray-700 select-none group-hover:text-blue-700 transition-colors">Show Global Header</label>
                    <p className="text-sm text-gray-500 font-medium">Toggle the main website header in the setup flow</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        id="toggle-header"
                        type="checkbox"
                        checked={showHeader}
                        onChange={e => {
                            setShowHeader(e.target.checked);
                            // Only update settings when toggled
                            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
                            const token = JSON.parse(localStorage.getItem('setupAdminInfo'))?.token;
                            if (token) {
                                fetch(`${apiUrl}/admin/header-visibility`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`,
                                    },
                                    body: JSON.stringify({ showHeader: e.target.checked })
                                });
                            }
                        }}
                        className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>

            <div className={`flex items-center justify-between p-4 bg-gray-50 rounded-2xl transition-all border border-transparent ${!showHeader ? 'opacity-40 grayscale cursor-not-allowed' : 'hover:bg-blue-50/50 hover:border-blue-100 group'}`}>
                <div className="flex flex-col">
                    <label htmlFor="toggle-logo" className={`text-lg font-bold select-none ${!showHeader ? 'text-gray-400' : 'text-gray-700 group-hover:text-blue-700'}`}>Show Brand Logo</label>
                    <p className="text-sm text-gray-500 font-medium tracking-tight">Show HP logo inside the setup flow header</p>
                </div>
                <label className={`relative inline-flex items-center ${!showHeader ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                    <input
                        id="toggle-logo"
                        type="checkbox"
                        checked={showLogo}
                        onChange={e => {
                            setShowLogo(e.target.checked);
                            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
                            const token = JSON.parse(localStorage.getItem('setupAdminInfo'))?.token;
                            if (token) {
                                fetch(`${apiUrl}/admin/header-visibility`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`,
                                    },
                                    body: JSON.stringify({ showLogo: e.target.checked })
                                });
                            }
                        }}
                        className="sr-only peer"
                        disabled={!showHeader}
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>

            <div className="border-t border-gray-100 my-8"></div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-blue-50/50 transition-colors border border-transparent hover:border-blue-100 group">
                <div className="flex flex-col">
                    <label htmlFor="toggle-model-search" className="text-lg font-bold text-gray-700 select-none group-hover:text-blue-700 transition-colors">Enable Model Search</label>
                    <p className="text-sm text-gray-500 font-medium">Allow users to search for printer models</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        id="toggle-model-search"
                        type="checkbox"
                        checked={allowModelSearch}
                        onChange={e => {
                            setAllowModelSearch(e.target.checked);
                            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
                            const token = JSON.parse(localStorage.getItem('setupAdminInfo'))?.token;
                            if (token) {
                                fetch(`${apiUrl}/admin/header-visibility`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`,
                                    },
                                    body: JSON.stringify({ allowModelSearch: e.target.checked })
                                });
                            }
                        }}
                        className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-blue-50/50 transition-colors border border-transparent hover:border-blue-100 group">
                <div className="flex flex-col">
                    <label htmlFor="toggle-complete-setup" className="text-lg font-bold text-gray-700 select-none group-hover:text-blue-700 transition-colors">Show Completion Page</label>
                    <p className="text-sm text-gray-500 font-medium">Activate the 'Complete Setup' landing page</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        id="toggle-complete-setup"
                        type="checkbox"
                        checked={showCompleteSetup}
                        onChange={e => {
                            setShowCompleteSetup(e.target.checked);
                            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
                            const token = JSON.parse(localStorage.getItem('setupAdminInfo'))?.token;
                            if (token) {
                                fetch(`${apiUrl}/admin/header-visibility`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`,
                                    },
                                    body: JSON.stringify({ showCompleteSetup: e.target.checked })
                                });
                            }
                        }}
                        className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-rose-50 rounded-2xl hover:bg-rose-100 transition-colors border border-transparent hover:border-rose-200 group">
                <div className="flex flex-col">
                    <label htmlFor="toggle-installation-failed" className="text-lg font-bold text-rose-700 select-none group-hover:text-rose-800 transition-colors italic">Force Installation Failed</label>
                    <p className="text-sm text-rose-600 font-medium">Override entire flow and show error page</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        id="toggle-installation-failed"
                        type="checkbox"
                        checked={showInstallationFailed}
                        onChange={e => {
                            setShowInstallationFailed(e.target.checked);
                            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
                            const token = JSON.parse(localStorage.getItem('setupAdminInfo'))?.token;
                            if (token) {
                                fetch(`${apiUrl}/admin/header-visibility`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`,
                                    },
                                    body: JSON.stringify({ showInstallationFailed: e.target.checked })
                                });
                            }
                        }}
                        className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-rose-600"></div>
                </label>
            </div>
        </div>

        {adminStatus && (
          <div className={`mt-10 p-4 rounded-xl text-center font-bold text-sm transform animate-in slide-in-from-bottom duration-300 ${adminStatus.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            <i className={`fa-solid ${adminStatus.includes('success') ? 'fa-circle-check' : 'fa-circle-xmark'} mr-2`}></i>
            {adminStatus}
          </div>
        )}
      </div>
    </>
  );
};

export default SettingsManagement;
