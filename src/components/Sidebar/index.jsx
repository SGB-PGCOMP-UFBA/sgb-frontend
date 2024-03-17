import PropTypes from 'prop-types'
import DesktopSidebar from './Desktop'
import MobileSidebar from './Mobile'

export default function Sidebar({ userType }) {
  return (
    <>
      <div className="sticky top-0 hidden md:block">
        <DesktopSidebar userType={userType} />
      </div>
      <div className="md:hidden">
        <MobileSidebar userType={userType} />
      </div>
    </>
  )
}

Sidebar.propTypes = {
  userType: PropTypes.string.isRequired
}
