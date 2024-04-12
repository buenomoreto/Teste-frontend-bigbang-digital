<script setup lang="ts">
import { ref, onBeforeUpdate } from 'vue'
import { Bars4Icon } from '@heroicons/vue/24/outline'
import { toast } from 'vue3-toastify'
import { useEstablishment } from '@/stores/establishment'
import { useCurrencyFormatter } from '@/composables/useCurrencyFormatter'
import CommonButton from '@/components/common/CommonButton.vue'
import CommonCard from '@/components/common/CommonCard.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import CommonProgressBar from '@/components/common/CommonProgressBar.vue'

const showModalTransaction = ref(false)
const showModalEstablishment = ref(false)
const totalIncome = ref({ totalReceived: 0, totalSent: 0 })
const payload = ref()
const income = [
  { name: 'Conta PJ', value: 39000 },
  { name: 'Recebimentos', value: 76500 },
  { name: 'lucros', value: 15000 }
]

const { addTransaction, addEstablishment } = useEstablishment()
const records = useEstablishment()

async function handleTransaction() {
  if (
    !payload.value ||
    !payload.value.type ||
    !payload.value.value ||
    !payload.value.establishment
  ) {
    toast.warning('Por favor, preencha todos os campos antes de prosseguir.', {
      position: toast.POSITION.BOTTOM_RIGHT
    })
    return
  }

  await addTransaction(
    payload.value.type,
    parseInt(payload.value.value),
    parseInt(payload.value.establishment),
    'BigBang'
  ).then((data: any) => {
    toast.success(data, {
      position: toast.POSITION.BOTTOM_RIGHT
    })
    totalIncome.value = calculateTransactions(records.data)
    showModalTransaction.value = false
  })
}

async function handleEstablishment() {
  if (!payload.value || !payload.value.name || !payload.value.color) {
    toast.warning('Por favor, preencha todos os campos antes de prosseguir.', {
      position: toast.POSITION.BOTTOM_RIGHT
    })
    return
  }

  await addEstablishment(payload.value.name, payload.value.color).then((data: any) => {
    toast.success(data, {
      position: toast.POSITION.BOTTOM_RIGHT
    })
    showModalEstablishment.value = false
  })
}

function handleData(event: any, data: string) {
  payload.value = { ...payload.value, [data]: event.target.value }
}

function calculateTransactions(data: any) {
  let totalReceived = 0
  let totalSent = 0

  data?.establishments.forEach((establishment: any) => {
    establishment.transactions.forEach((transaction: any) => {
      if (transaction.received.destiny === 'BigBang') {
        totalReceived += transaction.received.amount
      }
      if (transaction.sent?.destiny === 'BigBang') {
        totalReceived += transaction.sent.amount
      }
      if (transaction.sent?.origin === 'BigBang') {
        totalSent += transaction.sent.amount
      }
      if (transaction.received.origin === 'BigBang') {
        totalSent += transaction.received.amount
      }
    })
  })

  return {
    totalReceived,
    totalSent
  }
}

onBeforeUpdate(() => {
  totalIncome.value = calculateTransactions(records.data)
})
</script>
<template>
  <div class="container mx-auto sm:pt-28 pt-9 px-3 sm:px-0">
    <!-- Conteúdo sobre o saldo  -->
    <div class="flex justify-center sm:justify-between items-end mb-10 flex-wrap">
      <div
        class="text-white font-medium sm:mb-0 mb-5"
        v-motion-slide-visible-once-left
        :delay="500"
      >
        <span class="text-xl">Saldo total</span>
        <div class="sm:text-4xl text-3xl flex gap-x-4" v-if="records.data">
          {{ useCurrencyFormatter(records.data.total_balance).value }}
          <span class="flex font-normal text-sm gap-x-2 items-center">
            <img width="24" height="24" src="@/assets/img/icons/share.svg" alt="" /> rendendo 124%
          </span>
        </div>
      </div>
      <div
        class="max-w-96 w-full flex gap-x-3 sm:justify-end justify-center"
        v-motion-slide-visible-once-right
        :delay="500"
      >
        <CommonButton
          @click="showModalTransaction = true"
          class="flex justify-start gap-x-11 items-center sm:max-w-64 w-full"
        >
          <img width="22" height="22" src="@/assets/img/icons/send-2.svg" alt="Enviar dinheiro" />
          Enviar dinheiro
        </CommonButton>
        <CommonButton
          @click="showModalEstablishment = true"
          class="flex justify-start gap-x-11 items-center max-w-14 w-full"
        >
          <img width="22" height="22" src="@/assets/img/icons/add.svg" alt="Adicionar" />
        </CommonButton>
      </div>
    </div>

    <!-- Conteúdo Painel de estatísticas  -->
    <div class="mb-11" v-motion-slide-visible-once-bottom :delay="500">
      <div class="flex gap-x-3 items-end mb-5 justify-center sm:justify-normal">
        <img src="@/assets/img/icons/bubble.svg" alt="Painel de estatísticas" />
        <span class="font-medium text-xl text-white">Painel de estatísticas</span>
        <span class="font-medium text-sm text-[#A3A3A3]">últimos 7 dias</span>
      </div>

      <div class="flex justify-center sm:justify-between flex-wrap gap-y-5 sm:gap-y-0">
        <CommonCard v-for="item in income" :key="item.name">
          <template #title>
            <div class="font-medium text-sm">{{ item.name }}</div>
          </template>
          <template #price>
            <div class="font-medium text-2xl">{{ useCurrencyFormatter(item.value).value }}</div>
          </template>
          <template #action>
            <div class="flex w-full gap-x-3">
              <CommonButton
                class="!text-[#686868] bg-white border-[#747474] border hover:bg-white hover:border-[#473eed] hover:!text-[#473eed] w-full"
              >
                Ver mais detalhes
              </CommonButton>
              <CommonButton
                class="group bg-white border-[#747474] border text-[#686868] hover:bg-white hover:border-[#473eed] group-hover:text-[#473eed] w-full max-w-12 !p-0 justify-center items-center flex"
              >
                <Bars4Icon class="w-5 h-5 text-[#747474] group-hover:text-[#473eed]" />
              </CommonButton>
            </div>
          </template>
        </CommonCard>
      </div>
    </div>

    <!-- Conteúdo Transações recentes & Análise geral  -->
    <div class="flex items-start justify-between mb-10 flex-wrap gap-y-10 sm:gap-y-0">
      <div class="max-w-[480px] w-full" v-motion-slide-visible-once-bottom :delay="500">
        <div class="flex items-end mb-7 justify-between">
          <div class="flex gap-x-3 items-end">
            <img src="@/assets/img/icons/box-2.svg" alt="Transações recentes" />
            <span class="font-medium sm:text-xl text-base text-[#202027]">Transações recentes</span>
            <span class="font-medium text-sm text-[#A3A3A3]">últimos 7 dias</span>
          </div>
          <router-link class="text-sm text-[#7986FE] hover:underline" to="/">
            Ver tudo
          </router-link>
        </div>
        <template v-if="records.data">
          <div
            class="px-2 py-3 font-medium text-sm text-black flex items-center justify-between border-b border-[#B3B3B3]"
            :class="[
              { 'border-t': index === 0 },
              {
                hidden:
                  item.transactions[0].sent.amount == 0 || item.transactions[0]?.sent.amount == null
              }
            ]"
            v-for="(item, index) in records.data.establishments"
            :key="item.name"
          >
            <span class="flex gap-x-2 items-center">
              <div
                class="w-[31px] h-[31px] flex items-center justify-center"
                :style="{ background: item.color }"
              >
                <img src="@/assets/img/icons/shop.svg" alt="" />
              </div>
              {{ item.name }}
            </span>
            <span v-if="item.transactions[0].sent.amount">
              {{ useCurrencyFormatter(item.transactions[0].sent.amount).value }}
            </span>
          </div>
        </template>
      </div>
      <div class="max-w-[480px] w-full" v-motion-slide-visible-once-bottom :delay="500">
        <div class="flex items-end justify-between mb-4 border-b border-[#B3B3B3] pb-7">
          <div class="flex gap-x-3 items-end">
            <img src="@/assets/img/icons/story.svg" alt="Análise geral" />
            <span class="font-medium sm:text-xl text-base text-[#202027]">Análise geral</span>
            <span class="font-medium text-sm text-[#A3A3A3]">últimos 7 dias</span>
          </div>
          <router-link class="text-sm text-[#7986FE] hover:underline" to="/">
            Ver tudo
          </router-link>
        </div>
        <div class="flex justify-between items-end mb-4 border-b border-[#B3B3B3] pb-4 px-4">
          <div class="font-medium text-sm text-[#000]" v-if="totalIncome">
            Ganhos
            <span class="font-medium text-xl flex">{{
              useCurrencyFormatter(totalIncome.totalReceived).value
            }}</span>
          </div>
          <div class="font-medium text-sm text-[#000]" v-if="totalIncome">
            Saídas
            <span class="font-medium text-xl flex">{{
              useCurrencyFormatter(totalIncome.totalSent).value
            }}</span>
          </div>
        </div>
        <div class="flex flex-col gap-y-3">
          <div class="font-medium text-sm">
            <div class="flex items-center justify-between mb-2">
              <div class="flex gap-3">
                <img src="@/assets/img/icons/bag.svg" alt="Compras" width="17" height="17" />
                Compras
              </div>
              <div>62%</div>
            </div>
            <CommonProgressBar color="#FF9999" :value="62" />
          </div>
          <div class="font-medium text-sm">
            <div class="flex items-center justify-between mb-2">
              <div class="flex gap-3">
                <img src="@/assets/img/icons/barcode.svg" alt="Boletos" width="17" height="17" />
                Boletos
              </div>
              <div>14%</div>
            </div>
            <CommonProgressBar color="#A799FF" :value="14" />
          </div>
          <div class="font-medium text-sm">
            <div class="flex items-center justify-between mb-2">
              <div class="flex gap-3">
                <img
                  src="@/assets/img/icons/trend-up.svg"
                  alt="Investimentos"
                  width="17"
                  height="17"
                />
                Investimentos
              </div>
              <div>5%</div>
            </div>
            <CommonProgressBar color="#FF99D6" :value="5" />
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para transação  -->
    <BaseModal
      v-if="showModalTransaction"
      @cancel="showModalTransaction = false"
      v-motion-fade-visible-once
      :delay="400"
    >
      <template #title> Enviar dinheiro </template>
      <template #body>
        <div class="grid gap-4 mb-4 grid-cols-2">
          <div class="col-span-2">
            <label for="establishment" class="block mb-2 text-sm font-medium text-white"
              >Estabelecimento</label
            >
            <select
              @change="handleData($event, 'establishment')"
              id="establishment"
              class="bg-[#292D32] border border-gray-300 text-white text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            >
              <option selected>Selecionar</option>
              <option
                v-for="item in records.data?.establishments"
                :key="item.name"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="col-span-2 sm:col-span-1">
            <label for="price" class="block mb-2 text-sm font-medium text-white">Valor</label>
            <input
              @change="handleData($event, 'value')"
              type="number"
              name="price"
              id="price"
              class="bg-[#292D32] border border-gray-300 text-white text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="R$ 2.999"
            />
          </div>
          <div class="col-span-2 sm:col-span-1">
            <label for="payment" class="block mb-2 text-sm font-medium text-white">Pagamento</label>
            <select
              id="payment"
              class="bg-[#292D32] border border-gray-300 text-white text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              @change="handleData($event, 'type')"
            >
              <option selected>Forma de pagamento</option>
              <option value="pix">Pix</option>
              <option value="cartão">Cartão</option>
              <option value="boleto">Boleto</option>
            </select>
          </div>
        </div>
      </template>
      <template #action>
        <CommonButton
          @click="handleTransaction"
          class="w-full flex max-w-60 mx-auto items-center justify-center gap-3 mt-5"
        >
          Enviar transação <img src="@/assets/img/icons/add.svg" alt="Enviar transação" />
        </CommonButton>
      </template>
    </BaseModal>

    <!-- Modal para estabelecimento  -->
    <BaseModal
      v-if="showModalEstablishment"
      @cancel="showModalEstablishment = false"
      v-motion-fade-visible-once
      :delay="400"
    >
      <template #title> Cadastrar estabelecimento</template>
      <template #body>
        <div class="grid gap-4 mb-4 grid-cols-2">
          <div class="col-span-2">
            <label for="name" class="block mb-2 text-sm font-medium text-white">Nome</label>
            <input
              @change="handleData($event, 'name')"
              type="text"
              name="name"
              id="name"
              class="bg-[#292D32] border border-gray-300 text-white text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Nome do estabelecimento"
            />
          </div>
          <div class="col-span-2">
            <label for="name" class="block mb-2 text-sm font-medium text-white">Cor</label>
            <input
              @change="handleData($event, 'color')"
              type="color"
              class="p-1 h-10 w-14 block border border-gray-300 cursor-pointer rounded-sm disabled:opacity-50 disabled:pointer-events-none bg-[#292D32]"
              value="#2563eb"
              title="Choose your color"
            />
          </div>
        </div>
      </template>
      <template #action>
        <CommonButton
          @click="handleEstablishment"
          class="w-full flex max-w-60 mx-auto items-center justify-center gap-3 mt-5"
        >
          Cadastrar <img src="@/assets/img/icons/add.svg" alt="Enviar transação" />
        </CommonButton>
      </template>
    </BaseModal>
  </div>
</template>
@/stores/establishment
