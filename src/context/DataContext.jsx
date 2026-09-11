import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER, INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_REVIEWS } from '../data/initialData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // 1. User authentication state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_user');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_USER;
  });

  // 2. Shared Products catalog
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('krishi_products');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_PRODUCTS;
  });

  // 3. Shared Orders
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('krishi_orders');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ORDERS;
  });

  // 4. Consumer Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('krishi_cart');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // 5. Consumer Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('krishi_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // 6. Ratings & Reviews
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('krishi_reviews');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_REVIEWS;
  });

  // Save changes to localStorage
  useEffect(() => {
    try { localStorage.setItem('krishi_products', JSON.stringify(products)); } catch {}
  }, [products]);

  useEffect(() => {
    try { localStorage.setItem('krishi_orders', JSON.stringify(orders)); } catch {}
  }, [orders]);

  useEffect(() => {
    try { localStorage.setItem('krishi_cart', JSON.stringify(cart)); } catch {}
  }, [cart]);

  useEffect(() => {
    try { localStorage.setItem('krishi_wishlist', JSON.stringify(wishlist)); } catch {}
  }, [wishlist]);

  useEffect(() => {
    try { localStorage.setItem('krishi_reviews', JSON.stringify(reviews)); } catch {}
  }, [reviews]);

  useEffect(() => {
    try { localStorage.setItem('nexus_user', JSON.stringify(currentUser)); } catch {}
  }, [currentUser]);

  // Auth methods
  const login = (userData) => {
    const existing = (() => {
      try { return JSON.parse(localStorage.getItem('nexus_user') || '{}'); } catch { return {}; }
    })();
    // Preserve name, farm, etc. if login provided empty strings
    const resolvedName = userData.name && userData.name.trim() !== '' 
      ? userData.name 
      : (existing.name || (userData.role === 'producer' ? 'Ravi Sharma' : userData.role === 'consumer' ? 'Priya Sharma' : 'Logistics Lead'));
    
    const role = userData.role || existing.role || 'consumer';
    const avatar = role === 'producer' ? '🧑‍🌾' : role === 'consumer' ? '👩' : '🚚';

    const updated = {
      ...existing,
      ...userData,
      name: resolvedName,
      role,
      avatar,
      joined: existing.joined || new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
    };
    setCurrentUser(updated);
    localStorage.setItem('nexus_user', JSON.stringify(updated));
    return updated;
  };

  const logout = () => {
    const defaultUser = {
      name: 'Guest User',
      email: '',
      role: 'guest',
      avatar: '👤'
    };
    setCurrentUser(defaultUser);
    localStorage.removeItem('nexus_user');
  };

  const updateProfile = (updatedFields) => {
    setCurrentUser(prev => {
      const merged = { ...prev, ...updatedFields };
      localStorage.setItem('nexus_user', JSON.stringify(merged));
      return merged;
    });
  };

  // Product methods
  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now(),
      rating: 5.0,
      reviews: 0,
      stock: productData.stock || (Number(productData.qty) > 10 ? 'In Stock' : 'Low Stock'),
      image: productData.image || (productData.category === 'Fruits' ? '🍎' : productData.category === 'Vegetables' ? '🥦' : productData.category === 'Grains' ? '🌾' : productData.category === 'Dairy & Honey' ? '🍯' : '🌿'),
      farmer: productData.farmer || currentUser.name || 'BeeHappy Farms',
      farm: productData.farm || currentUser.farm || 'BeeHappy Farms',
      location: productData.location || currentUser.location || 'Nashik, Maharashtra',
      price: Number(productData.price),
      qty: Number(productData.qty),
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const updated = { ...p, ...updatedFields };
        if (updated.qty !== undefined) {
          updated.qty = Number(updated.qty);
          updated.stock = updated.qty <= 0 ? 'Out of Stock' : updated.qty <= 10 ? 'Low Stock' : 'In Stock';
        }
        if (updated.price !== undefined) {
          updated.price = Number(updated.price);
        }
        return updated;
      }
      return p;
    }));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Order methods
  const createOrder = (orderData) => {
    const orderId = `KD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      items: orderData.items || [],
      product: orderData.items && orderData.items.length > 0 ? orderData.items[0].name + (orderData.items.length > 1 ? ` + ${orderData.items.length - 1} more` : '') : 'Fresh Produce',
      qty: orderData.items ? orderData.items.reduce((s, x) => s + x.qty, 0) : 1,
      price: Number(orderData.totalPrice || 0),
      buyer: orderData.buyerName || currentUser.name || 'Priya Sharma',
      buyerEmail: orderData.buyerEmail || currentUser.email || 'consumer@krishidirect.in',
      buyerAddress: orderData.buyerAddress || currentUser.address || 'Pune, Maharashtra',
      farmer: orderData.items && orderData.items[0]?.farmer ? orderData.items[0].farmer : 'BeeHappy Farms',
      farm: orderData.items && orderData.items[0]?.farm ? orderData.items[0].farm : 'BeeHappy Farms',
      status: 'New',
      date: new Date().toISOString().split('T')[0],
      partner: 'Pending Assignment',
      eta: '2-3 Business Days',
      steps: ['Placed', 'Accepted', 'Out for Delivery', 'Delivered']
    };

    setOrders(prev => [newOrder, ...prev]);
    // Clear cart upon order creation
    setCart([]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const updated = { ...o, status: newStatus };
        if (newStatus === 'Accepted' && o.partner === 'Pending Assignment') {
          updated.partner = 'SpeedShip Express';
        }
        return updated;
      }
      return o;
    }));
  };

  const assignDeliveryPartner = (orderId, partnerName) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          partner: partnerName,
          status: o.status === 'New' || o.status === 'Accepted' ? 'Processing' : o.status
        };
      }
      return o;
    }));
  };

  const advanceDeliveryStep = (orderId) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const stepOrder = ['New', 'Accepted', 'Processing', 'Out for Delivery', 'Delivered'];
        const currentIdx = stepOrder.indexOf(o.status);
        if (currentIdx !== -1 && currentIdx < stepOrder.length - 1) {
          return { ...o, status: stepOrder[currentIdx + 1] };
        }
      }
      return o;
    }));
  };

  // Cart methods
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + quantity } : item);
      }
      return [...prev, { ...product, qty: quantity }];
    });
  };

  const updateCartQty = (id, quantity) => {
    setCart(prev => {
      if (quantity <= 0) return prev.filter(item => item.id !== id);
      return prev.map(item => item.id === id ? { ...item, qty: quantity } : item);
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist methods
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.filter(item => item.id !== product.id);
      return [...prev, product];
    });
  };

  // Review methods
  const addReview = (newReview) => {
    const reviewWithId = {
      ...newReview,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      author: currentUser.name || 'Verified Buyer'
    };
    setReviews(prev => [reviewWithId, ...prev]);

    // Also update product rating
    if (newReview.product) {
      setProducts(prev => prev.map(p => {
        if (p.name === newReview.product) {
          const newCount = (p.reviews || 0) + 1;
          const currentTotal = (p.rating || 5.0) * (p.reviews || 0);
          const newAvg = Number(((currentTotal + Number(newReview.stars)) / newCount).toFixed(1));
          return { ...p, reviews: newCount, rating: newAvg };
        }
        return p;
      }));
    }
  };

  return (
    <DataContext.Provider value={{
      currentUser,
      login,
      logout,
      updateProfile,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      orders,
      createOrder,
      updateOrderStatus,
      assignDeliveryPartner,
      advanceDeliveryStep,
      cart,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      wishlist,
      toggleWishlist,
      reviews,
      addReview,
    }}>
      {children}
    </DataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
