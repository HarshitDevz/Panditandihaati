import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { LayoutDashboard, ShoppingBasket, Megaphone, Settings, List, LogOut, Save, Plus, Trash2, Check, X, RotateCcw } from 'lucide-react';

function AdminDashboard() {
    const navigate = useNavigate();
    const { products, setProducts, businessInfo, setBusinessInfo, announcements, setAnnouncements, categories, setCategories } = useData();
    const [activeTab, setActiveTab] = useState('overview');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const session = localStorage.getItem('pdh_admin_session');
        if (!session) {
            navigate('/admin');
        } else {
            setIsLoggedIn(true);
        }
    }, [navigate]);

    // Export current site data to JSON
    const exportData = () => {
        const payload = { products, businessInfo, announcements, categories };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pdh-site-backup.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    // Import JSON backup
    const importFileRef = React.useRef(null);
    const handleImportFile = async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        try {
            const text = await file.text();
            const obj = JSON.parse(text);
            if (obj.products) setProducts(obj.products);
            if (obj.businessInfo) setBusinessInfo(obj.businessInfo);
            if (obj.announcements) setAnnouncements(obj.announcements || []);
            if (obj.categories) setCategories(obj.categories || []);
            alert('Import successful — data applied to site.');
        } catch (err) {
            console.error(err);
            alert('Import failed. Invalid JSON.');
        }
        // reset input
        if (importFileRef.current) importFileRef.current.value = '';
    };

    const handleLogout = () => {
        localStorage.removeItem('pdh_admin_session');
        navigate('/admin');
    };

    if (!isLoggedIn) return null;

    return (
        <div className="admin-root min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Top Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-6 sticky top-0 z-30 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-orange-50 p-2 rounded-2xl flex items-center justify-center">
                        <img src="images/LOGO.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black text-gray-900 leading-none">Admin Console</h2>
                        <p className="text-gray-400 text-xs font-semibold mt-1">Panditan Di Hatti — Manage your shop</p>
                    </div>
                </div>
                    <div className="flex items-center gap-4">
                        <button onClick={exportData} className="header-cta">Export JSON</button>
                        <label className="px-4 py-2 bg-gray-50 text-gray-700 rounded-xl font-bold border border-gray-100 cursor-pointer">
                            Import
                            <input ref={importFileRef} onChange={handleImportFile} type="file" accept="application/json" className="hidden" />
                        </label>
                        <button onClick={handleLogout} className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-600 hover:text-white transition">Sign Out</button>
                    </div>
            </header>

            {/* Tabs Bar */}
            <div className="bg-white border-b border-gray-100 px-6 py-3 sticky top-[72px] z-20">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3">
                        {[
                            { id: 'overview', name: 'Overview', icon: <LayoutDashboard size={18} /> },
                            { id: 'products', name: 'Products', icon: <ShoppingBasket size={18} /> },
                            { id: 'announcements', name: 'Announcements', icon: <Megaphone size={18} /> },
                            { id: 'categories', name: 'Categories', icon: <List size={18} /> },
                            { id: 'business', name: 'Business Info', icon: <Settings size={18} /> }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`tab-pill flex items-center gap-2 transition-all duration-200 ${activeTab === tab.id ? 'active' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                <span className={`${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`}>{tab.icon}</span>
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <main className="flex-1 min-h-screen bg-[#fafafa]">
                <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-10 py-8 sticky top-0 z-10 flex justify-between items-center shadow-sm">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 leading-none">{activeTab.replace(/([A-Z])/g, ' $1').trim()}</h2>
                        <p className="text-gray-400 text-xs font-semibold mt-2">Manage your shop in real-time</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col text-right">
                            <span className="text-sm font-bold text-gray-800">Shop Manager</span>
                            <span className="text-[10px] text-green-500 font-black uppercase tracking-widest flex items-center gap-1 justify-end"><Check size={10} /> Cloud Sync Active</span>
                        </div>
                    </div>
                </header>

                <div className="p-10 max-w-6xl mx-auto">
                    {activeTab === 'overview' && <OverviewManager products={products} announcements={announcements} />}
                    {activeTab === 'products' && <ProductsManager products={products} setProducts={setProducts} categories={categories} />}
                    {activeTab === 'announcements' && <AnnouncementsManager announcements={announcements} setAnnouncements={setAnnouncements} />}
                    {activeTab === 'categories' && <CategoryManager categories={categories} setCategories={setCategories} />}
                    {activeTab === 'business' && <BusinessInfoManager businessInfo={businessInfo} setBusinessInfo={setBusinessInfo} />}
                </div>
            </main>
        </div>
    );
}

{/* Sub-components below this point */ }

// 0. OVERVIEW MANAGER
function OverviewManager({ products, announcements }) {
    const stats = [
        { label: 'Total Items', value: products.length, color: 'blue' },
        { label: 'Live on Menu', value: products.filter(p => p.visible).length, color: 'green' },
        { label: 'Categories', value: products.reduce((acc, p) => { acc.add(p.category); return acc; }, new Set()).size, color: 'orange' },
        { label: 'Active News', value: announcements.filter(a => a.active).length, color: 'purple' },
    ];

    return (
        <div className="grid grid-cols-4 gap-6">
            {stats.map(s => (
                <div key={s.label} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-2">{s.label}</p>
                    <p className={`text-3xl font-black text-gray-800 group-hover:scale-110 transition-transform origin-left`}>{s.value}</p>
                </div>
            ))}
            <div className="col-span-4 bg-gradient-to-br from-[#ff9800] to-[#e65100] p-10 rounded-[40px] shadow-2xl mt-4 relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-3xl font-black text-white leading-tight">Welcome to the <br />Advance Portal</h3>
                    <p className="text-white/80 text-sm mt-4 font-bold max-w-sm">Every change you make here updates your website for every single customer live. NO CODE REQUIRED.</p>
                </div>
                <RotateCcw size={120} className="absolute -bottom-10 -right-10 text-white/10 rotate-12" />
            </div>
        </div>
    );
}

// 1. PRODUCTS MANAGER
function ProductsManager({ products, setProducts, categories }) {
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', price: 0, unit: '1kg', category: categories[0], desc: '', visible: true, image: 'images/LOGO.png' });

    const startEdit = (p) => {
        setEditingId(p.id);
        setEditForm({ ...p });
    };

    const saveEdit = () => {
        setProducts(prev => prev.map(p => p.id === editingId ? editForm : p));
        setEditingId(null);
    };

    const addProduct = () => {
        const id = Date.now().toString();
        setProducts(prev => [...prev, { ...newProduct, id }]);
        setIsAdding(false);
        setNewProduct({ name: '', price: 0, unit: '1kg', category: categories[0], desc: '', visible: true, image: 'images/LOGO.png' });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Stock Control</h3>
                    <p className="text-gray-500 text-sm">Use <b>Hidden</b> to disable items from menu without deleting.</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-[#ff9800] text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl hover:scale-105 transition-transform"
                >
                    <Plus size={20} /> New Product
                </button>
            </div>

            {/* Addition Modal / Form */}
            {isAdding && (
                <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl">
                        <h3 className="text-xl font-bold mb-6">Add New Product</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-500 mb-1">Product Name</label>
                                <input type="text" className="w-full p-2 border rounded-lg" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="e.g. Dhokla" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-500 mb-1">Price (₹)</label>
                                <input type="number" className="w-full p-2 border rounded-lg" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-500 mb-1">Unit</label>
                                <select className="w-full p-2 border rounded-lg" value={newProduct.unit} onChange={e => setNewProduct({ ...newProduct, unit: e.target.value })}>
                                    <option value="1kg">1kg</option>
                                    <option value="piece">per piece</option>
                                    <option value="plate">per plate</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-500 mb-1">Category</label>
                                <select className="w-full p-2 border rounded-lg" value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}>
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-500 mb-1">Description</label>
                                <textarea className="w-full p-2 border rounded-lg" value={newProduct.desc} onChange={e => setNewProduct({ ...newProduct, desc: e.target.value })} rows="2" placeholder="Tell something about it" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-500 mb-1">Image URL</label>
                                <input type="text" className="w-full p-2 border rounded-lg" value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} placeholder="images/your.png or https://..." />
                            </div>
                        </div>
                        <div className="flex gap-4 mt-8">
                            <button onClick={() => setIsAdding(false)} className="flex-1 px-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold">Cancel</button>
                            <button onClick={addProduct} className="flex-1 px-4 py-3 bg-[#ff9800] text-white rounded-xl font-bold">Save Product</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-5 text-left text-[10px] font-black uppercase text-gray-400 tracking-tighter">Availability</th>
                            <th className="px-8 py-5 text-left text-[10px] font-black uppercase text-gray-400 tracking-tighter">Product Detail</th>
                            <th className="px-8 py-5 text-left text-[10px] font-black uppercase text-gray-400 tracking-tighter">Price</th>
                            <th className="px-8 py-5 text-right text-[10px] font-black uppercase text-gray-400 tracking-tighter">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {products.map(p => (
                            <tr key={p.id} className={`${p.visible ? '' : 'bg-gray-50/30'} hover:bg-orange-50/20 transition-all`}>
                                <td className="px-8 py-6">
                                    <button
                                        onClick={() => setProducts(products.map(ip => ip.id === p.id ? { ...ip, visible: !ip.visible } : ip))}
                                        className={`w-14 h-8 rounded-full relative transition-all duration-300 ${p.visible ? 'bg-orange-500 shadow-inner' : 'bg-gray-200'}`}
                                    >
                                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${p.visible ? 'right-1' : 'left-1'}`} />
                                    </button>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm border border-white">
                                            <img src={p.image} className="w-full h-full object-cover" />
                                        </div>
                                        {editingId === p.id ? (
                                            <div className="space-y-2 w-full max-w-xs">
                                                <input type="text" className="border border-orange-200 rounded-lg px-3 py-1 text-sm block w-full outline-none focus:ring-2 focus:ring-orange-100" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
                                                <input type="text" className="border border-gray-100 rounded-lg px-2 py-1 text-[10px] block w-full lowercase text-gray-400" value={editForm.desc} onChange={e => setEditForm({ ...editForm, desc: e.target.value })} />
                                                <input type="text" className="border border-gray-100 rounded-lg px-2 py-1 text-[10px] block w-full" value={editForm.image} onChange={e => setEditForm({ ...editForm, image: e.target.value })} placeholder="images/your.png or https://..." />
                                                <div className="flex gap-2">
                                                    <select className="p-2 border rounded-lg" value={editForm.unit} onChange={e => setEditForm({ ...editForm, unit: e.target.value })}>
                                                        <option value="1kg">1kg</option>
                                                        <option value="500g">500g</option>
                                                        <option value="250g">250g</option>
                                                        <option value="100g">100g</option>
                                                        <option value="piece">per piece</option>
                                                    </select>
                                                    <select className="p-2 border rounded-lg flex-1" value={editForm.category} onChange={e => setEditForm({ ...editForm, category: e.target.value })}>
                                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <span className={`font-black text-gray-800 ${!p.visible ? 'opacity-40 line-through' : ''}`}>{p.name}</span>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5 tracking-widest">{p.category}</p>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    {editingId === p.id ? (
                                        <div className="flex items-center gap-2 font-black">
                                            <span className="text-orange-500">₹</span>
                                            <input type="number" className="border border-orange-200 rounded-lg w-20 px-2 py-1 text-sm outline-none" value={editForm.price} onChange={e => setEditForm({ ...editForm, price: Number(e.target.value) })} />
                                        </div>
                                    ) : (
                                        <span className={`text-xl font-black text-gray-900 ${!p.visible ? 'text-gray-300' : ''}`}>₹{p.price}<span className="text-[10px] font-bold text-gray-300 tracking-tighter ml-1">/{p.unit}</span></span>
                                    )}
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex justify-end gap-3">
                                        {editingId === p.id ? (
                                            <button onClick={saveEdit} className="flex items-center gap-2 py-2 px-4 bg-green-500 text-white rounded-xl text-xs font-black shadow-lg hover:bg-green-600 transition-colors uppercase"><Save size={14} /> Save Changes</button>
                                        ) : (
                                            <button onClick={() => startEdit(p)} className="p-3 text-orange-500 bg-orange-50 rounded-2xl hover:bg-[#ff9800] hover:text-white transition-all shadow-sm border border-orange-100"><Save size={18} /></button>
                                        )}
                                        <button onClick={() => { if (window.confirm('WARNING: Deleting will remove product history. Better to use Disable. Delete anyway?')) setProducts(products.filter(ip => ip.id !== p.id)) }} className="p-3 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// 2. ANNOUNCEMENTS MANAGER
function AnnouncementsManager({ announcements, setAnnouncements }) {
    const [msg, setMsg] = useState('');
    const [expiry, setExpiry] = useState('');

    const addAnnouncement = () => {
        if (!msg) return;
        setAnnouncements([{ id: Date.now().toString(), text: msg, active: true, expiry: expiry }, ...announcements]);
        setMsg('');
        setExpiry('');
    };

    return (
        <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold mb-4">Add New News/Announcement</h3>
                <div className="flex flex-col gap-4">
                    <textarea
                        className="w-full p-4 bg-gray-50 border rounded-xl resize-none h-24 focus:ring-2 focus:ring-orange-200 outline-none"
                        placeholder="Type ticker message here (e.g. Special Dhamaka Offer this Weekend!)"
                        value={msg}
                        onChange={e => setMsg(e.target.value)}
                    />
                    <div className="flex gap-4 items-center">
                        <div className="flex-1">
                            <label className="text-xs text-gray-500 font-bold mb-1 block">Expiry Date (Optional)</label>
                            <input type="date" className="p-2 border rounded-lg w-full" value={expiry} onChange={e => setExpiry(e.target.value)} />
                        </div>
                        <button
                            onClick={addAnnouncement}
                            className="bg-[#ff9800] text-white px-8 py-3 rounded-xl font-bold mt-5"
                        >
                            Publish Now
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-bold text-gray-600">Active News Roll ({announcements.filter(a => a.active).length})</h3>
                {announcements.map(a => (
                    <div key={a.id} className="flex items-center justify-between bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex-1 pr-6 border-r border-gray-100">
                            <p className="font-bold text-gray-800">{a.text}</p>
                            {a.expiry && <span className="text-xs text-orange-500 font-bold block mt-1">Ends on: {a.expiry}</span>}
                        </div>
                        <div className="flex items-center gap-4 pl-6">
                            <button
                                onClick={() => setAnnouncements(announcements.map(ia => ia.id === a.id ? { ...ia, active: !ia.active } : ia))}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${a.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}
                            >
                                {a.active ? 'Live' : 'Hidden'}
                            </button>
                            <button onClick={() => setAnnouncements(announcements.filter(ia => ia.id !== a.id))} className="text-red-300 hover:text-red-500 transition"><Trash2 size={20} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// 3. CATEGORY MANAGER
function CategoryManager({ categories, setCategories }) {
    const [name, setName] = useState('');
    return (
        <div className="max-w-xl mx-auto space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-3">
                <input type="text" className="flex-1 p-3 border rounded-xl" placeholder="New Category Name (e.g. Beverages)" value={name} onChange={e => setName(e.target.value)} />
                <button onClick={() => { if (name) { setCategories([...categories, name]); setName(''); } }} className="bg-[#ff9800] text-white px-6 py-3 rounded-xl font-bold"><Plus /></button>
            </div>

            <div className="space-y-3">
                {categories.map((c, i) => (
                    <div key={c} className="bg-white p-4 rounded-xl border border-gray-50 flex items-center justify-between shadow-sm">
                        <span className="font-bold text-gray-700">{i + 1}. {c}</span>
                        <button onClick={() => setCategories(categories.filter(ic => ic !== c))} className="text-gray-300 hover:text-red-500 transition"><Trash2 size={18} /></button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// 4. BUSINESS INFO MANAGER
function BusinessInfoManager({ businessInfo, setBusinessInfo }) {
    const [form, setForm] = useState({ ...businessInfo });

    // Safety check for legacy data
    useEffect(() => {
        if (!form.openingHours) {
            setForm(prev => ({
                ...prev,
                openingHours: {
                    Monday: '08:00 AM – 08:30 PM', Tuesday: '08:00 AM – 08:30 PM', Wednesday: '08:00 AM – 08:30 PM',
                    Thursday: '08:00 AM – 08:30 PM', Friday: '08:00 AM – 08:30 PM', Saturday: '08:00 AM – 08:30 PM',
                    Sunday: '08:00 AM – 08:30 PM'
                }
            }));
        }
        // Ensure welcomeText exists for older data
        if (!form.welcomeText) {
            setForm(prev => ({ ...prev, welcomeText: 'Welcome to Panditan Di Hatti — Fresh sweets made with love!' }));
        }
    }, []);

    const save = () => {
        setBusinessInfo(form);
        alert('Live site updated! Your changes are now visible to all customers.');
    };

    const handleHourChange = (day, value) => {
        setForm({
            ...form,
            openingHours: {
                ...form.openingHours,
                [day]: value
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10">
            <div className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 grid grid-cols-2 gap-8">
                <div className="col-span-2 border-b border-gray-50 pb-6 mb-2">
                    <h3 className="text-xl font-black text-gray-800">General Contact</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Basic shop info</p>
                </div>

                <div className="space-y-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Display Phone</label>
                    <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-orange-200 outline-none" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Maintenance Mode</label>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                const updated = { ...form, maintenance: !form.maintenance };
                                setForm(updated);
                                // apply immediately so site goes into maintenance without needing Commit
                                setBusinessInfo(updated);
                            }}
                            className={`px-4 py-2 rounded-xl font-bold ${form.maintenance ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                            {form.maintenance ? 'Enabled' : 'Disabled'}
                        </button>
                        <p className="text-xs text-gray-500">When enabled, public site is in maintenance and only admins can access dashboard.</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">WhatsApp Order Number</label>
                    <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-orange-200 outline-none" value={form.whatsappNumber} onChange={e => setForm({ ...form, whatsappNumber: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Welcome Strip Text</label>
                    <input
                        type="text"
                        className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-orange-200 outline-none"
                        value={form.welcomeText || ''}
                        onChange={e => {
                            const updated = { ...form, welcomeText: e.target.value };
                            setForm(updated);
                            // apply immediately so admin sees live preview on site
                            setBusinessInfo(updated);
                        }}
                        placeholder="Welcome message shown at top of site"
                    />
                    <p className="text-xs text-gray-500">Visible on all devices. Edits are applied live for preview.</p>
                </div>
                <div className="col-span-2 space-y-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Physical Address</label>
                    <textarea className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-orange-200 outline-none resize-none h-20" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                </div>
            </div>

            <div className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100">
                <div className="border-b border-gray-50 pb-6 mb-8">
                    <h3 className="text-xl font-black text-gray-800">Weekly Schedule</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Set hours for each day</p>
                </div>

                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                    {Object.entries(form.openingHours || {}).map(([day, time]) => (
                        <div key={day} className="flex items-center justify-between border-b border-gray-50 pb-2">
                            <span className="font-black text-gray-600 w-24 text-sm">{day}</span>
                            <input
                                type="text"
                                className="bg-transparent border-none text-right font-bold text-[#ff9800] focus:ring-0 outline-none w-full"
                                value={time}
                                onChange={e => handleHourChange(day, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 space-y-4">
                <div className="border-b border-gray-50 pb-6 mb-4">
                    <h3 className="text-xl font-black text-gray-800">Marketing Text</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Home page biography</p>
                </div>
                <textarea className="w-full p-6 bg-gray-50 border-none rounded-3xl font-bold focus:ring-2 focus:ring-orange-200 outline-none resize-none h-40" value={form.aboutUs} onChange={e => setForm({ ...form, aboutUs: e.target.value })} />

                <button
                    onClick={save}
                    className="w-full bg-[#ff9800] text-white py-6 rounded-3xl font-black text-xl hover:bg-orange-600 transition-all hover:scale-[1.01] shadow-2xl flex items-center justify-center gap-4 mt-8"
                >
                    <Save size={24} /> Commit Changes to Production
                </button>
            </div>
        </div>
    );
}

export default AdminDashboard;
