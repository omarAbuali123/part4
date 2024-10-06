import { authenticateToken } from '../../../utils/auth';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export async function GET(req) {
    await connectDB();
    authenticateToken(req);

    const user = await User.findById(req.user);
    if (!user) {
        return new Response(JSON.stringify({ message: 'المستخدم غير موجود' }), { status: 404 });
    }

    return new Response(JSON.stringify({ username: user.username, email: user.email }), { status: 200 });
}
