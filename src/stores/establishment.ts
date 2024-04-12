import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/services/axios'
import EstablishmentData from '@/types/interfaces/establishment'

export const useEstablishment = defineStore('establishment', () => {
  const records = ref<EstablishmentData>()

  async function fetchEstablishment() {
    try {
      const { data } = await api.get('src/mock/records.json')
      records.value = data
      return true
    } catch {
      return false
    }
  }

  async function addTransaction(
    type: 'boleto' | 'pix' | 'cartão',
    value: number,
    id: number,
    origin: string
  ) {
    const establishment = records.value?.establishments.find((est: any) => est.id === id)

    establishment?.transactions.push({
      type,
      received: {
        origin,
        destiny: establishment.name,
        amount: value
      },
      sent: {
        origin: null,
        destiny: null,
        amount: null
      }
    })

    return 'Transação efetuada com sucesso!'
  }

  async function addEstablishment(name: string, color: string) {
    const fakeID = Math.random()

    records.value?.establishments.push({
      name,
      color,
      id: fakeID,
      transactions: [
        {
          type: null,
          received: {
            amount: null,
            origin: null,
            destiny: null
          },
          sent: {
            amount: null,
            origin: null,
            destiny: null
          }
        }
      ]
    })
    return 'Cadastro concluído!'
  }

  return {
    data: records,
    fetchEstablishment,
    addTransaction,
    addEstablishment
  }
})
