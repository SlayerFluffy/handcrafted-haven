export type Product = {
    id: string
    name: string
    category: string
    price: number
    rating: number
    reviews: number
    seller: string
    description: string
}

export const mockProducts: Product[] = [
    {
        id: 'woven-wall-hanging',
        name: 'Woven Wall Hanging',
        category: 'Home Decor',
        price: 48,
        rating: 4.8,
        reviews: 22,
        seller: 'Maya Crafts',
        description: 'Handwoven cotton wall hanging with warm neutral tones.',
    },
    {
        id: 'ceramic-mug-set',
        name: 'Ceramic Mug Set',
        category: 'Kitchen',
        price: 36,
        rating: 4.6,
        reviews: 18,
        seller: 'Clay Corner',
        description: 'Set of two handmade ceramic mugs with a speckled glaze.',
    },
    {
        id: 'beaded-bracelet',
        name: 'Beaded Bracelet',
        category: 'Jewelry',
        price: 19,
        rating: 4.4,
        reviews: 31,
        seller: 'RiverStone Studio',
        description: 'Stretch bracelet made with natural stone beads.',
    },
    {
        id: 'knit-blanket',
        name: 'Chunky Knit Blanket',
        category: 'Home Decor',
        price: 85,
        rating: 4.9,
        reviews: 14,
        seller: 'Cozy Thread Co.',
        description: 'Soft oversized blanket hand-knitted with chunky yarn.',
    },
    {
        id: 'leather-journal',
        name: 'Leather Journal',
        category: 'Stationery',
        price: 29,
        rating: 4.7,
        reviews: 27,
        seller: 'Oak & Ink',
        description: 'Hand-bound journal with recycled paper pages.',
    },
    {
        id: 'soy-candle',
        name: 'Lavender Soy Candle',
        category: 'Home Decor',
        price: 18,
        rating: 4.5,
        reviews: 40,
        seller: 'Golden Wick',
        description: 'Small-batch soy candle with lavender essential oil.',
    },
    {
        id: 'wooden-toy-car',
        name: 'Wooden Toy Car',
        category: 'Toys',
        price: 21,
        rating: 4.8,
        reviews: 16,
        seller: 'Pine Workshop',
        description: 'Smooth handmade toy car crafted from natural wood.',
    },
    {
        id: 'embroidered-tote',
        name: 'Embroidered Tote Bag',
        category: 'Accessories',
        price: 34,
        rating: 4.6,
        reviews: 25,
        seller: 'Thread Bloom',
        description: 'Canvas tote with floral hand embroidery',
    },
]