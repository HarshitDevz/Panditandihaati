import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';

function Footer() {
    const { businessInfo } = useData() || {};

    if (businessInfo && businessInfo.maintenance) return null;

    const hours = businessInfo?.openingHours || { Monday: '09:00 AM - 07:00 PM', Tuesday: '09:00 AM - 07:00 PM', Wednesday: '09:00 AM - 07:00 PM', Thursday: '09:00 AM - 07:00 PM', Friday: '09:00 AM - 07:00 PM', Saturday: '09:00 AM - 07:00 PM', Sunday: 'Closed' };

    // Prevent CLS: render footer skeleton until businessInfo loads
    if (!businessInfo) return (
        <footer className="bg-[#0f1720] text-gray-200" style={{ minHeight: 420 }} aria-hidden="true" />
    );

    return (
        <footer className="bg-[#0f1720] text-gray-200">
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* Left: Branding & CTA */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <img src="/images/LOGO.webp" alt="Pandittan Di Hatti" width={56} height={56} className="w-14 h-14 object-contain rounded" />
                        <div>
                    <h2 className="text-2xl font-extrabold text-[#b14520]">Pandittan Di Hatti</h2>
                            <p className="text-sm text-gray-500">Authentic Himachali sweets & snacks</p>
                            <span className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono font-semibold text-amber-400 tracking-widest">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                GSTIN: 02AMWPS9440GIZK
                            </span>
                        </div>
                    </div>

                    <p className="text-sm text-gray-300 leading-relaxed max-w-xl">{businessInfo?.aboutUs || 'Family-run sweet shop since 1980. Come taste our traditional recipes made with love.'}</p>

                    <div className="flex items-center gap-3 mt-2">
                        <a href={`tel:${businessInfo?.phone || ''}`} className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-br from-[#ff9a3c] to-[#ff6a00] text-white rounded-lg shadow-lg ring-1 ring-white/10 hover:opacity-95">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 3.09 4.18 2 2 0 0 1 5 2h3a2 2 0 0 1 2 1.72c.12 1.05.38 2.07.75 3.03a2 2 0 0 1-.45 2.11L9.91 10.09a16 16 0 0 0 6 6l1.23-1.23a2 2 0 0 1 2.11-.45c.96.37 1.98.63 3.03.75A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            <span className="font-extrabold text-lg md:text-xl">{businessInfo?.phone || '98166-51543'}</span>
                        </a>

                        <a href={`https://wa.me/${businessInfo?.whatsappNumber || ''}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">WhatsApp</a>
                    </div>

                    <div className="flex items-center gap-4 mt-4 text-sm">
                        <Link to="/privacy" className="text-gray-300 hover:text-white">Privacy</Link>
                        <span className="text-gray-600">•</span>
                        <Link to="/terms" className="text-gray-300 hover:text-white">Terms</Link>
                        <span className="text-gray-600">•</span>
                        <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
                    </div>
                </div>

                {/* Middle: Opening hours */}
                <div className="order-3 md:order-2">
                    <h3 className="text-lg font-bold text-gray-100 mb-3 text-center">Opening Hours</h3>
                    <table className="w-full text-sm">
                        <tbody>
                        {Object.entries(hours).map(([day, time]) => {
                            const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
                            const isToday = day === todayName;
                            return (
                                <tr key={day} className={`border-b border-white/5 ${isToday ? 'bg-white/5' : ''}`}>
                                    <td className={`py-2 pr-4 font-semibold w-28 ${isToday ? 'text-[#ff9800]' : 'text-gray-300'}`}>{day}</td>
                                    <td className="py-2 text-gray-400">{time}</td>
                                    {isToday && <td className="py-2 pl-2"><span className="px-2 py-0.5 text-xs rounded-full font-bold bg-emerald-500 text-white">Today</span></td>}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

                {/* Right: Map */}
                <div className="order-2 md:order-3">
                    <h3 className="text-lg font-bold text-gray-100 mb-3">Visit Us</h3>
                    <div className="w-full rounded-xl overflow-hidden border border-gray-800 shadow-sm" style={{ height: 220 }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3394.6088691811356!2d76.5188905!3d31.6992589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904d443ecf19601%3A0xffb6a63e8aae8b2f!2sPandittan%20Di%20Hatti!5e0!3m2!1sen!2sin!4v1783760532515!5m2!1sen!2sin"
                            loading="lazy"
                            title="Pandittan Di Hatti location on Google Maps"
                            width="100%"
                            height="220"
                            style={{ border: 0, display: 'block' }}
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-[#0b1220] border-t border-gray-900">
                <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400 gap-3">
                    <div className="w-full md:w-auto text-center md:text-left">© {new Date().getFullYear()} Pandittan Di Hatti</div>
                    <div className="w-full md:w-auto text-center md:text-right">Website designed and Crafted with love ❤️</div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
