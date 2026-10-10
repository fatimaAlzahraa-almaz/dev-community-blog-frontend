"use client";
import { useState } from "react";
import PostCard from "@/features/posts/components/PostCard";
import { usePosts } from "@/hooks/usePosts";
import Categories from "@/features/posts/components/Categories";
import Hero from "@/components/layout/Hero";
import { useAuthStore } from "@/features/auth/store";
import { Spinner } from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { getErrorMessage } from "@/lib/getErrorMessage";
export default function Home() {
  const[feed,setFeed]=useState<'all' | 'following'>('all');
  const[category,setCategory]=useState<string|undefined>(undefined);
  const{data,isLoading,isPending, fetchNextPage,
  hasNextPage,
  isFetchingNextPage,isError,error}=usePosts({feed,category});
  console.log(data)
  const accessToken = useAuthStore((state) => state.accessToken);
  const isInitalized = useAuthStore((state) => state.isInitialized);
  const isLoggedIn = Boolean(accessToken) && isInitalized;
  const handleDiscoverClick=()=>{
    setFeed('all');
  }
  const handleFollowingClick=()=>{
    setFeed('following');
  }
  

  return (
    <div className="flex min-h-screen w-full justify-center text-primary bg-background">
      <div className="flex flex-col gap-4 max-w-250">
        <Hero/>
        
      
         
      <div className="w-full flex flex-col gap-4 pb-6    ">
        <div className="flex justify-between flex-wrap gap-2 items-center w-full"> 
       
        {
           isLoggedIn ?  <div className=" flex gap-1  border-2 py-1 p-1 sm:px-2 rounded-full w-fit text-sm sm:text-base">
          <button onClick={handleDiscoverClick} className={feed=='all' ? "border p-1 sm:px-3 py-1 rounded-full font-semibold cursor-pointer text-white bg-chart-4 shadow-sm": ' p-1 sm:px-3 py-1 rounded-full  cursor-pointer '}>discover</button>
          <button onClick={handleFollowingClick} className={ feed=='following' ? "border p-1 sm:px-3 py-1 rounded-full font-semibold cursor-pointer text-white bg-chart-4 shadow-sm": ' p-1 sm:px-3 py-1 rounded-full  cursor-pointer '}>following</button>
        
        </div> :
          <p className="text-lg sm:text-xl font-semibold flex gap-1 items-center px-2"><span className="w-2 h-1 bg-black/95 rounded-full p-1"></span>New & popular</p> 
        }
          <Categories category={category} setCategory={setCategory}/>
         </div>
       {
        isPending ? <div className="flex justify-center w-full h-[50vh] items-center"><Spinner/></div> :
        isError ? <div className="w-full min-h-[40vh] flex items-center"> <ErrorMessage message={getErrorMessage(error)}/></div> :
        data?.pages[0]?.results?.length === 0 ? <p className="text-lg sm:text-xl  w-full min-h-[40vh] flex items-center justify-center">No posts found</p> :
        <div className="flex flex-col gap-4">
           <div className=" flex flex-col      gap-2   justify-center w-full   ">
      {
         data?.pages.map((page)=>(
            page?.results.map((post)=>{
         return (
         <PostCard key={post.id} data={post}/>
         )
        })
        ))
        
      }
       
    </div>
    {
      !isLoading  && <button className={ hasNextPage ?"w-full p-1 border font-semibold rounded-md cursor-pointer text-chart-4 shadow-sm" : "w-full p-1 border font-semibold rounded-md cursor-not-allowed text-muted-foreground shadow-sm"}
  onClick={() => fetchNextPage()}
  disabled={!hasNextPage || isFetchingNextPage}
>
  {isFetchingNextPage
    ? "Loading..."
    : hasNextPage
      ? "Load More"
      : "No more posts"}
</button>
    }
    
        </div>
       
       }
        
    </div>
     

      
   </div>
    </div>
  );
}
