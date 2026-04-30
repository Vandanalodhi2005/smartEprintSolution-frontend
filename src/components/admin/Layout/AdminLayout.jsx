import React, { useState, useEffect } from 'react';
import api from '../../../lib/api';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, logout } from '../../../redux/actions/userActions';
import AdminSidebar from './AdminSidebar';
import {
    Bell,
    User,
    Search,
    LogOut,
    Settings,
    Menu,
    X,
    Clock,
    Lock,
    Save,
    Shield,
    ArrowRight
} from 'lucide-react';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // Auth Check
    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/admin/login');
        }
    }, [userInfo, navigate]);

    // Time State
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Dropdown States
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    // Profile Form State
    const [profileMode, setProfileMode] = useState('details'); // details, edit, password
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success: updateSuccess, loading: updateLoading } = userUpdateProfile;

    useEffect(() => {
        if (userInfo) {
            setFirstName(userInfo.firstName || userInfo.name?.split(' ')[0] || '');
            setLastName(userInfo.lastName || userInfo.name?.split(' ').slice(1).join(' ') || '');
            setEmail(userInfo.email || '');
        }
    }, [userInfo]);

    useEffect(() => {
        if (updateSuccess) {
            setProfileMode('details');
            setMessage(null);
            setPassword('');
            setConfirmPassword('');
        }
    }, [updateSuccess]);

    const submitHandler = (e) => {
        e.preventDefault();
        setMessage(null);

        if (profileMode === 'password') {
            if (password !== confirmPassword) {
                setMessage('Passwords do not match');
                return;
            }
            dispatch(updateUserProfile({ id: userInfo._id, password }));
        } else {
            dispatch(updateUserProfile({ id: userInfo._id, firstName, lastName, email }));
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin/login');
    };

    const openProfileModal = () => {
        setIsProfileOpen(false);
        setIsProfileModalOpen(true);
        setProfileMode('details');
    };

    if (!userInfo || !userInfo.isAdmin) return null;

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="h-20 bg-white border-b-2 border-slate-100 flex items-center justify-between px-8 z-20 relative">
                    {/* Left: Menu Toggle (Mobile) & Clock */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-3 text-slate-500 hover:bg-slate-50 rounded-xl"
                        >
                            <Menu size={22} />
                        </button>

                        <div className="hidden md:flex items-center gap-3 text-slate-400 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                            <Clock size={16} className="text-[#EF4056]" />
                            <span className="text-[10px] font-black uppercase tracking-widest">
                                {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-4">
                        {/* Profile */}
                        <div className="relative">
                            <button
                                onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
                                className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl hover:bg-slate-50 transition-colors border-2 border-transparent hover:border-slate-100"
                            >
                                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-sm uppercase shadow-lg shadow-slate-200">
                                    {userInfo.firstName?.charAt(0) || userInfo.name?.charAt(0)}
                                </div>
                                <div className="hidden sm:flex flex-col items-start pr-3">
                                    <span className="text-xs font-black text-slate-900 uppercase tracking-tight">{userInfo.firstName || userInfo.name}</span>
                                    <span className="text-[9px] font-bold text-[#EF4056] uppercase tracking-[0.2em]">Super Admin</span>
                                </div>
                            </button>

                            {/* Profile Dropdown */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-3 w-72 bg-white rounded-[2rem] shadow-2xl border-2 border-slate-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                    <div className="p-8 border-b-2 border-slate-50 bg-slate-50/50 text-center">
                                        <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-4 uppercase shadow-xl">
                                            {userInfo.firstName?.charAt(0) || userInfo.name?.charAt(0)}
                                        </div>
                                        <h4 className="font-black text-slate-900 uppercase tracking-tight truncate">{userInfo.name}</h4>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Admin Level 5</p>
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <button onClick={openProfileModal} className="w-full flex items-center justify-between px-6 py-4 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-2xl group transition-all">
                                            <div className="flex items-center gap-3">
                                               <User size={18} className="group-hover:text-[#EF4056]" /> 
                                               <span>Settings</span>
                                            </div>
                                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                                        </button>
                                        <div className="h-px bg-slate-100 mx-4"></div>
                                        <button onClick={handleLogout} className="w-full flex items-center justify-between px-6 py-4 text-sm font-bold text-red-600 hover:bg-red-50 rounded-2xl group transition-all">
                                            <div className="flex items-center gap-3">
                                               <LogOut size={18} /> 
                                               <span>Sign Out</span>
                                            </div>
                                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-6 md:p-12 relative custom-scrollbar">
                    <Outlet />
                </main>
            </div>

            {/* Profile Modal */}
            {isProfileModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200 p-4">
                    <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="bg-slate-900 px-10 py-12 text-white relative">
                            <button onClick={() => setIsProfileModalOpen(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/10">
                                <X size={24} />
                            </button>
                            <div className="flex flex-col items-center">
                                <div className="w-28 h-28 bg-white/5 rounded-[2rem] flex items-center justify-center text-4xl font-black mb-6 border-4 border-white/10 uppercase shadow-2xl">
                                    {userInfo.firstName?.charAt(0) || userInfo.name?.charAt(0)}
                                </div>
                                <h2 className="text-3xl font-black uppercase tracking-tighter">{userInfo.name}</h2>
                                <p className="text-slate-500 text-sm font-bold mt-2 tracking-widest uppercase">{userInfo.email}</p>
                            </div>
                        </div>

                        <div className="p-10 sm:p-12">
                            {message && (
                                <div className="mb-8 p-4 bg-red-50 border-2 border-red-100 text-red-600 text-xs font-black uppercase tracking-widest rounded-2xl flex items-center gap-3">
                                    <Shield size={16} />
                                    {message}
                                </div>
                            )}

                            {profileMode === 'details' && (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-100">
                                            <span className="text-[10px] text-slate-400 uppercase font-black block mb-2 tracking-widest">Full Identity</span>
                                            <span className="font-black text-slate-900 uppercase">{userInfo.firstName + ' ' + userInfo.lastName || userInfo.name}</span>
                                        </div>
                                        <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-100">
                                            <span className="text-[10px] text-slate-400 uppercase font-black block mb-2 tracking-widest">Protocol Status</span>
                                            <span className="font-black text-emerald-600 uppercase flex items-center gap-2"><Shield size={14} /> Secured</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <button
                                            onClick={() => setProfileMode('edit')}
                                            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200"
                                        >
                                            <Settings size={18} className="text-[#EF4056]" /> Modify Profile
                                        </button>
                                        <button
                                            onClick={() => setProfileMode('password')}
                                            className="w-full py-5 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
                                        >
                                            <Lock size={18} className="text-[#EF4056]" /> Update Cipher
                                        </button>
                                    </div>
                                </div>
                            )}

                            {profileMode === 'edit' && (
                                <form onSubmit={submitHandler} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest ml-1">First Name</label>
                                            <input
                                                type="text"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#EF4056] outline-none transition-all font-bold text-slate-900"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest ml-1">Last Name</label>
                                            <input
                                                type="text"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#EF4056] outline-none transition-all font-bold text-slate-900"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#EF4056] outline-none transition-all font-bold text-slate-900"
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setProfileMode('details')}
                                            className="flex-1 py-5 border-2 border-slate-100 text-slate-400 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={updateLoading}
                                            className="flex-1 py-5 bg-[#EF4056] text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#d93548] shadow-xl shadow-rose-100 flex items-center justify-center gap-2"
                                        >
                                            {updateLoading ? 'Processing...' : <><Save size={18} /> Apply Changes</>}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {profileMode === 'password' && (
                                <form onSubmit={submitHandler} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest ml-1">New Cipher</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#EF4056] outline-none transition-all font-bold text-slate-900"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest ml-1">Confirm Cipher</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#EF4056] outline-none transition-all font-bold text-slate-900"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setProfileMode('details')}
                                            className="flex-1 py-5 border-2 border-slate-100 text-slate-400 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={updateLoading}
                                            className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black shadow-xl shadow-slate-200 flex items-center justify-center gap-2"
                                        >
                                            {updateLoading ? 'Processing...' : <><Lock size={18} /> Update Key</>}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLayout;
