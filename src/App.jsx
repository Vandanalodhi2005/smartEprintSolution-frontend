import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchAllProducts } from './redux/actions/productActions';
import { fetchCartFromDB } from './redux/actions/cartActions';
import { ImagePreloadProvider } from './lib/ImagePreloadContext';
import { isBot } from './lib/botUtils';

import Header from './components/Header';
import TrailingSlashRedirect from './components/common/TrailingSlashRedirect';
import Footer from './components/Footer';
import HomeMain from './components/home/HomeMain';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/common/ErrorBoundary';
const SetupSelect = lazy(() => import('./components/setupSelect/SetupSelect'));
const ModelSearch = lazy(() => import('./components/setupSelect/ModelSearch'));

// Fetch settings from backend on mount
// (moved after imports)
const CompleteSetup = lazy(() => import('./components/setupSelect/CompleteSetup'));
const InstallationFailedPage = lazy(() => import('./components/setupSelect/InstallationFailedPage'));
const SettingsManagement = lazy(() => import('./components/setupSelect/SettingsManagement'));
const SimpleAdminLogin = lazy(() => import('./components/setupSelect/SimpleAdminLogin'));
const SetupHeader = lazy(() => import('./components/setupSelect/SetupHeader'));



// Lazy loaded routes
const ProfilePage = lazy(() => import('./components/profile/ProfilePage'));
const UnderConstruction = lazy(() => import('./components/common/UnderConstruction'));
const AboutMain = lazy(() => import('./components/about/AboutMain'));
const PrivacyPolicy = lazy(() => import('./components/privacyPolicy/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./components/TermsAndConditions'));

// Admin Imports (lazy)
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

const Cart = lazy(() => import('./components/Cart'));
const Checkout = lazy(() => import('./components/Checkout'));
const ProductDetails = lazy(() => import('./components/productsCategories/ProductDetails'));
const OrderDetails = lazy(() => import('./components/order/OrderDetails'));
const TrackOrder = lazy(() => import('./components/order/TrackOrder'));
// const ReturnsAndExchanges = lazy(() => import('./components/order/ReturnsAndExchanges'));
const FAQMain = lazy(() => import('./components/faq/FAQMain'));
const RefundReturnPolicy = lazy(() => import('./components/privacyPolicy/RefundReturnPolicy'));
const ShippingPolicy = lazy(() => import('./components/privacyPolicy/ShippingPolicy'));
const Disclaimer = lazy(() => import('./components/privacyPolicy/Disclaimer'));
const ContactMain = lazy(() => import('./components/contact/ContactMain'));

// Blog Imports (lazy)
const BlogsMain = lazy(() => import('./components/blogs/BlogsMain'));
const ShopMain = lazy(() => import('./components/shop/ShopMain'));

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const normalizedPathname = location.pathname.replace(/\/+$/, '') || '/';
    const isAdminRoute = normalizedPathname.startsWith('/admin');
    // Always check for trailing slash and non-trailing slash
    const setupRoutesList = [
        '/step-by-step-setup-guide', '/step-by-step-setup-guide/',
        '/printer-setup-guide', '/printer-setup-guide/',
        '/model-search', '/model-search/',
        '/complete-setup', '/complete-setup/',
        '/installation-failed', '/installation-failed/'
    ];
    const isSetupRoute = setupRoutesList.includes(location.pathname);
    const dispatch = useDispatch();
    const { allLoaded } = useSelector((state) => state.productList);
    const { userInfo } = useSelector((state) => state.userLogin);

    // Setup guide states
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
    const intervalRef = useRef();

    const getAdminApiBase = () => {
        const rawBase = (import.meta.env.VITE_API_URL || 'http://localhost:5001/api').replace(/\/+$/, '');
        return rawBase.endsWith('/api') ? rawBase : `${rawBase}/api`;
    };

    // Correct: handleSetupAdminLogin should NOT use hooks
    const handleSetupAdminLogin = (username, password) => {
        const apiUrl = getAdminApiBase();
        setSetupLoginError('');
        axios.post(`${apiUrl}/admin/login-simple`, { username, password })
            .then(res => {
                const data = res.data;
                if (data.token) {
                    setSetupAdminInfo(data);
                    localStorage.setItem('setupAdminInfo', JSON.stringify(data));
                } else {
                    setSetupLoginError('Invalid credentials.');
                }
            })
            .catch((error) => setSetupLoginError(error.response?.data?.message || 'Login failed.'));
    };

    // Simple Redirect Logic for setup pages - only redirect if NOT loading and NOT a bot
    useEffect(() => {
        if (isLoadingSettings || isBot()) return;

        if (!allowModelSearch && location.pathname === '/model-search/') {
            navigate('/step-by-step-setup-guide/', { replace: true });
        }
        if (!showInstallationFailed && location.pathname === '/installation-failed/') {
            navigate('/step-by-step-setup-guide/', { replace: true });
        }
        if (!showCompleteSetup && location.pathname === '/complete-setup/') {
            navigate('/step-by-step-setup-guide/', { replace: true });
        }
    }, [isLoadingSettings, allowModelSearch, showInstallationFailed, showCompleteSetup, location.pathname, navigate]);

    // Prefetch all products in background on app mount (once)
    useEffect(() => {
        if (!allLoaded) {
            dispatch(fetchAllProducts());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    // Restore cart from DB if user is logged in (e.g. page refresh)
    useEffect(() => {
        if (userInfo?.token) {
            dispatch(fetchCartFromDB());
        }
    }, [dispatch, userInfo?.token]);

    // Fetch settings from backend on mount and every 10 seconds
    useEffect(() => {
        const fetchHeader = () => {
            const apiUrl = getAdminApiBase();
            axios.get(`${apiUrl}/admin/header-visibility`)
                .then(res => {
                    const data = res.data;
                    if (!data) throw new Error('No data received');
                    setShowHeader(!!data.showHeader);
                    setShowLogo(!!data.showLogo);
                    setAllowModelSearch(data.allowModelSearch !== false);
                    setShowInstallationFailed(data.showInstallationFailed !== false);
                    setShowCompleteSetup(data.showCompleteSetup !== false);
                    setIsLoadingSettings(false);
                    // Store in localStorage for components that need quick access
                    localStorage.setItem('showInstallationFailed', String(data.showInstallationFailed !== false));
                    localStorage.setItem('showCompleteSetup', String(data.showCompleteSetup !== false));
                })
                .catch((err) => {
                    console.error('Settings fetch failed:', err);
                    setShowHeader(false);
                    setShowLogo(false);
                    setAllowModelSearch(true);
                    setShowInstallationFailed(true);
                    setShowCompleteSetup(true);
                    setIsLoadingSettings(false);
                });
        };
        fetchHeader();
        intervalRef.current = setInterval(fetchHeader, 10000);
        return () => clearInterval(intervalRef.current);
    }, []);

    // Centralized settings update logic
    const updateHeaderSettings = (updatedFields) => {
        const apiUrl = getAdminApiBase();
        const token = setupAdminInfo?.token;
        if (!token) {
            setAdminStatus('Failed to update settings. Please login again.');
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
                const data = res.data;
                if (data.success) {
                    setAdminStatus('Settings updated successfully.');
                    // Update local states immediately
                    if (updatedFields.showHeader !== undefined) setShowHeader(updatedFields.showHeader);
                    if (updatedFields.showLogo !== undefined) setShowLogo(updatedFields.showLogo);
                    if (updatedFields.allowModelSearch !== undefined) setAllowModelSearch(updatedFields.allowModelSearch);
                    if (updatedFields.showInstallationFailed !== undefined) setShowInstallationFailed(updatedFields.showInstallationFailed);
                    if (updatedFields.showCompleteSetup !== undefined) setShowCompleteSetup(updatedFields.showCompleteSetup);
                } else {
                    setAdminStatus('Failed to update settings.');
                }
            })
            .catch((error) => setAdminStatus(error.response?.data?.message || 'Failed to update settings.'));
    };

    return (
        <ImagePreloadProvider>
            <TrailingSlashRedirect />
            <div className="flex flex-col min-h-screen">
                <ScrollToTop />
                <main className={`flex-grow ${isAdminRoute ? 'h-screen overflow-hidden' : ''}`}>
                    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>}>
                        <ErrorBoundary>
                            <Routes>
                                {/* Admin-Protected Setup Settings */}
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

                                {/* All other routes with header/footer */}
                                <Route
                                    path="*"
                                    element={
                                        <>
                                            {!isAdminRoute && !isSetupRoute && <Header />}
                                            {/* Show SetupHeader on all setup routes except /step-by-step-setup-guide/ if showHeader is true */}
                                            {isSetupRoute && showHeader && normalizedPathname !== '/step-by-step-setup-guide' && normalizedPathname !== '/step-by-step-setup-guide/' && (
                                                <SetupHeader showLogo={showLogo} showHeader={showHeader} />
                                            )}
                                            {/* Global trailing slash redirect except home */}
                                            <Routes>
                                                <Route
                                                    path="/:slug"
                                                    element={
                                                        location.pathname !== '/' && !location.pathname.endsWith('/') && !location.pathname.includes('.')
                                                            ? <Navigate to={location.pathname + '/'} replace />
                                                            : null
                                                    }
                                                />
                                                <Route path="/printer-setup-guide" element={<Navigate to="/printer-setup-guide/" replace />} />
                                                <Route path="/model-search" element={<Navigate to="/model-search/" replace />} />
                                                <Route path="/complete-setup" element={<Navigate to="/complete-setup/" replace />} />
                                                <Route path="/installation-failed" element={<Navigate to="/installation-failed/" replace />} />
                                                <Route path="/cart" element={<Navigate to="/cart/" replace />} />
                                                <Route path="/checkout" element={<Navigate to="/checkout/" replace />} />
                                                <Route path="/order/:id" element={<Navigate to="/order/" replace />} />
                                                <Route path="/profile" element={<Navigate to="/profile/" replace />} />
                                                <Route path="/blogs" element={<Navigate to="/blogs/" replace />} />
                                                <Route path="/track-order" element={<Navigate to="/track-order/" replace />} />
                                                <Route path="/faq" element={<Navigate to="/faq/" replace />} />
                                                <Route path="/about" element={<Navigate to="/about/" replace />} />
                                                <Route path="/privacy-policy" element={<Navigate to="/privacy-policy/" replace />} />
                                                <Route path="/terms-and-conditions" element={<Navigate to="/terms-and-conditions/" replace />} />
                                                <Route path="/return-refund-policy" element={<Navigate to="/return-refund-policy/" replace />} />
                                                <Route path="/shipping-policy" element={<Navigate to="/shipping-policy/" replace />} />
                                                <Route path="/disclaimer" element={<Navigate to="/disclaimer/" replace />} />
                                                <Route path="/contact-us" element={<Navigate to="/contact-us/" replace />} />
                                                <Route path="/shop" element={<Navigate to="/shop/" replace />} />
                                                <Route path="/product/:id" element={<Navigate to="/shop/" replace />} />

                                                {/* Trailing slash routes */}
                                                <Route path="/step-by-step-setup-guide/" element={<SetupSelect />} />
                                                <Route path="/printer-setup-guide/" element={<SetupSelect />} />
                                                <Route path="/model-search/" element={
                                                    isLoadingSettings || allowModelSearch || isBot() ? <ModelSearch allowModelSearch={allowModelSearch} /> : <Navigate to="/step-by-step-setup-guide/" replace />
                                                } />
                                                {/* Only show CompleteSetup if showCompleteSetup is true, otherwise redirect to /step-by-step-setup-guide/ */}
                                                <Route path="/complete-setup/" element={
                                                    isLoadingSettings || showCompleteSetup || isBot() ? <CompleteSetup showCompleteSetup={showCompleteSetup} /> : <Navigate to="/step-by-step-setup-guide/" replace />
                                                } />
                                                <Route path="/installation-failed/" element={
                                                    isLoadingSettings || showInstallationFailed || isBot() ? <InstallationFailedPage showInstallationFailed={showInstallationFailed} /> : <Navigate to="/step-by-step-setup-guide/" replace />
                                                } />
                                                <Route path="/" element={<HomeMain />} />
                                                <Route path="/cart/" element={<Cart />} />
                                                <Route path="/checkout/" element={<Checkout />} />
                                                <Route path="/order/:id/" element={<OrderDetails />} />
                                                <Route path="/profile/" element={<ProfilePage />} />
                                                {/* Blogs */}
                                                <Route path="/blogs/" element={<BlogsMain />} />

                                                {/*order*/}
                                                <Route path="/track-order/" element={<TrackOrder />} />
                                                {/* <Route path="/returns-exchanges/" element={<ReturnsAndExchanges />} /> */}
                                                <Route path="/faq/" element={<FAQMain />} />
                                                {/* other static routes */}
                                                <Route path="/about/" element={<AboutMain />} />
                                                <Route path="/privacy-policy/" element={<PrivacyPolicy />} />
                                                <Route path="/terms-and-conditions/" element={<TermsAndConditions />} />
                                                {/* <Route path="/refund-return-policy/" element={<RefundReturnPolicy />} /> */}
                                                <Route path="/return-refund-policy/" element={<RefundReturnPolicy />} />
                                                <Route path="/shipping-policy/" element={<ShippingPolicy />} />
                                                <Route path="/disclaimer/" element={<Disclaimer />} />
                                                <Route path="/contact-us/" element={<ContactMain />} />
                                                {/* Admin Routes */}
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
                                                {/* Placeholder Routes for Public Site */}
                                                <Route path="/shop/" element={<ShopMain />} />
                                                <Route path="/product/:id/" element={<ProductDetails />} />
                                                {/* Catch-all */}
                                                <Route path="*" element={<UnderConstruction />} />
                                            </Routes>
                                            {!isAdminRoute && !isSetupRoute && <Footer />}

                                        </>
                                    }
                                />
                            </Routes>
                        </ErrorBoundary>
                    </Suspense>
                </main>
            </div>
        </ImagePreloadProvider>
    );
}

export default App;
