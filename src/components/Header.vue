<template>
  <header
    class="flex flex-col sm:flex-row justify-between items-center px-4 md:px-6 py-4 bg-gray-700 text-white"
  >
    <h1 class="mb-4 sm:mb-0 text-xl uppercase font-bold tracking-widest">
      Palette
    </h1>

    <div class="flex justify-between gap-6 w-full sm:w-auto sm:-my-2">
      <CFormGroup as="div" class="flex items-center gap-3">
        <CLabel class="sr-only sm:not-sr-only text-gray-300">
          Color mode
        </CLabel>
        <CSelect v-slot="{ open }" v-model="targetColorMode">
          <CSelectBtn class="uppercase">
            {{ targetColorMode }}
            <CIcon
              :id="open ? 'chevron-up' : 'chevron-down'"
              :scale="0.75"
              class="text-gray-400 ml-1 -my-1"
            />
          </CSelectBtn>
          <CSelectOptions>
            <CSelectOption value="hsl">HSL</CSelectOption>
            <CSelectOption value="hex">HEX</CSelectOption>
            <CSelectOption value="rgb">RGB</CSelectOption>
            <CSelectOption value="hwb">HWB</CSelectOption>
          </CSelectOptions>
        </CSelect>
      </CFormGroup>

      <div class="flex items-center">
        <CBtn
          :variant="[
            'primary',
            'small',
            currentView === 'edit' ? 'active' : null,
          ]"
          class="rounded-r-none whitespace-nowrap"
          @click="currentView = 'edit'"
        >
          <CIcon
            id="pencil"
            :scale="0.85"
            class="hidden sm:inline-block text-gray-400 mr-1.5 -my-1"
          />
          Edit
        </CBtn>
        <CBtn
          :variant="[
            'primary',
            'small',
            currentView === 'export' ? 'active' : null,
          ]"
          class="rounded-l-none whitespace-nowrap"
          @click="currentView = 'export'"
        >
          <CIcon
            id="share"
            class="hidden sm:inline-block text-gray-400 mr-1.5 -my-1"
          />
          Export
        </CBtn>
      </div>
    </div>
  </header>
</template>

<script setup>
import { targetColorMode, currentView } from '@/store';
</script>
