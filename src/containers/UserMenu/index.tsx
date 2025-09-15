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
    <Dropdown trigger={children} className="overflow-hidden">
      <div className="px-4 py-2 text-sm space-y-1">
        <p className="font-medium text-white truncate">{user?.name}</p>
        <p className="text-txtgray truncate">{user?.email}</p>
        <p className="text-txtgray truncate">
          Balance : {`${user && (user.balanceTest / 10 ** 7).toFixed(3)} XLM`}
        </p>
      </div>

      <hr className="border-border2/50" />

      <button
        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-900"
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
