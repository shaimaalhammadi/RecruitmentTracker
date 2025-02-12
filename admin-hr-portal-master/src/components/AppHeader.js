import React, { useState } from 'react'
import store from 'src/store'
import { CContainer, CHeader, CHeaderBrand, CHeaderNav, CNavLink, CNavItem } from '@coreui/react'
import { getNavbarTitle } from 'src/common/sharedFunc'
import { AppHeaderDropdown } from './header/index'
import logoNegative from 'src/assets/images/LOGO-crop.svg'
// import { logo } from 'src/assets/brand/logo'

const AppHeader = () => {
  const [toggle, setToggle] = useState(false)
  const state = store.getState()

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        {/* <CHeaderToggler
          className="ps-1"
          onClick={() => setToggle(!toggle)}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler> */}
        <CHeaderNav>
          {/* <CIcon icon={logo} height={48} alt="Logo" /> */}
          {/* <img src={logoNegative} alt="AbuDhabi Family Care Authority" height={50} /> */}
          <CNavItem>
            <img src={logoNegative} alt="AbuDhabi Family Care Authority" height={55} />
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="d-none d-md-flex m-auto">

          <CNavItem className="linkBorder">
            <CNavLink>{getNavbarTitle(state.userData?.title)}</CNavLink>
          </CNavItem>
          {/* <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem> */}
        </CHeaderNav>
        <CHeaderNav>
          {/* <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem> */}
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      {/* <CHeaderDivider /> */}
      {/* <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
    </CHeader>
  )
}

export default AppHeader
