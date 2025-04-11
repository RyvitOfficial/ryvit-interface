import { useDispatch } from 'react-redux';

import Dropdown from '@/components/Dropdown';
import { logout } from '@/reducers/user';

import { useAppSelector } from '@/hooks/useRedux';

interface IUserMenu {
  children: React.ReactNode;
}

const UserMenu = ({ children }: IUserMenu) => {
  const user = useAppSelector((state) => state.user.details);
  const dispatch = useDispatch();

  return (
    <Dropdown trigger={children}>
      <div className="px-4 py-2 text-sm text-gray-700">
        <p className="font-medium">{user?.name}</p>
        <p className="text-gray-500 truncate">{user?.email}</p>
        <p className="text-gray-500 truncate">
          Balance : {`${user && user.balanceTest / 10 ** 7} XLM`}
        </p>
      </div>
      <hr className="border-gray-200" />
      <button
        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </button>
    </Dropdown>
  );
};

export default UserMenu;
