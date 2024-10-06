import connectDB from '../../../lib/mongodb';
import Product from '../../../models/Product';

connectDB();

export async function GET() {
  try {
    const products = await Product.find();
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching products' }), { status: 500 });
  }
}

export async function POST(req) {
  const { name, price, description, image } = await req.json();

  try {
    const product = await Product.create({ name, price, description, image });
    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error creating product' }), { status: 500 });
  }
}
