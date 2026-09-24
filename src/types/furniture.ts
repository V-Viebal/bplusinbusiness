export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductDimensions {
  width: number;
  depth: number;
  height: number;
  seatHeight?: number;
  unit: string;
}

export type ProductCategory =
  | 'all'
  | 'cozy-corner-armchairs'
  | 'soft-neutral-sofas'
  | 'coffee-tables'
  | 'minimalist-study-table'
  | 'computer-table'
  | 'corner';

export type RoomType =
  | 'All Rooms'
  | 'Living Room'
  | 'Bedroom'
  | 'Study & Office'
  | 'Dining Room'
  | 'Lounge';

export interface Product {
  id: string;
  name: string;
  vietnameseName?: string;
  category: ProductCategory;
  categoryLabel: string;
  room: RoomType;
  collection: string;
  tag?: 'Popular' | 'Exclusive' | 'Hot Picks' | 'Limited Edition' | 'Signature';
  priceVND: number;
  priceUSD: number;
  rating: number;
  reviewsCount: number;
  image: string;
  secondaryImages?: string[];
  shortDescription: string;
  fullDescription: string;
  dimensions: ProductDimensions;
  materials: string[];
  colors: ProductColor[];
  featuredInHero?: boolean;
  featuredInCurated?: boolean;
  inStock: boolean;
  leadTime: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
  customNotes?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  quote: string;
  experience: string;
}
