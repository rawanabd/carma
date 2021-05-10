import React, {useContext} from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import clsx from 'clsx';
import UserInfo from '../../../../shared/components/UserInfo';
import Navigation from '../../Navigation/VerticleNav';
import {toggleNavCollapsed} from '../../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import Box from '@material-ui/core/Box';
import AppContext from '../../../utility/AppContext';
import useStyles from './AppSidebar.style';
import {ThemeStyle} from '../../../../shared/constants/AppEnums';
import Scrollbar from '../../Scrollbar';
import AppContextPropsType from '../../../../types/AppContextPropsType';
import {AppState} from '../../../../redux/store';

interface AppSidebarProps {
  variant?: string;
  position?: 'left' | 'bottom' | 'right' | 'top';
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  position = 'left',
  variant = '',
}) => {
  const {themeStyle, themeMode} = useContext<AppContextPropsType>(AppContext);

  const dispatch = useDispatch();
  const {navCollapsed} = useSelector<AppState, AppState['settings']>(
    ({settings}) => settings,
  );

  const handleToggleDrawer = () => {
    dispatch(toggleNavCollapsed());
  };

  const classes = useStyles({themeStyle, themeMode});
  let sidebarClasses = classes.sidebarModern;
  if (themeStyle === ThemeStyle.STANDARD) {
    sidebarClasses = classes.sidebarStandard;
  }

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor={position}
          open={navCollapsed}
          onClose={() => handleToggleDrawer()}
          classes={{
            paper: clsx(variant),
          }}
          style={{position: 'absolute'}}>
          <Box height='100%' className={classes.drawerContainer}>
            <Box
              height='100%'
              width='100%'
              color='primary.contrastText'
              className={classes.sidebarBg}>
              <UserInfo />
              <Scrollbar className={classes.drawerScrollAppSidebar}>
                <Navigation />
              </Scrollbar>
            </Box>
          </Box>
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Box height='100%' className={classes.container}>
          <Box className={clsx(classes.sidebarBg, sidebarClasses)}>
            <UserInfo />
            <Scrollbar
              className={clsx(classes.scrollAppSidebar, 'scrollAppSidebar')}>
              <Navigation />
            </Scrollbar>
          </Box>
        </Box>
      </Hidden>
    </>
  );
};

export default AppSidebar;
