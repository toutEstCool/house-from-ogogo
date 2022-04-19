import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyD9Wor5hEKiGnjV-n3HUzZMdb0qxj9mQ6k',
	authDomain: 'house-market-969f8.firebaseapp.com',
	projectId: 'house-market-969f8',
	storageBucket: 'house-market-969f8.appspot.com',
	messagingSenderId: '1037307684339',
	appId: '1:1037307684339:web:e43f7b2b988c336355de86',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore()
