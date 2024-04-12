interface Transaction {
  type: 'boleto' | 'pix' | 'cartão' | null
  received: {
    amount: number | null
    origin: string | null
    destiny: string | null
  }
  sent: {
    amount: number | null
    origin: string | null
    destiny: string | null
  }
}

interface Establishment {
  name: string
  color: string
  id: number
  transactions: Transaction[]
}

interface EstablishmentData {
  establishments: Establishment[]
  total_balance: number
}

export default EstablishmentData
