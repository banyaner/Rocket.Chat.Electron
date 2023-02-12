import { css } from '@emotion/react';
import styled from '@emotion/styled';

type WrapperProps = {
  sideBarStyle: {
    background?: string;
    color?: string;
  };
  isVisible: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  padding: 0 10px;
  flex: 0 0 108px;
  align-self: stretch;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  user-select: none;
  -webkit-app-region: drag;

  transition: margin-inline-start 230ms ease-in-out,
    visibility 230ms ease-in-out;

  ${({ sideBarStyle: { background } }) =>
    css`
      background: ${background ?? '#2f343d'};
    `}
  ${({ sideBarStyle: { color } }) =>
    css`
      color: ${color ?? '#ffffff'};
    `}
	${({ isVisible }) =>
    !isVisible &&
    css`
      margin-inline-start: -108px;
      visibility: hidden;
    `}
`;

type ContentProps = {
  withWindowButtons: boolean;
};

export const Content = styled.div<ContentProps>`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  padding-top: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  align-items: stretch;

  ${({ withWindowButtons }) =>
    withWindowButtons &&
    css`
      padding-top: 28px;
    `}
`;

export const Badge = styled.div`
  position: absolute;
  z-index: 1;
  top: 2px;
  right: 8px;
  display: block;
  min-width: 15px;
  text-align: center;
  color: #ffffff;
  border-radius: 20px;
  background-color: #e43325;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
  font-size: 10px;
  font-weight: bold;
  line-height: 15px;
`;

type SidebarActionButtonProps = {
  isSelected?: boolean;
  text?: string;
};

type SidebarActionButtonLabelProps = {
  text?: string;
};

export const SidebarActionButtonLabel = styled.span<SidebarActionButtonLabelProps>`
  padding-left: 4px;  
  font-size: 18px;
`;

export const SidebarActionButton = styled.div<SidebarActionButtonProps>`
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
  height: 40px;
  font-size: 24px;
  transition: opacity var(--transitions-duration);
  opacity: 0.6;
  color: inherit;
  background: rgba(0, 0, 0, 0);
  cursor: pointer;

  ${({ isSelected }) =>
    isSelected &&
    css`
      opacity: 1;
      color: #fff;
    `}

  &:hover {
    opacity: 1;
  }
`;

export const Button = styled.button`
  position: relative;
  height: 40px;
  border: none;
  padding: 0;
  margin-top: 14px;
  font-size: 2.5rem;
  line-height: 1.25;
  background: rgba(0, 0, 0, 0);
  color: inherit;
  font-family: inherit;
`;
