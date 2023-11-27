"use client"
import CurrencyContainer from '@/components/CurrencyContainer'
import styles from '../styles/pages/index.module.scss'
import { useEffect } from 'react'
import { useAppDispatch } from '@/redux/hook'
import { fetchFirebaseData } from '@/firebase/firebaseService'

export default function Home() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    fetchFirebaseData(dispatch)
  }, [dispatch])

  return (
    <main className={styles.main}>
      <section className={styles.title}>
        <h2>
          <span>El mejor</span>
          <span>tipo de cambio</span>
        </h2>
        <p>
          para cambiar dólares y soles online en Perú
        </p>
      </section>
      <CurrencyContainer />
    </main>
  )
}
