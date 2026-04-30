import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Mail, Key } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { login, sendRegistrationOTP, verifyRegistrationOTP, forgotPassword, resetPassword } from '../redux/actions/userActions';
import { USER_AUTH_CLEAR_MESSAGES } from '../redux/constants/userConstants';

const AuthDrawer = ({ isOpen, onClose }) => {
    const [mode, setMode] = useState('login'); // 'login', 'signup', 'verify-otp', 'forgot-password', 'reset-password'
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    // Form states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // Messages
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const dispatch = useDispatch();

    const { loading, error, userInfo } = useSelector((state) => state.userLogin);
    const { loading: loadingSendOTP, error: errorSendOTP, success: successSendOTP } =
        useSelector((state) => state.userSendOTP);
    const { loading: loadingVerifyOTP, error: errorVerifyOTP, success: successVerifyOTP } =
        useSelector((state) => state.userVerifyOTP);
    const { loading: loadingForgot, error: errorForgot, success: successForgot } =
        useSelector((state) => state.userForgotPassword);
    const { loading: loadingReset, error: errorReset, success: successReset } =
        useSelector((state) => state.userResetPassword);

    const resetTransientState = (nextMode = 'login') => {
        dispatch({ type: USER_AUTH_CLEAR_MESSAGES });
        setMode(nextMode);
        setShowPassword(false);
        setSuccessMessage(null);
        setErrorMessage(null);
        setOtp('');
    };

    const handleClose = () => {
        resetTransientState('login');
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            dispatch({ type: USER_AUTH_CLEAR_MESSAGES });
            setSuccessMessage(null);
            setErrorMessage(null);
        }
    }, [dispatch, isOpen]);

    /* ---------------- LOGIN SUCCESS ---------------- */
    useEffect(() => {
        if (userInfo) {
            setSuccessMessage('Login Successful!');
            const timer = setTimeout(() => {
                handleClose();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [userInfo]);

    /* ---------------- SUBMIT ---------------- */
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch({ type: USER_AUTH_CLEAR_MESSAGES });
        setErrorMessage(null);
        setSuccessMessage(null);

        if (mode === 'signup') {
            if (password.length < 6) {
                setErrorMessage('Password must be at least 6 characters');
            } else if (password !== confirmPassword) {
                setErrorMessage('Passwords do not match');
            } else {
                dispatch(sendRegistrationOTP(firstName, lastName, email.trim(), password));
            }
        } else if (mode === 'verify-otp') {
            dispatch(verifyRegistrationOTP(email.trim(), otp));
        } else if (mode === 'forgot-password') {
            dispatch(forgotPassword(email.trim()));
        } else if (mode === 'reset-password') {
            if (newPassword.length < 6) {
                setErrorMessage('Password must be at least 6 characters');
            } else if (newPassword !== confirmPassword) {
                setErrorMessage('Passwords do not match');
            } else {
                dispatch(resetPassword(email.trim(), otp, newPassword));
            }
        } else {
            dispatch(login(email.trim(), password));
        }
    };

    /* ---------------- EFFECTS ---------------- */
    useEffect(() => { if (successSendOTP) { setMode('verify-otp'); setSuccessMessage('OTP sent to your email.'); } }, [successSendOTP]);
    useEffect(() => { if (successVerifyOTP) { setMode('login'); setSuccessMessage('OTP verified successfully! Please login.'); setOtp(''); } }, [successVerifyOTP]);
    useEffect(() => { if (successForgot) { setMode('reset-password'); setSuccessMessage('OTP sent for password reset.'); } }, [successForgot]);
    useEffect(() => { if (successReset) { setMode('login'); setSuccessMessage('Password reset successfully! Please login.'); setOtp(''); setNewPassword(''); } }, [successReset]);

    useEffect(() => {
        const anyError = error || errorSendOTP || errorVerifyOTP || errorForgot || errorReset;
        if (anyError) setErrorMessage(anyError);
    }, [error, errorSendOTP, errorVerifyOTP, errorForgot, errorReset]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={handleClose}></div>
            
            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl relative overflow-hidden animate-in zoom-in-95 fade-in duration-300">
                <button 
                    onClick={handleClose}
                    className="absolute top-6 right-6 p-2 rounded-2xl hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-900 z-10"
                >
                    <X size={24} />
                </button>

                <div className="p-8 sm:p-12">
                    <div className="mb-8">
                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-2">
                            {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Security Check'}
                        </h3>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
                            {mode === 'login' ? 'Login to continue' : mode === 'signup' ? 'Join the community' : 'Identity verification'}
                        </p>
                    </div>

                    {errorMessage && (
                        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-[#EF4056] rounded-2xl text-xs font-black uppercase tracking-tight">
                            {errorMessage}
                        </div>
                    )}

                    {successMessage && (
                        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl text-xs font-black uppercase tracking-tight">
                            {successMessage}
                        </div>
                    )}

                    {mode === 'login' && (
                        <form className="space-y-4" onSubmit={submitHandler}>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 outline-none focus:border-[#EF4056] focus:bg-white transition-all font-bold text-slate-900 shadow-inner"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 outline-none focus:border-[#EF4056] focus:bg-white transition-all font-bold text-slate-900 shadow-inner"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-4 text-slate-400 hover:text-[#EF4056]"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between px-2">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-5 h-5 accent-[#EF4056] rounded-lg"
                                    />
                                    <span className="text-xs font-black uppercase tracking-tighter text-slate-400 group-hover:text-slate-900">Remember</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => resetTransientState('forgot-password')}
                                    className="text-xs font-black uppercase tracking-tighter text-[#EF4056] hover:underline"
                                >
                                    Lost Password?
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-slate-900 hover:bg-black text-white py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : 'Secure Login'}
                            </button>

                            <p className="text-center text-xs font-bold text-slate-400 pt-4">
                                NO ACCOUNT? <button type="button" onClick={() => resetTransientState('signup')} className="text-[#EF4056] uppercase">Register Here</button>
                            </p>
                        </form>
                    )}

                    {mode === 'signup' && (
                         <form className="space-y-4" onSubmit={submitHandler}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">First Name</label>
                                    <input type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-3.5 outline-none focus:border-[#EF4056] focus:bg-white transition-all font-bold text-slate-900 shadow-inner" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Last Name</label>
                                    <input type="text" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-3.5 outline-none focus:border-[#EF4056] focus:bg-white transition-all font-bold text-slate-900 shadow-inner" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email</label>
                                <input type="email" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-3.5 outline-none focus:border-[#EF4056] focus:bg-white transition-all font-bold text-slate-900 shadow-inner" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Password</label>
                                <input type="password" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-3.5 outline-none focus:border-[#EF4056] focus:bg-white transition-all font-bold text-slate-900 shadow-inner" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Confirm</label>
                                <input type="password" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-3.5 outline-none focus:border-[#EF4056] focus:bg-white transition-all font-bold text-slate-900 shadow-inner" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                            </div>

                            <button
                                type="submit"
                                disabled={loadingSendOTP}
                                className="w-full bg-[#EF4056] hover:bg-rose-600 text-white py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl shadow-rose-100 disabled:opacity-50"
                            >
                                {loadingSendOTP ? 'Generating...' : 'Create Account'}
                            </button>

                            <p className="text-center text-xs font-bold text-slate-400 pt-4">
                                ALREADY JOINED? <button type="button" onClick={() => resetTransientState('login')} className="text-slate-900 uppercase font-black">Login</button>
                            </p>
                         </form>
                    )}

                    {(mode === 'verify-otp' || mode === 'reset-password' || mode === 'forgot-password') && (
                        <form className="space-y-6" onSubmit={submitHandler}>
                             <div className="text-center py-4">
                                <div className="w-20 h-20 bg-rose-50 rounded-[2rem] flex items-center justify-center mx-auto mb-4 shadow-inner">
                                    {mode === 'forgot-password' ? <Mail className="text-[#EF4056]" size={32} /> : <Key className="text-[#EF4056]" size={32} />}
                                </div>
                                <p className="text-slate-500 text-sm font-medium px-4">
                                    {mode === 'forgot-password' ? 'Enter email to receive reset code' : `Enter code sent to ${email}`}
                                </p>
                             </div>

                             {mode !== 'forgot-password' && (
                                <input
                                    type="text"
                                    placeholder="000 000"
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-5 py-6 outline-none focus:border-[#EF4056] text-center text-3xl font-black tracking-[0.5em] text-slate-900"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    required
                                />
                             )}

                             {mode === 'forgot-password' && (
                                 <input type="email" placeholder="Email Address" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 outline-none focus:border-[#EF4056] focus:bg-white transition-all font-bold text-slate-900 shadow-inner" value={email} onChange={(e) => setEmail(e.target.value)} required />
                             )}

                             {mode === 'reset-password' && (
                                <div className="space-y-4">
                                    <input type="password" placeholder="New Password" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 outline-none focus:border-[#EF4056] focus:bg-white transition-all font-bold text-slate-900 shadow-inner" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                                    <input type="password" placeholder="Confirm Password" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 outline-none focus:border-[#EF4056] focus:bg-white transition-all font-bold text-slate-900 shadow-inner" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                </div>
                             )}

                             <button
                                type="submit"
                                disabled={loadingForgot || loadingVerifyOTP || loadingReset}
                                className="w-full bg-[#EF4056] hover:bg-rose-600 text-white py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl shadow-rose-100"
                             >
                                {loadingForgot ? 'Sending...' : loadingVerifyOTP ? 'Verifying...' : loadingReset ? 'Resetting...' : 'Confirm'}
                             </button>

                             <button type="button" onClick={() => resetTransientState('login')} className="w-full text-xs font-black uppercase text-slate-400 hover:text-slate-900">Back to Login</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthDrawer;
