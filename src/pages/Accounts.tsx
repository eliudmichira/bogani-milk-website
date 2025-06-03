import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Package, 
  CreditCard, 
  MapPin, 
  Settings, 
  Bell, 
  Heart, 
  LogOut, 
  ChevronRight, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Shield,
  Calendar,
  RefreshCw,
  Camera,
  Mail,
  Phone,
  ShoppingBag
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample user data - in a real app this would come from your backend
const userData = {
  name: "Sarah Kimani",
  email: "sarah.kimani@example.com",
  phone: "+254 723 456 789",
  joinDate: "May 2023",
  avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  orders: [
    { 
      id: "ORD-5782",
      date: "May 12, 2025",
      status: "Delivered",
      total: 78.97,
      items: [
        { name: "Premium Probiotic Yogurt", quantity: 2, price: 12.99 },
        { name: "Vanilla Bean Flavor", quantity: 1, price: 18.50 },
        { name: "Berry Boost Blend", quantity: 1, price: 14.99 }
      ]
    },
    { 
      id: "ORD-3491",
      date: "April 28, 2025",
      status: "Processing",
      total: 52.48,
      items: [
        { name: "Premium Probiotic Yogurt", quantity: 1, price: 12.99 },
        { name: "Vanilla Bean Flavor", quantity: 2, price: 18.50 }
      ]
    },
    { 
      id: "ORD-2105",
      date: "March 15, 2025",
      status: "Delivered",
      total: 63.96,
      items: [
        { name: "Premium Probiotic Yogurt", quantity: 3, price: 12.99 },
        { name: "Coconut Flavor", quantity: 1, price: 16.99 }
      ]
    }
  ],
  savedItems: [
    { 
      id: "PROD-001",
      name: "Berry Boost Blend",
      price: 14.99,
      image: "/src/assets/berry.jpg"
    },
    { 
      id: "PROD-002",
      name: "Probiotic Supplement",
      price: 29.99,
      image: "/src/assets/supplement.jpg"
    }
  ],
  paymentMethods: [
    { id: "PM-001", type: "Visa", last4: "4242", expiry: "05/26", isDefault: true },
    { id: "PM-002", type: "Mastercard", last4: "8353", expiry: "09/27", isDefault: false }
  ],
  addresses: [
    { 
      id: "ADDR-001", 
      type: "Home",
      isDefault: true,
      street: "123 Karen Road",
      city: "Nairobi",
      state: "Nairobi County",
      postal: "00100",
      country: "Kenya"
    },
    { 
      id: "ADDR-002", 
      type: "Office",
      isDefault: false,
      street: "45 Mombasa Road",
      city: "Nairobi",
      state: "Nairobi County",
      postal: "00200",
      country: "Kenya"
    }
  ],
  notifications: {
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    productUpdates: true
  }
};

// Account Page Component
const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileNav, setMobileNav] = useState(false);
  
  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileNav(false);
      }
    };
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const tabContent = {
    overview: <AccountOverview userData={userData} />,
    orders: <OrderHistory orders={userData.orders} />,
    saved: <SavedItems items={userData.savedItems} />,
    payment: <PaymentMethods paymentMethods={userData.paymentMethods} />,
    addresses: <AddressBook addresses={userData.addresses} />,
    settings: <AccountSettings userData={userData} />
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-850 dark:to-gray-900">
      {/* Page header */}
      <header className={`sticky top-16 z-20 transition-all duration-300 ${isScrolled ? 'py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm' : 'py-6 bg-transparent'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-primaryRed to-berry overflow-hidden">
                <img 
                  src={userData.avatarUrl} 
                  alt={userData.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-1">
                  My Account
                  {isMobile && (
                    <button 
                      onClick={() => setMobileNav(!mobileNav)}
                      className="ml-2 p-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      <ChevronRight className={`w-4 h-4 transform transition-transform ${mobileNav ? 'rotate-90' : ''}`} />
                    </button>
                  )}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back, {userData.name.split(' ')[0]}</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-2">
              <Link 
                to="/shop" 
                className="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </Link>
              <button 
                className="px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation Drawer */}
          <AnimatePresence>
            {mobileNav && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-4 overflow-hidden"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
                  {renderMobileNavItems(activeTab, setActiveTab, setMobileNav)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation (Desktop) */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={userData.avatarUrl} 
                      alt={userData.name}
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-accentGreen rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{userData.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Member since {userData.joinDate}
                    </p>
                  </div>
                </div>
              </div>
              
              <nav className="p-2">
                <ul className="space-y-1">
                  {renderNavItems(activeTab, setActiveTab)}
                </ul>
              </nav>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
                <button className="w-full py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors flex items-center justify-center gap-1">
                  <LogOut className="w-4 h-4" /> Log Out
                </button>
              </div>
            </div>
          </aside>
          
          {/* Main Content Area */}
          <div className="flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {tabContent[activeTab as keyof typeof tabContent]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

// Navigation Items Renderer
const renderNavItems = (activeTab: string, setActiveTab: (tab: string) => void) => {
  const navItems = [
    { id: 'overview', label: 'Account Overview', icon: <User className="w-5 h-5" /> },
    { id: 'orders', label: 'Order History', icon: <Package className="w-5 h-5" /> },
    { id: 'saved', label: 'Saved Items', icon: <Heart className="w-5 h-5" /> },
    { id: 'payment', label: 'Payment Methods', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'addresses', label: 'Address Book', icon: <MapPin className="w-5 h-5" /> },
    { id: 'settings', label: 'Account Settings', icon: <Settings className="w-5 h-5" /> }
  ];
  
  return navItems.map(item => (
    <li key={item.id}>
      <button
        onClick={() => setActiveTab(item.id)}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
          activeTab === item.id
            ? 'bg-primaryRed/10 text-primaryRed dark:bg-primaryRed/20 dark:text-primaryRed/90'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        {item.icon}
        <span>{item.label}</span>
        {activeTab === item.id && (
          <motion.div
            layoutId="activeIndicator"
            className="ml-auto w-1.5 h-1.5 rounded-full bg-primaryRed dark:bg-primaryRed/90"
          />
        )}
      </button>
    </li>
  ));
};

// Mobile Navigation Items Renderer
const renderMobileNavItems = (
  activeTab: string, 
  setActiveTab: (tab: string) => void,
  setMobileNav: (isOpen: boolean) => void
) => {
  const navItems = [
    { id: 'overview', label: 'Account Overview', icon: <User className="w-5 h-5" /> },
    { id: 'orders', label: 'Order History', icon: <Package className="w-5 h-5" /> },
    { id: 'saved', label: 'Saved Items', icon: <Heart className="w-5 h-5" /> },
    { id: 'payment', label: 'Payment Methods', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'addresses', label: 'Address Book', icon: <MapPin className="w-5 h-5" /> },
    { id: 'settings', label: 'Account Settings', icon: <Settings className="w-5 h-5" /> }
  ];
  
  return (
    <>
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => {
            setActiveTab(item.id);
            setMobileNav(false);
          }}
          className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${
            activeTab === item.id
              ? 'bg-primaryRed/10 text-primaryRed dark:bg-primaryRed/20 dark:text-primaryRed/90'
              : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
          <ChevronRight className="w-4 h-4 ml-auto" />
        </button>
      ))}
      <button className="w-full flex items-center gap-3 p-4 text-left text-red-500 dark:text-red-400">
        <LogOut className="w-5 h-5" />
        <span>Log Out</span>
      </button>
    </>
  );
};

// Individual Tab Components
const AccountOverview = ({ userData }: { userData: any }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-primaryRed dark:text-primaryRed/90" />
          Profile Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Full Name</label>
              <div className="text-gray-900 dark:text-white font-medium">{userData.name}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email Address</label>
              <div className="text-gray-900 dark:text-white font-medium flex items-center gap-2">
                {userData.email}
                <span className="px-2 py-0.5 text-xs bg-accentGreen/10 text-accentGreen dark:bg-accentGreen/20 dark:text-accentGreen/90 rounded-full">Verified</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone Number</label>
              <div className="text-gray-900 dark:text-white font-medium">{userData.phone}</div>
            </div>
            
            <button className="mt-4 px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primaryRed hover:text-primaryRed dark:hover:border-primaryRed/90 dark:hover:text-primaryRed/90 transition-colors flex items-center gap-1.5">
              <Edit className="w-4 h-4" /> Edit Profile
            </button>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-md mb-3">
              <img 
                src={userData.avatarUrl} 
                alt={userData.name}
                className="w-full h-full object-cover" 
              />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primaryRed text-white rounded-full flex items-center justify-center shadow-md">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Change profile photo
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <Package className="w-5 h-5 mr-2 text-primaryRed dark:text-primaryRed/90" />
              Recent Orders
            </h3>
            <button 
              onClick={() => window.scrollTo(0, 0)}
              className="text-sm text-primaryRed dark:text-primaryRed/90 hover:text-berry dark:hover:text-berry/90 flex items-center"
            >
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {userData.orders.slice(0, 2).map((order: any) => (
              <div 
                key={order.id}
                className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 hover:border-primaryRed dark:hover:border-primaryRed/90 transition-colors"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">{order.id}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    order.status === 'Delivered' 
                      ? 'bg-accentGreen/10 text-accentGreen dark:bg-accentGreen/20 dark:text-accentGreen/90' 
                      : 'bg-primaryRed/10 text-primaryRed dark:bg-primaryRed/20 dark:text-primaryRed/90'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400 flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1" /> {order.date}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <Heart className="w-5 h-5 mr-2 text-primaryRed dark:text-primaryRed/90" />
              Saved Items
            </h3>
            <button 
              onClick={() => window.scrollTo(0, 0)}
              className="text-sm text-primaryRed dark:text-primaryRed/90 hover:text-berry dark:hover:text-berry/90 flex items-center"
            >
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {userData.savedItems.map((item: any) => (
              <div 
                key={item.id}
                className="flex items-center gap-3 border border-gray-100 dark:border-gray-700 rounded-lg p-3 hover:border-primaryRed dark:hover:border-primaryRed/90 transition-colors"
              >
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</h4>
                  <p className="text-sm text-primaryRed dark:text-primaryRed/90 font-medium">${item.price.toFixed(2)}</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-primaryRed dark:hover:text-primaryRed/90 transition-colors">
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderHistory = ({ orders }: { orders: any[] }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <Package className="w-5 h-5 mr-2 text-primaryRed dark:text-primaryRed/90" />
          Order History
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View and track all your orders</p>
      </div>
      
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {orders.map(order => (
          <motion.div 
            key={order.id}
            className="p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900 dark:text-white">{order.id}</h3>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    order.status === 'Delivered' 
                      ? 'bg-accentGreen/10 text-accentGreen dark:bg-accentGreen/20 dark:text-accentGreen/90' 
                      : order.status === 'Processing'
                        ? 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-500/90'
                        : 'bg-primaryRed/10 text-primaryRed dark:bg-primaryRed/20 dark:text-primaryRed/90'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1" /> {order.date}
                  </span>
                  <span className="flex items-center">
                    <CreditCard className="w-3.5 h-3.5 mr-1" /> Visa •••• 4242
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-lg text-gray-900 dark:text-white">${order.total.toFixed(2)}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{order.items.reduce((a: number, b: any) => a + b.quantity, 0)} items</div>
              </div>
            </div>
            
            <div className="mt-4 space-y-3">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-800 dark:text-gray-200">
                      {item.quantity}x {item.name}
                    </span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-1.5">
                <Package className="w-4 h-4" /> Track Order
              </button>
              <button className="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primaryRed hover:text-primaryRed dark:hover:border-primaryRed/90 dark:hover:text-primaryRed/90 transition-colors">
                View Details
              </button>
              {order.status === 'Delivered' && (
                <button className="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primaryRed hover:text-primaryRed dark:hover:border-primaryRed/90 dark:hover:text-primaryRed/90 transition-colors flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4" /> Buy Again
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const SavedItems = ({ items }: { items: any[] }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <Heart className="w-5 h-5 mr-2 text-primaryRed dark:text-primaryRed/90" />
          Saved Items
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Products you've saved for later</p>
      </div>
      
      {items.length === 0 ? (
        <div className="p-8 text-center">
          <Heart className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No saved items yet</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Browse our products and save your favorites for later</p>
          <Link to="/products" className="px-4 py-2 bg-primaryRed text-white rounded-lg hover:bg-primaryRed/90 transition-colors inline-flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4" /> Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {items.map(item => (
            <motion.div 
              key={item.id}
              className="border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-md transition-all"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primaryRed hover:bg-white dark:hover:bg-gray-800 transition-colors">
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <div className="font-bold text-primaryRed dark:text-primaryRed/90">${item.price.toFixed(2)}</div>
                  <button className="p-2 rounded-full bg-primaryRed/10 text-primaryRed hover:bg-primaryRed/20 dark:bg-primaryRed/20 dark:text-primaryRed/90 dark:hover:bg-primaryRed/30 transition-colors">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

const PaymentMethods = ({ paymentMethods }: { paymentMethods: any[] }) => {
  const getCardTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'amex':
        return '💳';
      default:
        return '💳';
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-primaryRed dark:text-primaryRed/90" />
          Payment Methods
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your payment information</p>
      </div>
      
      <div className="p-6">
        <div className="space-y-4 mb-6">
          {paymentMethods.map(method => (
            <div 
              key={method.id}
              className={`border rounded-xl p-4 transition-colors ${
                method.isDefault 
                  ? 'border-primaryRed dark:border-primaryRed/90' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-xl">
                    {getCardTypeIcon(method.type)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {method.type} •••• {method.last4}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Expires {method.expiry}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {method.isDefault && (
                    <span className="px-2 py-0.5 text-xs bg-primaryRed/10 text-primaryRed dark:bg-primaryRed/20 dark:text-primaryRed/90 rounded-full">
                      Default
                    </span>
                  )}
                  <button className="p-2 text-gray-400 hover:text-primaryRed dark:hover:text-primaryRed/90 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full py-3 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 hover:text-primaryRed hover:border-primaryRed dark:hover:text-primaryRed/90 dark:hover:border-primaryRed/90 transition-colors flex items-center justify-center gap-1.5">
          <Plus className="w-4 h-4" /> Add Payment Method
        </button>
      </div>
    </div>
  );
};

const AddressBook = ({ addresses }: { addresses: any[] }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-primaryRed dark:text-primaryRed/90" />
          Address Book
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your delivery addresses</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {addresses.map(address => (
            <div 
              key={address.id} 
              className={`border rounded-xl p-5 transition-colors ${
                address.isDefault 
                  ? 'border-primaryRed dark:border-primaryRed/90' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 dark:text-white">{address.type}</span>
                  {address.isDefault && (
                    <span className="px-2 py-0.5 text-xs bg-primaryRed/10 text-primaryRed dark:bg-primaryRed/20 dark:text-primaryRed/90 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-gray-400 hover:text-primaryRed dark:hover:text-primaryRed/90 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <div>{address.street}</div>
                <div>{address.city}, {address.state} {address.postal}</div>
                <div>{address.country}</div>
              </div>
              
              {!address.isDefault && (
                <button className="mt-4 text-sm text-primaryRed dark:text-primaryRed/90 hover:text-berry dark:hover:text-berry/90 font-medium">
                  Set as Default
                </button>
              )}
            </div>
          ))}
        </div>
        
        <button className="w-full py-3 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 hover:text-primaryRed hover:border-primaryRed dark:hover:text-primaryRed/90 dark:hover:border-primaryRed/90 transition-colors flex items-center justify-center gap-1.5">
          <Plus className="w-4 h-4" /> Add New Address
        </button>
      </div>
    </div>
  );
};

const AccountSettings = ({ userData }: { userData: any }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <Shield className="w-5 h-5 mr-2 text-primaryRed dark:text-primaryRed/90" />
            Security Settings
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account security preferences</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryRed dark:focus:ring-primaryRed/90"
                    placeholder="Enter current password" 
                  />
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryRed dark:focus:ring-primaryRed/90"
                  placeholder="Enter new password" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryRed dark:focus:ring-primaryRed/90"
                  placeholder="Confirm new password" 
                />
              </div>
              
              <button className="px-6 py-2.5 bg-primaryRed text-white rounded-lg hover:bg-primaryRed/90 dark:bg-primaryRed/90 dark:hover:bg-primaryRed/80 transition-colors">
                Update Password
              </button>
            </div>
          </div>
          
          <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 dark:text-gray-300">Enhance your account security with 2FA</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Get a verification code sent to your phone or email</p>
              </div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  id="twoFactorToggle" 
                  className="peer sr-only" 
                />
                <label 
                  htmlFor="twoFactorToggle"
                  className="block w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer-checked:bg-accentGreen peer-checked:dark:bg-accentGreen/80 cursor-pointer transition-colors"
                >
                  <span className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <Bell className="w-5 h-5 mr-2 text-primaryRed dark:text-primaryRed/90" />
            Notification Preferences
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage how we contact you</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Order Updates</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Get notified about your order status changes</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="orderEmail" 
                  className="w-4 h-4 rounded border-gray-300 text-primaryRed focus:ring-primaryRed"
                  defaultChecked={userData.notifications.orderUpdates} 
                />
                <label htmlFor="orderEmail" className="text-sm text-gray-700 dark:text-gray-300">
                  <Mail className="w-4 h-4" />
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="orderSMS" 
                  className="w-4 h-4 rounded border-gray-300 text-primaryRed focus:ring-primaryRed"
                  defaultChecked={userData.notifications.orderUpdates} 
                />
                <label htmlFor="orderSMS" className="text-sm text-gray-700 dark:text-gray-300">
                  <Phone className="w-4 h-4" />
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Promotions & Offers</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Receive updates about sales and special offers</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="promoEmail" 
                  className="w-4 h-4 rounded border-gray-300 text-primaryRed focus:ring-primaryRed"
                  defaultChecked={userData.notifications.promotions} 
                />
                <label htmlFor="promoEmail" className="text-sm text-gray-700 dark:text-gray-300">
                  <Mail className="w-4 h-4" />
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="promoSMS" 
                  className="w-4 h-4 rounded border-gray-300 text-primaryRed focus:ring-primaryRed"
                  defaultChecked={userData.notifications.promotions} 
                />
                <label htmlFor="promoSMS" className="text-sm text-gray-700 dark:text-gray-300">
                  <Phone className="w-4 h-4" />
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Newsletter</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Receive our monthly newsletter with health tips</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="newsEmail" 
                  className="w-4 h-4 rounded border-gray-300 text-primaryRed focus:ring-primaryRed"
                  defaultChecked={userData.notifications.newsletter} 
                />
                <label htmlFor="newsEmail" className="text-sm text-gray-700 dark:text-gray-300">
                  <Mail className="w-4 h-4" />
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Product Updates</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Get notified when we launch new products</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="productEmail" 
                  className="w-4 h-4 rounded border-gray-300 text-primaryRed focus:ring-primaryRed"
                  defaultChecked={userData.notifications.productUpdates} 
                />
                <label htmlFor="productEmail" className="text-sm text-gray-700 dark:text-gray-300">
                  <Mail className="w-4 h-4" />
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="productSMS" 
                  className="w-4 h-4 rounded border-gray-300 text-primaryRed focus:ring-primaryRed"
                  defaultChecked={userData.notifications.productUpdates} 
                />
                <label htmlFor="productSMS" className="text-sm text-gray-700 dark:text-gray-300">
                  <Phone className="w-4 h-4" />
                </label>
              </div>
            </div>
          </div>
          
          <div className="pt-6 mt-4 flex justify-end">
            <button className="px-6 py-2.5 bg-primaryRed text-white rounded-lg hover:bg-primaryRed/90 dark:bg-primaryRed/90 dark:hover:bg-primaryRed/80 transition-colors">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-6 border border-red-100 dark:border-red-900/50">
        <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">Delete Account</h3>
        <p className="text-sm text-red-500 dark:text-red-400 mb-4">
          This will permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <button className="px-4 py-2 text-sm bg-white dark:bg-gray-800 text-red-500 border border-red-200 dark:border-red-900/50 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors">
          Delete My Account
        </button>
      </div>
    </div>
  );
};

export default AccountPage;