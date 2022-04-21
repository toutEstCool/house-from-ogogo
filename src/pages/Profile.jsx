import { getAuth, updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../firebase.config.js'
import { useState } from 'react'
import { toast } from 'react-toastify'
import homeIcon from '../assets/svg/homeIcon.svg'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'

const Profile = () => {
	const auth = getAuth()
	const navigate = useNavigate()
	const [changeDetails, setChangeDetails] = useState(false)
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	})
	const { name, email } = formData

	const onLogout = () => {
		auth.signOut()
		navigate('/')
	}

	const onChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.id]: e.target.value,
		}))
	}

	const onSubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				await updateProfile(auth.currentUser, {
					displayName: name,
				})
			}
			const userRef = doc(db, 'users', auth.currentUser.uid)
			await updateDoc(userRef, {
				name,
				email,
			})
		} catch (error) {
			toast.error('Error 404')
		}
	}

	return (
		<div className='profile'>
			<header className='profileHeader'>
				<p className='pageHeader'>My Profile</p>
				<button className='logOut' onClick={onLogout}>
					Logout
				</button>
			</header>
			<main>
				<div className='profileDetailsHeader'>
					<p className='profileDetailsText'>Personal Details</p>
					<p
						className='changePersonalDetails'
						onClick={() => {
							changeDetails && onSubmit()
							setChangeDetails(prevState => !prevState)
						}}
					>
						{changeDetails ? 'done' : 'change'}
					</p>
				</div>
				<div className='profileCard'>
					<form>
						<input
							onChange={onChange}
							value={name}
							disabled={!changeDetails}
							id='name'
							type='text'
							className={!changeDetails ? 'profileName' : 'profileNameActive'}
						/>
						<input
							onChange={onChange}
							value={email}
							disabled={!changeDetails}
							id='email'
							type='text'
							className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
						/>
					</form>
				</div>
				<Link to='/create-listing' className='createListing'>
					<img src={homeIcon} alt='homeIcon' />
					<p>Sell or rent your home</p>
					<img src={arrowRight} alt='arrowRight' />
				</Link>
			</main>
		</div>
	)
}

export default Profile
