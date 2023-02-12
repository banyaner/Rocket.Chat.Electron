import { Icon } from '@rocket.chat/fuselage';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { RootAction } from '../../../store/actions';
import { RootState } from '../../../store/rootReducer';
import {
  SIDE_BAR_DOWNLOADS_BUTTON_CLICKED,
  SIDE_BAR_SETTINGS_BUTTON_CLICKED,
  SIDE_BAR_ADDRESS_BOOK_BUTTON_CLICKED,
  SIDE_BAR_ADD_NEW_SERVER_CLICKED,
} from '../../actions';
import { useServers } from '../hooks/useServers';
import ServerButton from './ServerButton';
import {
  Wrapper,
  Content,
  SidebarActionButton,
  SidebarActionButtonLabel,
} from './styles';
import { useSorting } from './useSorting';

export const SideBar: FC = () => {
  const servers = useServers();
  const style = useMemo(
    () => servers.find(({ selected }) => selected)?.style || {},
    [servers]
  );
  const {
    sortedServers,
  } = useSorting(servers);
  const dispatch = useDispatch<Dispatch<RootAction>>();
  const handelDownloadsButtonClicked = (): void => {
    dispatch({ type: SIDE_BAR_DOWNLOADS_BUTTON_CLICKED });
  };
  const handelSettingsButtonClicked = (): void => {
    dispatch({ type: SIDE_BAR_SETTINGS_BUTTON_CLICKED });
  };

  const handelAddressBookButtonClicked = (): void => {
    dispatch({ type: SIDE_BAR_ADDRESS_BOOK_BUTTON_CLICKED });
  };

  const handleAddServerButtonClicked = (): void => {
    dispatch({ type: SIDE_BAR_ADD_NEW_SERVER_CLICKED });
  };

  const { t } = useTranslation();

  const currentView = useSelector(({ currentView }: RootState) => currentView);

  return (
    <Wrapper sideBarStyle={style} isVisible={true}>
      <Content withWindowButtons={process.platform === 'darwin'}>
        {sortedServers.map((server) => (

          <ServerButton
            key={server.url}
            url={server.url}
            isSelected={typeof currentView === 'object'}
            hasUnreadMessages={!!server.badge}
            userLoggedIn={server.userLoggedIn}
            mentionCount={
              typeof server.badge === 'number' ? server.badge : undefined
            }
          />
        ))}
        <SidebarActionButton
          onClick={handelSettingsButtonClicked}
          isSelected={currentView === 'settings'}
        >
          <Icon name='cog' />
          <SidebarActionButtonLabel>{t('sidebar.settings')}</SidebarActionButtonLabel>
        </SidebarActionButton>
        <SidebarActionButton
          onClick={handelDownloadsButtonClicked}
          isSelected={currentView === 'downloads'}
        >
          <Icon name='brush' />
          <SidebarActionButtonLabel>{t('sidebar.downloads')}</SidebarActionButtonLabel>
        </SidebarActionButton>
        <SidebarActionButton
          onClick={handelAddressBookButtonClicked}
          isSelected={currentView === 'address-book'}
        >
          {/* todo: address-book需要将"@rocket.chat/fuselage": "0.31.1"升级到0.31.22，但升级后有报错，之后可以使用本地构建版本替换。 */}
          {/* <Icon name='address-book' /> */}
          <Icon name='members' />
          <SidebarActionButtonLabel>{t('sidebar.addressBook')}</SidebarActionButtonLabel>
        </SidebarActionButton>
        <SidebarActionButton
          onClick={handleAddServerButtonClicked}
          isSelected={currentView === 'add-new-server'}
        >
          {/* todo: 保留暂时用于测试 */}
          <Icon name='members' />
          <SidebarActionButtonLabel>{t('sidebar.addNewServer')}</SidebarActionButtonLabel>
        </SidebarActionButton>
      </Content>
    </Wrapper>
  );
};
