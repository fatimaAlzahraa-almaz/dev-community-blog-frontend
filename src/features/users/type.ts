

export type UserDetailes={
    id:number,
    username:string,
    name:string,
    bio:string,
    profile_img:null | string,
    date_joined:string,
    is_following:boolean,
    followers_count:number,
    following_count:number,
}

export type GetUserParams={
  username:string,
}

export type UpdateCurrentUserParams={
  name?:string,
  bio?:string,
  profile_img?:File,
}

export type FollowUser={
  detail:string
}

export type useUserProps={
  username:string,
}

export type useFollowProps={
  username:string,
  is_following:boolean,
}
export type UserCardParams={
  data:UserDetailes,
}
export type UserDetailsParams={
  data:UserDetailes,
}
export type UseEditeProfileParams={
  bio?:string,
  name?:string,
  profile_img?:File,
  username:string,
}


