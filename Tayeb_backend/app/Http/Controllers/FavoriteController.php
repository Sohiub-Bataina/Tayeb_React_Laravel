<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;

class FavoriteController extends Controller {

    // التبديل بين المفضلة والإزالة
    public function toggle(Request $request)
    {
        // التحقق من البيانات المرسلة
        $request->validate([
            'blog_id' => 'required|exists:blogs,id',
        ]);

        // الحصول على user_id من الطلب (يجب أن يكون مرفقًا مع الطلب)
        $user_id = $request->user_id;  // هنا يتم جلب ID من الـ request بدلاً من تحديده ثابتاً

        // تحقق مما إذا كان الـ blog موجودًا في المفضلة
        $favorite = Favorite::where('user_id', $user_id)
            ->where('blog_id', $request->blog_id)
            ->first();

        // إضافة أو إزالة من المفضلة
        if ($favorite) {
            $favorite->delete();
            return response()->json(['message' => 'Removed from favorites']);
        } else {
            Favorite::create([
                'user_id' => $user_id,  // استخدم ID ديناميكي هنا
                'blog_id' => $request->blog_id,
            ]);
            return response()->json(['message' => 'Added to favorites']);
        }
    }

    // جلب المفضلات
    public function index(Request $request)
    {
        $user_id = $request->user_id;  // الحصول على user_id من الـ request

        // استعلام لجلب المفضلات مع المدونات المرتبطة
        $favorites = Favorite::where('user_id', $user_id)
            ->with('blog')  // جلب تفاصيل المدونة المرتبطة بكل مفضل
            ->get();

        return response()->json($favorites);
    }

    // التحقق من حالة المفضلة
    public function checkFavoriteStatus(Request $request)
    {
        $request->validate([
            'blog_id' => 'required|exists:blogs,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $isFavorite = Favorite::where('user_id', $request->user_id)
            ->where('blog_id', $request->blog_id)
            ->exists();

        return response()->json(['isFavorite' => $isFavorite]);
    }

    
}