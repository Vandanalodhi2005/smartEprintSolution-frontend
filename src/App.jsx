/**
 * Smart ePrint Solution - Main Application Component
 * Handles routing, global state initialization, and dynamic settings management.
 */

import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// --- Global Actions & Libs ---
import { fetchAllProducts } from './redux/actions/productActions';
import { fetchCartFromDB } from './redux/actions/cartActions';
import { ImagePreloadProvider } from './lib/ImagePreloadContext';
import { isBot } from './lib/botUtils';

// --- Core Components ---
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/common/ErrorBoundary';
import TrailingSlashRedirect from './components/common/TrailingSlashRedirect';

// --- Lazy Loaded Components ---
const HomeMain = lazy(() => import('./components/home/HomeMain'));
const SetupSelect = lazy(() => import('./components/setupSelect/SetupSelect'));
const ModelSearch = lazy(() => import('./components/setupSelect/ModelSearch'));
const CompleteSetup = lazy(() => import('./components/setupSelect/CompleteSetup'));
const InstallationFailedPage = lazy(() => import('./components/setupSelect/InstallationFailedPage'));
const SettingsManagement = lazy(() => import('./components/setupSelect/SettingsManagement'));
const SimpleAdminLogin = lazy(() => import('./components/setupSelect/SimpleAdminLogin'));
const SetupHeader = lazy(() => import('./components/setupSelect/SetupHeader'));

// --- Page Components ---
const ProfilePage = lazy(() => import('./components/profile/ProfilePage'));
const UnderConstruction = lazy(() => import('./components/common/UnderConstruction'));
const AboutMain = lazy(() => import('./components/about/AboutMain'));
const PrivacyPolicy = lazy(() => import('./components/privacyPolicy/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./components/TermsAndConditions'));
const ContactMain = lazy(() => import('./components/contact/ContactMain'));
const FAQMain = lazy(() => import('./components/faq/FAQMain'));
const RefundReturnPolicy = lazy(() => import('./components/privacyPolicy/RefundReturnPolicy'));
const ShippingPolicy = lazy(() => import('./components/privacyPolicy/ShippingPolicy'));
const Disclaimer = lazy(() => import('./components/privacyPolicy/Disclaimer'));
const BlogsMain = lazy(() => import('./components/blogs/BlogsMain'));
const ShopMain = lazy(() => import('./components/shop/ShopMain'));

// --- Shop & Checkout ---
const Cart = lazy(() => import('./components/Cart'));
const Checkout = lazy(() => import('./components/Checkout'));
const ProductDetails = lazy(() => import('./components/productsCategories/ProductDetails'));
const OrderDetails = lazy(() => import('./components/order/OrderDetails'));
const TrackOrder = lazy(() => import('./components/order/TrackOrder'));

// --- Admin Components ---
const AdminLogin = lazy(() => import('./components/admin/Auth/AdminLogin'));
const AdminLayout = lazy(() => import('./components/admin/Layout/AdminLayout'));
const AdminDashboard = lazy(() => import('./components/admin/Pages/AdminDashboard'));
const AdminCategories = lazy(() => import('./components/admin/Pages/AdminCategories'));
const AdminProducts = lazy(() => import('./components/admin/Pages/AdminProducts'));
const AdminOrders = lazy(() => import('./components/admin/Pages/AdminOrders'));
const AdminCustomers = lazy(() => import('./components/admin/Pages/AdminCustomers'));
const AdminChat = lazy(() => import('./components/admin/Pages/AdminChat'));
const AdminAnalytics = lazy(() => import('./components/admin/Pages/AdminAnalytics'));
const AdminSettings = lazy(() => import('./components/admin/Pages/AdminSettings'));

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const intervalRef = useRef();

    // Redux State
    const { allLoaded } = useSelector((state) => state.productList);
    const { userInfo } = useSelector((state) => state.userLogin);

    // Navigation Context
    const normalizedPath = location.pathname.replace(/\/+$/, '') || '/';
    const isAdminRoute = normalizedPath.startsWith('/admin');
    
    const SETUP_GUIDE_ROUTES = [
        '/step-by-step-setup-guide/', '/printer-setup-guide/',
        '/model-search/', '/complete-setup/', '/installation-failed/'
    ];
    const isSetupRoute = SETUP_GUIDE_ROUTES.includes(location.pathname);

    // Local UI Settings (Setup Flow)
    const [showHeader, setShowHeader] = useState(false);
    const [showLogo, setShowLogo] = useState(false);
    const [allowModelSearch, setAllowModelSearch] = useState(true);
    const [showInstallationFailed, setShowInstallationFailed] = useState(true);
    const [showCompleteSetup, setShowCompleteSetup] = useState(true);
    const [isLoadingSettings, setIsLoadingSettings] = useState(true);
    
    const [adminStatus, setAdminStatus] = useState('');
    const [setupAdminInfo, setSetupAdminInfo] = useState(() => {
        const stored = localStorage.getItem('setupAdminInfo');
        return stored ? JSON.parse(stored) : null;
    });
    const [setupLoginError, setSetupLoginError] = useState('');

    /**
     * Resolves the base URL for admin API calls.
     */
    const getAdminApiBase = () => {
        const rawBase = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api').replace(/\/+$/, '');
        return rawBase.endsWith('/api') ? rawBase : `${rawBase}/api`;
    };

    /**
     * Handles authentication for the lightweight setup admin panel.
     */
    const handleSetupAdminLogin = (username, password) => {
        const apiUrl = getAdminApiBase();
        setSetupLoginError('');
        
        axios.post(`${apiUrl}/admin/login-simple`, { username, password })
            .then(res => {
                const { data } = res;
                if (data.token) {
                    setSetupAdminInfo(data);
                    localStorage.setItem('setupAdminInfo', JSON.stringify(data));
                } else {
                    setSetupLoginError('Invalid credentials.');
                }
            })
            .catch((error) => setSetupLoginError(error.response?.data?.message || 'Login failed.'));
    };

    /**
     * Core Data Synchronization
     */
    useEffect(() => {
        // Pre-fetch products for instant search experience
        if (!allLoaded) dispatch(fetchAllProducts());
        
        // Restore active cart for authenticated users
        if (userInfo?.token) dispatch(fetchCartFromDB());
    }, [dispatch, userInfo?.token, allLoaded]);

    /**
     * Real-time Settings Synchronization
     * Fetches UI visibility settings for the setup flow.
     */
    useEffect(() => {
        const fetchSettings = () => {
            const apiUrl = getAdminApiBase();
            axios.get(`${apiUrl}/admin/header-visibility`)
                .then(res => {
                    const { data } = res;
                    if (!data) return;
                    
                    setShowHeader(!!data.showHeader);
                    setShowLogo(!!data.showLogo);
                    setAllowModelSearch(data.allowModelSearch !== false);
                    setShowInstallationFailed(data.showInstallationFailed !== false);
                    setShowCompleteSetup(data.showCompleteSetup !== false);
                    setIsLoadingSettings(false);
                    
                    // Cache critical flags for quick access in sub-components
                    localStorage.setItem('showInstallationFailed', String(data.showInstallationFailed !== false));
                    localStorage.setItem('showCompleteSetup', String(data.showCompleteSetup !== false));
                })
                .catch((err) => {
                    console.error('Settings Sync Error:', err);
                    setIsLoadingSettings(false);
                });
        };

        fetchSettings();
        intervalRef.current = setInterval(fetchSettings, 10000); // Sync every 10s
        
        return () => clearInterval(intervalRef.current);
    }, []);

    /**
     * Updates header visibility settings (Admin only).
     */
    const updateHeaderSettings = (updatedFields) => {
        const apiUrl = getAdminApiBase();
        const token = setupAdminInfo?.token;
        
        if (!token) {
            setAdminStatus('Session expired. Please login again.');
            return;
        }

        setAdminStatus('');
        axios.post(`${apiUrl}/admin/header-visibility`, {
                showHeader, showLogo, allowModelSearch, showInstallationFailed, showCompleteSetup,
                ...updatedFields
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(res => {
                if (res.data.success) {
                    setAdminStatus('Settings updated successfully.');
                    // Reflect changes locally immediately
                    if (updatedFields.showHeader !== undefined) setShowHeader(updatedFields.showHeader);
                    if (updatedFields.showLogo !== undefined) setShowLogo(updatedFields.showLogo);
                    if (updatedFields.allowModelSearch !== undefined) setAllowModelSearch(updatedFields.allowModelSearch);
                    if (updatedFields.showInstallationFailed !== undefined) setShowInstallationFailed(updatedFields.showInstallationFailed);
                    if (updatedFields.showCompleteSetup !== undefined) setShowCompleteSetup(updatedFields.showCompleteSetup);
                }
            })
            .catch((error) => setAdminStatus(error.response?.data?.message || 'Update failed.'));
    };

    // Shared loading fallback
    const LoadingFallback = () => (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <ImagePreloadProvider>
            <TrailingSlashRedirect />
            <div className="flex flex-col min-h-screen">
                <ScrollToTop />
                
                <main className={`flex-grow ${isAdminRoute ? 'h-screen overflow-hidden' : ''}`}>
                    <Suspense fallback={<LoadingFallback />}>
                        <ErrorBoundary>
                            <Routes>
                                {/* --- Admin: Setup Flow Management --- */}
                                <Route path="/settings-management" element={
                                    setupAdminInfo ? (
                                        <SettingsManagement 
                                            showHeader={showHeader} setShowHeader={(val) => updateHeaderSettings({showHeader: val})}
                                            showLogo={showLogo} setShowLogo={(val) => updateHeaderSettings({showLogo: val})}
                                            allowModelSearch={allowModelSearch} setAllowModelSearch={(val) => updateHeaderSettings({allowModelSearch: val})}
                                            showInstallationFailed={showInstallationFailed} setShowInstallationFailed={(val) => updateHeaderSettings({showInstallationFailed: val})}
                                            showCompleteSetup={showCompleteSetup} setShowCompleteSetup={(val) => updateHeaderSettings({showCompleteSetup: val})}
                                            adminStatus={adminStatus}
                                        />
                                    ) : (
                                        <SimpleAdminLogin onLogin={handleSetupAdminLogin} error={setupLoginError} />
                                    )
                                } />

                                {/* --- Main Site & Setup Routes --- */}
                                <Route path="*" element={
                                    <>
                                        {!isAdminRoute && !isSetupRoute && <Header />}
                                        {isSetupRoute && showHeader && normalizedPath !== '/step-by-step-setup-guide' && (
                                            <SetupHeader showLogo={showLogo} showHeader={showHeader} />
                                        )}

                                        <Routes>
                                            {/* Legacy Redirects */}
                                            <Route path="/printer-setup-guide" element={<Navigate to="/printer-setup-guide/" replace />} />
                                            <Route path="/model-search" element={<Navigate to="/model-search/" replace />} />
                                            <Route path="/complete-setup" element={<Navigate to="/complete-setup/" replace />} />
                                            
                                            {/* Primary Flow */}
                                            <Route path="/" element={<HomeMain />} />
                                            <Route path="/step-by-step-setup-guide/" element={<SetupSelect />} />
                                            <Route path="/printer-setup-guide/" element={<SetupSelect />} />
                                            
                                            <Route path="/model-search/" element={
                                                (isLoadingSettings || allowModelSearch || isBot()) 
                                                ? <ModelSearch allowModelSearch={allowModelSearch} /> 
                                                : <Navigate to="/step-by-step-setup-guide/" replace />
                                            } />
                                            
                                            <Route path="/complete-setup/" element={
                                                (isLoadingSettings || showCompleteSetup || isBot()) 
                                                ? <CompleteSetup showCompleteSetup={showCompleteSetup} /> 
                                                : <Navigate to="/step-by-step-setup-guide/" replace />
                                            } />
                                            
                                            <Route path="/installation-failed/" element={
                                                (isLoadingSettings || showInstallationFailed || isBot()) 
                                                ? <InstallationFailedPage showInstallationFailed={showInstallationFailed} /> 
                                                : <Navigate to="/step-by-step-setup-guide/" replace />
                                            } />

                                            {/* Shop & User Account */}
                                            <Route path="/shop/" element={<ShopMain />} />
                                            <Route path="/product/:id/" element={<ProductDetails />} />
                                            <Route path="/cart/" element={<Cart />} />
                                            <Route path="/checkout/" element={<Checkout />} />
                                            <Route path="/profile/" element={<ProfilePage />} />
                                            <Route path="/track-order/" element={<TrackOrder />} />
                                            <Route path="/order/:id/" element={<OrderDetails />} />

                                            {/* Informational Pages */}
                                            <Route path="/about/" element={<AboutMain />} />
                                            <Route path="/blogs/" element={<BlogsMain />} />
                                            <Route path="/faq/" element={<FAQMain />} />
                                            <Route path="/contact-us/" element={<ContactMain />} />
                                            <Route path="/privacy-policy/" element={<PrivacyPolicy />} />
                                            <Route path="/terms-and-conditions/" element={<TermsAndConditions />} />
                                            <Route path="/return-refund-policy/" element={<RefundReturnPolicy />} />
                                            <Route path="/shipping-policy/" element={<ShippingPolicy />} />
                                            <Route path="/disclaimer/" element={<Disclaimer />} />

                                            {/* Admin Dashboard */}
                                            <Route path="/admin/login" element={<AdminLogin />} />
                                            <Route path="/admin" element={<AdminLayout />}>
                                                <Route index element={<Navigate to="/admin/dashboard/" replace />} />
                                                <Route path="dashboard/" element={<AdminDashboard />} />
                                                <Route path="categories/" element={<AdminCategories />} />
                                                <Route path="products/" element={<AdminProducts />} />
                                                <Route path="orders/" element={<AdminOrders />} />
                                                <Route path="customers/" element={<AdminCustomers />} />
                                                <Route path="chat/" element={<AdminChat />} />
                                                <Route path="analytics/" element={<AdminAnalytics />} />
                                                <Route path="settings/" element={<AdminSettings />} />
                                                <Route path="*" element={<UnderConstruction />} />
                                            </Route>

                                            <Route path="*" element={<UnderConstruction />} />
                                        </Routes>
                                        
                                        {!isAdminRoute && !isSetupRoute && <Footer />}
                                    </>
                                } />
                            </Routes>
                        </ErrorBoundary>
                    </Suspense>
                </main>
            </div>
        </ImagePreloadProvider>
    );
}

export default App;
