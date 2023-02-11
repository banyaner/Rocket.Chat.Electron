import React, { useLayoutEffect, FC } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../store/rootReducer';
import { AboutDialog } from '../AboutDialog';
import { AddServerView } from '../AddServerView';
import DownloadsManagerView from '../DownloadsManagerView';
import { ScreenSharingDialog } from '../ScreenSharingDialog';
import { SelectClientCertificateDialog } from '../SelectClientCertificateDialog';
import { ServersView } from '../ServersView';
import { SettingsView } from '../SettingsView';
import { SideBar } from '../SideBar';
import { UpdateDialog } from '../UpdateDialog';
import { GlobalStyles, Wrapper, WindowDragBar, ViewsWrapper } from './styles';

export const Shell: FC = () => {
  const appPath = useSelector(({ appPath }: RootState) => appPath);
  // 添加构建产物里的css样式到容器
  useLayoutEffect(() => {
    if (!appPath) {
      return undefined;
    }

    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = `${appPath}/app/icons/rocketchat.css`; // 里面是字体文件
    document.head.append(linkElement);

    return () => {
      linkElement.remove();
    };
  }, [appPath]);

  return (
    <>
      <GlobalStyles />
      {process.platform === 'darwin' && <WindowDragBar />}
      <Wrapper>
        <SideBar />
        <ViewsWrapper>
          <ServersView />
          <AddServerView />
          <DownloadsManagerView />
          <SettingsView />
        </ViewsWrapper>
      </Wrapper>
      <AboutDialog />
      <ScreenSharingDialog />
      <SelectClientCertificateDialog />
      <UpdateDialog />
    </>
  );
};
