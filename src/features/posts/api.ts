import {api} from "@/lib/api/axios";
import {GetPostsParams,GetPostParams,CreatePostParams,UpdatePostParams,DeletePostParams,MultiplePosts,Post
  ,PostMutationResponse,GetCategoriesResponse
} from './type';
export const getPosts=async({search,page,ordering,category,author,feed}:GetPostsParams):Promise<MultiplePosts>=>{
    const response=await api.get<MultiplePosts>('/api/posts',{
      params:{
        search,
        page,
        ordering,
        category,
        author,
        feed
      }
    });
    return response.data;
}

export const getPost=async({slug}:GetPostParams):Promise<Post>=>{
  const response= await api.get<Post>(`/api/posts/${slug}`);
  return response.data;
}

export const createPost=async({title,content,category,img}:CreatePostParams):Promise<PostMutationResponse>=>{

  const form=new FormData();
  form.append('title',title);
  form.append('content',content);
  form.append('category',category.toString());
  if(img){
    form.append('img',img);
  }
  const response=await api.post<PostMutationResponse>('/api/posts/',form);
  return response.data;

}

export const updatePost=async({slug,title,content,category,img,remove_img}:UpdatePostParams):Promise<PostMutationResponse>=>{

  const form=new FormData();
  if(title!==undefined){
     form.append('title',title);
  }
   if(content!==undefined){
        form.append('content',content);
   }
   if(category!==undefined){
       form.append('category',category.toString());
   }

  if(img){
    form.append('img',img);
  }
  if(remove_img){
    form.append('remove_img','true');
  }
  const response=await api.patch<PostMutationResponse>(`/api/posts/${slug}`,form);
  return response.data;

}

export const deletePost=async({slug}:DeletePostParams):Promise<void>=>{
    await api.delete(`/api/posts/${slug}`);
}

export const getCategories=async():Promise<GetCategoriesResponse>=>{
  const response=await api.get('/api/categories');
  return response.data;
}



