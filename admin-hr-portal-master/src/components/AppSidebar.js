import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import store from './../store.js'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import logoNegative from 'src/assets/images/adfca_logo.png'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const [toggle, setToggle] = useState(false)

  return (
    <CSidebar
      position="fixed"
      unfoldable={toggle}
      visible={true}
    // onVisibleChange={(visible) => {
    //   dispatch({ type: 'set', value: visible })
    // }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} /> */}
        {/* <img src={logoNegative} alt="AbuDhabi Family Care Authority" height={50} /> */}
        {/* <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => setToggle(!toggle)}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
