import React, { memo } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { useCurrentEventId } from 'features/event/currentEventContext'
import Brand from './brand'
import Navbar from './navbar'
import { NotificationProvider } from './notification/context'

import './layout.css'

const AppLayout = ({ children, sidebar }) => {
  const eventId = useCurrentEventId()

  return (
    <div className={cn('layout-screen', { 'layout-screen-full-width': !sidebar })}>
      <NotificationProvider className="layout-notification">
        <Brand className="layout-brand" sidebar={sidebar} />
        <Navbar eventId={eventId} className="layout-navbar" />
        {sidebar && <div className="layout-sidebar">{sidebar}</div>}
        <main className="layout-main">{children}</main>
      </NotificationProvider>
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  sidebar: PropTypes.node,
}

AppLayout.defaultProps = {
  sidebar: null,
}

export default memo(AppLayout)
