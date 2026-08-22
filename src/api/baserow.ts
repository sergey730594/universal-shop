import { CONFIG } from '../config'

export interface Product {
  id: number
  title: string
  price: number
  description: string
  image_url: string
  active: boolean
}

export async function fetchProducts(): Promise<Product[]> {
  const { url, token } = CONFIG.baserow
  
  if (!url) {
    console.log('[baserow] No API configured, using demo data')
    return getDemoProducts()
  }

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (!res.ok) throw new Error('Failed to load catalog')
    const data = await res.json()
    const rows = Array.isArray(data) ? data : data.results || []
    return rows
      .filter((r: any) => r.active !== false)
      .map((r: any) => ({
        id: r.id,
        title: r.title || r.name || 'Untitled',
        price: Number(r.price) || 0,
        description: r.description || '',
        image_url: r.image_url || r.image || '',
        active: r.active !== false
      }))
  } catch (err) {
    console.error('[baserow] API error, falling back to demo:', err)
    return getDemoProducts()
  }
}

function getDemoProducts(): Product[] {
  return [
    {
      id: 1,
      title: 'Minimalist White Sneakers',
      price: 89.99,
      description: 'Clean design, comfortable fit',
      image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      active: true
    },
    {
      id: 2,
      title: 'Black Leather Wallet',
      price: 45.00,
      description: 'Premium quality leather',
      image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
      active: true
    },
    {
      id: 3,
      title: 'Stainless Steel Watch',
      price: 199.99,
      description: 'Elegant timepiece',
      image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      active: true
    },
    {
      id: 4,
      title: 'Cotton Crew Neck T-Shirt',
      price: 24.99,
      description: 'Soft, breathable fabric',
      image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      active: true
    },
    {
      id: 5,
      title: 'Wireless Bluetooth Headphones',
      price: 129.99,
      description: 'Noise cancelling, 30h battery',
      image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      active: true
    },
    {
      id: 6,
      title: 'Canvas Backpack',
      price: 59.99,
      description: 'Durable, spacious design',
      image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      active: true
    },
    {
      id: 7,
      title: 'Ceramic Coffee Mug',
      price: 14.99,
      description: 'Handcrafted, 12oz capacity',
      image_url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop',
      active: true
    },
    {
      id: 8,
      title: 'Sunglasses - Classic Black',
      price: 79.99,
      description: 'UV400 protection',
      image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
      active: true
    }
  ]
}