// import { create } from "zustand"
// import { User } from '@/payload-type';
// import { createJSONStorage ,persist } from "zustand/middleware";

// export type UserState = {
//   user: User 
//   setUser: (user: User | null) => void;
// }

// export const useUser = create<UserState>()(
//   persist<UserState>(
//     (set,get) => ({
//       setUser: (user)
//     })
//   )
// )

// export default useUser;