<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\TempImage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use App\Models\Favorite; // إضافة Favorite model

class BlogController extends Controller
{
    // This method will return all blogs
    public function index(Request $request)
    {
        try {
            // الحصول على الكلمة المفتاحية من الطلب
            $keyword = $request->get('keyword');
    
            // استعلام المدونات
            $blogs = Blog::query();
            $blogs = Blog::orderBy('created_at', 'DESC');
    
            // إذا وُجدت كلمة مفتاحية، يتم إضافة شروط البحث
            if ($keyword) {
                $blogs->where('title', 'LIKE', "%{$keyword}%") // البحث في العنوان
                      ->orWhere('shortDesc', 'LIKE', "%{$keyword}%") // البحث في الوصف القصير
                      ->orWhere('description', 'LIKE', "%{$keyword}%"); // البحث في الوصف الكامل
            }
    
            // جلب النتائج
            $blogs = $blogs->get();
    
            return response()->json(['status' => true, 'data' => $blogs]);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'message' => $e->getMessage()], 500);
        }
    }
        
    

    // This method will return a single blog
    public function show($id) {
        $blog = Blog::find($id);

        if ($blog == null) {
            return response()->json([
                'status' => false,
                'message' => 'Blog not found',
            ]);
        }

        $blog['date'] = \Carbon\Carbon::parse($blog->created_at)->format('d M, Y');
        $userId = request()->user_id;  // الحصول على user_id من الـ request

        // التحقق من إذا كان المستخدم قد أضاف المدونة إلى المفضلة
        $isFavorited = Favorite::where('user_id', $userId)->where('blog_id', $id)->exists();
        $blog['is_favorited'] = $isFavorited;

        return response()->json([
            'status' => true,
            'data' => $blog,
        ]);
    }

    // This method will store a blog
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:1',
            'author' => 'required|min:3',
            'create_user_id' => 'required|exists:users,id' // Validate that the user ID exists
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Please fix the errors',
                'errors' => $validator->errors()
            ]);
        }
    
        $user = User::find($request->create_user_id);
    
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found.',
            ]);
        }
    
        $blog = new Blog();
        $blog->title = $request->title;
        $blog->author = $request->author;
        $blog->description = $request->description ?? ''; // Default to empty string if not provided
        $blog->shortDesc = $request->shortDesc ?? ''; // Default to empty string if not provided
        $blog->categories = $request->categories ?? 'salads'; // Set default value if not provided
        $blog->create_user_id = $user->id;
        $blog->image = $request->image ?? null; // Default to null if not provided
        $blog->save();
    
        // Save Image Here
        $tempImage = TempImage::find($request->image_id);
    
        if ($tempImage != null) {
            $imageExtArray = explode('.', $tempImage->name);
            $ext = last($imageExtArray);
            $imageName = time() . '-' . $blog->id . '.' . $ext;
    
            $blog->image = $imageName;
            $blog->save();
    
            $sourcePath = public_path('uploads/temp/' . $tempImage->name);
            $destPath = public_path('uploads/blogs/' . $imageName);
    
            File::copy($sourcePath, $destPath);
        }
    
        return response()->json([
            'status' => true,
            'message' => 'Blog added successfully.',
            'data' => $blog
        ]);
    }

    // This method will update a blog
    public function update($id, Request $request) {
        $blog = Blog::find($id);

        if ($blog == null) {
            return response()->json([
                'status' => false,
                'message' => 'Blog not found.',
            ]);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|min:1',
            'author' => 'required|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Please fix the errors',
                'errors' => $validator->errors()
            ]);
        }

        $blog->title = $request->title;
        $blog->author = $request->author;
        $blog->description = $request->description ?? $blog->description; // Keep existing value if not provided
        $blog->shortDesc = $request->shortDesc ?? $blog->shortDesc; // Keep existing value if not provided
        $blog->categories = $request->categories ?? 'salads'; // Set default value if not provided
        $blog->create_user_id = $request->create_user_id ?? $blog->create_user_id; // Keep existing value if not provided
        $blog->image = $request->image ?? $blog->image; // Keep existing value if not provided
        $blog->save();

        // Save Image Here
        $tempImage = TempImage::find($request->image_id);

        if ($tempImage != null) {
            // Delete old image here
            File::delete(public_path('uploads/blogs/' . $blog->image));

            $imageExtArray = explode('.', $tempImage->name);
            $ext = last($imageExtArray);
            $imageName = time() . '-' . $blog->id . '.' . $ext;

            $blog->image = $imageName;
            $blog->save();

            $sourcePath = public_path('uploads/temp/' . $tempImage->name);
            $destPath = public_path('uploads/blogs/' . $imageName);

            File::copy($sourcePath, $destPath);
        }

        return response()->json([
            'status' => true,
            'message' => 'Blog updated successfully.',
            'data' => $blog
        ]);
    }

    // This method will delete a blog
    public function destroy($id) {
        $blog = Blog::find($id);

        if ($blog == null) {
            return response()->json([
                'status' => false,
                'message' => 'Blog not found.',
            ]);
        }

        // Delete blog image first
        File::delete(public_path('uploads/blogs/' . $blog->image));

        // Delete blog from DB
        $blog->delete();

        return response()->json([
            'status' => true,
            'message' => 'Blog deleted successfully.'
        ]);
    }
}