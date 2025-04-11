/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';

import Modal from '@/components/Modal';
import Toast from '@/components/Toasts';
import CLabel from '@/components/Label';
import CInput from '@/components/Input';
import Button from '@/components/Button';
import CSwitch from '@/components/Switch';
import { AnimatedSelect } from '@/components/Select';

import { ISettings } from '@/types';

import { InformSettingApi } from '@/api/informSettingApi';

import { useAppSelector } from '@/hooks/useRedux';

import { FileAdd } from '@/assets';

const options = [
  { label: '1 Month', value: '1' },
  { label: '3 Month', value: '3' },
  { label: '5 Month', value: '5' },
];

interface ManageContractModalProps {
  isOpen: boolean;
  setIsOpen: (_: boolean) => void;
  onClose: () => void;
  settings: ISettings;
  id: string;
}

const ManageContractModal = ({
  isOpen,
  setIsOpen,
  onClose,
  settings,
  id,
}: ManageContractModalProps) => {
  const [settingDetails, setSettingDetails] = useState<ISettings>({
    plan: 1,
    limit: 0,
    autoExtend: false,
  });

  const token = useAppSelector((state) => state.user.token);

  useEffect(() => {
    if (isOpen) {
      setIsOpen(true);
      setSettingDetails(settings);
    }
  }, [isOpen, setIsOpen]);

  const handleSwitch = (value: boolean) => {
    setSettingDetails({ ...settingDetails, autoExtend: value });
  };

  const handleLimitOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettingDetails({ ...settingDetails, limit: Number(e.target.value) });
  };

  const handleIconClick = () => {
    setSettingDetails(settings);
    onClose();
  };

  const handleSelectValue = (value: string) => {
    setSettingDetails({ ...settingDetails, plan: Number(value) });
  };

  const handleSaveOnClick = async () => {
    const sendSettingDetails = InformSettingApi(settingDetails, token!, id);

    Toast({
      type: 'process',
      text: 'Saving Settings',
      promise: sendSettingDetails,
      successMessage: 'Save Settings Successfuly',
      errorMessage: 'Error Save Setting',
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      iconClick={handleIconClick}
      title="Manage Contract"
      icon={<FileAdd fill="#414651" />}
      width="600px"
    >
      <div className="space-y-4 p-2 rounded-xl">
        <div className="bg-white/20 border p-4 rounded-xl border-border flex items-center justify-between">
          <div>
            <CLabel label="Plan" noneMargin />
            <p className="text-xs text-gray-400 mt-1 ml-1">
              Choose your preferred duration
            </p>
          </div>
          <div className="w-[200px]">
            <AnimatedSelect
              defaultValue={settingDetails.plan.toString()}
              options={options}
              value={settingDetails.plan.toString()}
              onChange={handleSelectValue}
              placeholder="Choose an option"
            />
          </div>
        </div>

        <div className="bg-white/20 border p-4 rounded-xl border-border flex items-center justify-between">
          <div>
            <CLabel label="Limit Alert" noneMargin />
            <p className="text-xs text-gray-400 mt-1 ml-1 w-[80%]">
              Set the number of days before expiration to receive a warning.
            </p>
          </div>
          <div className="">
            <CInput
              placeholder="Enter number of days"
              border
              type="number"
              onChange={handleLimitOnChange}
              value={settingDetails.limit}
            />
          </div>
        </div>

        <div className=" bg-white/20 border p-4 rounded-xl border-border flex items-center justify-between">
          <div className="flex flex-col">
            <CLabel label="Auto Extend" noneMargin />
            <p className="text-xs text-gray-400 mt-1 ml-1">
              Automatically renews the contract
            </p>
          </div>
          <CSwitch
            onChange={handleSwitch}
            defaultChecked={settings.autoExtend}
          />
        </div>

        <div className="bg-white/20 border p-4 rounded-xl border-border flex items-center justify-between">
          <div>
            <CLabel label="Delete this contract" noneMargin />
            <p className="text-xs text-gray-400 mt-1 ml-1">
              Permanently delete this contract.
            </p>
          </div>
          <div>
            <Button
              rounded="xl"
              color="red"
              content="Delete"
              className="!w-[200px]"
            />
          </div>
        </div>

        <div className="flex space-x-4 w-full pt-4">
          <Button
            type="button"
            rounded="xl"
            color="discard"
            content="Discard Changes"
            className="w-[40%]"
            onClick={handleIconClick}
          />

          <Button
            type="submit"
            rounded="xl"
            color="blue"
            content="Save Changes"
            className="w-[60%]"
            onClick={handleSaveOnClick}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ManageContractModal;
