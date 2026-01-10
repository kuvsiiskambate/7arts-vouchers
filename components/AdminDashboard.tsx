
import React, { useState, useEffect } from 'react';
import { mockBackend } from '../utils/mockBackend';
import { OrderRecord } from '../types';
import { Package, Mail, Calendar, User, Search, RefreshCw, CheckCircle, Clock, Truck, DollarSign, X, Loader } from 'lucide-react';

const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const fetchOrders = async () => {
    setIsLoading(true);
    const data = await mockBackend.getOrders();
    setOrders(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple mock password
      setIsAuthenticated(true);
    } else {
      alert('Грешна парола');
    }
  };

  const updateStatus = async (id: string, newStatus: OrderRecord['status']) => {
    await mockBackend.updateOrderStatus(id, newStatus);
    await fetchOrders();
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white/5 border border-brand-neon/30 p-8 rounded-2xl w-full max-w-md backdrop-blur-xl shadow-[0_0_30px_rgba(0,229,255,0.1)]">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">7Arts Admin Panel</h2>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white focus:border-brand-neon focus:outline-none"
              placeholder="Enter admin password"
            />
          </div>
          <button className="w-full bg-brand-neon hover:bg-brand-neonHover text-brand-dark font-bold py-3 rounded-lg transition-all">
            Вход
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans">
      {/* Admin Header */}
      <header className="bg-black/40 border-b border-white/10 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-brand-neon p-1.5 rounded">
               <Package size={20} className="text-brand-dark" />
            </div>
            <span className="font-bold text-xl">7Arts <span className="text-brand-neon font-light">Admin</span></span>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={fetchOrders} className="p-2 hover:bg-white/10 rounded-full text-brand-neon transition-colors" title="Refresh">
              <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
            </button>
            <button onClick={onLogout} className="text-sm text-gray-400 hover:text-white">
              Изход
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Order List */}
          <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-xl overflow-hidden flex flex-col h-[calc(100vh-140px)]">
            <div className="p-4 border-b border-white/10 bg-white/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Търси по номер или име..." 
                  className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-brand-neon focus:outline-none"
                />
              </div>
            </div>
            
            <div className="overflow-y-auto flex-1 custom-scrollbar">
              {isLoading ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8">
                  <Loader size={32} className="animate-spin text-brand-neon mb-3" />
                  <p className="text-sm animate-pulse">Зареждане на поръчки...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="p-8 text-center text-gray-500">Няма намерени поръчки</div>
              ) : (
                orders.map(order => (
                  <div 
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`p-4 border-b border-white/5 cursor-pointer transition-all duration-200 ${
                      selectedOrder?.id === order.id 
                        ? 'bg-brand-neon/10 border-l-4 border-l-brand-neon' 
                        : 'border-l-4 border-l-transparent hover:bg-white/10 hover:border-l-brand-neon/30 hover:pl-5'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-mono text-xs text-brand-neon">#{order.id.slice(0, 8)}</span>
                      <span className="text-xs text-gray-400">{new Date(order.date).toLocaleDateString('bg-BG')}</span>
                    </div>
                    <div className="font-bold text-white mb-1 truncate">{order.customer.name}</div>
                    <div className="flex justify-between items-center">
                       <StatusBadge status={order.status} mini />
                       <span className="text-sm font-semibold">{order.totalAmount.toFixed(2)} лв.</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl p-6 h-fit min-h-[500px]">
            {selectedOrder ? (
              <div className="animate-fade-in">
                <div className="flex justify-between items-start mb-8 pb-6 border-b border-white/10">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Поръчка #{selectedOrder.id}</h2>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Calendar size={14} />
                      <span>{new Date(selectedOrder.date).toLocaleString('bg-BG')}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                     <StatusBadge status={selectedOrder.status} />
                     <div className="flex space-x-1 mt-2">
                       <button onClick={() => updateStatus(selectedOrder.id, 'PAID')} title="Mark Paid" className="p-2 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition-colors"><DollarSign size={16}/></button>
                       <button onClick={() => updateStatus(selectedOrder.id, 'SHIPPED')} title="Mark Shipped" className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors"><Truck size={16}/></button>
                       <button onClick={() => updateStatus(selectedOrder.id, 'COMPLETED')} title="Mark Complete" className="p-2 bg-gray-500/20 text-gray-400 rounded hover:bg-gray-500/30 transition-colors"><CheckCircle size={16}/></button>
                     </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Customer Info */}
                  <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                    <h3 className="text-brand-neon font-bold mb-4 flex items-center"><User size={18} className="mr-2"/> Клиент</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="block text-gray-500 text-xs uppercase">Име</span>
                        <span className="text-white">{selectedOrder.customer.name}</span>
                      </div>
                      <div>
                        <span className="block text-gray-500 text-xs uppercase">Email</span>
                        <a href={`mailto:${selectedOrder.customer.email}`} className="text-brand-neon hover:underline">{selectedOrder.customer.email}</a>
                      </div>
                      <div>
                        <span className="block text-gray-500 text-xs uppercase">Телефон</span>
                        <span className="text-white">{selectedOrder.customer.phone}</span>
                      </div>
                      {selectedOrder.clientType === 'CORPORATE' && (
                        <>
                          <div>
                            <span className="block text-gray-500 text-xs uppercase">Фирма</span>
                            <span className="text-white">{selectedOrder.customer.companyName}</span>
                          </div>
                          <div>
                            <span className="block text-gray-500 text-xs uppercase">ЕИК</span>
                            <span className="text-white">{selectedOrder.customer.eik}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Order Info */}
                  <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                     <h3 className="text-brand-neon font-bold mb-4 flex items-center"><Package size={18} className="mr-2"/> Детайли</h3>
                     <div className="space-y-3 text-sm">
                        <div className="flex justify-between border-b border-white/5 pb-2">
                           <span className="text-gray-400">Ваучер:</span>
                           <span className="font-bold">{selectedOrder.duration === '12_MONTHS' ? '12 Месеца' : '6 Месеца'}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                           <span className="text-gray-400">Формат:</span>
                           <span className="font-bold">{selectedOrder.format}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                           <span className="text-gray-400">Количество:</span>
                           <span className="font-bold">x {selectedOrder.quantity}</span>
                        </div>
                        <div className="flex justify-between pt-2">
                           <span className="text-gray-400">Общо:</span>
                           <span className="font-bold text-xl text-brand-neon">{selectedOrder.totalAmount.toFixed(2)} лв.</span>
                        </div>
                     </div>
                  </div>
                </div>

                {selectedOrder.format === 'PHYSICAL' && (
                  <div className="bg-brand-blue/10 p-4 rounded-xl border border-brand-neon/20 mb-8">
                     <h3 className="text-brand-neon font-bold mb-3 flex items-center"><Truck size={18} className="mr-2"/> Доставка</h3>
                     <p className="text-sm text-gray-300 mb-2">
                        <span className="font-bold text-white uppercase">{selectedOrder.customer.courier}</span>
                     </p>
                     <p className="text-sm text-white italic">
                        {selectedOrder.customer.address}
                     </p>
                  </div>
                )}

                {selectedOrder.customer.message && (
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                     <h3 className="text-gray-400 font-bold mb-2 text-xs uppercase">Пожелание към ваучера</h3>
                     <p className="text-sm text-white italic">"{selectedOrder.customer.message}"</p>
                  </div>
                )}

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50">
                <Package size={64} className="mb-4" />
                <p>Изберете поръчка от списъка</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const StatusBadge = ({ status, mini }: { status: string, mini?: boolean }) => {
  const styles = {
    'PENDING': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'PAID': 'bg-green-500/20 text-green-400 border-green-500/30',
    'SHIPPED': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'COMPLETED': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };
  
  const labels = {
    'PENDING': 'Чака плащане',
    'PAID': 'Платена',
    'SHIPPED': 'Изпратена',
    'COMPLETED': 'Приключена',
  };

  // @ts-ignore
  const style = styles[status] || styles['PENDING'];
  // @ts-ignore
  const label = labels[status] || status;

  return (
    <span className={`${mini ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-3 py-1'} rounded-full border font-bold uppercase tracking-wider ${style}`}>
      {label}
    </span>
  );
};

export default AdminDashboard;
