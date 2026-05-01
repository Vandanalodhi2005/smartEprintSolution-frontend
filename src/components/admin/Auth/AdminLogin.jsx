import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { login } from '../../../redux/actions/userActions';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            if (userInfo.isAdmin) {
                navigate('/admin/dashboard');
            }
        }
    }, [userInfo, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(email, password, true));
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="bg-[#EF4056] p-8 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <Lock className="text-white" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Admin Portal</h2>
                    <p className="text-white/80 mt-2 text-sm font-medium">Secure access to Smart ePrint backend</p>
                </div>

                {/* Form */}
                <div className="p-8">
                    {(error || (userInfo && !userInfo.isAdmin)) && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center gap-2">
                            <AlertCircle size={16} />
                            {error || 'Not authorized as an admin'}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-[#EF4056]/5 focus:border-[#EF4056] focus:outline-none transition-all font-bold text-slate-900"
                                    placeholder="admin@smarteprint.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-[#EF4056]/5 focus:border-[#EF4056] focus:outline-none transition-all font-bold text-slate-900"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-slate-900 hover:bg-black text-white font-black text-xs rounded-xl transition-all transform active:scale-95 shadow-lg flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Enter Dashboard'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <span className="text-[9px] font-black text-slate-300">
                            Smart ePrint Protocol v2.0
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
