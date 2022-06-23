import { useSelector } from 'react-redux'

import style from 'assets/scss/profile.module.scss'
import AvatarForm from 'features/AvatarForm'
import { memberState } from 'store/slices/membersSlice'

const Profile = () => {
  const currentMember = useSelector((state) => state.member.member)
  const members = useSelector(memberState)
  let ratingList = []

  members &&
    members.map((member) => {
      ratingList.push(member.score)
    })

  ratingList.sort((a, b) => b - a)
  const nth = (n) => ['st', 'nd', 'rd'][((((n + 90) % 100) - 10) % 10) - 1] || 'th'
  const ratingPlace = ratingList.indexOf(currentMember.score) + 1
  const suffixRatingPlace = nth(ratingPlace)

  return (
    <div className={style.container}>
      <div className="card shadow mb-4 ">
        <div className="card-header py-3 ">
          <h2 className={`m-0 font-weight-bold text-primary  text ${style.textResponsive}`}>Profile</h2>
        </div>
        <div className="card-body px-5  overflow-auto">
          <div className={style.profile__container}>
            <div className={style.profile__box__avatar__text}>
              <div className={style.profile__avatar}>
                <AvatarForm />
              </div>
              <div style={{ marginTop: '40px' }}>
                <p>
                  First Name: <b>{currentMember.firstName}</b>
                </p>
                <p>
                  Last Name: <b>{currentMember.lastName}</b>
                </p>
                <p>
                  Score: <b>{currentMember.score}</b>
                </p>
                <p>
                  Place in the rating:{' '}
                  <b>
                    {ratingPlace}
                    <sup>{suffixRatingPlace}</sup> out of {ratingList.length}
                  </b>
                </p>
              </div>
            </div>
            <div className={style.profile__btn__change__pass}>
              <button type="button" className={`btn btn-primary w-auto`}>
                Change password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
