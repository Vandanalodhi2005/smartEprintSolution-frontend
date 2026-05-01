import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, deleteProduct, createProduct } from '../../../redux/actions/productActions';
import { PRODUCT_CREATE_RESET } from '../../../redux/constants/productConstants';
import { 
    Plus, Search, Edit3, Trash2, Package, 
    Image as ImageIcon, Loader2, X, ChevronRight, 
    AlertCircle, CheckCircle2, MoreVertical,
    DollarSign, Activity, Layers, Hash,
    ArrowUpRight, ArrowRight
} from 'lucide-react';
import api from '../../../lib/api';

const AdminProducts = () => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    const productCreate = useSelector((state) => state.productCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Form State
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [brand, setBrand] = useState('');
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });
        dispatch(listProducts(searchTerm));

        const fetchCategories = async () => {
            const { data } = await api.get('/categories');
            setCategories(data);
        };
        fetchCategories();

        if (successCreate) {
            setIsModalOpen(false);
            resetForm();
        }
    }, [dispatch, successDelete, successCreate, searchTerm]);

    const resetForm = () => {
        setName(''); setPrice(0); setDescription(''); setCategory('');
        setCountInStock(0); setBrand(''); setImages([]);
    };

    const deleteHandler = (id) => {
        if (window.confirm('Are you certain you wish to purge this hardware node from the registry?')) {
            dispatch(deleteProduct(id));
        }
    };

    const uploadFileHandler = async (e) => {
        const files = Array.from(e.target.files);
        const formData = new FormData();
        files.forEach((file) => formData.append('images', file));

        setUploading(true);
        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const { data } = await api.post('/products/upload', formData, config);
            setImages([...images, ...data.urls]);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProduct({
            name, price, description, category, countInStock, brand, images
        }));
    };

    return (
        <div className="p-8 sm:p-12 space-y-12 animate-in fade-in duration-700 pb-32">
            {/* Premium Header */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-200">
                             <Package className="text-white" size={16} />
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Inventory Kernel</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none uppercase">
                        Hardware<span className="text-blue-600">.</span>
                    </h1>
                    <p className="text-slate-400 font-bold text-sm max-w-xl">
                        Manage your real-world hardware assets, monitor warehouse stock levels, and define technical specifications.
                    </p>
                </div>
                
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 active:scale-95 flex items-center gap-3"
                >
                    <Plus size={20} />
                    Initialize Hardware
                </button>
            </div>

            {/* Signal Feed (Search & Status) */}
            <div className="flex flex-col xl:flex-row gap-6">
                <div className="relative group flex-1">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input 
                        type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Filter by SKU, Identity or Category..."
                        className="w-full bg-white border-2 border-slate-100 rounded-2xl py-5 pl-14 pr-8 text-sm font-bold outline-none focus:border-blue-500 shadow-xl shadow-slate-100/50 transition-all"
                    />
                </div>
                <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border-2 border-slate-50 shadow-xl shadow-slate-100/50">
                     <div className="px-5 py-3 flex items-center gap-3 border-r-2 border-slate-50">
                         <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Database Live</span>
                     </div>
                     <div className="px-5 py-3">
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Assets: </span>
                         <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{products?.length || 0}</span>
                     </div>
                </div>
            </div>

            {/* Inventory Grid */}
            <div className="bg-white border-2 border-slate-50 rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1100px]">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Hardware Specification</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Cluster Node</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Valuation</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Stock Velocity</th>
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Registry Controls</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-slate-50">
                            {loading ? (
                                <tr><td colSpan="5" className="py-32 text-center"><Loader2 className="animate-spin mx-auto text-blue-600" size={40} /></td></tr>
                            ) : products && products.map((product) => (
                                <tr key={product._id} className="group hover:bg-slate-50/80 transition-all">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-20 bg-white rounded-3xl overflow-hidden border-2 border-slate-50 shadow-xl shadow-slate-100/50 group-hover:scale-105 transition-transform flex-shrink-0 flex items-center justify-center p-2">
                                                <img src={product.images?.[0] || '/placeholder.png'} alt="" className="max-w-full max-h-full object-contain" />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 text-lg tracking-tighter uppercase group-hover:text-blue-600 transition-colors leading-none mb-2">{product.name}</p>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">ID: {product._id.substring(18).toUpperCase()}</span>
                                                    <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{product.brand || 'TECH'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-3">
                                             <Layers size={14} className="text-slate-400" />
                                             <span className="px-4 py-1.5 bg-slate-50 text-slate-500 rounded-xl text-[9px] font-black uppercase tracking-widest border border-slate-100">
                                                 {product.category?.name || 'Uncategorized'}
                                             </span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex flex-col">
                                            <span className="font-black text-slate-900 text-2xl tracking-tighter leading-none tabular-nums">${product.price?.toFixed(2)}</span>
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">USD Unit Price</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="space-y-3">
                                            <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                                <div 
                                                    className={`h-full rounded-full transition-all duration-1000 ${product.countInStock > 10 ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                                                    style={{ width: `${Math.min((product.countInStock / 100) * 100, 100)}%` }}
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${product.countInStock > 10 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                    {product.countInStock} Units Available
                                                </span>
                                                {product.countInStock < 5 && <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                            <button className="p-4 bg-white hover:bg-slate-900 text-slate-400 hover:text-white rounded-2xl transition-all shadow-xl shadow-slate-100/50 border-2 border-slate-50"><Edit3 size={18} /></button>
                                            <button onClick={() => deleteHandler(product._id)} className="p-4 bg-white hover:bg-rose-500 text-slate-400 hover:text-white rounded-2xl transition-all shadow-xl shadow-slate-100/50 border-2 border-slate-50"><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Hardware Initialization Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300 p-4">
                    <div className="bg-white w-full max-w-5xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border-2 border-white/20">
                        <div className="bg-slate-900 px-12 py-12 flex justify-between items-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-transparent" />
                            <div className="relative z-10">
                                <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Initialize Hardware<span className="text-blue-500">.</span></h2>
                                <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mt-3">Registry Initialization Protocol</p>
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-500 hover:text-white transition-all bg-white/5 p-3 rounded-2xl relative z-10"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={submitHandler} className="p-12 space-y-12 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Display Designation</label>
                                    <input 
                                        type="text" required value={name} onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Enterprise Grade Thermal System"
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] py-5 px-8 text-slate-900 font-bold outline-none focus:border-blue-500 transition-all placeholder:text-slate-300"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Fiscal Valuation (USD)</label>
                                    <div className="relative">
                                        <input 
                                            type="number" required value={price} onChange={(e) => setPrice(e.target.value)}
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] py-5 px-12 text-slate-900 font-black outline-none focus:border-blue-500 transition-all"
                                        />
                                        <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Cluster Classification</label>
                                    <div className="relative">
                                        <select 
                                            required value={category} onChange={(e) => setCategory(e.target.value)}
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] py-5 px-8 text-slate-900 font-bold outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">Select Protocol</option>
                                            {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name.toUpperCase()}</option>)}
                                        </select>
                                        <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 rotate-90" size={18} />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Inventory Threshold</label>
                                    <input 
                                        type="number" required value={countInStock} onChange={(e) => setCountInStock(e.target.value)}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] py-5 px-8 text-slate-900 font-bold outline-none focus:border-blue-500 transition-all"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Technical Summary</label>
                                <textarea 
                                    rows="4" value={description} onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter full technical manifest..."
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] py-6 px-8 text-slate-900 font-bold outline-none focus:border-blue-500 transition-all resize-none placeholder:text-slate-300"
                                />
                            </div>

                            <div className="space-y-6">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Visual Asset Matrix (Cloudinary Uplink)</label>
                                <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
                                    {images.map((img, i) => (
                                        <div key={i} className="aspect-square bg-slate-50 rounded-[2rem] border-2 border-slate-100 overflow-hidden relative group shadow-inner flex items-center justify-center p-3">
                                            <img src={img} alt="" className="max-w-full max-h-full object-contain" />
                                            <button 
                                                type="button" onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                                                className="absolute top-3 right-3 bg-rose-500 text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-xl active:scale-90"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    <label className="aspect-square border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-slate-50 hover:border-blue-500 transition-all group bg-slate-50/50">
                                        {uploading ? (
                                            <Loader2 className="animate-spin text-blue-600" size={32} />
                                        ) : (
                                            <>
                                                <div className="p-4 bg-white rounded-2xl shadow-xl shadow-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                     <ImageIcon size={28} />
                                                </div>
                                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Uplink</span>
                                            </>
                                        )}
                                        <input type="file" multiple onChange={uploadFileHandler} className="hidden" />
                                    </label>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button 
                                    type="submit" disabled={loadingCreate || uploading}
                                    className="w-full bg-slate-900 hover:bg-blue-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs transition-all flex items-center justify-center gap-4 shadow-2xl shadow-slate-200 active:scale-95 disabled:opacity-50"
                                >
                                    {loadingCreate ? <Loader2 className="animate-spin" size={20} /> : <>Commit Manifest to Registry <ArrowRight size={20} /></>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
