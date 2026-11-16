import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema.js';

export class Manufacturer {
  name: string;
  homePage?: string;
  phone?: string;
}

export class InventoryItem {
  id: string;
  name: string;
  description?: string;
  manufacturer: Manufacturer;
  price: number;
  images?: string[];
  features?: string[];
  category?: string;
  stock: number;
  rating?: number;
  seller?: string;
  compatibility?: string;
}

const INITIAL_ITEMS: InventoryItem[] = [
  // --- ACEITES ---
  { id: 'oil-1', name: 'Castrol EDGE 5W-30', description: 'Aceite sintético de alto rendimiento', manufacturer: { name: 'Castrol' }, price: 189900, category: 'Aceites', stock: 25, rating: 4.8, images: ['/productos/oil-1.jpg'] },
  { id: 'oil-2', name: 'Mobil 1 Full Synthetic 5W-50', description: 'Protección avanzada contra el desgaste', manufacturer: { name: 'Mobil' }, price: 210000, category: 'Aceites', stock: 18, rating: 4.9, images: ['/productos/oil-2.jpg'] },
  { id: 'oil-3', name: 'Motul 8100 X-cess 5W-40', description: 'Lubricante 100% sintético', manufacturer: { name: 'Motul' }, price: 195000, category: 'Aceites', stock: 12, rating: 4.7, images: ['/productos/oil-3.jpg'] },
  { id: 'oil-4', name: 'Shell Helix Ultra 5W-30', description: 'Tecnología PurePlus', manufacturer: { name: 'Shell' }, price: 175000, category: 'Aceites', stock: 30, rating: 4.6, images: ['/productos/oil-4.jpg'] },
  { id: 'oil-5', name: 'Valvoline SynPower 5W-30', description: 'Limpieza y control de depósitos', manufacturer: { name: 'Valvoline' }, price: 165000, category: 'Aceites', stock: 15, rating: 4.5, images: ['/productos/oil-5.jpg'] },
  { id: 'oil-6', name: 'Liqui Moly Top Tec 4200', description: 'Antifricción alemana', manufacturer: { name: 'Liqui Moly' }, price: 240000, category: 'Aceites', stock: 8, rating: 5.0, images: ['/productos/oil-6.jpg'] },
  { id: 'oil-7', name: 'Total Quartz 9000 5W-40', description: 'Protección deportiva', manufacturer: { name: 'Total' }, price: 155000, category: 'Aceites', stock: 20, rating: 4.4, images: ['/productos/oil-7.jpg'] },
  { id: 'oil-8', name: 'Pennzoil Platinum Full Synthetic', description: 'Mantiene pistones limpios', manufacturer: { name: 'Pennzoil' }, price: 190000, category: 'Aceites', stock: 14, rating: 4.8, images: ['/productos/oil-8.jpg'] },
  { id: 'oil-9', name: 'Castrol GTX Ultraclean 10W-40', description: 'Elimina lodo del motor', manufacturer: { name: 'Castrol' }, price: 130000, category: 'Aceites', stock: 22, rating: 4.3, images: ['/productos/oil-9.jpg'] },
  { id: 'oil-10', name: 'Mobil Super 2000 10W-30', description: 'Aceite semisintético', manufacturer: { name: 'Mobil' }, price: 125000, category: 'Aceites', stock: 25, rating: 4.5, images: ['/productos/oil-10.jpg'] },

  // --- LLANTAS ---
  { id: 'tire-1', name: 'Michelin Pilot Sport 4', description: 'Alto rendimiento', manufacturer: { name: 'Michelin' }, price: 650000, category: 'Llantas', stock: 12, rating: 4.9, images: ['/productos/tire-1.jpg'] },
  { id: 'tire-2', name: 'Bridgestone Turanza T005', description: 'Confort superior', manufacturer: { name: 'Bridgestone' }, price: 520000, category: 'Llantas', stock: 16, rating: 4.7, images: ['/productos/tire-2.jpg'] },
  { id: 'tire-3', name: 'Pirelli P Zero', description: 'Máxima deportividad', manufacturer: { name: 'Pirelli' }, price: 710000, category: 'Llantas', stock: 10, rating: 4.8, images: ['/productos/tire-3.jpg'] },
  { id: 'tire-4', name: 'Goodyear Eagle F1 Asym 5', description: 'Frenado corto', manufacturer: { name: 'Goodyear' }, price: 590000, category: 'Llantas', stock: 14, rating: 4.7, images: ['/productos/tire-4.jpg'] },
  { id: 'tire-5', name: 'Continental ContiSport', description: 'Seguridad óptima', manufacturer: { name: 'Continental' }, price: 630000, category: 'Llantas', stock: 9, rating: 4.8, images: ['/productos/tire-5.jpg'] },
  { id: 'tire-6', name: 'Hankook Ventus V12', description: 'Alta velocidad', manufacturer: { name: 'Hankook' }, price: 480000, category: 'Llantas', stock: 18, rating: 4.5, images: ['/productos/tire-6.jpg'] },
  { id: 'tire-7', name: 'Yokohama Advan Sport', description: 'Estabilidad extrema', manufacturer: { name: 'Yokohama' }, price: 600000, category: 'Llantas', stock: 11, rating: 4.6, images: ['/productos/tire-7.jpg'] },
  { id: 'tire-8', name: 'Dunlop Direzza DZ102', description: 'Tracción superior', manufacturer: { name: 'Dunlop' }, price: 450000, category: 'Llantas', stock: 20, rating: 4.4, images: ['/productos/tire-8.jpg'] },
  { id: 'tire-9', name: 'Toyo Proxes T1 Sport', description: 'Desempeño en ruta', manufacturer: { name: 'Toyo' }, price: 530000, category: 'Llantas', stock: 13, rating: 4.5, images: ['/productos/tire-9.jpg'] },
  { id: 'tire-10', name: 'BFGoodrich G-Force', description: 'Track days', manufacturer: { name: 'BFGoodrich' }, price: 680000, category: 'Llantas', stock: 7, rating: 4.9, images: ['/productos/tire-10.jpg'] },

  // --- BATERÍAS ---
  { id: 'bat-1', name: 'Batería Mac 600 AMP', description: 'Libre de mantenimiento', manufacturer: { name: 'Mac' }, price: 500000, category: 'Baterias', stock: 15, rating: 4.8, images: ['/productos/bat-1.jpg'] },
  { id: 'bat-2', name: 'Batería Willard 700 AMP', description: 'Durabilidad extendida', manufacturer: { name: 'Willard' }, price: 580000, category: 'Baterias', stock: 10, rating: 4.9, images: ['/productos/bat-2.jpg'] },
  { id: 'bat-3', name: 'Batería Bosch S5 AGM', description: 'Start-Stop avanzado', manufacturer: { name: 'Bosch' }, price: 750000, category: 'Baterias', stock: 8, rating: 5.0, images: ['/productos/bat-3.jpg'] },
  { id: 'bat-4', name: 'Batería Varta Blue Dynamic', description: 'Arranque confiable', manufacturer: { name: 'Varta' }, price: 530000, category: 'Baterias', stock: 12, rating: 4.7, images: ['/productos/bat-4.jpg'] },
  { id: 'bat-5', name: 'Batería Duncan 550 AMP', description: 'Climas tropicales', manufacturer: { name: 'Duncan' }, price: 460000, category: 'Baterias', stock: 14, rating: 4.5, images: ['/productos/bat-5.jpg'] },
  { id: 'bat-6', name: 'Batería LTH H6 AGM', description: 'Reserva de energía', manufacturer: { name: 'LTH' }, price: 720000, category: 'Baterias', stock: 6, rating: 4.8, images: ['/productos/bat-6.jpg'] },
  { id: 'bat-7', name: 'Batería Rocket SMF 60Ah', description: 'Coreana sellada', manufacturer: { name: 'Rocket' }, price: 490000, category: 'Baterias', stock: 11, rating: 4.6, images: ['/productos/bat-7.jpg'] },
  { id: 'bat-8', name: 'Batería AtlasBX EFB', description: 'Vehículos modernos', manufacturer: { name: 'AtlasBX' }, price: 610000, category: 'Baterias', stock: 9, rating: 4.7, images: ['/productos/bat-8.jpg'] },
  { id: 'bat-9', name: 'Batería Optima RedTop', description: 'Condiciones extremas', manufacturer: { name: 'Optima' }, price: 950000, category: 'Baterias', stock: 4, rating: 5.0, images: ['/productos/bat-9.jpg'] },
  { id: 'bat-10', name: 'Batería Hankook MF 75Ah', description: 'Resistencia a vibración', manufacturer: { name: 'Hankook' }, price: 540000, category: 'Baterias', stock: 13, rating: 4.6, images: ['/productos/bat-10.jpg'] },

  // --- RINES ---
  { id: 'rin-1', name: 'Rines BBS Super RS 18"', description: 'Aleación ligera', manufacturer: { name: 'BBS' }, price: 5500000, category: 'Rines', stock: 6, rating: 5.0, images: ['/productos/rin-1.jpg'] },
  { id: 'rin-2', name: 'Rines VOSSEN HF-3 18"', description: 'Diseño cóncavo', manufacturer: { name: 'Vossen' }, price: 5800000, category: 'Rines', stock: 4, rating: 4.9, images: ['/productos/rin-2.jpg'] },
  { id: 'rin-3', name: 'Rines BBS CH-R 16"', description: 'Estilo deportivo', manufacturer: { name: 'BBS' }, price: 6000000, category: 'Rines', stock: 5, rating: 4.8, images: ['/productos/rin-3.jpg'] },
  { id: 'rin-4', name: 'Rines VOSSEN HF-5 15"', description: 'Negro brillante', manufacturer: { name: 'Vossen' }, price: 5000000, category: 'Rines', stock: 8, rating: 4.7, images: ['/productos/rin-4.jpg'] },
  { id: 'rin-5', name: 'Rines Enkei RPF1 17"', description: 'Ultraligeros', manufacturer: { name: 'Enkei' }, price: 4800000, category: 'Rines', stock: 7, rating: 5.0, images: ['/productos/rin-5.jpg'] },
  { id: 'rin-6', name: 'Rines OZ Racing Leggera', description: 'Tecnología italiana', manufacturer: { name: 'OZ Racing' }, price: 6200000, category: 'Rines', stock: 3, rating: 4.9, images: ['/productos/rin-6.jpg'] },
  { id: 'rin-7', name: 'Rines Rotiform LAS-R 18"', description: 'Diseño aerodinámico', manufacturer: { name: 'Rotiform' }, price: 5300000, category: 'Rines', stock: 6, rating: 4.6, images: ['/productos/rin-7.jpg'] },
  { id: 'rin-8', name: 'Rines Konig Hypergram', description: 'Flujo forjado', manufacturer: { name: 'Konig' }, price: 4200000, category: 'Rines', stock: 9, rating: 4.5, images: ['/productos/rin-8.jpg'] },
  { id: 'rin-9', name: 'Rines TSW Nurburgring', description: 'Resistencia superior', manufacturer: { name: 'TSW' }, price: 5600000, category: 'Rines', stock: 5, rating: 4.7, images: ['/productos/rin-9.jpg'] },
  { id: 'rin-10', name: 'Rines Sparco Assetto', description: 'Estilo rally', manufacturer: { name: 'Sparco' }, price: 4500000, category: 'Rines', stock: 10, rating: 4.8, images: ['/productos/rin-10.jpg'] },
];

@Injectable()
export class InventoryService implements OnModuleInit {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async onModuleInit() {
    try {
      const count = await this.productModel.countDocuments();
      if (count === 0) {
        await this.productModel.insertMany(INITIAL_ITEMS);
        console.log('40 productos iniciales insertados en MongoDB Atlas (drivezone.inventory)');
      }
    } catch (error) {
      console.error('Error al inicializar inventario en MongoDB:', error);
    }
  }

  async searchInventory(
    searchString?: string,
    category?: string,
    brand?: string,
    maxPrice?: number,
    sort?: string,
    skip?: number,
    limit?: number,
  ) {
    let result = await this.productModel.find().lean().exec();

    if (searchString) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchString.toLowerCase()),
      );
    }
    if (category) {
      const normalizedQuery = category
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      result = result.filter((item) => {
        const itemCat =
          item.category
            ?.toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') || '';

        if (normalizedQuery === 'neumaticos' && itemCat === 'llantas') return true;
        if (normalizedQuery === 'baterias' && itemCat === 'baterias') return true;

        return itemCat === normalizedQuery;
      });
    }
    if (brand) {
      result = result.filter(
        (item) => item.manufacturer?.name?.toLowerCase() === brand.toLowerCase(),
      );
    }
    if (maxPrice !== undefined) {
      result = result.filter((item) => item.price <= maxPrice);
    }
    if (sort === 'price') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    const start = skip || 0;
    const end = limit ? start + limit : result.length;

    return {
      data: result.slice(start, end),
      message: 'Productos consultados exitosamente',
      status: 200,
    };
  }

  async getInventoryItem(id: string) {
    const item = await this.productModel.findOne({ id }).lean().exec();
    if (!item) return { data: null, message: 'Producto no encontrado', status: 404 };
    return { data: item, message: 'Detalles del producto', status: 200 };
  }

  async addInventory(newItem: InventoryItem) {
    const created = await this.productModel.create(newItem);
    return { data: created, message: 'Producto creado exitosamente', status: 201 };
  }

  async updateInventory(id: string, updatedItem: InventoryItem) {
    const updated = await this.productModel
      .findOneAndUpdate({ id }, { ...updatedItem, id }, { new: true })
      .lean()
      .exec();
    if (!updated) return { data: null, message: 'Producto no encontrado', status: 404 };
    return { data: updated, message: 'Producto actualizado exitosamente', status: 200 };
  }

  async deleteInventory(id: string) {
    const deleted = await this.productModel.findOneAndDelete({ id }).exec();
    if (!deleted) return { data: null, message: 'Producto no encontrado', status: 404 };
    return { data: null, message: 'Producto eliminado exitosamente', status: 200 };
  }

  async getCategories() {
    const categories = await this.productModel.distinct('category').exec();
    return {
      data: categories.length > 0 ? categories : ['Llantas', 'Aceites', 'Baterias', 'Rines'],
      message: 'Categorías disponibles',
      status: 200,
    };
  }

  async getRecommendations() {
    const items = await this.productModel.find().limit(2).lean().exec();
    return {
      data: items,
      message: 'Sugerencias de productos',
      status: 200,
    };
  }
}