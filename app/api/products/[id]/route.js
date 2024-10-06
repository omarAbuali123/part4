import connectDB from '../../../../lib/mongodb';
import Product from '../../../../models/Product';

connectDB();

export async function PUT(req, { params }) {
  const { id } = params;
  const { name, price, description, image } = await req.json();

  try {
    const product = await Product.findByIdAndUpdate(id, { name, price, description, image }, { new: true });
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error updating product' }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await Product.findByIdAndDelete(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error deleting product' }), { status: 500 });
  }
}
