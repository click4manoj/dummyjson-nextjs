export interface NewUser{
    firstName: string;
    lastName: string;
    age: number
}
export interface UserResponse {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
}

export async function addUser(user: NewUser): Promise<UserResponse> {    
    const res  = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      if(!res.ok){
        const errorText = await res.text();
        throw new Error(`Failed to add user: ${res.status} ${res.statusText} - ${errorText}`)
      }
      return res.json() as Promise<UserResponse>;

}
