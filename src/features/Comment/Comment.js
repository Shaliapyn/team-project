import React, {useState, useRef} from 'react';

import { eventsCollection } from '../../firebase-client';
import { updateDoc, doc } from 'firebase/firestore';

import { CancelSvg, CommentSvg, DeleteSvg, EditSvg, SaveSvg, VisibilityOffSvg } from '../../assets/svg/svg-icons';
import styles from '../../assets/scss/comment.module.scss';

const Comment = ({ participant, currentEvent }) => {
    let isComment = participant.comment.trim().length !== 0;
    const event = currentEvent.currentEvent;
    const [isActiveComment, setIsActiveComment]  = useState(false);
    const [isBeingUpdated, setIsBeingUpdated] = useState(false);
    const ref = useRef(null);
    const refUpdated = useRef(null);

    const updateComment = async (message) => {
        const docRef = doc(eventsCollection, event.id, 'participants', participant.id);
        
        await updateDoc(docRef, {
          comment: message
        });
    }
    
    const EmptyComment = () => {
        let handlerEmptyComment;

        const saveComment = () => {
            setIsActiveComment(false);
            updateComment(ref.current.value);
        }

        const cancelComment = () => {
            setIsActiveComment(false);
        }

        if (isActiveComment) {
            handlerEmptyComment = 
                <>
                    <textarea 
                        autoFocus
                        className={styles.textarea} 
                        placeholder='Write your comment here' 
                        ref={ref}
                        rows="3"> 
                    </textarea>
                    
                    <div className="input-group" style={{justifyContent: 'end'}} >
                        <button 
                            className={styles.button} 
                            type="button" 
                            onClick={saveComment}
                        >
                            <SaveSvg />
                        </button>
                        <button 
                            className={styles.button} 
                            type="button" 
                            onClick={cancelComment}
                        >
                            <CancelSvg />
                        </button>
                    </div>
                </>
        } else {
            handlerEmptyComment = <button 
                                type="button" 
                                className={`btn btn-primary btn-sm  btn-block`}
                                onClick={() => setIsActiveComment(!isActiveComment)}
                                >
                                Comment
                            </button>
        }
    return handlerEmptyComment
    }
    
    const FilledComment = () => {
        let handlerFilledComment;

        const deleteComment = () => {
            setIsActiveComment(!isActiveComment);
            updateComment('');
        }

        const editComment = () => {
            setIsBeingUpdated(!isBeingUpdated);
        }

        const saveComment = () => {
            setIsActiveComment(false);
            updateComment(refUpdated.current.value);
            setIsBeingUpdated(!isBeingUpdated);
        }

        const cancelComment = () => {
            setIsActiveComment(false);
            setIsBeingUpdated(!isBeingUpdated);
        }

        if (isActiveComment) {
            handlerFilledComment = 
                <>
                    <div className='mb-3'>{isBeingUpdated ? (
                        <textarea 
                            autoFocus
                            className={styles.textarea} 
                            ref={refUpdated}
                            defaultValue={participant.comment}
                            rows="3"> 
                        </textarea>) : 
                        ( participant.comment )} 
                    </div>                               
                    <div className="input-group" style={{justifyContent: 'end'}} >
                        {!isBeingUpdated ? (
                            <button 
                            className={styles.button} 
                            type="button" 
                            onClick={() => setIsActiveComment(!isActiveComment)}
                        >
                            <VisibilityOffSvg />
                        </button>
                        ) : null}
                        {isBeingUpdated ? (
                            <button 
                                className={styles.button} 
                                type="button" 
                                onClick={saveComment}
                            >
                                <SaveSvg />
                            </button>
                        ) : 
                            (<button 
                                className={styles.button} 
                                type="button" 
                                onClick={editComment}
                            >
                                <EditSvg />
                            </button>)}
                        {isBeingUpdated ? (
                           <button 
                                className={styles.button} 
                                type="button" 
                                onClick={cancelComment}
                            >
                                <CancelSvg />
                            </button> 
                        ) : (
                            <button 
                                className={styles.button} 
                                type="button" 
                                onClick={deleteComment}
                            >
                                <DeleteSvg />
                            </button>
                        )}
                    </div>
                </>
        } else {
            handlerFilledComment = 
                <button 
                    className={styles.button}
                    onClick={() => setIsActiveComment(!isActiveComment)}>
                    <CommentSvg />
                </button>
        }
    return handlerFilledComment
    }

  return (
    <>
      {isComment ? <FilledComment /> : <EmptyComment /> }
    </>
  )
}

export default Comment