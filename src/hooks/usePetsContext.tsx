import { useContext } from 'react'
import { PetsContext } from '../context/petsContext'

export default function usePetsContext() {
  return useContext(PetsContext)
}
