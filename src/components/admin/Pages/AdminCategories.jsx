import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Plus, Search, Layers, Trash2, Edit3, 
    X, Save, AlertCircle, CheckCircle2, 
    ArrowRight, Loader2, Filter, Hash
} from 'lucide-react';
import {
    listCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from '../../../redux/actions/categoryActions';
import { CATEGORY_CREATE_RESET, CATEGORY_UPDATE_RESET } from '../../../redux/constants/categoryConstants';
import ConfirmModal from '../../common/ConfirmModal';

const AdminCategories = () => {
    const dispatch = useDispatch();

    const categoryList = useSelector((state) => state.categoryList);
    const { loading, error, categories } = categoryList;

    const categoryCreate = useSelector((state) => state.categoryCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate } = categoryCreate;

    const categoryUpdate = useSelector((state) => state.categoryUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = categoryUpdate;

    const categoryDelete = useSelector((state) => state.categoryDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = categoryDelete;

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [name, setName] = useState('');

    // Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        dispatch(listCategories());

        if (successCreate) {
            dispatch({ type: CATEGORY_CREATE_RESET });
            setIsFormOpen(false);
            setName('');
        }

        if (successUpdate) {
            dispatch({ type: CATEGORY_UPDATE_RESET });
            setIsFormOpen(false);
            setEditingId(null);
            setName('');
        }

        if (successDelete) {
            dispatch(listCategories());
        }
    }, [dispatch, successCreate, successUpdate, successDelete]);

    const handleAddNew = () => {
        setEditingId(null);
        setName('');
        setIsFormOpen(true);
    };

    const handleEdit = (category) => {
        setEditingId(category._id);
        setName(category.name);
        setIsFormOpen(true);
    };

    const handleDelete = (id) => {
        setItemToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDeleteHandler = () => {
        dispatch(deleteCategory(itemToDelete));
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            dispatch(updateCategory(editingId, { name }));
        } else {
            dispatch(createCategory({ name }));
        }
    };

    const filteredCategories = categories?.filter(cat => 
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 sm:p-12 space-y-12 animate-in fade-in duration-700 pb-32">
            <ConfirmModal 
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDeleteHandler}
                title="Deconstruct Category?"
                message="Are you sure you want to remove this data node? All hardware linked to this category will be re-assigned as 'Uncategorized'."
                loading={loadingDelete}
            />

            {/* Premium Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-200">
                             <Layers className="text-white" size={16} />
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Inventory Logic</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">
                        CATEGORIES<span className="text-blue-600">.</span>
                    </h1>
                    <p className="text-slate-400 font-bold text-sm">Organize and classify hardware assets for the deployment queue.</p>
                </div>
                
                {!isFormOpen && (
                    <button
                        onClick={handleAddNew}
                        className="px-8 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 active:scale-95 flex items-center gap-3"
                    >
                        <Plus size={20} />
                        Initialize Node
                    </button>
                )}
            </div>

            {/* Error/Success Feed */}
            <div className="space-y-4">
                {(errorDelete || errorCreate || errorUpdate) && (
                    <div className="p-6 bg-rose-50 text-rose-600 rounded-3xl flex items-center gap-4 border-2 border-rose-100 animate-in slide-in-from-left duration-500">
                        <AlertCircle size={24} />
                        <span className="font-black uppercase tracking-widest text-xs">{errorDelete || errorCreate || errorUpdate}</span>
                    </div>
                )}
                
                {successDelete && (
                    <div className="p-6 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center gap-4 border-2 border-emerald-100 animate-in slide-in-from-left duration-500">
                        <CheckCircle2 size={24} />
                        <span className="font-black uppercase tracking-widest text-xs">Category node removed from registry.</span>
                    </div>
                )}
            </div>

            {/* Interactive Form Panel */}
            {isFormOpen && (
                <div className="bg-white rounded-[3rem] border-2 border-slate-50 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                    <div className="bg-slate-900 px-10 py-8 flex justify-between items-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent" />
                        <h3 className="font-black text-white flex items-center gap-4 uppercase tracking-[0.2em] text-xs relative z-10">
                            <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center">
                                 {editingId ? <Edit3 size={16} className="text-blue-400" /> : <Plus size={16} className="text-blue-400" />}
                            </div>
                            {editingId ? 'Modify Category Node' : 'Initialize New Node'}
                        </h3>
                        <button onClick={() => setIsFormOpen(false)} className="text-slate-500 hover:text-white transition-all bg-white/5 p-2 rounded-xl relative z-10">
                            <X size={20} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="p-12">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Display Name</label>
                            <div className="flex flex-col xl:flex-row gap-6">
                                <input
                                    type="text" value={name} onChange={(e) => setName(e.target.value)}
                                    className="flex-1 px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none text-xl font-black text-slate-900 transition-all placeholder:text-slate-300"
                                    placeholder="e.g. Enterprise Laser Printers"
                                    required autoFocus
                                />
                                <button
                                    type="submit" disabled={loadingCreate || loadingUpdate}
                                    className="px-12 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-100 disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-widest text-xs active:scale-95"
                                >
                                    {loadingCreate || loadingUpdate ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> Commit Changes</>}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {/* Sophisticated List View */}
            <div className="bg-white border-2 border-slate-50 rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/40">
                <div className="bg-slate-50/50 border-b border-slate-100 px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-slate-200">
                            <Hash size={24} />
                        </div>
                        <div>
                            <span className="font-black text-slate-900 uppercase tracking-widest text-xs block">Registry Nodes</span>
                            <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest mt-1">
                                {categories?.length || 0} Total Definitions
                            </span>
                        </div>
                    </div>
                    
                    <div className="relative group w-full md:w-96">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                        <input 
                            type="text" placeholder="Filter registry..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold outline-none focus:border-blue-500 transition-all"
                        />
                    </div>
                </div>

                <div className="divide-y-2 divide-slate-50">
                    {loading ? (
                        <div className="p-32 text-center space-y-6">
                            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
                            <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Accessing Database Infrastructure...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 divide-y-2 divide-slate-50">
                            {filteredCategories?.map((cat) => (
                                <div key={cat._id} className="group px-10 py-8 flex items-center justify-between hover:bg-slate-50/50 transition-all">
                                    <div className="flex items-center gap-8">
                                        <div className="w-16 h-16 bg-white rounded-3xl shadow-xl shadow-slate-100 border-2 border-slate-50 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:border-blue-100 transition-all group-hover:-rotate-6">
                                            <Layers size={28} />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-2xl text-slate-900 tracking-tighter group-hover:text-blue-600 transition-colors uppercase">
                                                {cat.name}
                                            </h3>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 tabular-nums italic">NODE ID: {cat._id.substring(18)}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                        <button 
                                            onClick={() => handleEdit(cat)} 
                                            className="p-4 bg-white hover:bg-slate-900 text-slate-400 hover:text-white rounded-2xl shadow-xl border-2 border-slate-100 transition-all"
                                        >
                                            <Edit3 size={20} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(cat._id)} 
                                            className="p-4 bg-white hover:bg-rose-500 text-slate-400 hover:text-white rounded-2xl shadow-xl border-2 border-slate-100 transition-all"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && filteredCategories?.length === 0 && (
                        <div className="p-32 text-center space-y-8">
                            <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto">
                                <Layers size={48} className="text-slate-200" />
                            </div>
                            <div className="space-y-2">
                                <p className="font-black text-slate-900 uppercase tracking-tighter text-xl">Registry Empty</p>
                                <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">No matching data nodes found.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminCategories;
