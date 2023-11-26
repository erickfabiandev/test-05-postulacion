import { doc, onSnapshot } from 'firebase/firestore'
import { db } from './config'
import { AppDispatch } from '@/redux/store'
import { setFirebaseData } from '@/redux/features/firebaseSlice'

export const fetchFirebaseData = (dispatch: AppDispatch) => {
  const collection = 'rates'
  const docId = 'awaOMswZ8JGxjmHCpVZ4'
  try {
    const docRef = doc(db, collection, docId)
    const unsub = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const { purchase_price, sale_price } = snapshot.data();
        dispatch(setFirebaseData({
          purchase_price,
          sale_price
        }))
      }
      else {
        console.log('El documento no existe.');
      }
    })

    return unsub
  } catch (error) {
    console.log(error)
  }
}


