import React, {
  FC,
  // useCallback,
  // useEffect,
  // useState,
  // useMemo,
  // FormEvent,
  // ChangeEvent,
} from 'react';
import { useSelector } from 'react-redux';
// import { Dispatch } from 'redux';
// import { RootAction } from '../../../store/actions';
import { RootState } from '../../../store/rootReducer'
import { Wrapper } from './styles';


export const AddressBookView: FC = () => {
  const isVisible = useSelector(
    ({ currentView }: RootState) => currentView === 'address-book'
  );

  if (!isVisible) {
    return null;
  }

  return (
    <Wrapper>
      <div>我是通讯录</div>
    </Wrapper>
  );
};
