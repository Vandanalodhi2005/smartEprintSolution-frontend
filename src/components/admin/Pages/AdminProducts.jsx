import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    listProducts, deleteProduct, createProduct, updateProduct 
} from '../../../redux/actions/productActions';
import { 
    listCategories 
} from '../../../redux/actions/categoryActions';
import { PRODUCT_CREATE_RESET, PRODUCT_UPDATE_RESET } from '../../../redux/constants/productConstants';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { 
    Plus, Search, Edit3, Trash2, Package, 
    Image as ImageIcon, Loader2, X, ChevronLeft, ChevronRight, 
    AlertCircle, CheckCircle2, MoreVertical,
    DollarSign, Activity, Layers, Hash,
    ArrowUpRight, ArrowLeft, ArrowRight, Settings, Info,
    Tag, Box, Truck, BarChart3, Star, PlusCircle,
    Type, Layout, List, Save, Upload, Trash
} from 'lucide-react';
import api from '../../../lib/api';

const quillModules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
    ],
};

const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

const AdminProducts = () => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    const productCreate = useSelector((state) => state.productCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    const categoryList = useSelector((state) => state.categoryList);
    const { categories: reduxCategories = [] } = categoryList;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    
    // Form State
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [oldPrice, setOldPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [shortDetails, setShortDetails] = useState('');
    const [images, setImages] = useState([]);
    
    // Specifications State
    const [technology, setTechnology] = useState([]);
    const [usageCategory, setUsageCategory] = useState([]);
    const [allInOneType, setAllInOneType] = useState('');
    const [wireless, setWireless] = useState('');
    const [mainFunction, setMainFunction] = useState([]);
    const [keywords, setKeywords] = useState('');

    // Table Builder State
    const [specRows, setSpecRows] = useState([{ name: '', value: '' }]);

    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (successCreate || successUpdate) {
            setIsModalOpen(false);
            resetForm();
            dispatch({ type: PRODUCT_CREATE_RESET });
            dispatch({ type: PRODUCT_UPDATE_RESET });
        }
        dispatch(listProducts(searchTerm, '', currentPage));
        dispatch(listCategories());
    }, [dispatch, successDelete, successCreate, successUpdate, searchTerm, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const resetForm = () => {
        setName(''); setBrand(''); setCategory(''); setPrice(0); setOldPrice(0);
        setDescription(''); setShortDetails(''); setCountInStock(0); setImages([]);
        setTechnology([]); setUsageCategory([]); setAllInOneType('');
        setWireless(''); setMainFunction([]); setKeywords('');
        setSpecRows([{ name: '', value: '' }]);
        setIsEditMode(false);
        setEditingProductId(null);
    };

    const editHandler = (product) => {
        setEditingProductId(product._id);
        setIsEditMode(true);
        setName(product.name || product.title || '');
        setBrand(product.brand || '');
        setCategory(product.category?._id || product.category || '');
        setPrice(product.price || 0);
        setOldPrice(product.oldPrice || 0);
        setCountInStock(product.countInStock || 0);
        setDescription(product.description || '');
        setShortDetails(product.shortDetails || '');
        setImages(product.images || []);
        setTechnology(product.technology || []);
        setUsageCategory(product.usageCategory || []);
        setAllInOneType(product.allInOneType?.[0] || product.allInOneType || '');
        setWireless(product.wireless || '');
        setMainFunction(product.mainFunction || []);
        setKeywords(product.keywords || '');
        
        try {
            const specs = typeof product.technicalSpecification === 'string' 
                ? JSON.parse(product.technicalSpecification) 
                : (product.technicalSpecification || [{ name: '', value: '' }]);
            setSpecRows(specs);
        } catch (e) {
            setSpecRows([{ name: '', value: '' }]);
        }
        
        setIsModalOpen(true);
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

    const handleCheckboxChange = (value, state, setState) => {
        if (state.includes(value)) {
            setState(state.filter(i => i !== value));
        } else {
            setState([...state, value]);
        }
    };

    const handleAddSpecRow = () => setSpecRows([...specRows, { name: '', value: '' }]);
    const handleRemoveSpecRow = (index) => setSpecRows(specRows.filter((_, i) => i !== index));
    const handleSpecChange = (index, field, value) => {
        const newRows = [...specRows];
        newRows[index][field] = value;
        setSpecRows(newRows);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const technicalSpecification = JSON.stringify(specRows);
        
        const productData = {
            name, price, oldPrice, description, shortDetails, category, 
            countInStock, brand, images, technology, usageCategory,
            allInOneType, wireless, mainFunction, technicalSpecification, keywords
        };

        if (isEditMode) {
            dispatch(updateProduct(editingProductId, productData));
        } else {
            dispatch(createProduct(productData));
        }
    };



    return (
        <div className="p-8 sm:p-12 space-y-12 animate-in fade-in duration-700 pb-32">
            {/* Header Area */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-blue-600 rounded-lg">
                             <Package className="text-white" size={16} />
                         </div>
                         <span className="text-xs font-black text-blue-600">Product Hub</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">
                        Product Hub<span className="text-blue-600">.</span>
                    </h1>
                </div>
                
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-blue-600 transition-all flex items-center gap-3 shadow-xl"
                >
                    <Plus size={20} />
                    Register New Product
                </button>
            </div>

            {/* Filter */}
            <div className="flex flex-col xl:flex-row gap-6">
                <div className="relative group flex-1">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                        type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Filter by product name, brand..."
                        className="w-full bg-white border-2 border-slate-100 rounded-2xl py-5 pl-14 pr-8 text-base font-bold outline-none focus:border-blue-500 transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white border-2 border-slate-50 rounded-[2.5rem] shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-10 py-6 text-xs font-black text-slate-400">Identity</th>
                                <th className="px-10 py-6 text-xs font-black text-slate-400">Category</th>
                                <th className="px-10 py-6 text-xs font-black text-slate-400">Valuation</th>
                                <th className="px-10 py-6 text-xs font-black text-slate-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-slate-50">
                            {loading ? (
                                <tr><td colSpan="4" className="py-32 text-center"><Loader2 className="animate-spin mx-auto text-blue-600" size={40} /></td></tr>
                            ) : products && products.map((product) => (
                                <tr key={product._id} className="group hover:bg-slate-50/80 transition-all">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-white rounded-2xl border-2 border-slate-50 flex items-center justify-center p-2 flex-shrink-0">
                                                <img src={product.images?.[0] || '/placeholder.png'} alt="" className="max-w-full max-h-full object-contain" />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 text-lg leading-none mb-2">{product.name || product.title}</p>
                                                <span className="text-xs font-black text-slate-400">{product.brand}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="px-4 py-1.5 bg-slate-50 text-slate-500 rounded-xl text-xs font-black border border-slate-100">
                                            {product.category?.name || 'Standard'}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="font-black text-slate-900 text-xl tabular-nums">${product.price?.toFixed(2)}</span>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <button onClick={() => editHandler(product)} className="p-3 bg-white text-slate-400 hover:text-blue-600 rounded-xl shadow-sm border border-slate-100 transition-all"><Edit3 size={16} /></button>
                                            <button onClick={() => deleteHandler(product._id)} className="p-3 bg-white text-slate-400 hover:text-rose-600 rounded-xl shadow-sm border border-slate-100 transition-all"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {pages > 1 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6 px-10 py-8 bg-slate-50/30 border-t-2 border-slate-50">
                        <div className="text-sm font-black text-slate-400">
                            Showing page <span className="text-slate-900">{page}</span> of <span className="text-slate-900">{pages}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={page === 1}
                                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-100 rounded-xl text-xs font-black text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95"
                            >
                                <ChevronLeft size={16} />
                                Previous
                            </button>
                            <div className="flex gap-2">
                                {[...Array(pages).keys()].map((p) => {
                                    // Logic to show only a few page numbers if there are many
                                    if (pages > 5) {
                                        if (p + 1 === 1 || p + 1 === pages || (p + 1 >= page - 1 && p + 1 <= page + 1)) {
                                            return (
                                                <button
                                                    key={p + 1}
                                                    onClick={() => setCurrentPage(p + 1)}
                                                    className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${page === p + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border-2 border-slate-100 text-slate-400 hover:border-blue-500 hover:text-blue-600'}`}
                                                >
                                                    {p + 1}
                                                </button>
                                            );
                                        } else if (p + 1 === page - 2 || p + 1 === page + 2) {
                                            return <span key={p + 1} className="flex items-center justify-center w-8 text-slate-300">...</span>;
                                        }
                                        return null;
                                    }
                                    return (
                                        <button
                                            key={p + 1}
                                            onClick={() => setCurrentPage(p + 1)}
                                            className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${page === p + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border-2 border-slate-100 text-slate-400 hover:border-blue-500 hover:text-blue-600'}`}
                                        >
                                            {p + 1}
                                        </button>
                                    );
                                })}
                            </div>
                            <button 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, pages))}
                                disabled={page === pages}
                                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-100 rounded-xl text-xs font-black text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95"
                            >
                                Next
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 overflow-y-auto">
                    <div className="bg-[#f8fafc] w-full max-w-6xl rounded-[2rem] shadow-2xl my-auto border border-white/20 relative overflow-hidden flex flex-col max-h-[90vh]">
                        
                        {/* Header Area */}
                        <div className="bg-[#0f172a] px-10 py-8 flex justify-between items-center text-white sticky top-0 z-20">
                            <div>
                                <h2 className="text-2xl font-black tracking-tighter">{isEditMode ? 'Update Product' : 'Register New Product'}</h2>
                                <p className="text-slate-400 text-xs font-bold mt-1">SmartEprint Administration Hub</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={submitHandler} className="flex-1 overflow-y-auto custom-scrollbar p-10 space-y-16">
                            
                            {/* --- BASIC INFORMATION --- */}
                            <section className="space-y-10">
                                <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
                                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                                        <Info className="text-white" size={20} />
                                    </div>
                                    <h3 className="font-black text-slate-900 text-base">Basic Information</h3>
                                </div>

                                <div className="space-y-10">
                                    {/* Technology Selector */}
                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-slate-500 ml-1">Technology</label>
                                        <div className="flex flex-wrap gap-3">
                                            {['Inkjet', 'Laser', 'Laser (B/W)'].map(tech => (
                                                <button 
                                                    key={tech} type="button" 
                                                    onClick={() => handleCheckboxChange(tech, technology, setTechnology)}
                                                    className={`px-8 py-3.5 rounded-xl text-xs font-black border-2 transition-all ${technology.includes(tech) ? 'bg-[#0f172a] border-[#0f172a] text-white shadow-xl' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'}`}
                                                >
                                                    {tech}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Usage Category Selector */}
                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-slate-500 ml-1">Usage Category</label>
                                        <div className="flex flex-wrap gap-3">
                                            {['Home', 'Office', 'Mobile', 'Photo'].map(usage => (
                                                <button 
                                                    key={usage} type="button" 
                                                    onClick={() => handleCheckboxChange(usage, usageCategory, setUsageCategory)}
                                                    className={`px-8 py-3.5 rounded-xl text-xs font-black border-2 transition-all ${usageCategory.includes(usage) ? 'bg-[#0f172a] border-[#0f172a] text-white shadow-xl' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'}`}
                                                >
                                                    {usage}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Types & Wireless */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <label className="text-xs font-black text-slate-500 ml-1">All-in-One Type</label>
                                            <div className="flex gap-3">
                                                {['Multifunction', 'Single Function'].map(type => (
                                                    <button 
                                                        key={type} type="button" 
                                                        onClick={() => setAllInOneType(type)}
                                                        className={`flex-1 py-3.5 rounded-xl text-xs font-black border-2 transition-all ${allInOneType === type ? 'bg-[#0f172a] border-[#0f172a] text-white shadow-xl' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'}`}
                                                    >
                                                        {type}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-500 ml-1">Wireless</label>
                                            <select 
                                                value={wireless} onChange={(e) => setWireless(e.target.value)}
                                                className="w-full bg-white border-2 border-slate-100 rounded-xl py-3.5 px-6 text-slate-900 font-bold outline-none focus:border-blue-500 appearance-none cursor-pointer text-sm"
                                            >
                                                <option value="">Select</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Main Functions Selector */}
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-500 ml-1">Main Function</label>
                                        <div className="flex flex-wrap gap-3">
                                            {['Print', 'Scan', 'Copy', 'Fax', 'Print Only'].map(func => (
                                                <button 
                                                    key={func} type="button" 
                                                    onClick={() => handleCheckboxChange(func, mainFunction, setMainFunction)}
                                                    className={`px-8 py-3.5 rounded-xl text-xs font-black border-2 transition-all ${mainFunction.includes(func) ? 'bg-[#0f172a] border-[#0f172a] text-white shadow-xl' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'}`}
                                                >
                                                    {func}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Title, Brand, Category */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-slate-500 ml-1">Product Title</label>
                                            <input 
                                                type="text" required value={name} onChange={(e) => setName(e.target.value)}
                                                placeholder="e.g. Laserjet Pro M404n"
                                                className="w-full bg-white border-2 border-slate-100 rounded-xl py-4 px-6 text-slate-900 font-bold outline-none focus:border-blue-500 text-base"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-slate-500 ml-1">Brand</label>
                                            <input 
                                                type="text" required value={brand} onChange={(e) => setBrand(e.target.value)}
                                                placeholder="e.g. HP, Canon"
                                                className="w-full bg-white border-2 border-slate-100 rounded-xl py-4 px-6 text-slate-900 font-bold outline-none focus:border-blue-500 text-base"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-slate-500 ml-1">Category</label>
                                            <select 
                                                required value={category} onChange={(e) => setCategory(e.target.value)}
                                                className="w-full bg-white border-2 border-slate-100 rounded-xl py-4 px-6 text-slate-900 font-bold outline-none focus:border-blue-500 text-base appearance-none cursor-pointer"
                                            >
                                                <option value="">Select Category</option>
                                                {reduxCategories.map(cat => (
                                                    <option key={cat._id} value={cat._id}>
                                                        {cat.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* --- PRICING & AVAILABILITY --- */}
                            <section className="space-y-10">
                                <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
                                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100">
                                        <DollarSign className="text-white" size={20} />
                                    </div>
                                    <h3 className="font-black text-slate-900 text-base">Pricing & Availability</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-500 ml-1">Price ($)</label>
                                        <input 
                                            type="number" required value={oldPrice} onChange={(e) => setOldPrice(e.target.value)}
                                            className="w-full bg-white border-2 border-slate-100 rounded-xl py-4 px-6 text-slate-900 font-black outline-none focus:border-blue-500 text-lg"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-500 ml-1">Sale Price ($)</label>
                                        <input 
                                            type="number" required value={price} onChange={(e) => setPrice(e.target.value)}
                                            className="w-full bg-white border-2 border-slate-100 rounded-xl py-4 px-6 text-slate-900 font-black outline-none focus:border-blue-500 text-lg"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-500 ml-1">Stock Level</label>
                                        <input 
                                            type="number" required value={countInStock} onChange={(e) => setCountInStock(e.target.value)}
                                            className="w-full bg-white border-2 border-slate-100 rounded-xl py-4 px-6 text-slate-900 font-bold outline-none focus:border-blue-500 text-sm"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* --- PRODUCT MEDIA --- */}
                            <section className="space-y-10">
                                <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
                                    <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-100">
                                        <ImageIcon className="text-white" size={20} />
                                    </div>
                                    <h3 className="font-black text-slate-900 text-sm">Product Media</h3>
                                </div>
                                <div className="space-y-6">
                                    <label className="text-xs font-black text-slate-500 ml-1">Upload Images</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                                        {images.map((img, i) => (
                                            <div key={i} className="aspect-square bg-white rounded-2xl border border-slate-200 overflow-hidden relative group p-2 flex items-center justify-center">
                                                <img src={img} alt="" className="max-w-full max-h-full object-contain" />
                                                <button 
                                                    type="button" onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                                                    className="absolute top-2 right-2 bg-rose-500 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                                                >
                                                    <Trash size={12} />
                                                </button>
                                            </div>
                                        ))}
                                        <label className="aspect-square border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white hover:border-blue-500 transition-all bg-slate-50/50 group">
                                            {uploading ? (
                                                <Loader2 className="animate-spin text-blue-600" size={24} />
                                            ) : (
                                                <>
                                                    <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                        <Plus size={20} />
                                                    </div>
                                                    <span className="text-xs font-black text-slate-400">ADD IMAGE</span>
                                                </>
                                            )}
                                            <input type="file" multiple onChange={uploadFileHandler} className="hidden" />
                                        </label>
                                    </div>
                                    <p className="text-sm text-slate-400 font-medium italic">Select multiple images (JPG, PNG, WebP). Max 5MB each.</p>
                                </div>
                            </section>

                            {/* --- DETAILED DESCRIPTIONS --- */}
                            <section className="space-y-10">
                                <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
                                    <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-100">
                                        <Layers className="text-white" size={20} />
                                    </div>
                                    <h3 className="font-black text-slate-900 text-base">Detailed Descriptions</h3>
                                </div>
                                <div className="space-y-10">
                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-slate-400 ml-1">Highlights (Rich Text)</label>
                                        <div className="quill-container rounded-2xl overflow-hidden border-2 border-slate-100 focus-within:border-blue-500 transition-all bg-white">
                                            <ReactQuill 
                                                theme="snow"
                                                value={shortDetails}
                                                onChange={setShortDetails}
                                                modules={quillModules}
                                                formats={quillFormats}
                                                placeholder="Enter product highlights..."
                                                className="bg-white border-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-slate-400 ml-1">Full Narrative Overview</label>
                                        <div className="quill-container rounded-2xl overflow-hidden border-2 border-slate-100 focus-within:border-blue-500 transition-all bg-white">
                                            <ReactQuill 
                                                theme="snow"
                                                value={description}
                                                onChange={setDescription}
                                                modules={quillModules}
                                                formats={quillFormats}
                                                placeholder="Enter full product description..."
                                                className="bg-white border-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* --- TECHNICAL SPECIFICATIONS & TABLE BUILDER --- */}
                            <section className="space-y-10">
                                <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
                                    <div className="w-10 h-10 bg-[#0f172a] rounded-xl flex items-center justify-center shadow-lg shadow-slate-200">
                                        <Settings className="text-white" size={20} />
                                    </div>
                                    <h3 className="font-black text-slate-900 text-base">Technical Specifications</h3>
                                </div>
                                <div className="space-y-10">
                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-slate-500 ml-1">Keywords</label>
                                        <input 
                                            type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)}
                                            placeholder="e.g. Wireless, Laser, Mono"
                                            className="w-full bg-white border-2 border-slate-100 rounded-xl py-4 px-6 text-slate-900 font-bold outline-none focus:border-blue-500 text-base"
                                        />
                                    </div>
                                    
                                    {/* --- Table Builder --- */}
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-end">
                                            <div className="space-y-1">
                                                <label className="text-xs font-black text-slate-500 ml-1">Technical Specification</label>
                                                <p className="text-sm text-slate-400 font-medium ml-1">Build a custom spec table for this product.</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button type="button" className="px-4 py-2 bg-slate-100 text-slate-500 rounded-lg text-xs font-black hover:bg-slate-200 transition-all">Text Editor</button>
                                                <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-black hover:bg-blue-700 transition-all">Table Builder</button>
                                            </div>
                                        </div>

                                        <div className="bg-white border-2 border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                                            <table className="w-full border-collapse">
                                                <thead>
                                                    <tr className="bg-slate-50 border-b-2 border-slate-100 text-left">
                                                        <th className="px-6 py-4 text-xs font-black text-slate-400">Attribute Name</th>
                                                        <th className="px-6 py-4 text-xs font-black text-slate-400">Detail/Value</th>
                                                        <th className="px-6 py-4 w-16"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-50">
                                                    {specRows.map((row, index) => (
                                                        <tr key={index} className="group hover:bg-slate-50/50 transition-colors">
                                                            <td className="px-4 py-3">
                                                                <input 
                                                                    type="text" value={row.name} 
                                                                    onChange={(e) => handleSpecChange(index, 'name', e.target.value)}
                                                                    placeholder="e.g. Print Speed"
                                                                    className="w-full bg-transparent py-2 px-4 text-sm font-bold text-slate-700 outline-none placeholder:text-slate-300"
                                                                />
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <input 
                                                                    type="text" value={row.value} 
                                                                    onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                                                                    placeholder="e.g. 40 ppm"
                                                                    className="w-full bg-transparent py-2 px-4 text-sm font-bold text-slate-700 outline-none placeholder:text-slate-300"
                                                                />
                                                            </td>
                                                            <td className="px-4 py-3 text-right">
                                                                <button 
                                                                    type="button" onClick={() => handleRemoveSpecRow(index)}
                                                                    className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <button 
                                                type="button" onClick={handleAddSpecRow}
                                                className="w-full py-4 border-t-2 border-slate-50 text-blue-600 font-black text-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Plus size={14} /> Add New Attribute
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* --- REVIEWS & TESTIMONIALS --- */}
                            <section className="space-y-10">
                                <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
                                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
                                        <Star className="text-white" size={20} />
                                    </div>
                                    <h3 className="font-black text-slate-900 text-base">Reviews & Testimonials</h3>
                                </div>
                                <div className="p-16 border-2 border-dashed border-slate-200 rounded-[2rem] text-center bg-white/50">
                                    <p className="text-slate-400 font-black text-sm mb-6">No reviews added for this product.</p>
                                    <button type="button" className="px-8 py-3 bg-[#0f172a] text-white rounded-xl font-black text-xs hover:shadow-xl transition-all active:scale-95">
                                        Add Review
                                    </button>
                                </div>
                            </section>

                            {/* Submit Area (Sticky at bottom of content) */}
                            <div className="pt-10 sticky bottom-0 z-10">
                                <button 
                                    type="submit" disabled={loadingCreate || loadingUpdate || uploading}
                                    className="w-full bg-[#0f172a] hover:bg-blue-600 text-white py-6 rounded-[1.5rem] font-black text-sm transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-[0.98] disabled:opacity-50"
                                >
                                    {(loadingCreate || loadingUpdate) ? <Loader2 className="animate-spin" size={20} /> : <>{isEditMode ? 'Update Product' : 'Register Product'} <ArrowRight size={18} /></>}
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
