import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import style from 'assets/scss/profile.module.scss'
import AvatarForm from 'features/AvatarForm'
import { db } from 'firebase-client'

import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore'

const Profile = () => {
  const member = useSelector((state) => state.member.member)

  useEffect(() => {
    const eventsCollection = query(collection(db, 'events'))
    const unsubscribe = onSnapshot(eventsCollection, (querySnapshotEvents) => {
      querySnapshotEvents.forEach(async (event) => {
        const eventData = event.data()
        const participantVisitedQuery = query(collection(event.ref, 'participants'), where('visitedEvent', '==', true))
        const participantVisited = await getDocs(participantVisitedQuery)

        participantVisited.docs.forEach(async (participant) => {
          const userId = participant.id
          const membersQuery = doc(db, 'members', userId)
          const member = await getDoc(membersQuery)
          const memberData = member.data()

          const initialScore = eventData.score + memberData.initialScore
          console.log(initialScore)
        })
      })
    })

    return unsubscribe
  }, [])

  return (
    <div className={style.profile__container}>
      <div className={style.profile__content}>
        <div className={style.profile__box__avatar__text}>
          <div className={style.profile__avatar}>
            <AvatarForm />
          </div>
          <div style={{ marginTop: '40px' }}>
            <p>First Name: {member.firstName} </p>
            <p>Last Name: {member.lastName} </p>
            <p>Score: {member.score}</p>
            <p>Place in the ranking</p>
          </div>
        </div>
        <div className={style.profile__btn__change__pass}>
          <button type="button" className={`btn btn-primary w-auto`}>
            Change password
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
