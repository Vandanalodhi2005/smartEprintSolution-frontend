import React, { useState, useEffect } from "react";
import { ShoppingCart, Search, User, X, Menu, ArrowRight } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/userActions";
import AuthDrawer from "./AuthDrawer";

const Header = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navItemClass = ({ isActive }) => 
    `text-[11px] font-black uppercase tracking-[0.2em] transition-all relative py-2
     ${isActive ? 'text-[#EF4056]' : 'text-slate-400 hover:text-slate-900'}
     after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#EF4056] after:transition-all after:duration-300
     ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`;

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[80] transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-100/50 py-3' : 'bg-white py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <NavLink to="/" className="relative z-10">
            <img src="/smart-e-print-logo.png" alt="Smart ePrint" className="h-8 sm:h-10 w-auto object-contain transition-transform hover:scale-105" />
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            <NavLink to="/" className={navItemClass}>Home</NavLink>
            <NavLink to="/shop/" className={navItemClass}>Shop</NavLink>
            <NavLink to="/about/" className={navItemClass}>About</NavLink>
            <NavLink to="/faq/" className={navItemClass}>FAQ</NavLink>
            <NavLink to="/contact-us/" className={navItemClass}>Contact</NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button onClick={() => setIsSearchOpen(true)} className="p-2 text-slate-400 hover:text-[#EF4056] transition-colors">
              <Search size={22} />
            </button>

            {userInfo ? (
              <div className="relative">
                <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 p-1.5 pr-4 rounded-full border border-slate-100 transition-all">
                  <div className="w-8 h-8 rounded-full bg-[#EF4056] text-white flex items-center justify-center font-black text-xs">
                    {userInfo.firstName?.charAt(0) || userInfo.name?.charAt(0)}
                  </div>
                  <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-900">{userInfo.firstName || userInfo.name}</span>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-4 w-64 bg-white rounded-[2rem] shadow-2xl border border-slate-100 py-4 z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="px-6 py-4 border-b border-slate-50">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Authenticated</p>
                      <p className="text-sm font-black text-slate-900 truncate">{userInfo.email}</p>
                    </div>
                    <div className="p-2">
                       <Link to={userInfo.isAdmin ? "/admin/dashboard/" : "/profile/"} onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-600 hover:text-[#EF4056] hover:bg-rose-50 rounded-2xl transition-all">
                         {userInfo.isAdmin ? 'Admin Dashboard' : 'Account Profile'}
                       </Link>
                       <button onClick={logoutHandler} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest text-[#EF4056] hover:bg-rose-50 rounded-2xl transition-all">
                         Sign Out
                       </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setAuthOpen(true)} className="p-2 text-slate-400 hover:text-[#EF4056] transition-colors">
                <User size={22} />
              </button>
            )}

            <NavLink to="/cart/" className="relative p-2 text-slate-400 hover:text-[#EF4056] transition-colors">
              <ShoppingCart size={22} />
              {cartItems.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#EF4056] text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {cartItems.reduce((acc, item) => acc + (item?.qty || 0), 0)}
                </span>
              )}
            </NavLink>

            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-400 hover:text-slate-900 transition-colors">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className={`${isScrolled ? 'h-20' : 'h-24'}`}></div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="absolute top-0 right-0 w-[80%] max-w-sm h-full bg-white shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center mb-12">
               <img src="/smart-e-print-logo.png" alt="Logo" className="h-6" />
               <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl bg-slate-50 text-slate-400"><X size={20}/></button>
            </div>
            
            <nav className="flex flex-col gap-6">
              {['Home', 'Shop', 'About', 'FAQ', 'Contact'].map(item => (
                <NavLink key={item} to={item === 'Home' ? '/' : `/${item.toLowerCase()}/`} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black text-slate-900 uppercase tracking-tighter hover:text-[#EF4056] transition-colors">
                  {item}
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-slate-100">
               {userInfo ? (
                 <div className="space-y-4">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-[#EF4056] text-white flex items-center justify-center font-black">{userInfo.firstName?.charAt(0)}</div>
                       <div>
                          <p className="text-sm font-black text-slate-900 uppercase">{userInfo.firstName}</p>
                          <p className="text-[10px] font-bold text-slate-400">{userInfo.email}</p>
                       </div>
                    </div>
                    <Link to="/profile/" className="block w-full py-4 text-center bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest">Manage Account</Link>
                 </div>
               ) : (
                 <button onClick={() => { setAuthOpen(true); setMobileMenuOpen(false); }} className="w-full py-5 bg-[#EF4056] text-white rounded-[1.5rem] font-black uppercase text-xs tracking-widest shadow-xl shadow-rose-100">Member Access</button>
               )}
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-2xl" onClick={() => setIsSearchOpen(false)}></div>
          <div className="relative w-full max-w-3xl bg-white rounded-[3rem] p-8 sm:p-16 shadow-2xl animate-in zoom-in-95 duration-300">
            <button onClick={() => setIsSearchOpen(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"><X size={32}/></button>
            <div className="mb-12">
               <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-2">Omni-Search</h2>
               <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Find hardware, components, or support articles</p>
            </div>
            <form onSubmit={handleSearchSubmit} className="relative group">
              <input 
                type="text" 
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What can we help you find?"
                className="w-full text-2xl sm:text-4xl font-black text-slate-900 placeholder:text-slate-100 outline-none bg-transparent py-4 border-b-4 border-slate-100 focus:border-[#EF4056] transition-all"
              />
              <button type="submit" className="absolute right-0 bottom-6 p-4 bg-[#EF4056] text-white rounded-2xl shadow-xl shadow-rose-200 transition-transform group-focus-within:translate-x-0"><Search size={24}/></button>
            </form>
          </div>
        </div>
      )}

      <AuthDrawer isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Header;
