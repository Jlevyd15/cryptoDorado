import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBLQBKdf5aTXZKVDE5uATzwGauImPPtV8c",
    authDomain: "cryptodorado-f81b5.firebaseapp.com",
    databaseURL: "https://cryptodorado-f81b5.firebaseio.com",
    projectId: "cryptodorado-f81b5",
    storageBucket: "cryptodorado-f81b5.appspot.com",
    messagingSenderId: "984477278781"
  };
export const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database();
export const auth = firebaseApp.auth();
export const storageKey = 'USER_UID';

export const isAuthenticated = () => {
  return !!auth.currentUser || !!localStorage.getItem(storageKey);
}

export const isUserLoggedIn = () => {
	auth.onAuthStateChanged(user => {
		console.log('user', user.uid)
	  	if (user) {
			return user.uid
		} else {
			return false
		}
	});
}

export const getLoggedInUserRef = () => {
	if (isUserLoggedIn) {
		console.log('authed', isUserLoggedIn())
		const rootRef = db.ref();
	    const uid = localStorage.getItem(storageKey)
	    return rootRef.child("users/" + uid);
	} else {
		console.log('not authed')
		return null
	}
}

// @params: 
// 		childObj: String, 
// 		data: {...},
// 		useKey: String
// @return Promise

// takes an object and will write that data object to the firebase db 
// under /users with the uid of the current user
// use key will add a unique key as a parent object around the data you pass in
export const writeUserData = (childObj, data, useKey) => {
	console.log('currentUser ', auth.currentUser)
	if (auth.currentUser) {
		const rootRef = db.ref();
	    const uid = localStorage.getItem(storageKey)
	    const userRef = rootRef.child("users/" + uid);
	    // const newWalletKey = userRef.child(childObj).push().key
	    // userRef.child(childObj).update(data);
	    if (useKey) {
		    const newWalletKey = userRef.child(childObj).push().key
		    const updates = {}
		    updates[`/users/${uid}/${childObj}/${newWalletKey}`] = data
		    rootRef.update(updates)
		    .then(() => console.log('data updated'))
		    .catch(e => console.log('An error occurred', e.message))
		} else {
			const newWalletKey = userRef.child(childObj)
		    const updates = {}
		    updates[`/users/${uid}/${childObj}`] = data
		    rootRef.update(updates)
		    .then(() => console.log('data updated'))
		    .catch(e => console.log('An error occurred', e.message))
		}
	}
}

// remove data at the specified location

// pass a string like (/walletData/walletkey)
export const removeUserData = location => {
	console.log('currentUser ', auth.currentUser)
	if (auth.currentUser) {
		const rootRef = db.ref();
	    const uid = localStorage.getItem(storageKey)
	    const removeLocationRef = rootRef.child(`/users/${uid}/${location}`)
	    removeLocationRef.remove()
	    .then(() => console.log('data removed'))
	    .catch(e => console.log('An error occurred', e.message))
	}
}