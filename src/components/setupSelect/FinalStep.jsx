import React, { useRef, useState } from 'react';

export default function FinalStep({ onBack, onSubmit, nameRef, loading, modelValue, setModelValue }) {
  const [form, setForm] = useState({ model: modelValue || '', name: '', phone: '', email: '', agree: true });
  const [phoneError, setPhoneError] = useState('');
  const [phoneTouched, setPhoneTouched] = useState(false);

  const dataofmodel = localStorage.getItem('modelSearchInput');
  
  // Keep form.model in sync with parent state
  React.useEffect(() => {
    setForm(f => ({ ...f, model: modelValue || dataofmodel || '' }));
  }, [modelValue, dataofmodel]);

  const handleModelChange = (e) => {
    setForm(f => ({ ...f, model: e.target.value }));
    if (setModelValue) setModelValue(e.target.value);
  };

  // Phone validation: must start with +1 and have 11 digits total (Canada/USA)
  const validatePhone = (phone) => {
    const regex = /^\+1\d{10}$/;
    return regex.test(phone);
  };

  const isValid = form.model && form.name && form.phone && form.email && form.agree;
  
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setForm(f => ({ ...f, phone: value }));
    if (phoneTouched) {
      setPhoneError(''); // Clear error on change if already touched
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPhoneTouched(true);
    if (!validatePhone(form.phone)) {
      setPhoneError('Invalid phone number');
      return;
    }
    setPhoneError('');
    onSubmit(e, form);
  };

  return (
    <div className="mb-4">
      <div className="text-blue-700 font-bold text-sm tracking-widest text-center mb-2">FINAL STEP</div>
      <div className="w-full h-1 bg-gray-200 rounded-full mb-6">
        <div className="h-1 bg-orange-400 rounded-full" style={{ width: '100%' }}></div>
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-1 text-center">Register & Start Setup</h2>
      <p className="text-gray-500 text-base mb-8 text-center">Enter your details to complete setup.</p>
      <form className="space-y-4 max-w-xl mx-auto" onSubmit={handleSubmit}>
        <div className="text-left">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Enter Printer Model</label>
          <input type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="e.g., HP LaserJet Pro M404dn" value={form.model} onChange={handleModelChange} />
        </div>
        <div className="text-left">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Enter Your Name</label>
          <input ref={nameRef} type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Emily Johnson" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="text-left">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Enter Phone Number</label>
          <input type="tel" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="+1XXXXXXXXXX" value={form.phone} onChange={handlePhoneChange} />
          {phoneTouched && phoneError && <div className="text-red-600 text-xs mt-1">{phoneError}</div>}
        </div>
        <div className="text-left">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Enter Email Address</label>
          <input type="email" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="emily.johnson@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>
        <div className="flex items-center mt-2">
          <input type="checkbox" id="privacy" className="mr-2" checked={form.agree} onChange={e => setForm(f => ({ ...f, agree: e.target.checked }))} />
          <label htmlFor="privacy" className="text-sm text-gray-700">I agree to accept the <a href="/privacy-policy" className="text-blue-700 underline">Privacy Policy</a>.</label>
        </div>
        <button type="submit" disabled={loading} className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg text-lg mt-4 flex items-center justify-center transition-colors ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>
          {loading ? <span className="animate-spin mr-2"><i className="fa-solid fa-circle-notch"></i></span> : null}
          CONTINUE TO START <i className="fa-solid fa-bolt ml-2"></i>
        </button>
      </form>
      <div className="flex justify-center mt-4">
        <button className="text-gray-500 hover:underline text-sm flex items-center" onClick={onBack}>
          <i className="fa-solid fa-arrow-left mr-1"></i> Back
        </button>
      </div>
    </div>
  );
}
