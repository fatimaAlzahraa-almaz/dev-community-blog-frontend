

export type Post={
    id: number,
    title: string,
    slug: string,
    content: string,
    posted_at: string,
    img: null | string,
    author: {
        username:string,
        profile_img: null | string
    },
    category: {
        id: number,
        title: string
    },
    likes_count: number,
    comments_count: number,
    bookmarks_count: number,
    is_liked: boolean,
    is_bookmarked: boolean
}

export type PaginationResponse<T>={
  count:number,
  next:null | string,
  previous:null | string,
  results:T[]

}

export type MultiplePosts=PaginationResponse<Post>

export type GetPostsParams={
  search?:string,
  category?:string,
  ordering?:'posted_at' | '-posted_at' | 'title' | '-title',
  author?:string,
  page?:number,
  feed?:'all' | 'following'
}

export type GetPostParams={
  slug:string,
}

export type PostMutationResponse={
  id:number,
  title:string,
  slug:string,
  content:string,
  author:number,
  posted_at:string,
  category:number,
  img:null| string
}

export type CreatePostParams={
  title:string,
  content:string,
  category:number,
  img?:File|null
}

export type UpdatePostParams={
  slug:string,
  title?:string,
  content?:string,
  category?:number,
  img?:File|null,
  remove_img?:boolean,
}

export type DeletePostParams={
    slug:string,
}

export type PostCardProps={
  data:Post
}
export type PostDetailsProps={
  data:Post
}

export type Category={
  id:number,
  title:string,
}
export type GetCategoriesResponse=PaginationResponse<Category>

export type CategoriesParams={
  category?:string,
  setCategory:React.Dispatch<React.SetStateAction<string | undefined>>
  

}

