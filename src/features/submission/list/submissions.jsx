import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import Titlebar from 'components/titlebar'
import SubmitTalkLink from 'features/talk/submitTalksLink'
import { List, ListItem } from 'components/list'
import Badge from 'components/badge'
import { useEvent } from 'data/event'
import { LoadingIndicator } from 'components/loader'
import { useSpeakerProposals } from 'data/proposal'

const Submissions = ({ eventId }) => {
  const navigate = useNavigate()
  const { data: event } = useEvent(eventId)
  const { data: proposals } = useSpeakerProposals(eventId)

  if (!event || !proposals) {
    return <LoadingIndicator />
  }

  return (
    <div>
      <Titlebar icon="fa fa-inbox" title={`My submissions to "${event.name}"`}>
        <SubmitTalkLink eventId={eventId} />
      </Titlebar>
      <div>
        <List
          array={proposals}
          noResult={<div>No submissions</div>}
          renderRow={({ talkId, title, status }) => (
            <ListItem
              key={talkId}
              title={title}
              info={<Badge>{status}</Badge>}
              onSelect={() => navigate(`/speaker/event/${eventId}/submissions/${talkId}`)}
            />
          )}
        />
      </div>
    </div>
  )
}

Submissions.propTypes = {
  eventId: PropTypes.string.isRequired,
}

export default Submissions
