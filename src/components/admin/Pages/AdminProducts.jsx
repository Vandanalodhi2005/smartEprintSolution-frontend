import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, deleteProduct, createProduct } from '../../../redux/actions/productActions';
import { PRODUCT_CREATE_RESET } from '../../../redux/constants/productConstants';
import { 
    Plus, Search, Edit3, Trash2, Package, 
    Image as ImageIcon, Loader2, X, ChevronRight, 
    AlertCircle, CheckCircle2, MoreVertical
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
        if (window.confirm('Are you sure you want to delete this product?')) {
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
        <div className="p-4 sm:p-6 lg:p-10 bg-[#0F172A] min-h-screen text-slate-200 font-sans">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tighter flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                            <Package className="text-blue-400" size={28} />
                        </div>
                        Inventory Management
                    </h1>
                    <p className="text-slate-400 mt-2 font-medium">Manage real-time product stock and deployments.</p>
                </div>

                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    Add Real Product
                </button>
            </div>

            {/* Search & Filters */}
            <div className="mb-10 relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={20} />
                <input 
                    type="text"
                    placeholder="Search by SKU, Name or Category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-900/50 border-2 border-slate-800 rounded-3xl py-5 pl-16 pr-8 text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 focus:bg-slate-900 transition-all font-medium"
                />
            </div>

            {/* Products Table */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] overflow-hidden backdrop-blur-xl">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-blue-400" size={40} />
                        <span className="text-slate-500 font-black uppercase tracking-widest text-xs">Accessing Database...</span>
                    </div>
                ) : error ? (
                    <div className="p-10 text-center">
                        <AlertCircle className="mx-auto text-rose-500 mb-4" size={40} />
                        <p className="text-rose-400 font-bold">{error}</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800">
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Hardware Info</th>
                                    <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Category</th>
                                    <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Pricing</th>
                                    <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Stock Status</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {products && products.map((product) => (
                                    <tr key={product._id} className="hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-5">
                                                <div className="w-16 h-16 bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 flex-shrink-0 group-hover:border-blue-500/50 transition-colors">
                                                    <img src={product.images?.[0] || '/placeholder.png'} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white group-hover:text-blue-400 transition-colors">{product.name}</p>
                                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">ID: {product._id.substring(18)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-700">
                                                {product.category?.name || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 font-black text-white text-lg">
                                            ${product.price?.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col gap-2">
                                                <div className="h-1.5 w-24 bg-slate-800 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full rounded-full ${product.countInStock > 10 ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                                                        style={{ width: `${Math.min(product.countInStock, 100)}%` }}
                                                    />
                                                </div>
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${product.countInStock > 10 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                    {product.countInStock} Units
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all"><Edit3 size={18} /></button>
                                                <button onClick={() => deleteHandler(product._id)} className="p-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-xl transition-all"><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* CREATE PRODUCT MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md bg-black/60 overflow-y-auto">
                    <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-[2.5rem] shadow-2xl relative my-auto">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <form onSubmit={submitHandler} className="p-8 sm:p-12 space-y-10">
                            <div>
                                <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Initialize Hardware</h2>
                                <p className="text-slate-400 mt-2 font-medium">Define specifications for the new real-world asset.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Product Title</label>
                                    <input 
                                        type="text" required value={name} onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Laserjet Pro Enterprise"
                                        className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl py-4 px-6 text-white placeholder:text-slate-600 outline-none focus:border-blue-500 transition-all"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Unit Pricing ($)</label>
                                    <input 
                                        type="number" required value={price} onChange={(e) => setPrice(e.target.value)}
                                        className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl py-4 px-6 text-white outline-none focus:border-blue-500 transition-all"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Category Registry</label>
                                    <select 
                                        required value={category} onChange={(e) => setCategory(e.target.value)}
                                        className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl py-4 px-6 text-white outline-none focus:border-blue-500 transition-all appearance-none"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Warehouse Stock</label>
                                    <input 
                                        type="number" required value={countInStock} onChange={(e) => setCountInStock(e.target.value)}
                                        className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl py-4 px-6 text-white outline-none focus:border-blue-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Hardware Description</label>
                                <textarea 
                                    rows="4" value={description} onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter full technical specifications..."
                                    className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl py-4 px-6 text-white placeholder:text-slate-600 outline-none focus:border-blue-500 transition-all resize-none"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Asset Imagery (Cloudinary Direct)</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {images.map((img, i) => (
                                        <div key={i} className="aspect-square bg-slate-800 rounded-2xl border-2 border-slate-700 overflow-hidden relative group">
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                            <button 
                                                type="button" onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                                                className="absolute top-2 right-2 bg-rose-500 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    <label className="aspect-square border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-800 hover:border-blue-500 transition-all group">
                                        {uploading ? (
                                            <Loader2 className="animate-spin text-blue-400" size={24} />
                                        ) : (
                                            <>
                                                <ImageIcon className="text-slate-500 group-hover:text-blue-400" size={24} />
                                                <span className="text-[10px] font-black uppercase text-slate-500 group-hover:text-blue-400">Upload</span>
                                            </>
                                        )}
                                        <input type="file" multiple onChange={uploadFileHandler} className="hidden" />
                                    </label>
                                </div>
                            </div>

                            <button 
                                type="submit" disabled={loadingCreate || uploading}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-900/40 active:scale-95 disabled:opacity-50"
                            >
                                {loadingCreate ? <Loader2 className="animate-spin" size={20} /> : <>Commit to Database <CheckCircle2 size={20} /></>}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
