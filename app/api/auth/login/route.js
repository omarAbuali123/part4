import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDB();

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const user = await User.findOne({ email });
    if (!user) return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error logging in' }), { status: 500 });
  }
}
