import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Icon } from '@rocket.chat/fuselage';

import { RootAction } from '../../../store/actions';
import {
  SIDE_BAR_SERVER_SELECTED,
} from '../../actions';
import {
  Badge,
  SidebarActionButton,
  SidebarActionButtonLabel,
} from './styles';

type ServerButtonProps = {
  url: string;
  isSelected: boolean;
  userLoggedIn?: boolean;
  hasUnreadMessages: boolean;
  mentionCount?: number;
};


const ServerButton: FC<ServerButtonProps> = ({
  url,
  isSelected,
  mentionCount,
  userLoggedIn,
}) => {
  const dispatch = useDispatch<Dispatch<RootAction>>();
  const { t } = useTranslation();

  const handleServerClick = (): void => {
    dispatch({ type: SIDE_BAR_SERVER_SELECTED, payload: url });
  };
  console.log(999, isSelected)

  return (
    <SidebarActionButton
      isSelected={isSelected}
      onClick={handleServerClick}
    >
      <Icon name="balloon-ellipsis"/>
      {mentionCount && <Badge>{mentionCount}</Badge>}
      {!userLoggedIn && <Badge>!</Badge>}
      <SidebarActionButtonLabel>{t('sidebar.messages')}</SidebarActionButtonLabel>
    </SidebarActionButton>
  );
};

export default ServerButton;
