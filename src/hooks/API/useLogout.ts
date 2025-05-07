import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      const token = Cookies.get('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_CLARYLISK_BACKEND}/custom-api/user/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Clear cookies
      Cookies.remove('token');
      Cookies.remove('user');

      // Redirect to login page
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, we should still clear the cookies and redirect
      Cookies.remove('token');
      Cookies.remove('user');
      router.push('/login');
    }
  };

  return { logout };
};