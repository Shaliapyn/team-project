import {useSelector} from 'react-redux';

export function useAuth() {
    const {email, firstName, lastName, score, role} = useSelector(state => state.member);

    return {
        isAuth: !!email,
        email,
        firstName,
        lastName,
        score,
        role,
    };
}