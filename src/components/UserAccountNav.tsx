'use client'

import { User } from '@/payload-type'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation';

const UserAccountNav = ({ user }: { user: User }) => {
  const { signOut } = useAuth()
  const router = useRouter();

  const handleProfile = () => {
    router.push('/profile');
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className='overflow-visible'>
        <Button
          variant='ghost'
          size='sm'
          className='relative'>
          Mi cuenta
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='bg-white w-60'
        align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-0.5 leading-none'>
            <p className='font-medium text-sm text-black'>
              {user.email}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleProfile}
          className='cursor-pointer'>
         Mi Perfil
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={signOut}
          className='cursor-pointer'>
          Cerrar sesión 
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav