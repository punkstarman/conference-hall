import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import Avatar from 'components/avatar'
import Button from 'components/button'
import { ConfirmationPopin } from 'components/portals'

import styles from './message.module.css'

const Message = ({
  id,
  photoURL,
  name,
  message,
  createdAt,
  className,
  modified,
  allowEdit,
  onSave,
  onDelete,
}) => {
  const [inputMessageValue, setInputMessageValue] = useState(message)

  const [editable, setEditable] = useState(false)

  const onChange = (event) => {
    setInputMessageValue(event.target.value)
  }

  const onCancel = () => {
    setInputMessageValue(message)
    setEditable(!editable)
  }

  const handleSave = () => {
    onSave({ message: inputMessageValue, id })
    setEditable(!editable)
  }

  const handleKey = (event) => {
    if (event.keyCode === 13) {
      handleSave()
    }
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  const DeleteMessage = () => (
    <ConfirmationPopin
      title="Delete a message"
      content={
        <>
          Are you sure you want to delete this message ? This cannot be undone.
          <Message
            id={id}
            photoURL={photoURL}
            name={name}
            message={message}
            createdAt={createdAt}
            modified={modified}
            className={styles.previewMessageDelete}
          />
        </>
      }
      className="remove-member-modal"
      onOk={() => onDelete(id)}
      withCancel
      renderTrigger={({ show }) => (
        <i role="button" className={cn('fa fa-trash', styles.trash)} onClick={show} />
      )}
    />
  )

  return (
    <div className={cn(styles.wrapper, className)}>
      <Avatar src={photoURL} name={name} size="medium" className={styles.avatar} />
      <div className={styles.messageContent}>
        <div className={styles.message}>
          <span className={styles.name}>{name}</span>
          <span className={styles.date}>{formatDistanceToNow(createdAt, { addSuffix: true })}</span>
          <span className={styles.modified}>{modified && '(modified)'}</span>
          {allowEdit && (
            <i
              role="button"
              className={cn('fa fa-pencil', styles.edit)}
              onClick={() => setEditable(!editable)}
            />
          )}
          {allowEdit && <DeleteMessage />}
        </div>
        {!editable && <div className={styles.message}>{message}</div>}
        {editable && (
          <div className={styles.editInput}>
            <input
              type="text"
              name="message"
              value={inputMessageValue}
              onChange={onChange}
              onKeyUp={handleKey}
            />
            <Button secondary onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        )}
      </div>
    </div>
  )
}

Message.propTypes = {
  id: PropTypes.number.isRequired,
  photoURL: PropTypes.string,
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  modified: PropTypes.bool,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  allowEdit: PropTypes.bool,
  className: PropTypes.string,
}

Message.defaultProps = {
  photoURL: undefined,
  className: undefined,
  modified: false,
  onSave: undefined,
  onDelete: undefined,
  allowEdit: false,
}

export default Message
