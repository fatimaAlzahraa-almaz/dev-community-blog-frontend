import {api} from '@/lib/api/axios';
import {GetUserParams,UserDetailes,UpdateCurrentUserParams,FollowUser} from './type';

export const getUser=async({username}:GetUserParams) : Promise<UserDetailes>=>{
    const response=await api.get<UserDetailes>(`/api/users/${username}`);
    return response.data;
}

export const getCurrentUser=async():Promise<UserDetailes>=>{
    const response=await api.get<UserDetailes>('/api/users/me');
    return response.data;

}

export const updateCurrentUser=async({name,bio,profile_img}:UpdateCurrentUserParams):Promise<UserDetailes>=>{
    const form=new FormData();
    if (name!==undefined){
        form.append('name',name);
    }
    if(bio!==undefined){
        form.append('bio',bio);
    }
    if(profile_img){
        form.append('profile_img',profile_img);
    }
   const response=await api.patch<UserDetailes>('/api/users/me',form)
   return response.data;

}

export const followUser=async({username}:GetUserParams):Promise<FollowUser>=>{
    const response= await api.post<FollowUser>(`/api/users/${username}/follow`);
    return  response.data;
}

export const unfollowUser=async({username}:GetUserParams):Promise<void>=>{
    await api.delete(`/api/users/${username}/follow`);
}